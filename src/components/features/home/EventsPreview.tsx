// src/components/features/home/EventsPreview.tsx
// ─────────────────────────────────────────────────────
// Upcoming events — 3-card staggered grid with
// diagonal accent bar, "see all" link.
// ─────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/ScrollReveal';

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
    <section className="relative py-24 md:py-32">
      {/* Diagonal accent bar background */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-[0.04] -skew-x-12 origin-top-right"
        style={{ background: 'linear-gradient(180deg, #6f348b 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Section header */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <SectionTitle
              pixelLabel="À venir"
              title="Événements"
            />
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

        {/* Cards grid — staggered on md+ */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.12}>
          {MOCK_EVENTS.map((event, i) => (
            <StaggerItem key={event.id}>
              <Card
                variant="glass"
                interactive
                className={cn(
                  'group relative',
                  // Stagger vertical offset on desktop
                  i === 1 && 'md:mt-8',
                  i === 2 && 'md:mt-16',
                )}
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
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
