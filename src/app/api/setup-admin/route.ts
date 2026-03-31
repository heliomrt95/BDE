import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ONE-TIME endpoint — DELETE THIS FILE after use
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: 'Missing Supabase env vars' }, { status: 500 });
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await supabase.auth.signUp({
    email: 'admin@bde-mmi.fr',
    password: 'BdeMMI2026!',
    options: {
      data: { name: 'Admin BDE', role: 'admin' },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    userId: data.user?.id,
    email: data.user?.email,
    message: 'Admin account created. Check Supabase to confirm email if needed, then delete this file.',
  });
}
