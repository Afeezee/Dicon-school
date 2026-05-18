"use client";

import Image from "next/image";
import { useState, type ReactElement } from "react";

import { FOUNDER_IMAGE_PATH } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FounderPortraitProps {
  alt?: string;
  className?: string;
  fallbackClassName?: string;
  imageClassName?: string;
  initialsClassName?: string;
  priority?: boolean;
  sizes: string;
}

export default function FounderPortrait({
  alt = "Ibrahim Yekini portrait",
  className,
  fallbackClassName,
  imageClassName,
  initialsClassName,
  priority = false,
  sizes,
}: FounderPortraitProps): ReactElement {
  const [hasImageError, setHasImageError] = useState<boolean>(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {hasImageError ? (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(232,201,106,0.16),transparent_26%),linear-gradient(180deg,#17110b_0%,#0a0a0a_100%)]",
            fallbackClassName,
          )}
        >
          <span className={cn("font-display italic text-gold-light", initialsClassName)}>IY</span>
        </div>
      ) : (
        <Image
          alt={alt}
          className={cn("object-cover object-top", imageClassName)}
          fill
          onError={(): void => setHasImageError(true)}
          priority={priority}
          sizes={sizes}
          src={FOUNDER_IMAGE_PATH}
        />
      )}
    </div>
  );
}