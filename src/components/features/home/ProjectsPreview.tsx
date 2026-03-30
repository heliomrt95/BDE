// src/components/features/home/ProjectsPreview.tsx
// ─────────────────────────────────────────────────────
// Student projects showcase — bento-style asymmetric
// grid, image-dominant cards with hover reveal.
// ─────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import { FadeIn, Stagger, StaggerItem, ScaleReveal } from '@/components/motion/ScrollReveal';

/* Placeholder — will come from CMS/API */
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Refonte Musée d\'Aquitaine',
    year: '2025–2026',
    tags: ['UX', 'Web'],
    thumbnail: '/images/placeholder-project-1.jpg',
    authors: ['Léa M.', 'Hugo T.'],
  },
  {
    id: '2',
    title: 'App Bordeaux Vélo',
    year: '2025–2026',
    tags: ['Mobile', 'UI'],
    thumbnail: '/images/placeholder-project-2.jpg',
    authors: ['Ines R.'],
  },
  {
    id: '3',
    title: 'Court-métrage "Signal"',
    year: '2024–2025',
    tags: ['Vidéo', 'Motion'],
    thumbnail: '/images/placeholder-project-3.jpg',
    authors: ['Axel D.', 'Mina K.'],
  },
  {
    id: '4',
    title: 'Identité visuelle Festival',
    year: '2024–2025',
    tags: ['Design', 'Print'],
    thumbnail: '/images/placeholder-project-4.jpg',
    authors: ['Camille B.'],
  },
];

export default function ProjectsPreview() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <SectionTitle
              pixelLabel="Portfolio"
              title="Projets étudiants"
            />
            <Link
              href="/portfolio"
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

        {/* Bento grid */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]" stagger={0.1}>
          {MOCK_PROJECTS.map((project, i) => (
            <StaggerItem
              key={project.id}
              className={cn(
                // Bento sizing: first and last span 2 cols
                i === 0 && 'sm:col-span-2 sm:row-span-2',
                i === 3 && 'lg:col-span-2',
              )}
            >
              <div
                className={cn(
                  'group relative rounded-xl overflow-hidden cursor-pointer h-full',
                  'border border-border/30 hover:border-brand-mid/60',
                  'transition-all duration-normal ease-smooth',
                  'hover:-translate-y-1 hover:shadow-card-hover',
                )}
              >
                {/* Image placeholder — shows a colored gradient instead of broken img */}
                <div
                  className={cn(
                    'absolute inset-0 transition-transform duration-slow ease-smooth',
                    'group-hover:scale-105',
                    // Placeholder gradient since images don't exist yet
                    i === 0 && 'bg-gradient-to-br from-brand-mid/40 to-brand-dark',
                    i === 1 && 'bg-gradient-to-br from-brand-accent/20 to-brand-dark',
                    i === 2 && 'bg-gradient-to-br from-[#c0392b]/20 to-brand-dark',
                    i === 3 && 'bg-gradient-to-br from-brand-mid/25 to-brand-dark',
                  )}
                />

                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />

                {/* Tags — appear on hover */}
                <div
                  className={cn(
                    'absolute top-3 right-3 flex flex-wrap gap-1.5 justify-end',
                    'opacity-0 -translate-y-2',
                    'group-hover:opacity-100 group-hover:translate-y-0',
                    'transition-all duration-normal ease-smooth',
                  )}
                >
                  {project.tags.map((tag) => (
                    <Badge key={tag} label={tag} variant="accent" compact />
                  ))}
                </div>

                {/* Info at bottom */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <p className="pixel-text text-pixel-sm text-brand-accent uppercase mb-1">
                    {project.year}
                  </p>
                  <h3 className="font-display text-heading text-white text-balance mb-1">
                    {project.title}
                  </h3>
                  <p className="text-caption text-text-muted">
                    {project.authors.join(' · ')}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
