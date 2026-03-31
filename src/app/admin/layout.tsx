// src/app/admin/layout.tsx — Admin shell layout

import Link from 'next/link';
import { requireRole } from '@/lib/supabase/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole('admin', '/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-brand-mid/20 bg-brand-dark/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-[10px] uppercase tracking-widest text-brand-accent">Admin</span>
            <span className="text-brand-mid/40">·</span>
            <span className="font-display text-white text-sm">BDE MMI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-brand-light/50 text-xs hidden sm:block">{user.email}</span>
            <Link
              href="/"
              className="text-xs text-brand-light/50 hover:text-brand-light transition-colors duration-150"
            >
              ← Retour au site
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-5 md:px-8 py-10">
        {children}
      </main>
    </div>
  );
}
