// src/components/features/home/SocialCta.tsx
// ─────────────────────────────────────────────────────
// Instagram / social CTA — full-width band with
// glow accent and pixel typography.
// ─────────────────────────────────────────────────────

'use client';

import { SITE_CONFIG } from '@/config/site';
import { cn } from '@/lib/utils/cn';
import { FadeIn, ScaleReveal } from '@/components/motion/ScrollReveal';

export default function SocialCta() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Glow background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(111,52,139,0.25) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Gradient borders top & bottom */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mid/50 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mid/50 to-transparent" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
        {/* Pixel label */}
        <FadeIn>
          <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] mb-6 block">
            @bde_mmi_bordeaux
          </span>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1}>
          <h2 className="font-display text-display-lg text-white mb-6 text-balance">
            Suis-nous sur{' '}
            <span className="relative inline-block">
              <span className="text-brand-accent">Instagram</span>
              <span
                className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-accent/40 rounded-full"
                aria-hidden="true"
              />
            </span>
          </h2>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.15}>
          <p className="text-body text-text-secondary max-w-xl mx-auto mb-10 text-balance">
            Backstage des événements, projets étudiants, vie de promo et
            moments de folie — tout ça en stories et en reels.
          </p>
        </FadeIn>

        {/* CTA button */}
        <ScaleReveal delay={0.2}>
          <a
            href={SITE_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-3 px-8 py-4 rounded-xl',
              'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
              'text-white font-medium text-body',
              'hover:shadow-[0_0_30px_rgba(131,58,180,0.4)] hover:scale-[1.02]',
              'active:scale-[0.98]',
              'transition-all duration-normal ease-smooth',
              'focus-brand',
            )}
          >
            {/* Instagram icon (simple SVG) */}
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
        </ScaleReveal>

        {/* Decorative floating elements */}
        <div className="flex justify-center gap-6 mt-12" aria-hidden="true">
          {['◆', '✦', '◆'].map((char, i) => (
            <span
              key={i}
              className={cn(
                'text-brand-mid/30 text-sm',
                i === 1 && 'text-brand-accent/30',
              )}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
