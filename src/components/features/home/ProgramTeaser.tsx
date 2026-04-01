// src/components/features/home/ProgramTeaser.tsx
// ─────────────────────────────────────────────────────
// Full-bleed contrasted section — big editorial title,
// 3 horizontal pillar columns, dashboard style.
// ─────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { FadeIn, SlideIn, Stagger, StaggerItem } from '@/components/motion/ScrollReveal';

const PILLARS = [
  {
    number: '01',
    icon: '</>',
    title: 'Développement Web',
    description: 'Front, back, frameworks modernes — on code des projets réels dès la première année.',
    accentColor: 'from-brand-accent to-brand-accent/40',
  },
  {
    number: '02',
    icon: '◎',
    title: 'Design & UX',
    description: 'UI/UX, graphisme, motion — on apprend à concevoir des expériences qui marquent.',
    accentColor: 'from-brand-mid to-brand-mid/40',
  },
  {
    number: '03',
    icon: '▶',
    title: 'Communication',
    description: 'Audiovisuel, réseaux sociaux, stratégie — on crée du contenu qui engage.',
    accentColor: 'from-[#c0392b] to-[#c0392b]/40',
  },
];

export default function ProgramTeaser() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Full-bleed contrasted background */}
      <div
        className="absolute inset-0 bg-surface-raised/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-transparent to-brand-dark/50"
        aria-hidden="true"
      />

      {/* Top & bottom border lines */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mid/40 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mid/40 to-transparent" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* ── Header ── */}
        <div className="mb-16 md:mb-20">
          <FadeIn>
            <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] mb-6 block">
              Le cursus
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-[0.95] tracking-tight max-w-3xl">
              Le BUT MMI,{' '}
              <span className="relative inline-block">
                <span className="text-brand-accent">c&apos;est quoi</span>
                <span
                  className="absolute -bottom-1 left-0 w-full h-[2px] rounded-full bg-brand-accent/40"
                  aria-hidden="true"
                />
              </span>
            </h2>
          </FadeIn>

          <SlideIn from="left" delay={0.2}>
            <p className="text-body md:text-subheading text-text-secondary max-w-xl mt-6">
              Trois ans pour devenir un créatif polyvalent du numérique.
              Développement, design et communication — le trio gagnant.
            </p>
          </SlideIn>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-[1px] bg-gradient-to-r from-brand-mid/40 via-border to-transparent mb-12" aria-hidden="true" />

        {/* ── Pillar columns — horizontal dashboard style ── */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" stagger={0.12}>
          {PILLARS.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div
                className={cn(
                  'group relative p-6 md:p-8 rounded-xl',
                  'border border-border/30',
                  'hover:border-brand-mid/50 hover:bg-white/[0.02]',
                  'transition-all duration-normal ease-smooth',
                )}
              >
                {/* Top gradient bar */}
                <div
                  className={cn(
                    'absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r',
                    pillar.accentColor,
                    'opacity-50 group-hover:opacity-100',
                    'transition-opacity duration-normal',
                  )}
                  aria-hidden="true"
                />

                {/* Number + icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="pixel-text text-pixel-xl text-brand-accent group-hover:animate-pixel-glitch">
                    {pillar.icon}
                  </span>
                  <span className="font-display text-display-md text-white/[0.08]">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="font-display text-heading text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-small text-text-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ── Link ── */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/program"
              className={cn(
                'inline-flex items-center gap-2 text-small text-brand-accent',
                'hover:gap-3 transition-all duration-normal',
                'focus-brand rounded-sm',
              )}
            >
              Voir le programme complet <span aria-hidden="true">→</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
