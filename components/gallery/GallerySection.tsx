"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Image from "next/image";
import { startTransition, useDeferredValue, useMemo, useState, type ReactElement } from "react";
import type { RenderSlideProps, Slide } from "yet-another-react-lightbox";

import GalleryItem from "@/components/gallery/GalleryItem";
import SectionHeader from "@/components/ui/SectionHeader";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { Button } from "@/components/ui/button";
import LazyYouTube from "@/components/ui/LazyYouTube";
import type { GalleryItem as GalleryItemType } from "@/lib/types";
import { extractYouTubeId } from "@/lib/utils";

type GalleryFilterKey = "all" | "awards" | "events" | "production" | "students";

interface GallerySectionProps {
  items: GalleryItemType[];
}

const galleryFilters: Array<{ label: string; value: GalleryFilterKey }> = [
  { label: "All", value: "all" },
  { label: "Events", value: "events" },
  { label: "On Set", value: "production" },
  { label: "Students", value: "students" },
  { label: "Awards", value: "awards" },
];

function filterGallery(items: GalleryItemType[], filter: GalleryFilterKey): GalleryItemType[] {
  if (filter === "all") {
    return items;
  }

  return items.filter((item: GalleryItemType): boolean => item.category === filter);
}

function renderLightboxSlide({ slide }: RenderSlideProps, items: GalleryItemType[]): ReactElement | null {
  const activeItem: GalleryItemType | undefined = items.find((item: GalleryItemType): boolean => item.id === slide.src);

  if (!activeItem) {
    return null;
  }

  if (activeItem.type === "video") {
    const videoId: string | null = extractYouTubeId(activeItem.url);

    if (!videoId) {
      return (
        <div className="mx-auto w-[min(92vw,72rem)] max-w-full overflow-hidden rounded-[1.5rem] border border-dicon-border bg-black">
          <video
            className="h-auto max-h-[72vh] w-full"
            controls={true}
            playsInline={true}
            poster={activeItem.thumbnail_url ?? undefined}
            preload="metadata"
            src={activeItem.url}
          />
        </div>
      );
    }

    return (
      <div className="mx-auto w-[min(92vw,72rem)] max-w-full">
        <LazyYouTube className="w-full" title={activeItem.caption ?? "Gallery video"} videoId={videoId} />
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[72vh] w-[min(92vw,72rem)] max-w-full overflow-hidden rounded-[1.5rem] border border-dicon-border bg-dicon-card">
      <Image alt={activeItem.caption ?? "Gallery image"} className="object-cover" fill sizes="92vw" src={activeItem.url} />
    </div>
  );
}

export default function GallerySection({ items }: GallerySectionProps): ReactElement {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterKey>("all");
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const deferredFilter: GalleryFilterKey = useDeferredValue(activeFilter);
  const filteredItems: GalleryItemType[] = useMemo((): GalleryItemType[] => filterGallery(items, deferredFilter), [deferredFilter, items]);
  const visibleItems: GalleryItemType[] = filteredItems.slice(0, visibleCount);
  const lightboxSlides: Slide[] = visibleItems.map((item: GalleryItemType): Slide => ({ src: item.id, alt: item.caption ?? undefined }));
  const isFiltering: boolean = deferredFilter !== activeFilter;

  return (
    <section className="section-padding pt-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeader subtitle="A visual record of productions, events, student energy, and the public moments that define the D'Icon standard." tag="Gallery" title="Behind the *Scenes*" />

        <div className="flex flex-wrap gap-3">
          {galleryFilters.map((filter: { label: string; value: GalleryFilterKey }): ReactElement => (
            <Button
              key={filter.value}
              onClick={(): void =>
                startTransition((): void => {
                  setActiveFilter(filter.value);
                  setVisibleCount(5);
                })
              }
              size="sm"
              variant={activeFilter === filter.value ? "default" : "outline"}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {isFiltering ? (
          <div className="grid auto-rows-[240px] gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 5 }).map((_, index: number): ReactElement => (
              <SkeletonCard className={index === 0 ? "md:col-span-2 md:row-span-2" : ""} key={index.toString()} variant="gallery" />
            ))}
          </div>
        ) : visibleItems.length > 0 ? (
          <>
            <div className="grid auto-rows-[240px] gap-6 md:grid-cols-2 xl:grid-cols-4">
              {visibleItems.map((item: GalleryItemType, index: number): ReactElement => (
                <GalleryItem index={index} item={item} key={item.id} onSelect={setLightboxIndex} />
              ))}
            </div>

            {visibleCount < filteredItems.length ? (
              <Button onClick={(): void => setVisibleCount((currentValue: number): number => currentValue + 4)} variant="outline">
                Load More
              </Button>
            ) : null}
          </>
        ) : (
          <div className="rounded-[1.75rem] border border-dicon-border bg-dicon-card p-8 text-lg text-dicon-muted">
            No gallery items found for this category.
          </div>
        )}
      </div>

      <Lightbox
        close={(): void => setLightboxIndex(-1)}
        index={lightboxIndex < 0 ? 0 : lightboxIndex}
        open={lightboxIndex >= 0}
        render={{
          slide: (props: RenderSlideProps): ReactElement | null => renderLightboxSlide(props, visibleItems),
        }}
        slides={lightboxSlides}
      />
    </section>
  );
}