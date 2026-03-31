-- Blog posts table
-- Run in Supabase SQL Editor (Dashboard > SQL Editor)

create table if not exists public.posts (
  id         uuid default gen_random_uuid() primary key,
  slug       text not null unique,
  title      text not null,
  excerpt    text,
  content    text not null default '',
  author     text not null default 'BDE MMI',
  tags       text[] default '{}',
  cover_image_url text,
  published_at    timestamptz default now(),
  created_at      timestamptz default now()
);

-- Enable Row Level Security
alter table public.posts enable row level security;

-- Anyone can read published posts
create policy "Posts are publicly readable"
  on public.posts for select
  using (published_at <= now());

-- Only authenticated users (admins/BDE members) can write
create policy "Authenticated users can insert posts"
  on public.posts for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update posts"
  on public.posts for update
  to authenticated
  using (true);

create policy "Authenticated users can delete posts"
  on public.posts for delete
  to authenticated
  using (true);

-- Index on slug for fast lookups
create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_published_at_idx on public.posts (published_at desc);
