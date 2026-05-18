import type { Metadata } from "next";
import type { ReactElement } from "react";

import MoviesManager from "@/components/admin/MoviesManager";
import AdminRouteState from "@/components/admin/AdminRouteState";
import { createPageMetadata } from "@/lib/site";
import { getMovies } from "@/lib/supabase/queries";
import type { Movie } from "@/lib/types";

export const metadata: Metadata = createPageMetadata({
  title: "Admin Movies",
  description: "Manage the D'Icon School filmography catalogue inside the private admin dashboard.",
  path: "/admin/movies",
  noIndex: true,
});

export default async function AdminMoviesPage(): Promise<ReactElement> {
  try {
    const movies: Movie[] = await getMovies();

    return <MoviesManager movies={movies} />;
  } catch {
    return (
      <AdminRouteState
        description="Check the movies table permissions and try this section again."
        message="The movies module could not load right now."
        title="Movies Error"
      />
    );
  }
}