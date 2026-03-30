-- Create events table for BDE MMI Bordeaux
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)

create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  date text not null,
  start_date timestamptz not null,
  end_date timestamptz,
  location text,
  category text not null check (category in ('bde', 'university', 'bordeaux')),
  image_url text,
  registration_url text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.events enable row level security;

-- Anyone can read events
create policy "Events are viewable by everyone"
  on public.events for select
  using (true);

-- Authenticated users can create events
create policy "Authenticated users can create events"
  on public.events for insert
  to authenticated
  with check (auth.uid() = created_by);

-- Creators can delete their own events
create policy "Users can delete their own events"
  on public.events for delete
  to authenticated
  using (auth.uid() = created_by);

-- Creators can update their own events
create policy "Users can update their own events"
  on public.events for update
  to authenticated
  using (auth.uid() = created_by);
