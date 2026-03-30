// src/lib/supabase/client.ts
// Browser-side Supabase client (used in Client Components + hooks)

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Fill them in .env.local to enable Supabase.'
    );
  }

  return createBrowserClient(url, key);
}
