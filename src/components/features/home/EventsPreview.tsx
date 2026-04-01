// src/components/features/home/EventsPreview.tsx
// ─────────────────────────────────────────────────────
// Asymmetric layout — featured event (large, left) +
// stacked compact events (right). Clear hierarchy.
// ─────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import { FadeIn, SlideIn, Stagger, StaggerItem } from '@/components/motion/ScrollReveal';

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Soirée d\'intégration',
    description: 'La soirée de rentrée pour accueillir les nouveaux étudiants du MMI. DJ set, animations et bonne ambiance garantie.',
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
  const [featured, ...rest] = MOCK_EVENTS;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 mb-12">
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

      {/* Asymmetric grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
          {/* ── Featured event (left) ── */}
          <SlideIn from="left">
            <Card variant="glass" interactive className="group relative h-full min-h-[360px] flex flex-col justify-end">
              {/* Large date watermark */}
              <div className="absolute top-6 right-6 pointer-events-none select-none" aria-hidden="true">
                <span className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-white/[0.05]">
                  {featured.date.split(' ')[0]}
                </span>
              </div>

              {/* Accent strip */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brand-accent via-brand-mid to-transparent rounded-l-lg" />

              <Card.Body className="pl-8 mt-auto">
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    label={featured.category}
                    variant={categoryVariant[featured.category]}
                    compact
                  />
                  <time className="pixel-text text-pixel-sm text-text-muted uppercase">
                    {featured.date}
                  </time>
                </div>

                <h3 className="font-display text-display-md text-white mb-3 group-hover:text-brand-accent transition-colors duration-normal">
                  {featured.title}
                </h3>

                <p className="text-body text-text-secondary mb-4 max-w-lg">
                  {featured.description}
                </p>

                <div className="flex items-center gap-2 text-small text-text-muted">
                  <span aria-hidden="true">📍</span>
                  {featured.location}
                </div>
              </Card.Body>
            </Card>
          </SlideIn>

          {/* ── Stacked events (right) ── */}
          <Stagger className="flex flex-col gap-4" stagger={0.1}>
            {rest.map((event) => (
              <StaggerItem key={event.id}>
                <Card
                  variant="glass"
                  interactive
                  className="group relative"
                >
                  {/* Accent strip */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-mid via-brand-mid/40 to-transparent rounded-l-lg" />

                  <Card.Body className="pl-7 py-5">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        label={event.category}
                        variant={categoryVariant[event.category]}
                        compact
                      />
                      <time className="pixel-text text-pixel-sm text-text-muted uppercase">
                        {event.date}
                      </time>
                    </div>

                    <h3 className="font-display text-heading text-white mb-1.5 group-hover:text-brand-accent transition-colors duration-normal">
                      {event.title}
                    </h3>

                    <p className="text-small text-text-secondary line-clamp-2">
                      {event.description}
                    </p>
                  </Card.Body>
                </Card>
              </StaggerItem>
            ))}

            {/* Ghost card — link to all events */}
            <StaggerItem>
              <Link
                href="/events"
                className={cn(
                  'flex items-center justify-center gap-3 py-5 rounded-lg',
                  'border border-dashed border-border/50',
                  'text-text-muted hover:text-brand-accent hover:border-brand-accent/30',
                  'transition-all duration-normal',
                  'focus-brand',
                )}
              >
                <span className="pixel-text text-pixel-sm uppercase tracking-widest">Tous les événements</span>
                <span aria-hidden="true">→</span>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
