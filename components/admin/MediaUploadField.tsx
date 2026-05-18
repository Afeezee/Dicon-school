"use client";

import { LoaderCircle, UploadCloud } from "lucide-react";
import { useRef, useState, type ChangeEvent, type ReactElement } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type MediaUploadKind = "image" | "video";

interface MediaUploadFieldProps {
  buttonLabel: string;
  folder: string;
  kind: MediaUploadKind;
  maxImageDimension?: number;
  onThumbnailComplete?: (url: string) => void;
  onUploadComplete: (url: string) => void;
}

function getBaseName(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase() || "media";
}

async function canvasToWebpFile(canvas: HTMLCanvasElement, fileName: string, quality: number): Promise<File> {
  const blob: Blob = await new Promise<Blob>((resolve, reject): void => {
    canvas.toBlob(
      (value: Blob | null): void => {
        if (!value) {
          reject(new Error("The browser could not prepare the media file."));
          return;
        }

        resolve(value);
      },
      "image/webp",
      quality,
    );
  });

  return new File([blob], `${fileName}.webp`, { type: "image/webp" });
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  const objectUrl: string = URL.createObjectURL(file);

  try {
    const image = new Image();
    image.decoding = "async";
    image.src = objectUrl;
    await image.decode();

    return image;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function optimiseImageFile(file: File, maxDimension: number): Promise<File> {
  const image: HTMLImageElement = await loadImage(file);
  const scale: number = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas: HTMLCanvasElement = document.createElement("canvas");

  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("The browser could not prepare the image file.");
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvasToWebpFile(canvas, getBaseName(file.name), 0.82);
}

async function loadVideoElement(file: File): Promise<{ objectUrl: string; video: HTMLVideoElement }> {
  const objectUrl: string = URL.createObjectURL(file);
  const video: HTMLVideoElement = document.createElement("video");

  video.muted = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.src = objectUrl;

  await new Promise<void>((resolve, reject): void => {
    video.onloadeddata = (): void => resolve();
    video.onerror = (): void => reject(new Error("The browser could not read this video file."));
  });

  return { objectUrl, video };
}

async function createVideoThumbnail(file: File, maxDimension: number): Promise<File> {
  const { objectUrl, video } = await loadVideoElement(file);

  try {
    const captureTime: number = Number.isFinite(video.duration) && video.duration > 0 ? Math.min(1, video.duration / 3) : 0;

    if (captureTime > 0) {
      await new Promise<void>((resolve, reject): void => {
        const handleSeeked = (): void => {
          video.removeEventListener("seeked", handleSeeked);
          resolve();
        };

        const handleError = (): void => {
          video.removeEventListener("error", handleError);
          reject(new Error("The browser could not capture a video thumbnail."));
        };

        video.addEventListener("seeked", handleSeeked, { once: true });
        video.addEventListener("error", handleError, { once: true });
        video.currentTime = captureTime;
      });
    }

    const scale: number = Math.min(1, maxDimension / Math.max(video.videoWidth, video.videoHeight));
    const canvas: HTMLCanvasElement = document.createElement("canvas");

    canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
    canvas.height = Math.max(1, Math.round(video.videoHeight * scale));

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("The browser could not capture a video thumbnail.");
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvasToWebpFile(canvas, `${getBaseName(file.name)}-poster`, 0.8);
  } finally {
    URL.revokeObjectURL(objectUrl);
    video.remove();
  }
}

async function uploadPreparedFile(file: File, folder: string): Promise<string> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("folder", folder);

  const response: Response = await fetch("/api/admin/media", {
    body: formData,
    method: "POST",
  });
  const payload: { message?: string; url?: string } = (await response.json()) as { message?: string; url?: string };

  if (!response.ok || !payload.url) {
    throw new Error(payload.message ?? "The upload could not be completed.");
  }

  return payload.url;
}

export default function MediaUploadField({
  buttonLabel,
  folder,
  kind,
  maxImageDimension = 1600,
  onThumbnailComplete,
  onUploadComplete,
}: MediaUploadFieldProps): ReactElement {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  async function handleFileSelection(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const selectedFile: File | undefined = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setIsUploading(true);
    setStatusMessage("");

    try {
      if (kind === "image") {
        const preparedImage: File = await optimiseImageFile(selectedFile, maxImageDimension);
        const uploadedImageUrl: string = await uploadPreparedFile(preparedImage, folder);

        onUploadComplete(uploadedImageUrl);
        setStatusMessage("Image uploaded and converted to WebP.");
        toast.success("Image uploaded.");
      } else {
        const uploadedVideoUrl: string = await uploadPreparedFile(selectedFile, folder);

        onUploadComplete(uploadedVideoUrl);

        if (onThumbnailComplete) {
          const videoThumbnail: File = await createVideoThumbnail(selectedFile, maxImageDimension);
          const uploadedThumbnailUrl: string = await uploadPreparedFile(videoThumbnail, `${folder}/thumbnails`);

          onThumbnailComplete(uploadedThumbnailUrl);
        }

        setStatusMessage(
          selectedFile.type === "video/mp4" || selectedFile.type === "video/webm"
            ? "Video uploaded with a generated thumbnail."
            : "Video uploaded with a generated thumbnail. MP4 or WebM will stream fastest in browsers.",
        );
        toast.success("Video uploaded.");
      }
    } catch (error) {
      const message: string = error instanceof Error ? error.message : "The media upload failed.";

      setStatusMessage(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="rounded-[1.25rem] border border-dicon-border bg-black/20 p-3">
      <input
        accept={kind === "image" ? "image/*" : "video/*"}
        className="hidden"
        onChange={(event): void => {
          void handleFileSelection(event);
        }}
        ref={inputRef}
        type="file"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-dicon-text">Upload directly from this admin form.</p>
          <p className="text-xs leading-relaxed text-dicon-muted">
            {kind === "image"
              ? "Images are resized and converted to WebP before they are stored."
              : "Videos are uploaded directly and a thumbnail is generated automatically."}
          </p>
        </div>

        <Button
          disabled={isUploading}
          onClick={(): void => inputRef.current?.click()}
          size="sm"
          type="button"
          variant="outline"
        >
          {isUploading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
          {isUploading ? "Uploading..." : buttonLabel}
        </Button>
      </div>

      {statusMessage ? <p className="mt-3 text-xs leading-relaxed text-dicon-muted">{statusMessage}</p> : null}
    </div>
  );
}