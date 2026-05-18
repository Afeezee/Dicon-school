"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";

import MoviePoster from "@/components/ui/MoviePoster";
import SectionHeader from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LazyYouTube from "@/components/ui/LazyYouTube";
import type { Movie } from "@/lib/types";

interface MoviesTeaserSectionProps {
  movies: Movie[];
}

export default function MoviesTeaserSection({ movies }: MoviesTeaserSectionProps): ReactElement {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeader subtitle="A selected look at the productions that shaped Ibrahim Yekini's screen mythos, from franchise-defining action stories to breakout YouTube epics." tag="Filmography" title="*Blockbuster* Productions" />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {movies.map((movie: Movie, index: number): ReactElement => {
            const poster = <MoviePoster movie={movie} />;

            if (!movie.youtube_trailer_id) {
              return (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  key={movie.id}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {poster}
                  <p className="text-sm uppercase tracking-[0.22em] text-dicon-muted">Trailer archive coming soon</p>
                </motion.div>
              );
            }

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                key={movie.id}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.15 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Dialog>
                  <DialogTrigger asChild={true}>
                    <button className="w-full text-left" type="button">
                      {poster}
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
              </motion.div>
            );
          })}
        </div>

        <Button asChild={true} variant="outline">
          <Link href="/movies">View Full Filmography →</Link>
        </Button>
      </div>
    </section>
  );
}