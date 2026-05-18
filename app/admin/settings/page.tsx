import type { Metadata } from "next";
import type { ReactElement } from "react";

import AdminRouteState from "@/components/admin/AdminRouteState";
import SettingsManager from "@/components/admin/SettingsManager";
import { createPageMetadata } from "@/lib/site";
import { getSiteSettings } from "@/lib/supabase/queries";
import type { SiteSettings } from "@/lib/types";

export const metadata: Metadata = createPageMetadata({
  title: "Admin Settings",
  description: "Review site content settings inside the private D'Icon School admin dashboard.",
  path: "/admin/settings",
  noIndex: true,
});

export default async function AdminSettingsPage(): Promise<ReactElement> {
  try {
    const settings: SiteSettings = await getSiteSettings();

    return <SettingsManager settings={settings} />;
  } catch {
    return (
      <AdminRouteState
        description="Check the site settings table permissions and try this section again."
        message="The settings module could not load right now."
        title="Settings Error"
      />
    );
  }
}