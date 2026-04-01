// src/components/features/home/HeroBanner.tsx
// ─────────────────────────────────────────────────────
// Split-screen hero — asymmetric layout, oversized
// typography, editorial feel, MMI identity.
// ─────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { FadeIn, SlideIn, ParallaxLayer } from '@/components/motion/ScrollReveal';

export default function HeroBanner() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />
      <div
        className="absolute bottom-0 right-0 w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at 80% 80%, rgba(255,214,10,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
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

      {/* ── Giant decorative year (background watermark) ── */}
      <ParallaxLayer offset={20} className="absolute inset-0 pointer-events-none">
        <span
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[10%] font-display text-[clamp(10rem,22vw,20rem)] leading-none text-white/[0.03] select-none"
          aria-hidden="true"
        >
          25/26
        </span>
      </ParallaxLayer>

      {/* ── Floating pixel decorations (parallax) ── */}
      <ParallaxLayer offset={30} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[8%] pixel-text text-pixel-sm text-brand-mid/30 animate-glow-pulse select-none" aria-hidden="true">
          {'{ }'}
        </div>
        <div className="absolute top-[20%] right-[5%] pixel-text text-pixel-md text-brand-accent/20 animate-glow-pulse select-none" aria-hidden="true" style={{ animationDelay: '1s' }}>
          &lt;/&gt;
        </div>
        <div className="absolute bottom-[25%] left-[12%] pixel-text text-pixel-sm text-brand-mid/20 animate-glow-pulse select-none" aria-hidden="true" style={{ animationDelay: '2s' }}>
          **
        </div>
        <div className="absolute bottom-[35%] right-[15%] w-3 h-3 bg-brand-accent/10 rotate-45 animate-glow-pulse" aria-hidden="true" style={{ animationDelay: '1.5s' }} />
      </ParallaxLayer>

      {/* ── Content: split layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-end">
          {/* ── Left: title block ── */}
          <div>
            {/* Pixel label */}
            <FadeIn delay={0}>
              <span className="inline-block pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] px-4 py-1.5 border border-brand-accent/20 rounded-sm bg-brand-accent/5 mb-8">
                BUT MMI — Bordeaux Montaigne
              </span>
            </FadeIn>

            {/* Main title — oversized, left-aligned */}
            <FadeIn delay={0.1}>
              <h1 className="mb-8">
                <span className="block font-display text-[clamp(2.8rem,7vw,6.5rem)] text-white leading-[0.9] tracking-tight">
                  Le Bureau
                </span>
                <span className="block font-display text-[clamp(2.8rem,7vw,6.5rem)] text-white leading-[0.9] tracking-tight mt-1">
                  des{' '}
                  <span className="relative inline-block">
                    <span className="text-brand-accent">Étudiants</span>
                    <span
                      className="absolute -bottom-2 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-brand-accent via-brand-accent/60 to-transparent"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </h1>
            </FadeIn>

            {/* Description */}
            <SlideIn from="left" delay={0.2}>
              <p className="max-w-lg text-body md:text-subheading text-text-secondary mb-10">
                On organise les événements, on fédère la promo et on fait vivre le MMI.
                Rejoins l&apos;aventure.
              </p>
            </SlideIn>

            {/* CTA — single primary + text link */}
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/events"
                  className={cn(
                    'inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium text-body',
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

                <Link
                  href="/portfolio"
                  className={cn(
                    'inline-flex items-center gap-1.5 text-small text-brand-light',
                    'hover:text-brand-accent hover:gap-3',
                    'transition-all duration-normal',
                    'focus-brand rounded-sm',
                  )}
                >
                  Découvrir les projets <span aria-hidden="true">→</span>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* ── Right: vertical tagline ── */}
          <FadeIn delay={0.4} className="hidden lg:flex flex-col items-end gap-6 pb-4">
            <div className="flex flex-col items-center gap-4 -rotate-3 origin-bottom-right">
              <span className="pixel-text text-pixel-sm text-text-muted tracking-[0.15em] [writing-mode:vertical-lr]">
                CRÉATIVITÉ
              </span>
              <span className="w-[1px] h-6 bg-brand-accent/40" aria-hidden="true" />
              <span className="pixel-text text-pixel-sm text-brand-accent tracking-[0.15em] [writing-mode:vertical-lr]">
                NUMÉRIQUE
              </span>
              <span className="w-[1px] h-6 bg-brand-accent/40" aria-hidden="true" />
              <span className="pixel-text text-pixel-sm text-text-muted tracking-[0.15em] [writing-mode:vertical-lr]">
                COMMUNAUTÉ
              </span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <FadeIn delay={0.5} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-fit">
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
