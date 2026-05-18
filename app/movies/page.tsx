import type { Metadata } from "next";

import MoviesSection from "@/components/movies/MoviesSection";
import { loadMovies } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";
import type { Movie } from "@/lib/types";
import type { ReactElement } from "react";

export const metadata: Metadata = createPageMetadata({
  title: "Movies and Filmography",
  description:
    "Browse Ibrahim Yekini's filmography across acting, directing, producing, and standout titles such as Jagun Jagun, Return of Kesari, and Koleoso.",
  path: "/movies",
});

export default async function MoviesPage(): Promise<ReactElement> {
  const movies: Movie[] = await loadMovies();

  return <MoviesSection movies={movies} />;
}