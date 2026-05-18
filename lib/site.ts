import type { Metadata } from "next";

type SitemapChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface CreatePageMetadataOptions {
  description: string;
  noIndex?: boolean;
  path?: string;
  title?: string;
}

interface SitemapRouteEntry {
  changeFrequency: SitemapChangeFrequency;
  path: string;
  priority: number;
}

export const siteConfig = {
  description:
    "Nigeria's premier Yoruba performing arts school, founded by award-winning actor Ibrahim Yekini (Itele D'Icon).",
  keywords: [
    "D'Icon School of Performing Arts",
    "Ibrahim Yekini",
    "Itele D'Icon",
    "Yoruba Nollywood school",
    "acting school Nigeria",
    "film production training",
    "Yoruba performing arts",
    "Nollywood alumni",
  ],
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "D'Icon School of Performing Arts",
  ogImageAlt: "D'Icon School of Performing Arts social preview card",
  ogImagePath: "/opengraph-image",
  shortName: "D'Icon School",
  themeColor: "#0A0A0A",
  twitterImagePath: "/twitter-image",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://diconschool.com",
};

export const publicSitemapRoutes: SitemapRouteEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.88 },
  { path: "/school", changeFrequency: "monthly", priority: 0.92 },
  { path: "/movies", changeFrequency: "weekly", priority: 0.84 },
  { path: "/alumni", changeFrequency: "weekly", priority: 0.82 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.8 },
  { path: "/admission", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.72 },
];

export function absoluteUrl(path: string = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

export function createPageMetadata({
  description,
  noIndex = false,
  path = "/",
  title,
}: CreatePageMetadataOptions): Metadata {
  const resolvedTitle: string = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const robots: Metadata["robots"] = noIndex
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      };

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: "en_GB",
      type: "website",
      images: [
        {
          url: absoluteUrl(siteConfig.ogImagePath),
          width: 1200,
          height: 630,
          alt: siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [absoluteUrl(siteConfig.twitterImagePath)],
    },
    robots,
  };
}