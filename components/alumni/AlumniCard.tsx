"use client";

import { Camera } from "lucide-react";
import Image from "next/image";
import { useState, type ReactElement } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LazyYouTube from "@/components/ui/LazyYouTube";
import type { Alumni, AlumniMovie } from "@/lib/types";
import { buildInstagramUrl } from "@/lib/utils";

interface AlumniCardProps {
  alumnus: Alumni;
}

function getInitials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((part: string): string => part.charAt(0).toUpperCase())
    .join("");
}

export default function AlumniCard({ alumnus }: AlumniCardProps): ReactElement {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<AlumniMovie | null>(null);

  return (
    <>
      <Card className={`h-full ${alumnus.is_featured ? "border-t-2 border-t-gold/65" : ""}`}>
        <CardContent className="flex h-full flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-black/[0.08] dark:border-white/10 bg-[linear-gradient(135deg,#E8C96A,#C8A84B,#8B6914)]">
              {alumnus.avatar_url ? (
                <Image alt={alumnus.full_name} className="object-cover" fill sizes="64px" src={alumnus.avatar_url} />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-accent uppercase tracking-[0.12em] text-dicon-bg">
                  {getInitials(alumnus.full_name)}
                </div>
              )}
            </div>

            {alumnus.social_instagram ? (
              <a
                className="rounded-full border border-dicon-border p-2 text-dicon-muted transition hover:border-gold/40 hover:text-gold-light"
                href={buildInstagramUrl(alumnus.social_instagram)}
                rel="noreferrer"
                target="_blank"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
            ) : null}
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-3xl text-dicon-text">{alumnus.full_name}</h3>
            {alumnus.stage_name ? <p className="text-base italic text-gold-light">{alumnus.stage_name}</p> : null}
            <Badge variant="outline">{alumnus.current_role}</Badge>
          </div>

          <div className="space-y-3">
            <p className={`text-lg leading-relaxed text-dicon-muted ${expanded ? "" : "line-clamp-3"}`}>{alumnus.bio}</p>
            <button className="font-accent text-sm uppercase tracking-[0.2em] text-gold-light" onClick={(): void => setExpanded((value: boolean): boolean => !value)} type="button">
              {expanded ? "Show Less" : "Read More"}
            </button>
          </div>

          <div className="mt-auto flex flex-wrap gap-2">
            {(alumnus.movies ?? []).length > 0 ? (
              alumnus.movies?.map((movie: AlumniMovie): ReactElement => {
                if (movie.youtube_trailer_id) {
                  return (
                    <button
                      className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-left font-accent text-xs uppercase tracking-[0.18em] text-gold-light transition hover:bg-gold/20"
                      key={movie.id}
                      onClick={(): void => setSelectedMovie(movie)}
                      type="button"
                    >
                      {movie.movie_title} {movie.year ? `(${movie.year})` : ""}
                    </button>
                  );
                }

                return (
                  <span className="rounded-full border border-dicon-border bg-dicon-surface px-3 py-1 font-accent text-xs uppercase tracking-[0.18em] text-dicon-text" key={movie.id}>
                    {movie.movie_title} {movie.year ? `(${movie.year})` : ""}
                  </span>
                );
              }) ?? []
            ) : (
              <span className="text-sm uppercase tracking-[0.2em] text-dicon-muted">More credits will be added soon.</span>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog onOpenChange={(open: boolean): void => {
        if (!open) {
          setSelectedMovie(null);
        }
      }} open={Boolean(selectedMovie)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedMovie?.movie_title}</DialogTitle>
            <DialogDescription>{selectedMovie?.role ?? "Watch the trailer."}</DialogDescription>
          </DialogHeader>
          {selectedMovie?.youtube_trailer_id ? (
            <LazyYouTube title={selectedMovie.movie_title} videoId={selectedMovie.youtube_trailer_id} />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}