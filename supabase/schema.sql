-- Lightbulb Engineering — database schema
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Row Level Security means each customer can only ever see their own rows.

-- ORDERS ---------------------------------------------------------------------
-- Written only by the server (/api/orders/verify) after Paystack confirms payment.
create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  reference     text unique not null,              -- Paystack reference
  user_id       uuid references auth.users(id) on delete set null,
  email         text not null,
  status        text not null default 'paid',      -- paid | in_production | dispatched | delivered | cancelled
  items         jsonb not null,                    -- [{ slug, name, colour, monogram, quantity, unit_price }]
  subtotal      integer not null,                  -- naira
  delivery_fee  integer not null default 0,
  total         integer not null,
  delivery      jsonb not null,                    -- { method, name, phone, address, area }
  created_at    timestamptz not null default now()
);
alter table public.orders enable row level security;
drop policy if exists "Customers read own orders" on public.orders;
create policy "Customers read own orders" on public.orders
  for select using (auth.uid() = user_id);

-- ADDRESSES ------------------------------------------------------------------
create table if not exists public.addresses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade default auth.uid(),
  label       text not null default 'Home',
  name        text not null,
  phone       text not null,
  address     text not null,
  area        text not null,
  state       text not null default 'Lagos',
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);
alter table public.addresses enable row level security;
drop policy if exists "Customers manage own addresses" on public.addresses;
create policy "Customers manage own addresses" on public.addresses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- B2B QUOTE REQUESTS ----------------------------------------------------------
create table if not exists public.quote_requests (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete set null default auth.uid(),
  company     text,
  product     text not null,                       -- e.g. "Garment bags"
  quantity    integer not null,
  details     jsonb not null default '{}'::jsonb,
  status      text not null default 'received',    -- received | quoted | in_production | completed
  created_at  timestamptz not null default now()
);
alter table public.quote_requests enable row level security;
drop policy if exists "Customers read own quotes" on public.quote_requests;
create policy "Customers read own quotes" on public.quote_requests
  for select using (auth.uid() = user_id);
drop policy if exists "Signed-in customers create quotes" on public.quote_requests;
create policy "Signed-in customers create quotes" on public.quote_requests
  for insert with check (auth.uid() = user_id);
