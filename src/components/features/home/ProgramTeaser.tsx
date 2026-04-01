// src/components/features/home/ProgramTeaser.tsx
// ─────────────────────────────────────────────────────
// Asymmetric 2/3 + 1/3 layout — big editorial title on
// the left, stacked pillar legend on the right.
// ─────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { FadeIn, SlideIn, Stagger, StaggerItem } from '@/components/motion/ScrollReveal';

const PILLARS = [
  {
    icon: '</>',
    title: 'Développement Web',
    description: 'Front, back, frameworks modernes — on code des projets réels dès la première année.',
    accentColor: 'bg-brand-accent',
  },
  {
    icon: '◎',
    title: 'Design & UX',
    description: 'UI/UX, graphisme, motion — on apprend à concevoir des expériences qui marquent.',
    accentColor: 'bg-brand-mid',
  },
  {
    icon: '▶',
    title: 'Communication',
    description: 'Audiovisuel, réseaux sociaux, stratégie — on crée du contenu qui engage.',
    accentColor: 'bg-[#c0392b]',
  },
];

export default function ProgramTeaser() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface-raised/30 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20 items-start">
          {/* ── Left: editorial text block ── */}
          <div>
            <FadeIn>
              <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] mb-6 block">
                Le cursus
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] text-white leading-[0.95] tracking-tight mb-8">
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
              <p className="text-body md:text-subheading text-text-secondary max-w-xl mb-10 leading-relaxed">
                Trois ans pour devenir un créatif polyvalent du numérique.
                Développement, design et communication — le trio gagnant.
              </p>
            </SlideIn>

            <FadeIn delay={0.3}>
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
            </FadeIn>
          </div>

          {/* ── Right: pillar legend ── */}
          <Stagger className="flex flex-col gap-6 lg:pt-4" stagger={0.12}>
            {PILLARS.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div
                  className={cn(
                    'group relative pl-6 py-5 pr-5 rounded-lg',
                    'border border-border/40',
                    'hover:border-brand-mid/50 hover:bg-white/[0.02]',
                    'transition-all duration-normal ease-smooth',
                  )}
                >
                  {/* Accent bar */}
                  <div
                    className={cn(
                      'absolute top-3 bottom-3 left-0 w-[3px] rounded-full',
                      pillar.accentColor,
                      'opacity-60 group-hover:opacity-100',
                      'transition-opacity duration-normal',
                    )}
                    aria-hidden="true"
                  />

                  <div className="flex items-start gap-4">
                    <span className="pixel-text text-pixel-md text-brand-accent shrink-0 mt-0.5 group-hover:animate-pixel-glitch">
                      {pillar.icon}
                    </span>
                    <div>
                      <h3 className="font-display text-heading text-white mb-1.5">
                        {pillar.title}
                      </h3>
                      <p className="text-small text-text-secondary leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
