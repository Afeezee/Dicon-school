"use client";

import type { ReactElement } from "react";

import MoviePoster from "@/components/ui/MoviePoster";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LazyYouTube from "@/components/ui/LazyYouTube";
import type { Movie } from "@/lib/types";

interface MovieCardProps {
  movie: Movie;
}

function renderContent(movie: Movie): ReactElement {
  return (
    <Card className="h-full overflow-hidden">
      <MoviePoster movie={movie} />
      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {movie.is_featured ? <Badge>★ Featured</Badge> : null}
            {movie.platform ? <Badge variant="crimson">{movie.platform}</Badge> : null}
          </div>
          <h3 className="font-display text-3xl leading-tight text-dicon-text">{movie.title}</h3>
          <p className="font-accent text-sm uppercase tracking-[0.22em] text-dicon-muted">{movie.year ?? "Archive"}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {movie.role.map((role: Movie["role"][number]): ReactElement => (
            <Badge key={role} variant="outline">
              {role}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MovieCard({ movie }: MovieCardProps): ReactElement {
  const content: ReactElement = renderContent(movie);

  if (!movie.youtube_trailer_id) {
    return <div>{content}</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <button className="h-full w-full text-left" type="button">
          {content}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{movie.title}</DialogTitle>
          <DialogDescription>{movie.description ?? "Watch the official trailer."}</DialogDescription>
        </DialogHeader>
        <LazyYouTube className="w-full" title={`${movie.title} trailer`} videoId={movie.youtube_trailer_id} />
      </DialogContent>
    </Dialog>
  );
}