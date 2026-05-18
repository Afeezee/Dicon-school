-- Run this on an existing Supabase project that already has admissions data.
-- It creates a dedicated messages table, migrates prior General Enquiry rows, and removes them from admissions.

begin;

create extension if not exists pgcrypto;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean, false);
$$;

create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  message text not null,
  status text check (status in ('new', 'read', 'replied', 'archived')) not null default 'new',
  created_at timestamptz default now()
);

alter table messages enable row level security;

drop policy if exists "Anyone can send messages" on messages;
drop policy if exists "Admin all messages" on messages;

create policy "Anyone can send messages" on messages for insert with check (true);
create policy "Admin all messages" on messages for all using (public.is_admin()) with check (public.is_admin());

insert into messages (id, full_name, email, message, status, created_at)
select
  admissions.id,
  admissions.full_name,
  admissions.email,
  admissions.motivation,
  case admissions.status
    when 'pending' then 'new'
    when 'reviewed' then 'read'
    when 'accepted' then 'replied'
    when 'declined' then 'archived'
  end,
  admissions.created_at
from admissions
where admissions.programme_interest = 'General Enquiry'
  and not exists (
    select 1
    from messages
    where messages.id = admissions.id
  );

delete from admissions
where programme_interest = 'General Enquiry';

commit;