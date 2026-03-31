// src/app/(auth)/layout.tsx
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-5 py-12 bg-brand-dark relative overflow-hidden">

      {/* Main glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(111,52,139,0.45) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      {/* Accent glow — bottom */}
      <div
        className="absolute bottom-0 right-0 w-[50%] h-[50%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 90%, rgba(255,214,10,0.05) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(111,52,139,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(111,52,139,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Floating pixel decorations */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="absolute top-[12%] left-[6%] pixel-text text-pixel-sm text-brand-mid/25 animate-glow-pulse">{'{ }'}</span>
        <span className="absolute top-[18%] right-[8%] pixel-text text-pixel-sm text-brand-accent/15 animate-glow-pulse" style={{ animationDelay: '1.2s' }}>&lt;/&gt;</span>
        <span className="absolute bottom-[18%] left-[10%] pixel-text text-pixel-sm text-brand-mid/20 animate-glow-pulse" style={{ animationDelay: '2s' }}>**</span>
        <div className="absolute bottom-[28%] right-[6%] w-2.5 h-2.5 bg-brand-accent/10 rotate-45 animate-glow-pulse" style={{ animationDelay: '0.7s' }} />
        <div className="absolute top-[45%] left-[3%] w-1.5 h-1.5 bg-brand-mid/20 rotate-45 animate-glow-pulse" style={{ animationDelay: '1.8s' }} />
      </div>

      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden="true" />

      {/* Logo */}
      <Link href="/" className="relative z-10 mb-8 flex items-center gap-2 group focus-brand rounded-sm">
        <span className="pixel-text text-pixel-xl text-brand-accent group-hover:animate-pixel-glitch">
          BDE
        </span>
        <span className="text-small text-text-muted">MMI Bordeaux</span>
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>

      {/* Back link */}
      <p className="relative z-10 mt-8 text-caption text-text-muted">
        <Link href="/" className="hover:text-brand-accent transition-colors duration-fast focus-brand rounded-sm">
          ← Retour au site
        </Link>
      </p>
    </div>
  );
}
