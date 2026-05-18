"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import {
  admissionStatusSchema,
  alumniMutationSchema,
  entityDeleteSchema,
  galleryItemMutationSchema,
  messageStatusMutationSchema,
  movieMutationSchema,
  siteSettingsMutationSchema,
  type AlumniFormInput,
  type GalleryItemFormInput,
  type MessageStatusFormInput,
  type MovieFormInput,
  type SiteSettingsFormInput,
} from "@/lib/admin-schemas";
import { adminLoginSchema, type AdminLoginValues } from "@/lib/form-schemas";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  deleteAlumni,
  deleteGalleryItem,
  deleteMovie,
  saveAlumni,
  saveGalleryItem,
  saveMovie,
  updateAdmissionStatus,
  updateMessageStatus,
  updateSiteSettingsValues,
} from "@/lib/supabase/queries";
import type { AdmissionStatus, MessageStatus } from "@/lib/types";
import { hasSupabaseEnv, isAdminUser } from "@/lib/utils";

export interface AdminActionResponse {
  message: string;
  success: boolean;
}

async function hasAuthorisedAdminSession(): Promise<boolean> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return Boolean(user && !error && isAdminUser(user));
}

function revalidatePaths(paths: string[]): void {
  paths.forEach((path: string): void => revalidatePath(path));
}

function revalidateTags(tags: string[]): void {
  tags.forEach((tag: string): void => revalidateTag(tag));
}

export async function signInAdminAction(values: AdminLoginValues): Promise<AdminActionResponse> {
  const validation = adminLoginSchema.safeParse(values);

  if (!validation.success) {
    return {
      success: false,
      message: "The admin credentials are not valid. Please review the form and try again.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The dashboard connection is not ready yet. Finish setup, then try again.",
    };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password,
  });

  if (error) {
    return {
      success: false,
      message: "Sign-in failed. Check the staff email and password and try again.",
    };
  }

  if (!isAdminUser(data.user)) {
    await supabase.auth.signOut();

    return {
      success: false,
      message: "This account does not have dashboard access.",
    };
  }

  revalidatePath("/admin");

  return {
    success: true,
    message: "Signed in successfully.",
  };
}

export async function signOutAdminAction(): Promise<AdminActionResponse> {
  if (!hasSupabaseEnv()) {
    return {
      success: true,
      message: "Signed out.",
    };
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      message: "Sign-out failed. Please try again.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/login");

  return {
    success: true,
    message: "Signed out.",
  };
}

export async function updateAdmissionStatusAction(input: {
  id: string;
  status: AdmissionStatus;
}): Promise<AdminActionResponse> {
  const validation = admissionStatusSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: "The admission update is not valid. Please refresh and try again.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The dashboard connection is not ready yet, so applications cannot be updated.",
    };
  }

  if (!(await hasAuthorisedAdminSession())) {
    return {
      success: false,
      message: "Your sign-in has expired. Sign in again to continue.",
    };
  }

  try {
    await updateAdmissionStatus(validation.data.id, validation.data.status);
    revalidatePath("/admin");

    return {
      success: true,
      message: `Admission marked as ${validation.data.status}.`,
    };
  } catch {
    return {
      success: false,
      message: "We could not update the admission right now. Please try again.",
    };
  }
}

export async function updateMessageStatusAction(input: MessageStatusFormInput): Promise<AdminActionResponse> {
  const validation = messageStatusMutationSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: "The message update is not valid. Please refresh and try again.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The dashboard connection is not ready yet, so messages cannot be updated.",
    };
  }

  if (!(await hasAuthorisedAdminSession())) {
    return {
      success: false,
      message: "Your sign-in has expired. Sign in again to continue.",
    };
  }

  try {
    await updateMessageStatus(validation.data.id, validation.data.status as MessageStatus);
    revalidatePaths(["/admin", "/admin/messages"]);

    return {
      success: true,
      message: `Message marked as ${validation.data.status}.`,
    };
  } catch {
    return {
      success: false,
      message: "We could not update the message right now. Please try again.",
    };
  }
}

export async function saveMovieAction(input: MovieFormInput): Promise<AdminActionResponse> {
  const validation = movieMutationSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0]?.message ?? "The movie details are not valid.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The dashboard connection is not ready yet, so movies cannot be edited.",
    };
  }

  if (!(await hasAuthorisedAdminSession())) {
    return {
      success: false,
      message: "Your sign-in has expired. Sign in again to continue.",
    };
  }

  try {
    await saveMovie(validation.data);
    revalidateTags(["movies"]);
    revalidatePaths(["/", "/movies", "/admin", "/admin/movies"]);

    return {
      success: true,
      message: validation.data.id ? "Movie updated." : "Movie created.",
    };
  } catch {
    return {
      success: false,
      message: "We could not save the movie right now. Please try again.",
    };
  }
}

