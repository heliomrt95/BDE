// src/hooks/useAuth.ts
// Client-side hook: exposes current user, login, logout, and auth state.

'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { signIn, signOut } from '@/services/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip if Supabase is not configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email ?? '',
          name: authUser.user_metadata?.name ?? authUser.email ?? '',
          role: authUser.user_metadata?.role ?? 'student',
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? '',
            name: session.user.user_metadata?.name ?? session.user.email ?? '',
            role: session.user.user_metadata?.role ?? 'student',
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
    } catch {
      setError('Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await signOut();
    setUser(null);
  }

  return { user, loading, error, login, logout };
}
