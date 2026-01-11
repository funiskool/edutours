-- ================================
-- EXTENSIONS
-- ================================
create extension if not exists "pgcrypto";

-- ================================
-- ENUM TYPES
-- ================================
create type public.tour_status as enum ('draft', 'published', 'archived');
create type public.student_level as enum ('school', 'college', 'postgraduate');
create type public.tour_type as enum ('cultural-heritage', 'industrial-tour', 'adventure-learning', 'learning-camp');
create type public.booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
create type public.payment_status as enum ('pending', 'paid', 'refunded');

-- ================================
-- USERS / PROFILES
-- ================================
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text unique not null,
  role text check (role in ('admin', 'user')) default 'user',
  created_at timestamptz default now()
);


alter table public.user_profiles enable row level security;

create policy "user_read_own_profile"
on public.user_profiles
for select
to authenticated
using (auth.uid() = id);

create policy "user_insert_own_profile"
on public.user_profiles
for insert
to authenticated
with check (auth.uid() = id);

-- ================================
-- ADMIN CHECK FUNCTION
-- ================================
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from public.user_profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql stable;

-- ================================
-- TOURS
-- ================================
create table public.tours (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  destination text not null,
  duration text not null,
  description text,
  educational_focus text,
  student_level public.student_level not null,
  tour_type public.tour_type not null,
  status public.tour_status default 'draft',
  is_featured boolean default false,
  is_new boolean default false,
  rating numeric(2,1) default 0,
  review_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.tours enable row level security;

create policy "public_read_published_tours"
on public.tours
for select
to public
using (status = 'published');

create policy "admin_manage_tours"
on public.tours
for all
to authenticated
using (is_admin())
with check (is_admin());

-- ================================
-- TOUR IMAGES
-- ================================
create table public.tour_images (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid references public.tours(id) on delete cascade,
  image_url text not null,
  image_alt text,
  display_order int,
  created_at timestamptz default now()
);

alter table public.tour_images enable row level security;

create policy "public_read_images"
on public.tour_images
for select
to public
using (true);

create policy "admin_manage_images"
on public.tour_images
for all
to authenticated
using (is_admin())
with check (is_admin());

-- ================================
-- TOUR PRICING
-- ================================
create table public.tour_pricing (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid unique references public.tours(id) on delete cascade,
  individual_price numeric(10,2) not null,
  group_5_plus_price numeric(10,2),
  group_10_plus_price numeric(10,2),
  group_20_plus_price numeric(10,2),
  gst_percentage numeric(5,2) default 5.0
);

alter table public.tour_pricing enable row level security;

create policy "public_read_pricing"
on public.tour_pricing
for select
to public
using (true);

create policy "admin_manage_pricing"
on public.tour_pricing
for all
to authenticated
using (is_admin())
with check (is_admin());

-- ================================
-- SEO METADATA
-- ================================
create table public.seo_metadata (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid unique references public.tours(id) on delete cascade,
  page_title text,
  meta_description text,
  meta_keywords text[]
);

alter table public.seo_metadata enable row level security;

create policy "public_read_seo"
on public.seo_metadata
for select
to public
using (true);

create policy "admin_manage_seo"
on public.seo_metadata
for all
to authenticated
using (is_admin())
with check (is_admin());

-- ================================
-- BOOKINGS (USER LINKED)
-- ================================
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid references public.tours(id),
  user_id uuid references auth.users(id),
  reference_number text unique not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  group_size int not null,
  start_date date not null,
  end_date date not null,
  total_amount numeric(10,2) not null,
  payment_status public.payment_status default 'pending',
  booking_status public.booking_status default 'pending',
  created_at timestamptz default now()
);

alter table public.bookings enable row level security;

create policy "user_create_booking"
on public.bookings
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "user_read_own_booking"
on public.bookings
for select
to authenticated
using (auth.uid() = user_id);

create policy "admin_manage_bookings"
on public.bookings
for all
to authenticated
using (is_admin())
with check (is_admin());

-- ================================
-- INDEXES
-- ================================
create index on public.tours(status);
create index on public.bookings(user_id);
create index on public.bookings(reference_number);
