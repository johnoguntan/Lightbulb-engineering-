'use client';

import { createBrowserClient } from '@supabase/ssr';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/** True once the Supabase keys are set in .env.local. */
export const supabaseConfigured = Boolean(URL && KEY);

let client = null;

/** Browser Supabase client, or null until the keys are configured. */
export function getSupabase() {
  if (!supabaseConfigured) return null;
  if (!client) client = createBrowserClient(URL, KEY);
  return client;
}
