// src/components/features/home/HeroBanner.tsx
// ─────────────────────────────────────────────────────
// Full-bleed hero — radial gradient bg, experimental
// typography mix, floating pixel accents, dual CTA.
// ─────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { FadeIn, ParallaxLayer } from '@/components/motion/ScrollReveal';

export default function HeroBanner() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* ── Background layers ── */}
      {/* Radial glow */}
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
      {/* Secondary glow — bottom right */}
      <div
        className="absolute bottom-0 right-0 w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at 80% 80%, rgba(255,214,10,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
      {/* Grid pattern — subtle */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(111,52,139,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(111,52,139,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* ── Floating pixel decorations (parallax) ── */}
      <ParallaxLayer offset={30} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[8%] pixel-text text-pixel-sm text-brand-mid/30 animate-glow-pulse select-none" aria-hidden="true">
          {'{ }'}
        </div>
        <div className="absolute top-[25%] right-[12%] pixel-text text-pixel-md text-brand-accent/20 animate-glow-pulse select-none" aria-hidden="true" style={{ animationDelay: '1s' }}>
          &lt;/&gt;
        </div>
        <div className="absolute bottom-[20%] left-[15%] pixel-text text-pixel-sm text-brand-mid/20 animate-glow-pulse select-none" aria-hidden="true" style={{ animationDelay: '2s' }}>
          **
        </div>
        <div className="absolute bottom-[30%] right-[8%] w-3 h-3 bg-brand-accent/10 rotate-45 animate-glow-pulse" aria-hidden="true" style={{ animationDelay: '1.5s' }} />
      </ParallaxLayer>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center">
        {/* Pixel label */}
        <FadeIn delay={0}>
          <span className="inline-block pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] px-4 py-1.5 border border-brand-accent/20 rounded-sm bg-brand-accent/5">
            BUT MMI — Bordeaux Montaigne
          </span>
        </FadeIn>

        {/* Main title — mixed fonts */}
        <FadeIn delay={0.1} className="mb-8 mt-6">
          <h1>
            <span className="block font-display text-display-xl text-white leading-none">
              Le Bureau
            </span>
            <span className="block font-display text-display-xl text-white leading-none mt-2">
              des{' '}
              <span className="relative inline-block">
                <span className="text-brand-accent">Étudiants</span>
                {/* Underline accent */}
                <span
                  className="absolute -bottom-2 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-brand-accent via-brand-accent/60 to-transparent"
                  aria-hidden="true"
                />
              </span>
            </span>
            {/* Experimental sub-line in pixel font */}
            <span className="block pixel-text text-pixel-md text-text-muted mt-6 tracking-[0.15em]">
              CRÉATIVITÉ · NUMÉRIQUE · COMMUNAUTÉ
            </span>
          </h1>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.2} className="mb-10">
          <p className="max-w-2xl mx-auto text-body md:text-subheading text-text-secondary text-balance">
            On organise les événements, on fédère la promo et on fait vivre le MMI.
            Rejoins l&apos;aventure.
          </p>
        </FadeIn>

        {/* Dual CTA */}
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary — accent */}
            <Link
              href="/events"
              className={cn(
                'inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium text-body',
                'bg-brand-accent text-brand-dark',
                'hover:bg-[#ffe14d] hover:shadow-glow-accent',
                'active:bg-[#e6c009]',
                'transition-all duration-normal ease-smooth',
                'focus-brand',
              )}
            >
              Voir les événements
              <span aria-hidden="true" className="text-lg">→</span>
            </Link>

            {/* Secondary — outline */}
            <Link
              href="/portfolio"
              className={cn(
                'inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium text-body',
                'border border-border-strong text-brand-light',
                'hover:bg-brand-mid/10 hover:border-brand-light/40',
                'active:bg-brand-mid/20',
                'transition-all duration-normal ease-smooth',
                'focus-brand',
              )}
            >
              Découvrir les projets
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator — anchored to section bottom */}
      <FadeIn delay={0.5} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="pixel-text text-pixel-sm text-text-muted uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-brand-mid to-transparent" />
        </div>
      </FadeIn>
    </section>
  );
}
