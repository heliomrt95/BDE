// src/components/features/home/EventsPreview.tsx
// ─────────────────────────────────────────────────────
// Horizontal scroll band — events overflow the container
// for an editorial, non-grid feel. Large watermark title.
// ─────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import { FadeIn, SlideIn } from '@/components/motion/ScrollReveal';

/* Placeholder data — will be replaced by API call */
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Soirée d\'intégration',
    description: 'La soirée de rentrée pour accueillir les nouveaux étudiants du MMI. DJ set, animations et bonne ambiance.',
    date: '15 sept. 2026',
    category: 'bde' as const,
    location: 'Campus Bordeaux Montaigne',
  },
  {
    id: '2',
    title: 'Workshop UX Design',
    description: 'Atelier pratique sur les méthodes de design thinking avec des professionnels du secteur.',
    date: '22 sept. 2026',
    category: 'university' as const,
    location: 'Salle B204',
  },
  {
    id: '3',
    title: 'Nuit du Web',
    description: '24h pour coder un site web en équipe. Ouvert à toute la promo, tous niveaux.',
    date: '5 oct. 2026',
    category: 'bordeaux' as const,
    location: 'Bordeaux Métropole',
  },
];

const categoryVariant: Record<string, 'bde' | 'university' | 'bordeaux'> = {
  bde: 'bde',
  university: 'university',
  bordeaux: 'bordeaux',
};

export default function EventsPreview() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Transition line from hero */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-mid/40 to-transparent" aria-hidden="true" />

      {/* Large watermark title */}
      <div className="absolute top-1/2 left-5 md:left-8 -translate-y-1/2 pointer-events-none select-none" aria-hidden="true">
        <span className="font-display text-[clamp(4rem,10vw,8rem)] leading-none text-white/[0.03] tracking-tight">
          Events
        </span>
      </div>

      {/* Section header */}
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 mb-10">
        <FadeIn>
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] mb-3 block">
                À venir
              </span>
              <h2 className="font-display text-display-lg text-white">Événements</h2>
            </div>
            <Link
              href="/events"
              className={cn(
                'inline-flex items-center gap-1.5 text-small text-brand-accent',
                'hover:gap-3 transition-all duration-normal',
                'focus-brand rounded-sm',
              )}
            >
              Tout voir <span aria-hidden="true">→</span>
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Horizontal scroll band */}
      <SlideIn from="right" className="relative">
        <div className="flex gap-5 pl-5 md:pl-8 pr-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
          {MOCK_EVENTS.map((event) => (
            <div
              key={event.id}
              className="snap-start shrink-0 w-[min(85vw,380px)]"
            >
              <Card
                variant="glass"
                interactive
                className="group relative h-full"
              >
                {/* Accent strip */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-accent via-brand-mid to-transparent rounded-l-lg" />

                <Card.Body className="pl-7">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      label={event.category}
                      variant={categoryVariant[event.category]}
                      compact
                    />
                    <time className="pixel-text text-pixel-sm text-text-muted uppercase">
                      {event.date}
                    </time>
                  </div>

                  <h3 className="font-display text-heading text-white mb-2 group-hover:text-brand-accent transition-colors duration-normal">
                    {event.title}
                  </h3>

                  <p className="text-small text-text-secondary line-clamp-2 mb-3">
                    {event.description}
                  </p>

                  <p className="text-caption text-text-muted">
                    {event.location}
                  </p>
                </Card.Body>
              </Card>
            </div>
          ))}

          {/* Ghost card — visual hint that list continues */}
          <div className="snap-start shrink-0 w-[min(85vw,380px)] flex items-center justify-center">
            <Link
              href="/events"
              className={cn(
                'flex flex-col items-center gap-3 p-8 rounded-xl',
                'border border-dashed border-border/50',
                'text-text-muted hover:text-brand-accent hover:border-brand-accent/30',
                'transition-all duration-normal',
              )}
            >
              <span className="text-3xl">→</span>
              <span className="pixel-text text-pixel-sm uppercase tracking-widest">Tous les events</span>
            </Link>
          </div>
        </div>
      </SlideIn>
    </section>
  );
}
