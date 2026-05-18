import type { Metadata } from "next";

import GallerySection from "@/components/gallery/GallerySection";
import { loadGallery } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";
import type { GalleryItem } from "@/lib/types";
import type { ReactElement } from "react";

export const metadata: Metadata = createPageMetadata({
  title: "Gallery",
  description:
    "View behind-the-scenes moments, productions, student activities, awards, and event highlights from D'Icon School of Performing Arts.",
  path: "/gallery",
});

export default async function GalleryPage(): Promise<ReactElement> {
  const items: GalleryItem[] = await loadGallery();

  return <GallerySection items={items} />;
}