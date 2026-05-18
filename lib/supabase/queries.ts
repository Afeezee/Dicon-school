import "server-only";

import { createClient, type PostgrestError } from "@supabase/supabase-js";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Admission,
  AdmissionStatus,
  Alumni,
  AlumniMovie,
  AlumniRow,
  ContactMessage,
  Database,
  GalleryItem,
  Movie,
  MessageStatus,
  SiteSettingRecord,
  SiteSettings,
} from "@/lib/types";

const LEGACY_GENERAL_ENQUIRY_PROGRAMME = "General Enquiry";
const LEGACY_ENQUIRY_PHONE = "Not provided";
const LEGACY_ENQUIRY_STATE = "Not provided";

function throwIfError(error: PostgrestError | null, context: string): void {
  if (error) {
    throw new Error(`${context}: ${error.message}`);
  }
}

function getSupabaseUrl(): string {
  const supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set.");
  }

  return supabaseUrl;
}

function getSupabaseAnonKey(): string {
  const supabaseAnonKey: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseAnonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.");
  }

  return supabaseAnonKey;
}

function createPublicSupabaseClient() {
  return createClient<Database, "public">(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function getDefaultSiteSettings(): SiteSettings {
  return {
    school_name: "D'Icon School of Performing Arts",
    school_tagline: "Where Talent Becomes Legacy",
    school_instagram: "@dicon_schoolofpfa",
    owner_name: "Ibrahim Yekini (Itele D'Icon)",
    owner_instagram: "@iteledicon01",
    contact_email: "info@diconschool.com",
    admissions_open: "true",
    hero_cta_primary: "Explore the School",
    hero_cta_secondary: "Watch Trailer",
    youtube_channel: "Iteledicon Studio",
  };
}

type AdminQueryClient = ReturnType<typeof createSupabaseServerClient>;

function createAdminSupabaseClient(): AdminQueryClient {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createSupabaseAdminClient() as unknown as AdminQueryClient;
  }

  return createSupabaseServerClient();
}

function isMissingRelationError(error: PostgrestError | null, relationName: string): boolean {
  if (!error) {
    return false;
  }

  const normalisedMessage: string = error.message.toLowerCase();
  const normalisedRelationName: string = relationName.toLowerCase();

  return (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    (normalisedMessage.includes(normalisedRelationName) && normalisedMessage.includes("does not exist")) ||
    (normalisedMessage.includes(normalisedRelationName) && normalisedMessage.includes("could not find the table"))
  );
}

function admissionStatusToMessageStatus(status: AdmissionStatus): MessageStatus {
  if (status === "reviewed") {
    return "read";
  }

  if (status === "accepted") {
    return "replied";
  }

  if (status === "declined") {
    return "archived";
  }

  return "new";
}

function messageStatusToAdmissionStatus(status: MessageStatus): AdmissionStatus {
  if (status === "read") {
    return "reviewed";
  }

  if (status === "replied") {
    return "accepted";
  }

  if (status === "archived") {
    return "declined";
  }

  return "pending";
}

function mapLegacyAdmissionToMessage(admission: Admission): ContactMessage {
  return {
    id: admission.id,
    full_name: admission.full_name,
    email: admission.email,
    message: admission.motivation,
    status: admissionStatusToMessageStatus(admission.status),
    created_at: admission.created_at,
  };
}

export async function getMovies(filter?: { platform?: string; role?: string }): Promise<Movie[]> {
  const supabase = createPublicSupabaseClient();
  let query = supabase
    .from("movies")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("year", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (filter?.platform) {
    query = query.eq("platform", filter.platform as NonNullable<Movie["platform"]>);
  }

  if (filter?.role) {
    query = query.contains("role", [filter.role]);
  }

  const { data, error } = await query;

  throwIfError(error, "Unable to fetch movies");

  return (data ?? []) as unknown as Movie[];
}

export async function getFeaturedMovies(): Promise<Movie[]> {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("is_featured", true)
    .order("year", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  throwIfError(error, "Unable to fetch featured movies");

  return (data ?? []) as unknown as Movie[];
}

export async function getAllAlumni(): Promise<Alumni[]> {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("alumni")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  throwIfError(error, "Unable to fetch alumni");

  return (data ?? []) as Alumni[];
}

export async function getAlumniWithMovies(): Promise<Alumni[]> {
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("alumni")
    .select(
      `
        id,
        full_name,
        stage_name,
        avatar_url,
        bio,
        graduation_year,
        current_role,
        social_instagram,
        is_featured,
        created_at,
        movies:alumni_movies (
          id,
          alumni_id,
          movie_title,
          year,
          poster_url,
          youtube_trailer_id,
          role,
          created_at
        )
      `,
    )
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  throwIfError(error, "Unable to fetch alumni with movies");

  return ((data ?? []) as unknown as Array<AlumniRow & { movies: AlumniMovie[] | null }>).map(
    (alumnus: AlumniRow & { movies: AlumniMovie[] | null }): Alumni => ({
      ...alumnus,
      movies: alumnus.movies ?? [],
    }),
  );
}

export async function getGalleryItems(category?: string): Promise<GalleryItem[]> {
  const supabase = createPublicSupabaseClient();
  let query = supabase.from("gallery_items").select("*").order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category as GalleryItem["category"]);
  }

  const { data, error } = await query;

  throwIfError(error, "Unable to fetch gallery items");

  return (data ?? []) as unknown as GalleryItem[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createPublicSupabaseClient();
  const defaults: SiteSettings = getDefaultSiteSettings();
  const { data, error } = await supabase.from("site_settings").select("id, key, value, updated_at");

  throwIfError(error, "Unable to fetch site settings");

  const mergedSettings: SiteSettings = { ...defaults };

  for (const setting of (data ?? []) as SiteSettingRecord[]) {
    if (setting.key in mergedSettings) {
      mergedSettings[setting.key as keyof SiteSettings] = setting.value;
    }
  }

  return mergedSettings;
}

export async function submitAdmission(
  data: Omit<Admission, "id" | "status" | "created_at">,
): Promise<void> {
  const supabase = createPublicSupabaseClient();
  const admissionPayload: Database["public"]["Tables"]["admissions"]["Insert"] = data;
  const { error } = await supabase.from("admissions").insert([admissionPayload] as never[]);

  throwIfError(error, "Unable to submit admission");
}

export async function submitMessage(
  data: Omit<ContactMessage, "id" | "status" | "created_at">,
): Promise<void> {
  const supabase = createPublicSupabaseClient();
  const messagePayload: Database["public"]["Tables"]["messages"]["Insert"] = data;
  const { error } = await supabase.from("messages").insert([messagePayload] as never[]);

  if (isMissingRelationError(error, "messages")) {
    const legacyAdmissionPayload: Database["public"]["Tables"]["admissions"]["Insert"] = {
      full_name: data.full_name,
      email: data.email,
      phone: LEGACY_ENQUIRY_PHONE,
      state_of_origin: LEGACY_ENQUIRY_STATE,
      age: null,
      programme_interest: LEGACY_GENERAL_ENQUIRY_PROGRAMME,
      motivation: data.message,
    };
    const { error: legacyAdmissionError } = await supabase.from("admissions").insert([legacyAdmissionPayload] as never[]);

    throwIfError(legacyAdmissionError, "Unable to submit legacy enquiry");
    return;
  }

  throwIfError(error, "Unable to submit message");
}

export async function getAdmissions(): Promise<Admission[]> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("admissions")
    .select("*")
    .neq("programme_interest", LEGACY_GENERAL_ENQUIRY_PROGRAMME)
    .order("created_at", { ascending: false });

  if (isMissingRelationError(error, "admissions")) {
    return [];
  }

  throwIfError(error, "Unable to fetch admissions");

  return (data ?? []) as unknown as Admission[];
}

export async function getMessages(): Promise<ContactMessage[]> {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });

  if (isMissingRelationError(error, "messages")) {
    const { data: legacyAdmissions, error: legacyAdmissionsError } = await supabase
      .from("admissions")
      .select("*")
      .eq("programme_interest", LEGACY_GENERAL_ENQUIRY_PROGRAMME)
      .order("created_at", { ascending: false });

    throwIfError(legacyAdmissionsError, "Unable to fetch legacy enquiries");

    return ((legacyAdmissions ?? []) as unknown as Admission[]).map(mapLegacyAdmissionToMessage);
  }

  throwIfError(error, "Unable to fetch messages");

  return (data ?? []) as unknown as ContactMessage[];
}

