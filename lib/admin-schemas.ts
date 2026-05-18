import { z } from "zod";

import {
  ADMISSION_STATUSES,
  GALLERY_CATEGORIES,
  MESSAGE_STATUSES,
  MOVIE_PLATFORMS,
  MOVIE_ROLES,
  type MoviePlatform,
  type SiteSettings,
} from "@/lib/types";

function isValidUrl(value: string): boolean {
  if (value.length === 0) {
    return true;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function toNullableText(value: string | undefined): string | null {
  const trimmedValue: string = value?.trim() ?? "";

  return trimmedValue.length > 0 ? trimmedValue : null;
}

const optionalUrlField = z
  .string()
  .trim()
  .refine((value: string): boolean => isValidUrl(value), "Please enter a valid URL.");

const optionalIntegerField = z
  .string()
  .trim()
  .refine((value: string): boolean => value.length === 0 || Number.isInteger(Number(value)), "Please enter a whole number.");

export interface MovieFormInput {
  description: string;
  genre: string;
  id?: string;
  isFeatured: boolean;
  platform: "" | (typeof MOVIE_PLATFORMS)[number];
  posterUrl: string;
  role: Array<(typeof MOVIE_ROLES)[number]>;
  title: string;
  year: string;
  youtubeTrailerId: string;
}

export const movieMutationSchema = z
  .object({
    description: z.string().trim().optional().default(""),
    genre: z.string().trim().optional().default(""),
    id: z.string().trim().min(1).optional(),
    isFeatured: z.boolean(),
    platform: z.union([z.literal(""), z.enum(MOVIE_PLATFORMS)]),
    posterUrl: optionalUrlField.default(""),
    role: z.array(z.enum(MOVIE_ROLES)).min(1, "Select at least one creative role."),
    title: z.string().trim().min(1, "Movie title is required."),
    year: optionalIntegerField.default(""),
    youtubeTrailerId: z.string().trim().optional().default(""),
  })
  .transform((value) => ({
    description: toNullableText(value.description),
    genre: toNullableText(value.genre),
    id: value.id,
    is_featured: value.isFeatured,
    platform: value.platform.length > 0 ? (value.platform as MoviePlatform) : null,
    poster_url: toNullableText(value.posterUrl),
    role: value.role,
    title: value.title.trim(),
    year: value.year.trim().length > 0 ? Number(value.year) : null,
    youtube_trailer_id: toNullableText(value.youtubeTrailerId),
  }));

export interface AlumniFormInput {
  avatarUrl: string;
  bio: string;
  currentRole: string;
  fullName: string;
  graduationYear: string;
  id?: string;
  isFeatured: boolean;
  socialInstagram: string;
  stageName: string;
}

export const alumniMutationSchema = z
  .object({
    avatarUrl: optionalUrlField.default(""),
    bio: z.string().trim().min(20, "Write a short alumni bio of at least 20 characters."),
    currentRole: z.string().trim().min(2, "Current role is required."),
    fullName: z.string().trim().min(2, "Full name is required."),
    graduationYear: optionalIntegerField.default(""),
    id: z.string().trim().min(1).optional(),
    isFeatured: z.boolean(),
    socialInstagram: z.string().trim().optional().default(""),
    stageName: z.string().trim().optional().default(""),
  })
  .transform((value) => ({
    avatar_url: toNullableText(value.avatarUrl),
    bio: value.bio.trim(),
    current_role: value.currentRole.trim(),
    full_name: value.fullName.trim(),
    graduation_year: value.graduationYear.trim().length > 0 ? Number(value.graduationYear) : null,
    id: value.id,
    is_featured: value.isFeatured,
    social_instagram: toNullableText(value.socialInstagram),
    stage_name: toNullableText(value.stageName),
  }));

export interface GalleryItemFormInput {
  caption: string;
  category: (typeof GALLERY_CATEGORIES)[number];
  id?: string;
  thumbnailUrl: string;
  type: "photo" | "video";
  url: string;
}

export const galleryItemMutationSchema = z
  .object({
    caption: z.string().trim().optional().default(""),
    category: z.enum(GALLERY_CATEGORIES),
    id: z.string().trim().min(1).optional(),
    thumbnailUrl: optionalUrlField.default(""),
    type: z.enum(["photo", "video"]),
    url: z.string().trim().min(1, "Media URL is required.").refine((value: string): boolean => isValidUrl(value), "Please enter a valid media URL."),
  })
  .transform((value) => ({
    caption: toNullableText(value.caption),
    category: value.category,
    id: value.id,
    thumbnail_url: toNullableText(value.thumbnailUrl),
    type: value.type,
    url: value.url.trim(),
  }));

export interface SiteSettingsFormInput {
  admissionsOpen: SiteSettings["admissions_open"];
  contactEmail: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  ownerInstagram: string;
  ownerName: string;
  schoolInstagram: string;
  schoolName: string;
  schoolTagline: string;
  youtubeChannel: string;
}

export const siteSettingsMutationSchema = z
  .object({
    admissionsOpen: z.union([z.literal("true"), z.literal("false")]),
    contactEmail: z.string().trim().email("Please enter a valid contact email address."),
    heroCtaPrimary: z.string().trim().min(2, "Primary CTA is required."),
    heroCtaSecondary: z.string().trim().min(2, "Secondary CTA is required."),
    ownerInstagram: z.string().trim().min(2, "Owner Instagram handle is required."),
    ownerName: z.string().trim().min(2, "Owner name is required."),
    schoolInstagram: z.string().trim().min(2, "School Instagram handle is required."),
    schoolName: z.string().trim().min(2, "School name is required."),
    schoolTagline: z.string().trim().min(2, "School tagline is required."),
    youtubeChannel: z.string().trim().min(2, "YouTube channel label is required."),
  })
  .transform((value): SiteSettings => ({
    admissions_open: value.admissionsOpen,
    contact_email: value.contactEmail.trim(),
    hero_cta_primary: value.heroCtaPrimary.trim(),
    hero_cta_secondary: value.heroCtaSecondary.trim(),
    owner_instagram: value.ownerInstagram.trim(),
    owner_name: value.ownerName.trim(),
    school_instagram: value.schoolInstagram.trim(),
    school_name: value.schoolName.trim(),
    school_tagline: value.schoolTagline.trim(),
    youtube_channel: value.youtubeChannel.trim(),
  }));

export interface MessageStatusFormInput {
  id: string;
  status: (typeof MESSAGE_STATUSES)[number];
}

export const messageStatusMutationSchema = z.object({
  id: z.string().min(1, "Missing message identifier."),
  status: z.enum(MESSAGE_STATUSES),
});

export const entityDeleteSchema = z.object({
  id: z.string().min(1, "Missing record identifier."),
});

export const admissionStatusSchema = z.object({
  id: z.string().min(1, "Missing admission identifier."),
  status: z.enum(ADMISSION_STATUSES),
});