-- Run this on an existing Supabase project after schema.sql/bootstrap.sql was already applied.
-- Also ensure each real admin auth user has app_metadata {"is_admin": true}.

begin;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false);
$$;

drop policy if exists "Admin all movies" on movies;
drop policy if exists "Admin all alumni" on alumni;
drop policy if exists "Admin all alumni_movies" on alumni_movies;
drop policy if exists "Admin all gallery" on gallery_items;
drop policy if exists "Admin all admissions" on admissions;
drop policy if exists "Admin all settings" on site_settings;

do $$
begin
  if to_regclass('public.messages') is not null then
    execute 'drop policy if exists "Admin all messages" on messages';
    execute 'create policy "Admin all messages" on messages for all using (public.is_admin()) with check (public.is_admin())';
  end if;
end $$;

create policy "Admin all movies" on movies for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all alumni" on alumni for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all alumni_movies" on alumni_movies for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all gallery" on gallery_items for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all admissions" on admissions for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all settings" on site_settings for all using (public.is_admin()) with check (public.is_admin());

commit;