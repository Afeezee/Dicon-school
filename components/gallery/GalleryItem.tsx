"use client";

import { PlayCircle } from "lucide-react";
import Image from "next/image";
import type { ReactElement } from "react";

import type { GalleryItem as GalleryItemType } from "@/lib/types";

interface GalleryItemProps {
  index: number;
  item: GalleryItemType;
  onSelect: (index: number) => void;
}

export default function GalleryItem({ index, item, onSelect }: GalleryItemProps): ReactElement {
  const isLargeTile: boolean = index === 0;
  const imageSource: string | null = item.type === "video" ? item.thumbnail_url : item.thumbnail_url ?? item.url;

  return (
    <button
      className={`group relative overflow-hidden rounded-[1.75rem] border border-dicon-border bg-dicon-card text-left ${isLargeTile ? "md:col-span-2 md:row-span-2" : ""}`}
      onClick={(): void => onSelect(index)}
      type="button"
    >
      {imageSource ? (
        <Image alt={item.caption ?? "Gallery item"} className="object-cover transition duration-500 group-hover:scale-[1.04]" fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" src={imageSource} />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#1a1008_0%,#0d0000_100%)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />
      {item.type === "video" ? <PlayCircle className="absolute right-4 top-4 h-10 w-10 text-gold-light" /> : null}
      <div className="absolute inset-x-0 bottom-0 translate-y-5 px-5 pb-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-display text-2xl text-dicon-text">{item.caption ?? "D'Icon School"}</p>
      </div>
    </button>
  );
}