// src/components/features/home/HeroBanner.tsx
// ─────────────────────────────────────────────────────
// Monumental centered hero — full-width oversized title,
// gradient blob, stats ticker, single CTA.
// ─────────────────────────────────────────────────────

'use client';

import { cn } from '@/lib/utils/cn';
import { FadeIn, SlideIn } from '@/components/motion/ScrollReveal';

const STATS = [
  { value: '120+', label: 'étudiants' },
  { value: '15', label: 'événements/an' },
  { value: '3 ans', label: 'de créativité' },
];

export default function HeroBanner() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />

      {/* Blob — top-right accent glow */}
      <div
        className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-[120px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255,214,10,0.25) 0%, rgba(111,52,139,0.4) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Blob — bottom-left subtle purple */}
      <div
        className="absolute -bottom-[15%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(111,52,139,0.5) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />

      {/* ── Content: centered monumental ── */}
      <div className="relative z-10 w-full px-5 md:px-8 py-32 flex flex-col items-center text-center">
        {/* Pixel label */}
        <FadeIn delay={0}>
          <span className="inline-block pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.25em] mb-10">
            BUT MMI — Bordeaux Montaigne
          </span>
        </FadeIn>

        {/* Main title — monumental, full-width */}
        <FadeIn delay={0.1}>
          <h1 className="w-full max-w-6xl">
            <span className="block font-display text-[clamp(2.8rem,8vw,7rem)] text-white leading-[0.88] tracking-tight">
              Bureau
            </span>
            <span className="block font-display text-[clamp(2.8rem,8vw,7rem)] text-white leading-[0.88] tracking-tight">
              des
            </span>
            <span className="block font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.88] tracking-tight">
              <span
                className={cn(
                  'bg-gradient-to-r from-brand-accent via-[#ffe566] to-brand-accent',
                  'bg-[length:200%_100%] bg-clip-text text-transparent',
                  'animate-shimmer',
                )}
              >
                Étudiants
              </span>
            </span>
          </h1>
        </FadeIn>

        {/* Description */}
        <SlideIn from="left" delay={0.2}>
          <p className="max-w-md text-body md:text-subheading text-text-secondary mt-10 mb-8">
            On organise les événements, on fédère la promo et on fait vivre le MMI.
          </p>
        </SlideIn>

        {/* Stats ticker */}
        <FadeIn delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-12">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 md:gap-10">
                <div className="flex flex-col items-center gap-1">
                  <span className="font-display text-display-md text-white">{stat.value}</span>
                  <span className="pixel-text text-pixel-sm text-text-muted uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
                {i < STATS.length - 1 && (
                  <span className="hidden md:block w-[1px] h-10 bg-brand-mid/40" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
