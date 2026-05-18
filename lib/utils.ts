import type { User } from "@supabase/supabase-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function hasSupabaseEnv(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function isAdminUser(user: Pick<User, "app_metadata"> | null | undefined): boolean {
  const isAdminClaim: unknown = user?.app_metadata?.is_admin;

  return isAdminClaim === true || isAdminClaim === "true";
}

export function buildInstagramUrl(handle: string): string {
  const normalisedHandle: string = handle.replace(/^@/, "");

  return `https://instagram.com/${normalisedHandle}`;
}

export function extractYouTubeId(url: string): string | null {
  const watchMatch: RegExpMatchArray | null = url.match(/[?&]v=([^&#]+)/);

  if (watchMatch?.[1]) {
    return watchMatch[1];
  }

  const shortMatch: RegExpMatchArray | null = url.match(/youtu\.be\/([^?&#/]+)/);

  if (shortMatch?.[1]) {
    return shortMatch[1];
  }

  const embedMatch: RegExpMatchArray | null = url.match(/embed\/([^?&#/]+)/);

  if (embedMatch?.[1]) {
    return embedMatch[1];
  }

  return null;
}