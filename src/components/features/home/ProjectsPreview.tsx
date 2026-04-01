// src/components/features/home/ProjectsPreview.tsx
// ─────────────────────────────────────────────────────
// Bento grid — title extracted above the grid to free
// a cell. Stronger hover effects, magazine layout.
// ─────────────────────────────────────────────────────

'use client';

import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/ScrollReveal';

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Refonte Musée d\'Aquitaine',
    year: '2025–2026',
    tags: ['UX', 'Web'],
    authors: ['Léa M.', 'Hugo T.'],
  },
  {
    id: '2',
    title: 'App Bordeaux Vélo',
    year: '2025–2026',
    tags: ['Mobile', 'UI'],
    authors: ['Ines R.'],
  },
  {
    id: '3',
    title: 'Court-métrage "Signal"',
    year: '2024–2025',
    tags: ['Vidéo', 'Motion'],
    authors: ['Axel D.', 'Mina K.'],
  },
  {
    id: '4',
    title: 'Identité visuelle Festival',
    year: '2024–2025',
    tags: ['Design', 'Print'],
    authors: ['Camille B.'],
  },
];

const gradients = [
  'bg-gradient-to-br from-brand-mid/40 to-brand-dark',
  'bg-gradient-to-br from-brand-accent/20 to-brand-dark',
  'bg-gradient-to-br from-[#c0392b]/20 to-brand-dark',
  'bg-gradient-to-br from-brand-mid/25 to-brand-dark',
];

export default function ProjectsPreview() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* ── Section header — outside the grid ── */}
        <FadeIn>
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] mb-3 block">
                Portfolio
              </span>
              <h2 className="font-display text-display-lg text-white">
                Projets étudiants
              </h2>
            </div>
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

        {/* ── Bento grid ── */}
        <Stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]"
          stagger={0.1}
        >
          {MOCK_PROJECTS.map((project, i) => (
            <StaggerItem
              key={project.id}
              className={cn(
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
                {/* Image placeholder gradient */}
                <div
                  className={cn(
                    'absolute inset-0 transition-transform duration-slow ease-smooth',
                    'group-hover:scale-110',
                    gradients[i],
                  )}
                />

                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

                {/* Tags — slide in on hover */}
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

                {/* Info — slides up on hover */}
                <div className="absolute bottom-0 inset-x-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-normal ease-smooth">
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
