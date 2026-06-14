import type { Alumni, AlumniMovie, GalleryItem, Movie, SiteSettings } from "@/lib/types";
import { VIDEO_IDS, getYTThumbnail } from "@/lib/types";

export interface FeatureStat {
  label: string;
  value: string;
}

export interface Programme {
  curriculum: string[];
  description: string;
  detailedDescription: string[];
  duration: string;
  heroImage: string;
  idealFor: string;
  learningOutcomes: string[];
  name: string;
  slug: string;
  summary: string;
  value: string;
}

export interface TimelineItem {
  description: string;
  title: string;
  year: string;
}

export interface ReasonItem {
  description: string;
  title: string;
}

export interface FAQItem {
  answer: string;
  question: string;
}

export interface ContactLink {
  href: string;
  label: string;
  value: string;
}

export interface FounderRecognition {
  award: string;
  awardUrl?: string;
  category: string;
  film?: string;
  filmUrl?: string;
  result: "Nominated" | "Won";
  year: string;
}

export const OWNER_YOUTUBE_URL: string = "http://www.youtube.com/@itelediconstudio";

function createMovie(movie: Omit<Movie, "created_at"> & { created_at?: string }): Movie {
  return {
    created_at: movie.created_at ?? "2026-01-01T00:00:00.000Z",
    ...movie,
  };
}

function createAlumniMovie(movie: Omit<AlumniMovie, "created_at"> & { created_at?: string }): AlumniMovie {
  return {
    created_at: movie.created_at ?? "2026-01-01T00:00:00.000Z",
    ...movie,
  };
}

function createAlumnus(alumnus: Omit<Alumni, "created_at"> & { created_at?: string }): Alumni {
  return {
    created_at: alumnus.created_at ?? "2026-01-01T00:00:00.000Z",
    ...alumnus,
  };
}

function createGalleryItem(item: Omit<GalleryItem, "created_at"> & { created_at?: string }): GalleryItem {
  return {
    created_at: item.created_at ?? "2026-01-01T00:00:00.000Z",
    ...item,
  };
}

