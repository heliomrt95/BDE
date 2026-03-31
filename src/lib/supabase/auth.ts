// src/lib/supabase/auth.ts
// Server-side auth helpers — use in Server Components and Route Handlers.
// Avoids repeating the try/catch + redirect pattern in every protected page.

import { redirect } from 'next/navigation';
import { createClient } from './server';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User } from '@/types';

/**
 * Get the current authenticated user server-side.
 * Returns null if not authenticated or Supabase is not configured.
 */
export async function getServerUser(): Promise<SupabaseUser | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

/**
 * Require authentication — redirects to /login if not logged in.
 * Use at the top of any protected Server Component page.
 *
 * @example
 * export default async function AdminPage() {
 *   const user = await requireAuth('/admin');
 *   return <div>Hello {user.name}</div>;
 * }
 */
export async function requireAuth(redirectBack?: string): Promise<User> {
  const supabaseUser = await getServerUser();

  if (!supabaseUser) {
    const loginUrl = redirectBack
      ? `/admin?redirect=${encodeURIComponent(redirectBack)}`
      : '/admin';
    redirect(loginUrl);
  }

  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? '',
    name: supabaseUser.user_metadata?.name ?? supabaseUser.email ?? '',
    role: supabaseUser.user_metadata?.role ?? 'student',
  };
}

/**
 * Require a specific role — redirects to / if the user doesn't have it.
 *
 * @example
 * const user = await requireRole('admin', '/admin');
 */
export async function requireRole(
  role: 'student' | 'bde_member' | 'admin',
  redirectBack?: string,
): Promise<User> {
  const user = await requireAuth(redirectBack);

  if (user.role !== role && user.role !== 'admin') {
    redirect('/');
  }

  return user;
}
