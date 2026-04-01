// src/components/features/home/SocialCta.tsx
// ─────────────────────────────────────────────────────
// Compact horizontal CTA band — handle + button on one
// line, punchy and minimal.
// ─────────────────────────────────────────────────────

'use client';

import { SITE_CONFIG } from '@/config/site';
import { cn } from '@/lib/utils/cn';
import { FadeIn } from '@/components/motion/ScrollReveal';

export default function SocialCta() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Glow background — stronger contrast */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(111,52,139,0.3) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Gradient borders */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mid/50 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mid/50 to-transparent" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left: handle + tagline */}
            <div className="flex items-center gap-4 text-center sm:text-left">
              <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.15em]">
                @bde_mmi_bordeaux
              </span>
              <span className="hidden sm:block w-[1px] h-5 bg-border-strong" aria-hidden="true" />
              <span className="hidden sm:block text-small text-text-muted">
                Backstage, projets et moments de promo
              </span>
            </div>

            {/* Right: CTA button */}
            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-3 px-6 py-3 rounded-lg shrink-0',
                'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
                'text-white font-medium text-small',
                'hover:shadow-[0_0_24px_rgba(131,58,180,0.35)] hover:scale-[1.02]',
                'active:scale-[0.98]',
                'transition-all duration-normal ease-smooth',
                'focus-brand',
              )}
            >
              <svg
                className="w-4 h-4"
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
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
