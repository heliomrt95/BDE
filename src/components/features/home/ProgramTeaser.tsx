// src/components/features/home/ProgramTeaser.tsx
// ─────────────────────────────────────────────────────
// MMI program teaser — 3 pillars (dev, design, com)
// with icon cards and experimental typography.
// ─────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { cn } from '@/lib/utils/cn';
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/ScrollReveal';

const PILLARS = [
  {
    icon: '</>',
    title: 'Développement Web',
    description: 'Front, back, frameworks modernes — on code des projets réels dès la première année.',
    accent: 'from-brand-accent/20 to-transparent',
  },
  {
    icon: '◎',
    title: 'Design & UX',
    description: 'UI/UX, graphisme, motion — on apprend à concevoir des expériences qui marquent.',
    accent: 'from-brand-mid/30 to-transparent',
  },
  {
    icon: '▶',
    title: 'Communication',
    description: 'Audiovisuel, réseaux sociaux, stratégie — on crée du contenu qui engage.',
    accent: 'from-[#c0392b]/20 to-transparent',
  },
];

export default function ProgramTeaser() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface-raised/30 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <SectionTitle
            pixelLabel="Le cursus"
            title="Le BUT MMI, c'est quoi"
            align="center"
          />
          <p className="mt-6 text-body text-text-secondary max-w-2xl mx-auto text-balance">
            Trois ans pour devenir un créatif polyvalent du numérique.
            Développement, design et communication — le trio gagnant.
          </p>
        </FadeIn>

        {/* Pillar cards */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
          {PILLARS.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div
                className={cn(
                  'group relative p-8 rounded-xl',
                  'border border-border/50',
                  'hover:border-brand-mid/60 hover:-translate-y-1',
                  'transition-all duration-normal ease-smooth',
                  'bg-gradient-to-b', pillar.accent,
                )}
              >
                {/* Icon */}
                <div className="mb-6">
                  <span className="pixel-text text-pixel-xl text-brand-accent group-hover:animate-pixel-glitch">
                    {pillar.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-heading text-white mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-small text-text-secondary leading-relaxed">
                  {pillar.description}
                </p>

                {/* Bottom glow on hover */}
                <div
                  className={cn(
                    'absolute bottom-0 inset-x-0 h-[1px]',
                    'bg-gradient-to-r from-transparent via-brand-mid to-transparent',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-normal',
                  )}
                  aria-hidden="true"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* CTA */}
        <FadeIn delay={0.3} className="text-center mt-12">
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
    </section>
  );
}
