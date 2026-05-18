import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv, isAdminUser } from "@/lib/utils";

const MEDIA_BUCKET_NAME = "media";
const MAX_UPLOAD_SIZE_IN_BYTES = 150 * 1024 * 1024;

function getFileExtension(file: File): string {
  const extensionMatch: RegExpMatchArray | null = file.name.toLowerCase().match(/\.([a-z0-9]+)$/);

  if (extensionMatch?.[1]) {
    return extensionMatch[1];
  }

  if (file.type === "image/webp") {
    return "webp";
  }

  if (file.type === "image/jpeg") {
    return "jpg";
  }

  if (file.type === "image/png") {
    return "png";
  }

  if (file.type === "video/mp4") {
    return "mp4";
  }

  if (file.type === "video/webm") {
    return "webm";
  }

  return "bin";
}

function sanitizeFolder(folder: string): string {
  const trimmedFolder: string = folder.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");

  if (trimmedFolder.length === 0 || trimmedFolder.includes("..")) {
    return "";
  }

  return trimmedFolder.replace(/[^a-zA-Z0-9/_-]/g, "-");
}

async function ensureMediaBucket(): Promise<void> {
  const supabaseAdmin = createSupabaseAdminClient();
  const { data: bucket, error } = await supabaseAdmin.storage.getBucket(MEDIA_BUCKET_NAME);

  if (!bucket && error && !error.message.toLowerCase().includes("not found")) {
    throw new Error(error.message);
  }

  if (bucket) {
    return;
  }

  const { error: createBucketError } = await supabaseAdmin.storage.createBucket(MEDIA_BUCKET_NAME, {
    public: true,
  });

  if (createBucketError && !createBucketError.message.toLowerCase().includes("already exists")) {
    throw new Error(createBucketError.message);
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      {
        message: "Supabase storage is not configured yet. Add the public keys and service role key before uploading media.",
      },
      { status: 503 },
    );
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user || !isAdminUser(user)) {
    return NextResponse.json(
      {
        message: "Your admin session is not authorised to upload files.",
      },
      { status: 401 },
    );
  }

  const formData: FormData = await request.formData();
  const fileEntry: FormDataEntryValue | null = formData.get("file");
  const folderEntry: FormDataEntryValue | null = formData.get("folder");

  if (!(fileEntry instanceof File) || typeof folderEntry !== "string") {
    return NextResponse.json(
      {
        message: "Upload requests must include a file and a target folder.",
      },
      { status: 400 },
    );
  }

  if (fileEntry.size === 0 || fileEntry.size > MAX_UPLOAD_SIZE_IN_BYTES) {
    return NextResponse.json(
      {
        message: "The selected file is empty or exceeds the 150 MB upload limit.",
      },
      { status: 400 },
    );
  }

  if (!fileEntry.type.startsWith("image/") && !fileEntry.type.startsWith("video/")) {
    return NextResponse.json(
      {
        message: "Only image and video uploads are supported.",
      },
      { status: 400 },
    );
  }

  const folder: string = sanitizeFolder(folderEntry);

  if (folder.length === 0) {
    return NextResponse.json(
      {
        message: "The upload folder is not valid.",
      },
      { status: 400 },
    );
  }

  try {
    await ensureMediaBucket();

    const extension: string = getFileExtension(fileEntry);
    const filePath: string = `${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const supabaseAdmin = createSupabaseAdminClient();
    const { error: uploadError } = await supabaseAdmin.storage.from(MEDIA_BUCKET_NAME).upload(filePath, fileEntry, {
      cacheControl: "31536000",
      contentType: fileEntry.type,
      upsert: false,
    });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(MEDIA_BUCKET_NAME).getPublicUrl(filePath);

    return NextResponse.json({ path: filePath, url: publicUrl });
  } catch (error) {
    const message: string = error instanceof Error ? error.message : "The file upload failed.";

    return NextResponse.json(
      {
        message,
      },
      { status: 500 },
    );
  }
}