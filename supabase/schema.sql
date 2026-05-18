create extension if not exists pgcrypto;

create table movies (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  year int,
  genre text,
  description text,
  poster_url text,
  youtube_trailer_id text,
  platform text check (platform in ('YouTube', 'Netflix', 'Cinema')),
  role text[] default '{}',
  is_featured boolean default false,
  created_at timestamptz default now()
);

create table alumni (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  stage_name text,
  avatar_url text,
  bio text not null default '',
  graduation_year int,
  "current_role" text not null default '',
  social_instagram text,
  is_featured boolean default false,
  created_at timestamptz default now()
);

create table alumni_movies (
  id uuid default gen_random_uuid() primary key,
  alumni_id uuid references alumni(id) on delete cascade,
  movie_title text not null,
  year int,
  poster_url text,
  youtube_trailer_id text,
  role text not null default 'Actor',
  created_at timestamptz default now()
);

create table gallery_items (
  id uuid default gen_random_uuid() primary key,
  type text check (type in ('photo', 'video')) not null default 'photo',
  url text not null,
  thumbnail_url text,
  caption text,
  category text check (category in ('events', 'production', 'students', 'awards')) not null default 'events',
  created_at timestamptz default now()
);

create table admissions (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  state_of_origin text not null,
  age int,
  programme_interest text not null,
  motivation text not null,
  status text check (status in ('pending', 'reviewed', 'accepted', 'declined')) not null default 'pending',
  created_at timestamptz default now()
);

create table messages (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  message text not null,
  status text check (status in ('new', 'read', 'replied', 'archived')) not null default 'new',
  created_at timestamptz default now()
);

create table site_settings (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text not null,
  updated_at timestamptz default now()
);

alter table movies enable row level security;
alter table alumni enable row level security;
alter table alumni_movies enable row level security;
alter table gallery_items enable row level security;
alter table admissions enable row level security;
alter table messages enable row level security;
alter table site_settings enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false);
$$;

create policy "Public read movies" on movies for select using (true);
create policy "Public read alumni" on alumni for select using (true);
create policy "Public read alumni_movies" on alumni_movies for select using (true);
create policy "Public read gallery" on gallery_items for select using (true);
create policy "Public read settings" on site_settings for select using (true);
create policy "Anyone can apply" on admissions for insert with check (true);
create policy "Anyone can send messages" on messages for insert with check (true);
create policy "Admin all movies" on movies for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all alumni" on alumni for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all alumni_movies" on alumni_movies for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all gallery" on gallery_items for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all admissions" on admissions for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all messages" on messages for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all settings" on site_settings for all using (public.is_admin()) with check (public.is_admin());