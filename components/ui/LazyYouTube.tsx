"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";

import { getYTThumbnail } from "@/lib/types";

interface LazyYouTubeProps {
  autoPlayOnLoad?: boolean;
  aspectRatio?: "16/9" | "9/16";
  className?: string;
  title: string;
  videoId: string;
}

function getAspectRatioClass(aspectRatio: LazyYouTubeProps["aspectRatio"]): string {
  return aspectRatio === "9/16" ? "aspect-[9/16]" : "aspect-video";
}

function buildEmbedSrc(videoId: string, autoPlayOnLoad: boolean): string {
  if (autoPlayOnLoad) {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&playsinline=1&modestbranding=1`;
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
}

export default function LazyYouTube({
  autoPlayOnLoad = false,
  aspectRatio = "16/9",
  className,
  title,
  videoId,
}: LazyYouTubeProps): ReactElement {
  const [playing, setPlaying] = useState<boolean>(autoPlayOnLoad);
  const [thumbnailSrc, setThumbnailSrc] = useState<string>(getYTThumbnail(videoId, "hq"));
  const [usedFallback, setUsedFallback] = useState<boolean>(false);

  useEffect((): void => {
    setPlaying(autoPlayOnLoad);
    setThumbnailSrc(getYTThumbnail(videoId, "hq"));
    setUsedFallback(false);
  }, [autoPlayOnLoad, videoId]);

  const aspectRatioClass: string = getAspectRatioClass(aspectRatio);
  const iframeSrc: string = buildEmbedSrc(videoId, autoPlayOnLoad);

  return (
    <div
      className={`group relative overflow-hidden rounded-[1.75rem] border border-dicon-border bg-dicon-card ${aspectRatioClass} ${className ?? ""}`.trim()}
    >
      {playing ? (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading={autoPlayOnLoad ? undefined : "lazy"}
          src={iframeSrc}
          title={title}
        />
      ) : (
        <button
          aria-label={`Play ${title}`}
          className="absolute inset-0 h-full w-full text-left"
          onClick={(): void => setPlaying(true)}
          type="button"
        >
          <Image
            alt={title}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            fill
            onError={(): void => {
              if (!usedFallback) {
                setThumbnailSrc(getYTThumbnail(videoId, "mq"));
                setUsedFallback(true);
              }
            }}
            priority={false}
            sizes="(min-width: 1024px) 80vw, 100vw"
            src={thumbnailSrc}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/45" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-light/70 bg-gold/90 text-white shadow-[0_0_30px_rgba(200,168,75,0.35)] transition duration-300 group-hover:scale-110 group-hover:bg-gold-light">
              <span className="ml-1 text-2xl leading-none">▶</span>
            </span>
          </div>
        </button>
      )}
    </div>
  );
}