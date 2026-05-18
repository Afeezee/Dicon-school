import type { Metadata } from "next";
import type { ReactElement } from "react";

import GalleryManager from "@/components/admin/GalleryManager";
import AdminRouteState from "@/components/admin/AdminRouteState";
import { createPageMetadata } from "@/lib/site";
import { getGalleryItems } from "@/lib/supabase/queries";
import type { GalleryItem } from "@/lib/types";

export const metadata: Metadata = createPageMetadata({
  title: "Admin Gallery",
  description: "Manage gallery assets inside the private D'Icon School admin dashboard.",
  path: "/admin/gallery",
  noIndex: true,
});

export default async function AdminGalleryPage(): Promise<ReactElement> {
  try {
    const galleryItems: GalleryItem[] = await getGalleryItems();

    return <GalleryManager galleryItems={galleryItems} />;
  } catch {
    return (
      <AdminRouteState
        description="Check the gallery table permissions and try this section again."
        message="The gallery module could not load right now."
        title="Gallery Error"
      />
    );
  }
}