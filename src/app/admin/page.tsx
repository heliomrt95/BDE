import type { Metadata } from 'next';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerUser } from '@/lib/supabase/auth';
import LoginForm from '@/components/features/auth/LoginForm';
import AdminDashboard from '@/components/features/admin/AdminDashboard';

export const metadata: Metadata = { title: 'Admin — BDE MMI' };

export default async function AdminPage() {
  const supabaseUser = await getServerUser();

  if (!supabaseUser) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-5 py-12 bg-brand-dark relative overflow-hidden">
        {/* Glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(111,52,139,0.45) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(111,52,139,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(111,52,139,0.6) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />
        {/* Logo */}
        <Link href="/" className="relative z-10 mb-8 flex items-center gap-2 focus-brand rounded-sm">
          <span className="pixel-text text-pixel-xl text-brand-accent">BDE</span>
          <span className="text-small text-text-muted">MMI Bordeaux</span>
        </Link>
        {/* Form */}
        <div className="relative z-10 w-full max-w-md">
          <Suspense>
            <LoginForm redirectTo="/admin" />
          </Suspense>
        </div>
        <p className="relative z-10 mt-8 text-caption text-text-muted">
          <Link href="/" className="hover:text-brand-accent transition-colors duration-fast focus-brand rounded-sm">
            ← Retour au site
          </Link>
        </p>
      </div>
    );
  }

  const role = supabaseUser.user_metadata?.role ?? 'student';
  if (role !== 'admin') redirect('/');

  const name = supabaseUser.user_metadata?.name ?? supabaseUser.email ?? '';
  return <AdminDashboard userName={name} />;
}
