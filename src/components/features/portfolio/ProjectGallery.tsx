// src/components/features/portfolio/ProjectGallery.tsx
// ─────────────────────────────────────────────────────
// Client container — filters by type, bento layout
// with featured (large) and regular cards.
// ─────────────────────────────────────────────────────

'use client';

import { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import Badge from '@/components/ui/Badge';
import Tag from '@/components/ui/Tag';
import { cn } from '@/lib/utils/cn';
import type { Project, ProjectType } from '@/types/portfolio';

type FilterType = ProjectType | 'all';

interface ProjectGalleryProps {
  projects: Project[];
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all',    label: 'Tout' },
  { key: 'web',    label: 'Dev Web' },
  { key: 'design', label: 'Design' },
  { key: 'video',  label: 'Vidéo' },
  { key: 'photo',  label: 'Photo' },
];

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.type === activeFilter);
  }, [projects, activeFilter]);

  const count = filtered.length;

  return (
    <div className="flex flex-col gap-10">
      {/* ── Filter bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="pixel-text text-pixel-sm text-text-muted uppercase mr-1">
            Catégorie
          </span>
          {FILTERS.map((f) => (
            <Badge
              key={f.key}
              label={f.label}
              variant={f.key === 'all' ? 'default' : 'outline'}
              interactive
              active={activeFilter === f.key}
              onClick={() => setActiveFilter(f.key)}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {activeFilter !== 'all' && (
            <Tag
              label={FILTERS.find((f) => f.key === activeFilter)?.label ?? ''}
              onRemove={() => setActiveFilter('all')}
            />
          )}
          <span className="pixel-text text-pixel-sm text-text-muted">
            {count} projet{count > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Bento grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto stagger-children">
          {filtered.map((project, i) => {
            // Every 5th card (0-indexed: 0, 4, 9...) is featured — spans 2 cols
            const isFeatured = i % 5 === 0 && filtered.length > 2;

            return (
              <ProjectCard
                key={project.id}
                project={project}
                featured={isFeatured}
                className={cn(
                  isFeatured && 'sm:col-span-2',
                )}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="pixel-text text-pixel-xl text-brand-mid/30 mb-4" aria-hidden="true">
            {'< / >'}
          </span>
          <p className="text-body text-text-secondary mb-2">
            Aucun projet dans cette catégorie.
          </p>
          <button
            onClick={() => setActiveFilter('all')}
            className="text-small text-brand-accent hover:underline focus-brand rounded-sm"
          >
            Voir tous les projets
          </button>
        </div>
      )}

      {/* ── Stats bar ── */}
      <div className="flex items-center justify-center gap-8 py-6 border-t border-border/20">
        {(['web', 'design', 'video', 'photo'] as ProjectType[]).map((type) => {
          const typeCount = projects.filter((p) => p.type === type).length;
          return (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={cn(
                'flex flex-col items-center gap-1 group/stat',
                'transition-all duration-fast',
                activeFilter === type ? 'opacity-100' : 'opacity-50 hover:opacity-80',
              )}
            >
              <span className="font-display text-display-md text-white group-hover/stat:text-brand-accent transition-colors">
                {typeCount}
              </span>
              <span className="pixel-text text-pixel-sm text-text-muted uppercase">
                {FILTERS.find((f) => f.key === type)?.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
