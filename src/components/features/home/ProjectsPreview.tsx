// src/components/features/home/ProjectsPreview.tsx
// ─────────────────────────────────────────────────────
// Bento grid — title integrated as first grid cell,
// magazine-style layout. Tags always visible on hero card.
// ─────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import { Stagger, StaggerItem } from '@/components/motion/ScrollReveal';

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
    <section className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Bento grid — title is the first cell */}
        <Stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[240px]"
          stagger={0.1}
        >
          {/* ── Title cell ── */}
          <StaggerItem className="sm:col-span-2 flex flex-col justify-end p-6 rounded-xl border border-border/30 bg-gradient-to-br from-surface-raised/40 to-transparent">
            <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] mb-3">
              Portfolio
            </span>
            <h2 className="font-display text-display-lg text-white mb-4">
              Projets étudiants
            </h2>
            <Link
              href="/portfolio"
              className={cn(
                'inline-flex items-center gap-1.5 text-small text-brand-accent w-fit',
                'hover:gap-3 transition-all duration-normal',
                'focus-brand rounded-sm',
              )}
            >
              Tout voir <span aria-hidden="true">→</span>
            </Link>
          </StaggerItem>

          {/* ── Project cards ── */}
          {MOCK_PROJECTS.map((project, i) => (
            <StaggerItem
              key={project.id}
              className={cn(
                // First project spans 2 rows on large screens
                i === 0 && 'sm:row-span-2',
                // Last project spans 2 cols on large screens
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
                {/* Image placeholder gradient */}
                <div
                  className={cn(
                    'absolute inset-0 transition-transform duration-slow ease-smooth',
                    'group-hover:scale-105',
                    i === 0 && 'bg-gradient-to-br from-brand-mid/40 to-brand-dark',
                    i === 1 && 'bg-gradient-to-br from-brand-accent/20 to-brand-dark',
                    i === 2 && 'bg-gradient-to-br from-[#c0392b]/20 to-brand-dark',
                    i === 3 && 'bg-gradient-to-br from-brand-mid/25 to-brand-dark',
                  )}
                />

                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />

                {/* Tags — always visible on first project, hover on rest */}
                <div
                  className={cn(
                    'absolute top-3 right-3 flex flex-wrap gap-1.5 justify-end',
                    i === 0
                      ? 'opacity-100'
                      : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
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
                  <h3 className="font-display text-heading text-white text-balance mb-1 group-hover:text-brand-accent transition-colors duration-normal">
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
