-- Leads captured by the contact form. Anonymous visitors may INSERT only; nobody can read
-- via the public anon key. Rachel reads leads in the Supabase dashboard (or a future admin page).
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 200),
  email text check (email is null or char_length(email) <= 320),
  phone text check (phone is null or char_length(phone) <= 40),
  looking_to text check (looking_to in ('buy','sell','both','not_sure')),
  family_needs text check (family_needs is null or char_length(family_needs) <= 4000),
  message text check (message is null or char_length(message) <= 4000),
  preferred_contact text check (preferred_contact in ('email','phone','text')),
  source text default 'website',
  status text not null default 'new' check (status in ('new','contacted','closed','spam'))
);
alter table public.leads enable row level security;
create policy "anon can submit leads" on public.leads
  for insert to anon with check (status = 'new');
-- no select/update/delete policies for anon => reads are blocked
