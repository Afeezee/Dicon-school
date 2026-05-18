"use client";

import { startTransition, useDeferredValue, useState, type ReactElement } from "react";

import MovieCard from "@/components/movies/MovieCard";
import MovieFilterTabs, { type MovieFilterKey } from "@/components/movies/MovieFilterTabs";
import SectionHeader from "@/components/ui/SectionHeader";
import SkeletonCard from "@/components/ui/SkeletonCard";
import type { Movie } from "@/lib/types";

interface MoviesSectionProps {
  movies: Movie[];
}

function filterMovies(movies: Movie[], filter: MovieFilterKey): Movie[] {
  if (filter === "all") {
    return movies;
  }

  if (filter === "netflix") {
    return movies.filter((movie: Movie): boolean => movie.platform === "Netflix");
  }

  if (filter === "youtube") {
    return movies.filter((movie: Movie): boolean => movie.platform === "YouTube");
  }

  if (filter === "actor") {
    return movies.filter((movie: Movie): boolean => movie.role.includes("Actor"));
  }

  if (filter === "director") {
    return movies.filter((movie: Movie): boolean => movie.role.includes("Director"));
  }

  return movies.filter((movie: Movie): boolean => movie.role.includes("Producer"));
}

export default function MoviesSection({ movies }: MoviesSectionProps): ReactElement {
  const [activeFilter, setActiveFilter] = useState<MovieFilterKey>("all");
  const deferredFilter: MovieFilterKey = useDeferredValue(activeFilter);
  const visibleMovies: Movie[] = filterMovies(movies, deferredFilter);
  const isFiltering: boolean = deferredFilter !== activeFilter;

  return (
    <section className="section-padding pt-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeader subtitle="Explore the filmography of Ibrahim Yekini across acting, directing, producing, streaming platforms, and breakout Yoruba screen milestones." tag="Filmography" title="*Ibrahim Yekini* - Works" />
        <MovieFilterTabs activeFilter={activeFilter} onChange={(filter: MovieFilterKey): void => startTransition((): void => setActiveFilter(filter))} />

        {isFiltering ? (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index: number): ReactElement => (
              <SkeletonCard className="h-full" key={index.toString()} variant="movie" />
            ))}
          </div>
        ) : visibleMovies.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {visibleMovies.map((movie: Movie): ReactElement => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-dicon-border bg-dicon-card p-8 text-lg text-dicon-muted">
            No movies found for this filter.
          </div>
        )}
      </div>
    </section>
  );
}