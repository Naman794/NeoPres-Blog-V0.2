create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  bio text,
  avatar_url text,
  role text not null default 'author' check (role in ('admin', 'editor', 'author')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content jsonb not null default '{}'::jsonb,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  author_id uuid references profiles(id) on delete set null,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists homepage_sections (
  key text primary key,
  title text not null,
  is_enabled boolean not null default true,
  sort_order int not null default 0
);

create table if not exists homepage_items (
  section_key text not null references homepage_sections(key) on delete cascade,
  post_id uuid not null references posts(id) on delete cascade,
  rank int not null default 0,
  primary key (section_key, post_id)
);

create table if not exists ad_slots (
  key text primary key,
  label text not null,
  is_enabled boolean not null default true,
  html text,
  image_url text,
  target_url text,
  updated_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
before update on profiles
for each row
execute procedure set_updated_at();

create trigger posts_updated_at
before update on posts
for each row
execute procedure set_updated_at();

create trigger ad_slots_updated_at
before update on ad_slots
for each row
execute procedure set_updated_at();

alter table profiles enable row level security;
alter table posts enable row level security;
alter table homepage_sections enable row level security;
alter table homepage_items enable row level security;
alter table ad_slots enable row level security;

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function is_editor()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

create policy "Public profiles are viewable" on profiles
for select
using (true);

create policy "Admins manage profiles" on profiles
for all
using (is_admin())
with check (is_admin());

create policy "Public can read published posts" on posts
for select
using (
  status = 'published'
  and published_at is not null
  and published_at <= now()
  and is_hidden = false
);

create policy "Editors manage posts" on posts
for insert
with check (is_editor());

create policy "Editors update posts" on posts
for update
using (is_editor())
with check (is_editor());

create policy "Admins delete posts" on posts
for delete
using (is_admin());

create policy "Public read homepage sections" on homepage_sections
for select
using (is_enabled = true);

create policy "Admins manage homepage sections" on homepage_sections
for all
using (is_admin())
with check (is_admin());

create policy "Public read homepage items" on homepage_items
for select
using (
  exists (
    select 1 from posts
    where posts.id = homepage_items.post_id
      and posts.status = 'published'
      and posts.published_at is not null
      and posts.published_at <= now()
      and posts.is_hidden = false
  )
);

create policy "Admins manage homepage items" on homepage_items
for all
using (is_admin())
with check (is_admin());

create policy "Public read ad slots" on ad_slots
for select
using (is_enabled = true);

create policy "Admins manage ad slots" on ad_slots
for all
using (is_admin())
with check (is_admin());

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public read media" on storage.objects
for select
using (bucket_id = 'media');

create policy "Editors manage media" on storage.objects
for all
using (bucket_id = 'media' and is_editor())
with check (bucket_id = 'media' and is_editor());