export async function updateAdmissionStatus(
  id: string,
  status: Admission["status"],
): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const updatePayload: Database["public"]["Tables"]["admissions"]["Update"] = { status };
  const { error } = await supabase.from("admissions").update(updatePayload as never).eq("id", id);

  throwIfError(error, "Unable to update admission status");
}

export async function updateMessageStatus(id: string, status: MessageStatus): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const updatePayload: Database["public"]["Tables"]["messages"]["Update"] = { status };
  const { error } = await supabase.from("messages").update(updatePayload as never).eq("id", id);

  if (isMissingRelationError(error, "messages")) {
    const legacyUpdatePayload: Database["public"]["Tables"]["admissions"]["Update"] = {
      status: messageStatusToAdmissionStatus(status),
    };
    const { error: legacyUpdateError } = await supabase.from("admissions").update(legacyUpdatePayload as never).eq("id", id);

    throwIfError(legacyUpdateError, "Unable to update legacy enquiry status");
    return;
  }

  throwIfError(error, "Unable to update message status");
}

export async function saveMovie(data: Database["public"]["Tables"]["movies"]["Insert"] & { id?: string }): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const payload: Database["public"]["Tables"]["movies"]["Update"] = {
    title: data.title,
    year: data.year ?? null,
    genre: data.genre ?? null,
    description: data.description ?? null,
    poster_url: data.poster_url ?? null,
    youtube_trailer_id: data.youtube_trailer_id ?? null,
    platform: data.platform ?? null,
    role: data.role ?? [],
    is_featured: data.is_featured ?? false,
  };

  const query = data.id
    ? supabase.from("movies").update(payload as never).eq("id", data.id)
    : supabase.from("movies").insert([{ ...(payload as object), title: data.title }] as never[]);
  const { error } = await query;

  throwIfError(error, "Unable to save movie");
}