export async function deleteMovieAction(id: string): Promise<AdminActionResponse> {
  const validation = entityDeleteSchema.safeParse({ id });

  if (!validation.success) {
    return {
      success: false,
      message: "The movie identifier is missing.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The dashboard connection is not ready yet, so movies cannot be deleted.",
    };
  }

  if (!(await hasAuthorisedAdminSession())) {
    return {
      success: false,
      message: "Your sign-in has expired. Sign in again to continue.",
    };
  }

  try {
    await deleteMovie(validation.data.id);
    revalidateTags(["movies"]);
    revalidatePaths(["/", "/movies", "/admin", "/admin/movies"]);

    return {
      success: true,
      message: "Movie deleted.",
    };
  } catch {
    return {
      success: false,
      message: "We could not delete the movie right now. Please try again.",
    };
  }
}

export async function saveAlumniAction(input: AlumniFormInput): Promise<AdminActionResponse> {
  const validation = alumniMutationSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0]?.message ?? "The alumni details are not valid.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The dashboard connection is not ready yet, so alumni profiles cannot be edited.",
    };
  }

  if (!(await hasAuthorisedAdminSession())) {
    return {
      success: false,
      message: "Your sign-in has expired. Sign in again to continue.",
    };
  }

  try {
    await saveAlumni(validation.data);
    revalidateTags(["alumni"]);
    revalidatePaths(["/alumni", "/admin", "/admin/alumni"]);

    return {
      success: true,
      message: validation.data.id ? "Alumni profile updated." : "Alumni profile created.",
    };
  } catch {
    return {
      success: false,
      message: "We could not save the alumni profile right now. Please try again.",
    };
  }
}

export async function deleteAlumniAction(id: string): Promise<AdminActionResponse> {
  const validation = entityDeleteSchema.safeParse({ id });

  if (!validation.success) {
    return {
      success: false,
      message: "The alumni identifier is missing.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The dashboard connection is not ready yet, so alumni profiles cannot be deleted.",
    };
  }

  if (!(await hasAuthorisedAdminSession())) {
    return {
      success: false,
      message: "Your sign-in has expired. Sign in again to continue.",
    };
  }

  try {
    await deleteAlumni(validation.data.id);
    revalidateTags(["alumni"]);
    revalidatePaths(["/alumni", "/admin", "/admin/alumni"]);

    return {
      success: true,
      message: "Alumni profile deleted.",
    };
  } catch {
    return {
      success: false,
      message: "We could not delete the alumni profile right now. Please try again.",
    };
  }
}

export async function saveGalleryItemAction(input: GalleryItemFormInput): Promise<AdminActionResponse> {
  const validation = galleryItemMutationSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0]?.message ?? "The gallery item details are not valid.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The dashboard connection is not ready yet, so gallery items cannot be edited.",
    };
  }

  if (!(await hasAuthorisedAdminSession())) {
    return {
      success: false,
      message: "Your sign-in has expired. Sign in again to continue.",
    };
  }

  try {
    await saveGalleryItem(validation.data);
    revalidateTags(["gallery"]);
    revalidatePaths(["/gallery", "/admin", "/admin/gallery"]);

    return {
      success: true,
      message: validation.data.id ? "Gallery item updated." : "Gallery item created.",
    };
  } catch {
    return {
      success: false,
      message: "We could not save the gallery item right now. Please try again.",
    };
  }
}

export async function deleteGalleryItemAction(id: string): Promise<AdminActionResponse> {
  const validation = entityDeleteSchema.safeParse({ id });

  if (!validation.success) {
    return {
      success: false,
      message: "The gallery identifier is missing.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The dashboard connection is not ready yet, so gallery items cannot be deleted.",
    };
  }

  if (!(await hasAuthorisedAdminSession())) {
    return {
      success: false,
      message: "Your sign-in has expired. Sign in again to continue.",
    };
  }

  try {
    await deleteGalleryItem(validation.data.id);
    revalidateTags(["gallery"]);
    revalidatePaths(["/gallery", "/admin", "/admin/gallery"]);

    return {
      success: true,
      message: "Gallery item deleted.",
    };
  } catch {
    return {
      success: false,
      message: "We could not delete the gallery item right now. Please try again.",
    };
  }
}

export async function saveSiteSettingsAction(input: SiteSettingsFormInput): Promise<AdminActionResponse> {
  const validation = siteSettingsMutationSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0]?.message ?? "The site settings are not valid.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The dashboard connection is not ready yet, so site settings cannot be updated.",
    };
  }

  if (!(await hasAuthorisedAdminSession())) {
    return {
      success: false,
      message: "Your sign-in has expired. Sign in again to continue.",
    };
  }

  try {
    await updateSiteSettingsValues(validation.data);
    revalidateTags(["site-settings"]);
    revalidatePaths(["/", "/admin", "/admin/settings"]);

    return {
      success: true,
      message: "Site settings updated.",
    };
  } catch {
    return {
      success: false,
      message: "We could not update the site settings right now. Please try again.",
    };
  }
}