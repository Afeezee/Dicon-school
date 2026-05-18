import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/types";

function getSupabaseUrl(): string {
  const supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set.");
  }

  return supabaseUrl;
}

function getSupabaseServiceRoleKey(): string {
  const serviceRoleKey: string | undefined = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set.");
  }

  return serviceRoleKey;
}

export function createSupabaseAdminClient() {
  return createClient<Database, "public">(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}