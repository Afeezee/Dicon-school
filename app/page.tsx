import type { Metadata } from "next";

import AboutOwnerPreview from "@/components/home/AboutOwnerPreview";
import AlumniTeaserSection from "@/components/home/AlumniTeaserSection";
import HeroSection from "@/components/home/HeroSection";
import MoviesTeaserSection from "@/components/home/MoviesTeaserSection";
import SchoolPreview from "@/components/home/SchoolPreview";
import { loadAlumni, loadFeaturedMovies, loadSiteSettings } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";
import type { Alumni, Movie, SiteSettings } from "@/lib/types";

const homeMovieOrder: string[] = ["Koleoso", "Jagun Jagun", "Return of Kesari", "Késárí: The King"];

export const metadata: Metadata = createPageMetadata({
  description:
    "Official website of D'Icon School of Performing Arts, the Yoruba film training academy founded by Ibrahim Yekini (Itele D'Icon). Explore the school, movies, alumni, admissions, and contact information.",
  path: "/",
});

export default async function HomePage(): Promise<JSX.Element> {
  const [featuredMovies, alumni, siteSettings]: [Movie[], Alumni[], SiteSettings] = await Promise.all([
    loadFeaturedMovies(),
    loadAlumni(),
    loadSiteSettings(),
  ]);

  const heroMovies: Movie[] = homeMovieOrder
    .map((title: string): Movie | undefined => featuredMovies.find((movie: Movie): boolean => movie.title === title))
    .filter((movie: Movie | undefined): movie is Movie => Boolean(movie));

  const featuredAlumni: Alumni[] = alumni.filter((alumnus: Alumni): boolean => alumnus.is_featured).slice(0, 3);

  return (
    <>
      <HeroSection primaryCtaLabel={siteSettings.hero_cta_primary} secondaryCtaLabel={siteSettings.hero_cta_secondary} />
      <AboutOwnerPreview />
      <SchoolPreview />
      <MoviesTeaserSection movies={heroMovies} />
      <AlumniTeaserSection alumni={featuredAlumni} />
    </>
  );
}
