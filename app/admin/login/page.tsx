import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactElement } from "react";

import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { createPageMetadata } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv, isAdminUser } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Admin Login",
  description: "Private sign-in for the D'Icon School admissions dashboard.",
  path: "/admin/login",
  noIndex: true,
});

interface AdminLoginPageProps {
  searchParams?: {
    redirectedFrom?: string | string[];
  };
}

function getRedirectedFrom(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps): Promise<ReactElement> {
  if (hasSupabaseEnv()) {
    try {
      const supabase = createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && isAdminUser(user)) {
        redirect("/admin");
      }
    } catch {
      // The login page should still render if auth bootstrap fails.
    }
  }

  return <AdminLoginForm isConfigured={hasSupabaseEnv()} redirectedFrom={getRedirectedFrom(searchParams?.redirectedFrom)} />;
}