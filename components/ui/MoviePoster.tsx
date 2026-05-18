import Image from "next/image";
import type { ReactElement } from "react";

import type { Movie } from "@/lib/types";
import { getYTThumbnail } from "@/lib/types";

interface MoviePosterProps {
  movie: Movie;
}

function getPosterSource(movie: Movie): string | null {
  if (movie.poster_url) {
    return movie.poster_url;
  }

  if (movie.youtube_trailer_id) {
    return getYTThumbnail(movie.youtube_trailer_id, "mq");
  }

  return movie.poster_url;
}

function getPlatformBadgeClass(platform: Movie["platform"]): string {
  if (platform === "Netflix") {
    return "bg-crimson-light text-white";
  }

  if (platform === "YouTube") {
    return "bg-crimson text-white";
  }

  return "bg-dicon-surface text-dicon-text";
}

export default function MoviePoster({ movie }: MoviePosterProps): ReactElement {
  const posterSource: string | null = getPosterSource(movie);
  const platformLabel: string = movie.platform ?? "Cinema";
  const badgeClass: string = getPlatformBadgeClass(movie.platform);
  const hasTrailer: boolean = Boolean(movie.youtube_trailer_id);
  const overlayClass: string = hasTrailer ? "from-black/90 via-black/24 to-black/10" : "from-black/72 via-black/10 to-transparent";

  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-dicon-card transition duration-300 hover:border-gold/55 hover:gold-border-glow">
      <div className="relative aspect-[3/4]">
        {posterSource ? (
          <Image
            alt={movie.title}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            fill
            sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 50vw"
            src={posterSource}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(160deg,#1a1008_0%,#0d0000_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,201,106,0.14),transparent_34%)]" />
            <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
              <h3 className="font-display text-3xl italic tracking-wide text-dicon-text md:text-4xl">
                {movie.title}
              </h3>
            </div>
          </div>
        )}

        <div className={`absolute inset-0 bg-gradient-to-t ${overlayClass}`} />

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${badgeClass}`}
        >
          {platformLabel}
        </span>

        {movie.year ? (
          <span className="absolute bottom-4 left-4 rounded-full border border-gold/30 bg-black/50 px-3 py-1 font-accent text-base uppercase tracking-[0.22em] text-dicon-text">
            {movie.year}
          </span>
        ) : null}

        {hasTrailer ? (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
            <div className="glass-panel rounded-full px-5 py-3 font-accent text-lg uppercase tracking-[0.2em] text-gold-light">
              ▶ Watch Trailer
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}