export const SITE_SETTINGS_FALLBACK: SiteSettings = {
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

export const HOME_STATS: FeatureStat[] = [
  { value: "25+", label: "Years in Film" },
  { value: "200+", label: "Students Trained" },
  { value: "15+", label: "Awards" },
  { value: "50+", label: "Productions" },
];

export const PROGRAMMES: Programme[] = [
  {
    name: "Acting & Performance",
    value: "Acting & Performance",
    slug: "acting-and-performance",
    heroImage: "/media/programmes/acting-on-set-hero.jpg",
    summary: "Train your screen presence, emotional range, diction, blocking, and camera awareness.",
    description:
      "Students build disciplined performance habits through scene study, character work, improvisation, and live on-set rehearsal built around Yoruba film storytelling.",
    detailedDescription: [
      "Acting at D'Icon School is not about theory — it is about doing. From the first week, students are placed in front of cameras, on marks, and inside scenes that demand real emotional commitment. This is how Ibrahim Yekini (Itele D'Icon) himself trained, and this is how every graduate of this programme learns to perform.",
      "The programme is rooted in the tradition of Yoruba screen performance — a tradition that values intense emotion, physical command, expressive diction, and audience connection. Students study under the direct guidance of Itele and his working collaborators, rehearsing scenes drawn from actual productions and original material.",
      "Class sessions are structured around scene study, character analysis, improvisation drills, and blocking exercises. Students are expected to come prepared, stay disciplined, and push beyond comfort zones. Live rehearsal recordings are reviewed for feedback, and every student performs in at least one production-grade scene before completing the programme.",
    ],
    curriculum: [
      "Scene study and character development",
      "Yoruba diction, tone, and vocal projection",
      "On-camera blocking and spatial awareness",
      "Emotional range and method acting techniques",
      "Improvisation and spontaneous performance",
      "Movement, physicality, and stage combat basics",
      "Rehearsal discipline and script breakdown",
      "Working with directors — taking and executing notes",
    ],
    learningOutcomes: [
      "Deliver emotionally grounded performances on camera",
      "Break down scripts and build layered characters independently",
      "Execute blocking, marks, and camera-aware movement",
      "Maintain rehearsal discipline and professional conduct on set",
      "Perform under pressure in live and recorded environments",
      "Collaborate effectively with directors, cast, and crew",
    ],
    duration: "2 Years",
    idealFor: "Aspiring actors with or without prior experience who are ready to commit fully to disciplined performance training in the Yoruba film tradition. Serious applicants only — passion and dedication are non-negotiable.",
  },
  {
    name: "Scriptwriting",
    value: "Scriptwriting",
    slug: "scriptwriting",
    heroImage: "/media/programmes/founder-directing-with-script.jpg",
    summary: "Develop compelling Yoruba stories with commercial pull and cultural depth.",
    description:
      "From logline to final draft, writers are guided through structure, dialogue, pacing, and how to shape scripts that can move directly into production.",
    detailedDescription: [
      "A great Yoruba film starts with a great story. The Scriptwriting programme at D'Icon School trains writers to develop original screenplays that can move directly from the page to production — stories with cultural resonance, commercial viability, and emotional truth.",
      "Students learn the craft of screenplay structure, scene construction, dialogue that sounds natural to Yoruba audiences, and the pacing required to hold attention across feature-length and series formats. The programme draws on the storytelling traditions that have powered the biggest hits in Yoruba cinema.",
      "Every writer completes the programme with at least one production-ready screenplay and practical experience in script-to-screen collaboration, having worked alongside directors and actors in the D'Icon training environment.",
    ],
    curriculum: [
      "Story concept development and logline writing",
      "Three-act structure and screenplay formatting",
      "Dialogue craft — authenticity, rhythm, and subtext",
      "Character arcs and ensemble writing",
      "Scene-level construction and pacing",
      "Adapting stories for series vs. feature formats",
      "Working with directors — script-to-screen translation",
      "Revision, feedback, and rewriting discipline",
    ],
    learningOutcomes: [
      "Write production-ready screenplays in standard format",
      "Develop original stories with cultural depth and audience appeal",
      "Craft dialogue that is natural, impactful, and performance-ready",
      "Structure narratives for both feature films and episodic series",
      "Collaborate with directors and actors during script development",
      "Receive and incorporate professional-level creative feedback",
    ],
    duration: "2 Years",
    idealFor: "Storytellers, aspiring screenwriters, and creatives who want to write for Yoruba cinema. Whether you write fiction, poetry, or have never written before — if you have stories to tell, this programme will give you the craft to tell them professionally.",
  },
  {
    name: "Film Directing",
    value: "Film Directing",
    slug: "film-directing",
    heroImage: "/media/programmes/film-directing-hero.jpg",
    summary: "Learn to lead actors, visualise scenes, and translate story into screen language.",
    description:
      "Directing students study coverage, tone, performance notes, shot planning, and the practical decisions needed to run a working set with confidence.",
    detailedDescription: [
      "Directing is leadership. At D'Icon School, directing students learn not just the technical language of cinema — shot sizes, coverage patterns, editing rhythms — but the human skill of drawing truthful performances from actors and keeping a production moving with clarity and control.",
      "Ibrahim Yekini's approach to directing is hands-on and production-tested. Students study the decisions that shape real shoots: how to set tone, how to communicate with actors, how to plan coverage that serves the story, and how to make confident choices under pressure.",
      "By the end of the programme, every directing student has led at least one multi-scene production exercise, working with real actors, real crew, and real deadlines. This is where the abstract becomes practical — and where future filmmakers find their voice.",
    ],
    curriculum: [
      "Director's vision — tone, mood, and visual storytelling",
      "Shot planning, coverage strategies, and storyboarding",
      "Working with actors — performance notes and rehearsal direction",
      "Blocking and staging for camera",
      "On-set leadership and crew communication",
      "Continuity, pacing, and editorial thinking",
      "Directing for different genres — drama, action, epic",
      "Post-production awareness for directors",
    ],
    learningOutcomes: [
      "Translate a written script into a clear visual plan",
      "Direct actors with specific, actionable performance notes",
      "Plan and execute coverage for multi-scene sequences",
      "Lead a set with confidence, clarity, and professional authority",
      "Make creative decisions under time and budget pressure",
      "Collaborate with writers, producers, and editors effectively",
    ],
    duration: "2 Years",
    idealFor: "Aspiring filmmakers who want to tell stories through the camera. Whether you come from acting, writing, or have no prior industry experience, this programme is for those who are ready to take creative command of a production.",
  },
  {
    name: "Film Production",
    value: "Film Production",
    slug: "film-production",
    heroImage: "/media/programmes/production-crew-on-set.jpg",
    summary: "Understand budgeting, scheduling, crew coordination, and the realities of finishing a film.",
    description:
      "This track prepares students to move projects from idea to release through strong planning, set organisation, post-production awareness, and distribution thinking.",
    detailedDescription: [
      "Every great film needs someone who can get it made. The Film Production programme at D'Icon School trains the planners, coordinators, and creative producers who turn scripts into finished products — on time, on budget, and at a standard audiences will respect.",
      "Students learn the full production cycle: pre-production planning, budgeting, scheduling, location scouting, crew coordination, on-set management, and the basics of post-production and distribution. The programme is built around the realities of Nigerian filmmaking — resourceful, fast-moving, and commercially minded.",
      "By completion, production students have managed at least one end-to-end project exercise, coordinating cast, crew, and logistics under real-world constraints. This is the programme for people who want to build the infrastructure that makes great films possible.",
    ],
    curriculum: [
      "Pre-production planning and project management",
      "Budgeting, cost control, and resource allocation",
      "Scheduling and call-sheet creation",
      "Location scouting and logistics coordination",
      "On-set production management and crew leadership",
      "Post-production workflow — editing, sound, and delivery",
      "Distribution strategy — cinema, streaming, and YouTube",
      "Legal basics — contracts, rights, and talent agreements",
    ],
    learningOutcomes: [
      "Plan and manage a film production from concept to delivery",
      "Create realistic budgets and production schedules",
      "Coordinate cast, crew, and locations with professional efficiency",
      "Manage on-set operations under real-time pressure",
      "Understand post-production pipelines and delivery formats",
      "Think commercially about distribution and audience reach",
    ],
    duration: "2 Years",
    idealFor: "Organisers, planners, and business-minded creatives who want to work behind the scenes in Yoruba cinema. If you care about getting things done right, managing teams, and making films happen — this is your track.",
  },
];

export const WHY_DICON_REASONS: ReasonItem[] = [
  {
    title: "Taught by a working Nollywood star",
    description: "Students learn from an active actor, filmmaker, and producer who continues to shape contemporary Yoruba cinema.",
  },
  {
    title: "Real production experience",
    description: "Training goes beyond classroom theory, with practical exposure to working productions, rehearsal discipline, and camera-ready performance.",
  },
  {
    title: "A legacy that multiplies",
    description: "Graduates have gone on to lead their own institutions, headline major series, and carry the school's influence forward.",
  },
];

export const SCHOOL_FAQS: FAQItem[] = [
  {
    question: "What is the duration of the programme?",
    answer:
      "Programme length varies by intake and specialisation, but each cohort is designed around intensive practical training, rehearsal, and production experience.",
  },
  {
    question: "What is the minimum age requirement?",
    answer:
      "Applicants should be at least 16 years old and ready to commit to a disciplined learning environment centred on professional film practice.",
  },
  {
    question: "Do I need prior acting experience?",
    answer:
      "No. D'Icon School accepts both emerging talent and developing professionals, provided they demonstrate commitment, discipline, and a serious career intention.",
  },
  {
    question: "Is there a certificate upon completion?",
    answer:
      "Students receive recognition for completing their programme, but the strongest credential remains the practical work, performance readiness, and professional exposure gained.",
  },
  {
    question: "How do I apply?",
    answer:
      "Complete the admission form online, provide your motivation and career goals, and the school will review your submission before contacting you.",
  },
];

export const FOUNDER_BIO_PARAGRAPHS: string[] = [
  "Ibrahim Yekini, widely known as Itele D'Icon, is one of the defining faces of contemporary Yoruba Nollywood. His career blends screen performance, production leadership, directing discipline, and a long-term commitment to developing younger talent.",
  "He joined the Folorunsho Adejobi Theatre Group in Iju Ishaga in 1998, where he absorbed the discipline of live performance, rehearsal culture, and Yoruba dramatic tradition. Those early years shaped the command and intensity that later became his screen identity.",
  "By 2000 he made his first film appearance in Dapo Tori Ti E, and by 2004 he had produced Itele, the project that gave rise to the stage name that has stayed with him ever since. His breakthrough continued with Ekun Meta in 2006, while he deepened his directing education under Don Richard.",
  "Kesari in 2018 established him as a major action figure in Nollywood, and Return of Kesari in 2019 demonstrated the full range of his ambition as writer, director, producer, and actor. In 2020 his performance in Lucifer earned the BON Best Actor in Lead Role honour.",
  "His influence widened again with Jagun Jagun on Netflix in 2023 and the record-breaking Koleoso phenomenon in 2025. Alongside those productions, he built D'Icon School of Performing Arts to ensure that the next generation of Yoruba talent receives real industry preparation, not empty prestige.",
];

export const FOUNDER_RECOGNITIONS: FounderRecognition[] = [
  {
    year: "2019",
    award: "City People Entertainment Awards",
    awardUrl: "https://en.wikipedia.org/wiki/City_People_Entertainment_Awards",
    category: "Producer of the Year",
    film: "Kesari",
    filmUrl: "https://en.wikipedia.org/wiki/Kesari_(2018_film)",
    result: "Won",
  },
  {
    year: "2019",
    award: "City People Entertainment Awards",
    awardUrl: "https://en.wikipedia.org/wiki/City_People_Entertainment_Awards",
    category: "Best Movie of the Year",
    film: "Kesari",
    filmUrl: "https://en.wikipedia.org/wiki/Kesari_(2018_film)",
    result: "Won",
  },
  {
    year: "2019",
    award: "Best of Nollywood Awards",
    awardUrl: "https://en.wikipedia.org/wiki/Best_of_Nollywood_Awards",
    category: "Best Actor in a Lead Role",
    film: "Return of Kesari",
    result: "Won",
  },
  {
    year: "2020",
    award: "Best of Nollywood Awards",
    awardUrl: "https://en.wikipedia.org/wiki/Best_of_Nollywood_Awards",
    category: "Best Actor in a Lead Role (Yoruba)",
    film: "Lucifer",
    result: "Won",
  },
  {
    year: "2024",
    award: "Africa Magic Viewers' Choice Awards",
    awardUrl: "https://en.wikipedia.org/wiki/2024_Africa_Magic_Viewers%27_Choice_Awards",
    category: "Best Supporting Actor",
    film: "Jagun Jagun",
    filmUrl: "https://en.wikipedia.org/wiki/Jagun_Jagun",
    result: "Nominated",
  },
  {
    year: "2025",
    award: "Emperor Awards",
    category: "Nollywood Producer of the Year",
    film: "Koleoso",
    result: "Won",
  },
];

export const FOUNDER_QUOTE: string = "I always want my students to go higher than me.";

export const FOUNDER_IMAGE_PATH: string = "/media/founder/ibrahim-yekini.jpg";

export const CAREER_TIMELINE: TimelineItem[] = [
  {
    year: "1998",
    title: "Joined Folorunsho Adejobi Theatre Group",
    description: "Began formal stage work in Iju Ishaga and built the performance discipline that shaped his screen presence.",
  },
  {
    year: "2000",
    title: "First film appearance - Dapo Tori Ti E",
    description: "Entered film with a performance that marked the beginning of his Nollywood screen journey.",
  },
  {
    year: "2004",
    title: "First production as producer - Itele",
    description: "Produced the film that gave birth to the name Itele, now recognised across Yoruba cinema.",
  },
  {
    year: "2006",
    title: "Ekun Meta breakthrough",
    description: "Expanded his industry standing while learning directing craft from Don Richard.",
  },
  {
    year: "2018",
    title: "Kesari established a screen identity",
    description: "Became firmly recognised as a commanding Nollywood action lead.",
  },
  {
    year: "2019",
    title: "Return of Kesari",
    description: "Wrote, directed, and produced the film, proving full-spectrum creative authorship.",
  },
  {
    year: "2020",
    title: "BON Best Actor in Lead Role",
    description: "Won the award for Lucifer, confirming both commercial impact and performance depth.",
  },
  {
    year: "2023",
    title: "Jagun Jagun on Netflix",
    description: "Played Gbogunmi in the Netflix Yoruba epic and reached an even wider international audience.",
  },
  {
    year: "2025",
    title: "Koleoso cultural breakout",
    description: "Koleoso became the #1 most searched Nigerian series on Google in 2025 and elevated the Iteledicon Studio brand.",
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: "Instagram",
    value: "@dicon_schoolofpfa",
    href: "https://instagram.com/dicon_schoolofpfa",
  },
  {
    label: "Owner Instagram",
    value: "@iteledicon01",
    href: "https://instagram.com/iteledicon01",
  },
  {
    label: "YouTube",
    value: "Iteledicon Studio",
    href: OWNER_YOUTUBE_URL,
  },
];

export const PROGRAMME_INTERESTS: string[] = PROGRAMMES.map((programme: Programme): string => programme.value);

export const PROGRAMME_SLUGS: string[] = PROGRAMMES.map((programme: Programme): string => programme.slug);

export function getProgrammeBySlug(slug: string): Programme | undefined {
  return PROGRAMMES.find((programme: Programme): boolean => programme.slug === slug);
}

export const REFERRAL_SOURCES: string[] = [
  "Instagram",
  "Facebook",
  "YouTube",
  "Friend or Family",
  "Google Search",
  "Other",
];

export const FALLBACK_MOVIES: Movie[] = [
  createMovie({ id: "dapo-tori-ti-e", title: "Dapo Tori Ti E", year: 2000, genre: "Drama", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor"], is_featured: false }),
  createMovie({ id: "oro-abere", title: "Oro Abere", year: 2005, genre: "Drama", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor"], is_featured: false }),
  createMovie({ id: "itele", title: "Itele", year: 2004, genre: "Action", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor", "Producer"], is_featured: false }),
  createMovie({ id: "ekun-meta", title: "Ekun Meta", year: 2006, genre: "Action", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor", "Producer"], is_featured: false }),
  createMovie({ id: "kesari", title: "Kesari", year: 2018, genre: "Action", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor", "Producer"], is_featured: true }),
  createMovie({ id: "lucifer", title: "Lucifer", year: 2019, genre: "Drama", description: "BON Award Best Actor in Lead Role 2020", poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor"], is_featured: true }),
  createMovie({ id: "return-of-kesari", title: "Return of Kesari", year: 2019, genre: "Action", description: "Itele's signature work - wrote, directed, and produced.", poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor", "Director", "Producer", "Writer"], is_featured: true }),
  createMovie({ id: "anini", title: "Anini", year: null, genre: "Action", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor", "Writer"], is_featured: false }),
  createMovie({ id: "akoba", title: "Akoba", year: null, genre: "Action", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor", "Writer"], is_featured: false }),
  createMovie({ id: "president-kuti", title: "President Kuti", year: 2021, genre: "Drama", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Director", "Producer"], is_featured: false }),
  createMovie({ id: "oba-bi-olorun", title: "Oba Bi Olorun", year: 2021, genre: "Drama", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor"], is_featured: false }),
  createMovie({ id: "romeo", title: "Romeo", year: 2022, genre: "Drama", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor", "Director"], is_featured: false }),
  createMovie({ id: "jagun-jagun", title: "Jagun Jagun", year: 2023, genre: "Epic/Action", description: "Netflix Yoruba epic - Itele plays Gbogunmi.", poster_url: null, youtube_trailer_id: VIDEO_IDS.jagun_jagun, platform: "Netflix", role: ["Actor"], is_featured: true }),
  createMovie({ id: "kesari-the-king", title: "Késárí: The King", year: 2023, genre: "Action", description: "Continuation of the Kesari franchise.", poster_url: null, youtube_trailer_id: VIDEO_IDS.lord_kesari, platform: "YouTube", role: ["Actor", "Producer"], is_featured: true }),
  createMovie({ id: "father-abraham", title: "Father Abraham", year: 2023, genre: "Drama", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor"], is_featured: false }),
  createMovie({ id: "world-famous", title: "World Famous", year: 2023, genre: "Drama", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor"], is_featured: false }),
  createMovie({ id: "dolapo-douglas", title: "Dolapo Douglas", year: 2024, genre: "Drama", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor", "Director"], is_featured: false }),
  createMovie({ id: "a-tribe-called-judah", title: "A Tribe Called Judah", year: 2024, genre: "Action", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor"], is_featured: false }),
  createMovie({ id: "for-my-area", title: "For My Area", year: 2024, genre: "Action", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor", "Director"], is_featured: false }),
  createMovie({ id: "lisabi-the-uprising", title: "Lisabi: The Uprising", year: 2024, genre: "Historical", description: null, poster_url: null, youtube_trailer_id: null, platform: "Netflix", role: ["Actor"], is_featured: false }),
  createMovie({ id: "koleoso", title: "Koleoso", year: 2025, genre: "Supernatural/Drama", description: "#1 Most Searched Nigerian Series - Google Year in Search 2025. 10+ parts, Iteledicon Studio YouTube.", poster_url: null, youtube_trailer_id: VIDEO_IDS.koleoso_pt1, platform: "YouTube", role: ["Actor", "Director", "Producer"], is_featured: true }),
  createMovie({ id: "apaara-the-outcast", title: "Apaara: The Outcast", year: 2025, genre: "Action", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor"], is_featured: false }),
  createMovie({ id: "iyawo-alhaji", title: "Iyawo Alhaji", year: 2025, genre: "Comedy", description: null, poster_url: null, youtube_trailer_id: null, platform: "YouTube", role: ["Actor"], is_featured: false }),
];

const kemityMovies: AlumniMovie[] = [
  createAlumniMovie({ id: "kemity-koleoso", alumni_id: "kemity", movie_title: "Koleoso", year: 2025, poster_url: null, youtube_trailer_id: VIDEO_IDS.koleoso_pt1, role: "Actress" }),
  createAlumniMovie({ id: "kemity-general-kesari", alumni_id: "kemity", movie_title: "General Kesari / Koleoso", year: 2025, poster_url: null, youtube_trailer_id: VIDEO_IDS.general_kesari, role: "Actress" }),
  createAlumniMovie({ id: "kemity-koleoso-2", alumni_id: "kemity", movie_title: "Koleoso Part 2", year: 2025, poster_url: null, youtube_trailer_id: VIDEO_IDS.koleoso_pt2, role: "Actress" }),
  createAlumniMovie({ id: "kemity-koleoso-3", alumni_id: "kemity", movie_title: "Koleoso Part 3", year: 2025, poster_url: null, youtube_trailer_id: VIDEO_IDS.koleoso_pt3, role: "Actress" }),
  createAlumniMovie({ id: "kemity-ija-ninu-ghetto", alumni_id: "kemity", movie_title: "Ija Ninu Ghetto", year: 2025, poster_url: null, youtube_trailer_id: VIDEO_IDS.ija_ninu_ghetto, role: "Actress" }),
];

const ogbolukeMovies: AlumniMovie[] = [
  createAlumniMovie({ id: "ogboluke-koleoso", alumni_id: "ogboluke", movie_title: "Koleoso", year: 2025, poster_url: null, youtube_trailer_id: VIDEO_IDS.koleoso_pt1, role: "Actor/Director" }),
  createAlumniMovie({ id: "ogboluke-koleoso-s2p7", alumni_id: "ogboluke", movie_title: "Koleoso Part 7 Season 2", year: 2025, poster_url: null, youtube_trailer_id: VIDEO_IDS.koleoso_pt7_s2, role: "Actor" }),
];

const efunMovies: AlumniMovie[] = [
  createAlumniMovie({ id: "efun-koleoso", alumni_id: "efun", movie_title: "Koleoso", year: 2025, poster_url: null, youtube_trailer_id: VIDEO_IDS.koleoso_pt1, role: "Actor" }),
  createAlumniMovie({ id: "efun-koleoso-s2p7", alumni_id: "efun", movie_title: "Koleoso Part 7 Season 2", year: 2025, poster_url: null, youtube_trailer_id: VIDEO_IDS.koleoso_pt7_s2, role: "Actor" }),
  createAlumniMovie({ id: "efun-koleoso-s2p9", alumni_id: "efun", movie_title: "Koleoso Part 9 Season 2", year: 2025, poster_url: null, youtube_trailer_id: VIDEO_IDS.koleoso_pt9_s2, role: "Actor" }),
];

export const FALLBACK_ALUMNI: Alumni[] = [
  createAlumnus({
    id: "kemity",
    full_name: "Ariyo Oluwakemisola Apesin",
    stage_name: "Kemity",
    avatar_url: null,
    bio: "Kemity is Itele D'Icon's first and most celebrated student. She served as his apprentice for 8-10 years, supporting him through his toughest times. She is now a successful Yoruba Nollywood actress in her own right and has founded her own institution - Kemity School of Performing Film Arts - continuing the legacy of D'Icon School into the next generation. In 2025 she starred in the record-breaking Koleoso series.",
    graduation_year: null,
    current_role: "Actress, Filmmaker, School Founder",
    social_instagram: "@kemity",
    is_featured: true,
    movies: kemityMovies,
  }),
  createAlumnus({
    id: "ogboluke",
    full_name: "Saliu Gbolagade",
    stage_name: "Ogboluke",
    avatar_url: null,
    bio: "A veteran Yoruba Nollywood actor and director whose decades of industry experience found new heights in 2025. His role in Itele's Koleoso series earned him the prestigious Legendary Award and Outstanding Performance recognition at the OAFP Awards 2025 in Abeokuta, where he also received a N1.5 million naira cash gift from the industry in tribute.",
    graduation_year: null,
    current_role: "Actor, Director",
    social_instagram: "@ogboluke",
    is_featured: true,
    movies: ogbolukeMovies,
  }),
  createAlumnus({
    id: "omo-tolani",
    full_name: "Omo T'olani Odobodo",
    stage_name: "Omo T'olani",
    avatar_url: null,
    bio: "A talented Yoruba Nollywood actress who trained under Ibrahim Yekini (Itele D'Icon) at D'Icon School of Performing Arts. She has gone on to build an active career in Yoruba cinema, appearing in multiple productions.",
    graduation_year: null,
    current_role: "Actress",
    social_instagram: null,
    is_featured: false,
    movies: [],
  }),
  createAlumnus({
    id: "niyi-baker",
    full_name: "Niyi B. Baker",
    stage_name: "Niyi Baker",
    avatar_url: null,
    bio: "Niyi B. Baker is a Yoruba Nollywood actor who trained at D'Icon School of Performing Arts under Ibrahim Yekini (Itele D'Icon). He has appeared in several Yoruba film productions, continuing to grow his craft in the industry.",
    graduation_year: null,
    current_role: "Actor",
    social_instagram: null,
    is_featured: false,
    movies: [],
  }),
  createAlumnus({
    id: "efun",
    full_name: "Akinfolarin Olamide",
    stage_name: "Efun",
    avatar_url: null,
    bio: "Akinfolarin Olamide, known on screen as Efun, is one of the breakout stars of the Koleoso (2025) franchise. He plays one of Koleoso's siblings in the supernatural epic, bringing fierce energy to the wizard family saga that became #1 Most Searched Nigerian Series on Google 2025.",
    graduation_year: null,
    current_role: "Actor",
    social_instagram: null,
    is_featured: true,
    movies: efunMovies,
  }),
];

export const FALLBACK_GALLERY_ITEMS: GalleryItem[] = [
  createGalleryItem({ id: "gallery-events-1", type: "photo", url: "/placeholders/gallery-events.svg", thumbnail_url: "/placeholders/gallery-events.svg", caption: "Premiere nights and public appearances that celebrate Yoruba cinema with cinematic grandeur.", category: "events" }),
  createGalleryItem({ id: "gallery-production-1", type: "photo", url: "/placeholders/gallery-production.svg", thumbnail_url: "/placeholders/gallery-production.svg", caption: "On-set production discipline where students observe blocking, lighting, and camera movement in practice.", category: "production" }),
  createGalleryItem({ id: "gallery-students-1", type: "photo", url: "/placeholders/gallery-students.svg", thumbnail_url: "/placeholders/gallery-students.svg", caption: "Students in rehearsal, building screen confidence, diction, and emotional command.", category: "students" }),
  createGalleryItem({ id: "gallery-awards-1", type: "photo", url: "/placeholders/gallery-awards.svg", thumbnail_url: "/placeholders/gallery-awards.svg", caption: "Award moments that reflect the standard the school expects from every graduate.", category: "awards" }),
  createGalleryItem({ id: "gallery-video-koleoso", type: "video", url: `https://www.youtube.com/watch?v=${VIDEO_IDS.koleoso_best_scenes}`, thumbnail_url: getYTThumbnail(VIDEO_IDS.koleoso_best_scenes), caption: "Koleoso highlights and dramatic best scenes from the Iteledicon Studio phenomenon.", category: "production" }),
  createGalleryItem({ id: "gallery-video-jagun", type: "video", url: `https://www.youtube.com/watch?v=${VIDEO_IDS.jagun_jagun}`, thumbnail_url: getYTThumbnail(VIDEO_IDS.jagun_jagun), caption: "Jagun Jagun trailer energy - mythic scale, bold costuming, and high-stakes Yoruba action.", category: "events" }),
  createGalleryItem({ id: "gallery-events-2", type: "photo", url: "/placeholders/gallery-events.svg", thumbnail_url: "/placeholders/gallery-events.svg", caption: "Community-facing appearances that connect the school with audiences and aspiring talent.", category: "events" }),
  createGalleryItem({ id: "gallery-students-2", type: "photo", url: "/placeholders/gallery-students.svg", thumbnail_url: "/placeholders/gallery-students.svg", caption: "Performance drills, camera rehearsal, and ensemble work for emerging actors.", category: "students" }),
  createGalleryItem({ id: "gallery-production-2", type: "photo", url: "/placeholders/gallery-production.svg", thumbnail_url: "/placeholders/gallery-production.svg", caption: "Directing and production mentorship shaped around real-set pressure and practical decision making.", category: "production" }),
  createGalleryItem({ id: "gallery-awards-2", type: "photo", url: "/placeholders/gallery-awards.svg", thumbnail_url: "/placeholders/gallery-awards.svg", caption: "Recognition for excellence, grit, and the quality of work demanded by the D'Icon standard.", category: "awards" }),
];