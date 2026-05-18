export const MOVIE_PLATFORMS = ["YouTube", "Netflix", "Cinema"] as const;

export const MOVIE_ROLES = ["Actor", "Director", "Producer", "Writer"] as const;

export const GALLERY_CATEGORIES = ["events", "production", "students", "awards"] as const;

export const ADMISSION_STATUSES = ["pending", "reviewed", "accepted", "declined"] as const;

export const MESSAGE_STATUSES = ["new", "read", "replied", "archived"] as const;

export type MoviePlatform = (typeof MOVIE_PLATFORMS)[number];

export type MovieRole = (typeof MOVIE_ROLES)[number];

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type AdmissionStatus = (typeof ADMISSION_STATUSES)[number];

export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

export interface Movie {
  id: string;
  title: string;
  year: number | null;
  genre: string | null;
  description: string | null;
  poster_url: string | null;
  youtube_trailer_id: string | null;
  platform: MoviePlatform | null;
  role: MovieRole[];
  is_featured: boolean;
  created_at: string;
}

export interface Alumni {
  id: string;
  full_name: string;
  stage_name: string | null;
  avatar_url: string | null;
  bio: string;
  graduation_year: number | null;
  current_role: string;
  social_instagram: string | null;
  is_featured: boolean;
  created_at: string;
  movies?: AlumniMovie[];
}

export interface AlumniMovie {
  id: string;
  alumni_id: string;
  movie_title: string;
  year: number | null;
  poster_url: string | null;
  youtube_trailer_id: string | null;
  role: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  type: "photo" | "video";
  url: string;
  thumbnail_url: string | null;
  caption: string | null;
  category: GalleryCategory;
  created_at: string;
}

export interface Admission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  state_of_origin: string;
  age: number | null;
  programme_interest: string;
  motivation: string;
  status: AdmissionStatus;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  message: string;
  status: MessageStatus;
  created_at: string;
}

export interface SiteSettings {
  school_name: string;
  school_tagline: string;
  school_instagram: string;
  owner_name: string;
  owner_instagram: string;
  contact_email: string;
  admissions_open: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  youtube_channel: string;
}

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export type AlumniRow = Omit<Alumni, "movies">;

export interface SiteSettingRecord {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

type SupabaseGenericRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

type SupabaseGenericTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: SupabaseGenericRelationship[];
};

type SupabaseGenericView = {
  Row: Record<string, unknown>;
  Relationships: SupabaseGenericRelationship[];
};

type SupabaseGenericFunction = {
  Args: Record<string, unknown> | never;
  Returns: unknown;
};

type SupabaseGenericSchema = {
  Tables: Record<string, SupabaseGenericTable>;
  Views: Record<string, SupabaseGenericView>;
  Functions: Record<string, SupabaseGenericFunction>;
};

