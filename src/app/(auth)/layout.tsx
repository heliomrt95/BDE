// src/app/(auth)/layout.tsx
// Minimal layout for auth pages: no Header/Footer, centered card style

import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-5 py-12 bg-brand-dark relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(111,52,139,0.3) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden="true" />

      {/* Logo */}
      <Link href="/" className="relative z-10 mb-8 focus-brand rounded-sm">
        <span className="pixel-text text-pixel-xl text-brand-accent">BDE</span>
        <span className="text-small text-text-muted ml-2">MMI Bordeaux</span>
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
