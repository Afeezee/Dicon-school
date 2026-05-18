import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/types";

function buildBrowserClient() {
  return createBrowserClient<Database, "public", Database["public"]>(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
  );
}

let browserClient: ReturnType<typeof buildBrowserClient> | undefined;

function getSupabaseUrl(): string {
  const supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set.");
  }

  return supabaseUrl;
}

function getSupabaseAnonKey(): string {
  const supabaseAnonKey: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseAnonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.");
  }

  return supabaseAnonKey;
}

export function createSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  browserClient = buildBrowserClient();

  return browserClient;
}