-- ============================================================
-- Supabase Schema for Nuxt Nitro App
-- Run this in your Supabase SQL Editor to create the tables
-- ============================================================

-- 1. Blog Posts Table
create table if not exists public.blog_posts (
  id bigint primary key generated always as identity,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null default '',
  category text not null,
  category_color text not null default 'green',
  author text not null default 'Alex',
  read_time int not null default 5,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add full-text search capability
alter table public.blog_posts add column if not exists search_vector tsvector
  generated always as (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, ''))) stored;

create index if not exists blog_posts_search_idx on public.blog_posts using gin(search_vector);
create index if not exists blog_posts_published_idx on public.blog_posts(published);
create index if not exists blog_posts_created_at_idx on public.blog_posts(created_at desc);

-- Auto-update updated_at
create extension if not exists moddatetime;
drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function moddatetime(updated_at);

-- 2. Contact Messages Table
create table if not exists public.contact_messages (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx on public.contact_messages(created_at desc);
create index if not exists contact_messages_is_read_idx on public.contact_messages(is_read);

-- 3. Blog Comments Table
create table if not exists public.blog_comments (
  id bigint primary key generated always as identity,
  post_id bigint not null references public.blog_posts(id) on delete cascade,
  author_name text not null,
  author_email text not null,
  content text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists blog_comments_post_id_idx on public.blog_comments(post_id, is_approved);
create index if not exists blog_comments_created_at_idx on public.blog_comments(created_at desc);

-- 4. Row Level Security
alter table public.blog_posts enable row level security;
alter table public.contact_messages enable row level security;
alter table public.blog_comments enable row level security;

-- Blog posts: public can read published posts, only service_role can write
create policy "public can read published blog posts"
  on public.blog_posts
  for select
  to anon
  using (published = true);

create policy "service_role can manage blog posts"
  on public.blog_posts
  for all
  to service_role
  using (true)
  with check (true);

-- Contact messages: anon can insert, only service_role can read/manage
create policy "public can submit contact messages"
  on public.contact_messages
  for insert
  to anon
  with check (true);

create policy "service_role can manage contact messages"
  on public.contact_messages
  for all
  to service_role
  using (true)
  with check (true);

-- Blog comments: anon can read approved comments
create policy "public can read approved comments"
  on public.blog_comments
  for select
  to anon
  using (is_approved = true);

create policy "public can submit comments"
  on public.blog_comments
  for insert
  to anon
  with check (true);

create policy "service_role can manage comments"
  on public.blog_comments
  for all
  to service_role
  using (true)
  with check (true);

-- 4. Seed Data (optional - sample blog posts)
insert into public.blog_posts (title, slug, excerpt, category, category_color, author, read_time, published, created_at) values
  ('Getting Started with Nuxt 4: A Comprehensive Guide', 'getting-started-nuxt-4', 'Learn how to set up your first Nuxt 4 project with the new directory structure, Nitro engine, and automatic imports.', 'Getting Started', 'green', 'Alex', 8, true, now() - interval '3 days'),
  ('Understanding the Nitro Engine in Nuxt 4', 'understanding-nitro-engine', 'Deep dive into the Nitro server engine that powers Nuxt 4. Learn about API routes, middleware, and hybrid rendering.', 'Nitro', 'blue', 'Sarah', 12, true, now() - interval '6 days'),
  ('Building Beautiful UIs with Nuxt UI v4', 'building-uis-nuxt-ui-v4', 'Explore the modern component library that comes with Nuxt UI v4 with Tailwind CSS v4 for stunning, accessible interfaces.', 'UI/UX', 'purple', 'Alex', 6, true, now() - interval '9 days'),
  ('Full-Stack Development with Nuxt 4 and Nitro', 'fullstack-nuxt-4-nitro', 'Combine the power of Vue frontend with Nitro backend to build complete full-stack applications.', 'Full-Stack', 'orange', 'Mike', 10, true, now() - interval '13 days'),
  ('TypeScript Best Practices for Nuxt Projects', 'typescript-best-practices-nuxt', 'Improve your Nuxt development experience with TypeScript. Learn about type-safe routes and auto-generated types.', 'TypeScript', 'indigo', 'Sarah', 7, true, now() - interval '16 days'),
  ('Deploying Nuxt 4 Applications to the Edge', 'deploying-nuxt-4-edge', 'Learn how to deploy your Nuxt 4 apps to edge networks for optimal performance worldwide.', 'Deployment', 'teal', 'Mike', 9, true, now() - interval '19 days')
  on conflict (slug) do nothing;