export type DatabasePublicSchema = SupabaseGenericSchema & {
  Tables: {
    admissions: {
      Row: Admission;
      Insert: {
        id?: string;
        full_name: string;
        email: string;
        phone: string;
        state_of_origin: string;
        age?: number | null;
        programme_interest: string;
        motivation: string;
        status?: AdmissionStatus;
        created_at?: string;
      };
      Update: {
        id?: string;
        full_name?: string;
        email?: string;
        phone?: string;
        state_of_origin?: string;
        age?: number | null;
        programme_interest?: string;
        motivation?: string;
        status?: AdmissionStatus;
        created_at?: string;
      };
      Relationships: [];
    };
    messages: {
      Row: ContactMessage;
      Insert: {
        id?: string;
        full_name: string;
        email: string;
        message: string;
        status?: MessageStatus;
        created_at?: string;
      };
      Update: {
        id?: string;
        full_name?: string;
        email?: string;
        message?: string;
        status?: MessageStatus;
        created_at?: string;
      };
      Relationships: [];
    };
    alumni: {
      Row: AlumniRow;
      Insert: {
        id?: string;
        full_name: string;
        stage_name?: string | null;
        avatar_url?: string | null;
        bio?: string;
        graduation_year?: number | null;
        current_role?: string;
        social_instagram?: string | null;
        is_featured?: boolean;
        created_at?: string;
      };
      Update: {
        id?: string;
        full_name?: string;
        stage_name?: string | null;
        avatar_url?: string | null;
        bio?: string;
        graduation_year?: number | null;
        current_role?: string;
        social_instagram?: string | null;
        is_featured?: boolean;
        created_at?: string;
      };
      Relationships: [];
    };
    alumni_movies: {
      Row: AlumniMovie;
      Insert: {
        id?: string;
        alumni_id: string;
        movie_title: string;
        year?: number | null;
        poster_url?: string | null;
        youtube_trailer_id?: string | null;
        role?: string;
        created_at?: string;
      };
      Update: {
        id?: string;
        alumni_id?: string;
        movie_title?: string;
        year?: number | null;
        poster_url?: string | null;
        youtube_trailer_id?: string | null;
        role?: string;
        created_at?: string;
      };
      Relationships: [
        {
          foreignKeyName: "alumni_movies_alumni_id_fkey";
          columns: ["alumni_id"];
          isOneToOne: false;
          referencedRelation: "alumni";
          referencedColumns: ["id"];
        },
      ];
    };
    gallery_items: {
      Row: GalleryItem;
      Insert: {
        id?: string;
        type?: "photo" | "video";
        url: string;
        thumbnail_url?: string | null;
        caption?: string | null;
        category?: GalleryCategory;
        created_at?: string;
      };
      Update: {
        id?: string;
        type?: "photo" | "video";
        url?: string;
        thumbnail_url?: string | null;
        caption?: string | null;
        category?: GalleryCategory;
        created_at?: string;
      };
      Relationships: [];
    };
    movies: {
      Row: Movie;
      Insert: {
        id?: string;
        title: string;
        year?: number | null;
        genre?: string | null;
        description?: string | null;
        poster_url?: string | null;
        youtube_trailer_id?: string | null;
        platform?: MoviePlatform | null;
        role?: MovieRole[];
        is_featured?: boolean;
        created_at?: string;
      };
      Update: {
        id?: string;
        title?: string;
        year?: number | null;
        genre?: string | null;
        description?: string | null;
        poster_url?: string | null;
        youtube_trailer_id?: string | null;
        platform?: MoviePlatform | null;
        role?: MovieRole[];
        is_featured?: boolean;
        created_at?: string;
      };
      Relationships: [];
    };
    site_settings: {
      Row: SiteSettingRecord;
      Insert: {
        id?: string;
        key: string;
        value: string;
        updated_at?: string;
      };
      Update: {
        id?: string;
        key?: string;
        value?: string;
        updated_at?: string;
      };
      Relationships: [];
    };
  };
  Views: {
    [_ in never]: never;
  };
  Functions: {
    [_ in never]: never;
  };
  Enums: {
    [_ in never]: never;
  };
  CompositeTypes: {
    [_ in never]: never;
  };
};

export interface Database {
  public: DatabasePublicSchema;
}

export const NIGERIAN_STATES: string[] = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory (FCT)",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const VIDEO_IDS: Record<string, string> = {
  koleoso_pt1: "tWRZyt1tsas",
  koleoso_pt2: "ykoeiZQHvKw",
  koleoso_pt3: "fBRwXSOlwwc",
  koleoso_pt7_s2: "xjmvSvJTGG4",
  koleoso_pt9_s2: "XxEt73TflBA",
  koleoso_best_scenes: "YvhYf17tsa4",
  jagun_jagun: "WU6MwBs3mzs",
  lord_kesari: "SSzqdOJ5ZfQ",
  general_kesari: "fPwh56bMVaI",
  ija_ninu_ghetto: "p4JRAAUvusc",
};

export function getYTThumbnail(
  videoId: string,
  quality: "max" | "hq" | "mq" = "max",
): string {
  const q: string = quality === "hq" ? "hqdefault" : quality === "mq" ? "mqdefault" : "maxresdefault";

  return `https://img.youtube.com/vi/${videoId}/${q}.jpg`;
}