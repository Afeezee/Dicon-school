import "server-only";

import { unstable_cache } from "next/cache";

import {
  FALLBACK_ALUMNI,
  FALLBACK_GALLERY_ITEMS,
  FALLBACK_MOVIES,
  SITE_SETTINGS_FALLBACK,
} from "@/lib/constants";
import {
  getAlumniWithMovies,
  getGalleryItems,
  getMovies,
  getSiteSettings,
} from "@/lib/supabase/queries";
import type { Alumni, GalleryItem, Movie, SiteSettings } from "@/lib/types";
import { hasSupabaseEnv } from "@/lib/utils";

function sortMovies(movies: Movie[]): Movie[] {
  return [...movies].sort((leftMovie: Movie, rightMovie: Movie): number => {
    if (leftMovie.is_featured !== rightMovie.is_featured) {
      return Number(rightMovie.is_featured) - Number(leftMovie.is_featured);
    }

    return (rightMovie.year ?? 0) - (leftMovie.year ?? 0);
  });
}

function sortAlumni(alumni: Alumni[]): Alumni[] {
  return [...alumni].sort((leftAlumnus: Alumni, rightAlumnus: Alumni): number => {
    if (leftAlumnus.is_featured !== rightAlumnus.is_featured) {
      return Number(rightAlumnus.is_featured) - Number(leftAlumnus.is_featured);
    }

    return leftAlumnus.full_name.localeCompare(rightAlumnus.full_name);
  });
}

function filterFallbackMovies(movies: Movie[], filter?: { platform?: string; role?: string }): Movie[] {
  return movies.filter((movie: Movie): boolean => {
    const matchesPlatform: boolean = !filter?.platform || movie.platform === filter.platform;
    const matchesRole: boolean = !filter?.role || movie.role.includes(filter.role as Movie["role"][number]);

    return matchesPlatform && matchesRole;
  });
}

function filterFallbackGallery(items: GalleryItem[], category?: string): GalleryItem[] {
  if (!category) {
    return items;
  }

  return items.filter((item: GalleryItem): boolean => item.category === category);
}

const getCachedMovies = unstable_cache(
  async (platform?: string, role?: string): Promise<Movie[]> => {
    if (hasSupabaseEnv()) {
      try {
        return sortMovies(await getMovies({ platform, role }));
      } catch {
        return sortMovies(filterFallbackMovies(FALLBACK_MOVIES, { platform, role }));
      }
    }

    return sortMovies(filterFallbackMovies(FALLBACK_MOVIES, { platform, role }));
  },
  ["public-movies"],
  {
    revalidate: 300,
    tags: ["movies"],
  },
);

const getCachedAlumni = unstable_cache(
  async (): Promise<Alumni[]> => {
    if (hasSupabaseEnv()) {
      try {
        return sortAlumni(await getAlumniWithMovies());
      } catch {
        return sortAlumni(FALLBACK_ALUMNI);
      }
    }

    return sortAlumni(FALLBACK_ALUMNI);
  },
  ["public-alumni"],
  {
    revalidate: 300,
    tags: ["alumni"],
  },
);

const getCachedGallery = unstable_cache(
  async (category?: string): Promise<GalleryItem[]> => {
    if (hasSupabaseEnv()) {
      try {
        return await getGalleryItems(category);
      } catch {
        return filterFallbackGallery(FALLBACK_GALLERY_ITEMS, category);
      }
    }

    return filterFallbackGallery(FALLBACK_GALLERY_ITEMS, category);
  },
  ["public-gallery"],
  {
    revalidate: 300,
    tags: ["gallery"],
  },
);

const getCachedSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    if (hasSupabaseEnv()) {
      try {
        return await getSiteSettings();
      } catch {
        return SITE_SETTINGS_FALLBACK;
      }
    }

    return SITE_SETTINGS_FALLBACK;
  },
  ["site-settings"],
  {
    revalidate: 300,
    tags: ["site-settings"],
  },
);

export async function loadMovies(filter?: { platform?: string; role?: string }): Promise<Movie[]> {
  return getCachedMovies(filter?.platform, filter?.role);
}

export async function loadFeaturedMovies(): Promise<Movie[]> {
  const movies: Movie[] = await loadMovies();

  return movies.filter((movie: Movie): boolean => movie.is_featured);
}

export async function loadAlumni(): Promise<Alumni[]> {
  return getCachedAlumni();
}

export async function loadGallery(category?: string): Promise<GalleryItem[]> {
  return getCachedGallery(category);
}

export async function loadSiteSettings(): Promise<SiteSettings> {
  return getCachedSiteSettings();
}