export async function deleteMovie(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("movies").delete().eq("id", id);

  throwIfError(error, "Unable to delete movie");
}

export async function saveAlumni(data: Database["public"]["Tables"]["alumni"]["Insert"] & { id?: string }): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const payload: Database["public"]["Tables"]["alumni"]["Update"] = {
    full_name: data.full_name,
    stage_name: data.stage_name ?? null,
    avatar_url: data.avatar_url ?? null,
    bio: data.bio ?? "",
    graduation_year: data.graduation_year ?? null,
    current_role: data.current_role ?? "",
    social_instagram: data.social_instagram ?? null,
    is_featured: data.is_featured ?? false,
  };

  const query = data.id
    ? supabase.from("alumni").update(payload as never).eq("id", data.id)
    : supabase.from("alumni").insert([{ ...(payload as object), full_name: data.full_name }] as never[]);
  const { error } = await query;

  throwIfError(error, "Unable to save alumni profile");
}

export async function deleteAlumni(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("alumni").delete().eq("id", id);

  throwIfError(error, "Unable to delete alumni profile");
}

export async function saveGalleryItem(data: Database["public"]["Tables"]["gallery_items"]["Insert"] & { id?: string }): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const payload: Database["public"]["Tables"]["gallery_items"]["Update"] = {
    type: data.type ?? "photo",
    url: data.url,
    thumbnail_url: data.thumbnail_url ?? null,
    caption: data.caption ?? null,
    category: data.category ?? "events",
  };

  const query = data.id
    ? supabase.from("gallery_items").update(payload as never).eq("id", data.id)
    : supabase.from("gallery_items").insert([{ ...(payload as object), url: data.url }] as never[]);
  const { error } = await query;

  throwIfError(error, "Unable to save gallery item");
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);

  throwIfError(error, "Unable to delete gallery item");
}

export async function updateSiteSettingsValues(settings: SiteSettings): Promise<void> {
  const supabase = createAdminSupabaseClient();
  const payload: Array<Database["public"]["Tables"]["site_settings"]["Insert"]> = Object.entries(settings).map(
    ([key, value]: [string, string]): Database["public"]["Tables"]["site_settings"]["Insert"] => ({
      key,
      value,
    }),
  );
  const { error } = await supabase.from("site_settings").upsert(payload as never[], { onConflict: "key" });

  throwIfError(error, "Unable to update site settings");
}