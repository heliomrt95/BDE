// src/components/features/home/SocialCta.tsx
// ─────────────────────────────────────────────────────
// Centered closing CTA — strong glow, memorable exit.
// ─────────────────────────────────────────────────────

'use client';

import { SITE_CONFIG } from '@/config/site';
import { cn } from '@/lib/utils/cn';
import { FadeIn } from '@/components/motion/ScrollReveal';

export default function SocialCta() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Glow background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(111,52,139,0.35) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mid/50 to-transparent" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 text-center">
        <FadeIn>
          <h2 className="font-display text-display-md text-white mb-4">
            Rejoins la communauté
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <span className="inline-block pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] mb-3">
            @vote4mmi
          </span>
          <p className="text-small text-text-muted mb-10">
            Backstage, projets et moments de promo
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <a
            href={SITE_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-3 px-8 py-4 rounded-lg',
              'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
              'text-white font-medium text-body',
              'hover:shadow-[0_0_32px_rgba(131,58,180,0.4)] hover:scale-[1.03]',
              'active:scale-[0.98]',
              'transition-all duration-normal ease-smooth',
              'focus-brand',
            )}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            Suivre le BDE
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
