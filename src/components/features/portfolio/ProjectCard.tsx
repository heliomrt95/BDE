// src/components/features/portfolio/ProjectCard.tsx
// ─────────────────────────────────────────────────────
// Showcase card — image dominant with layered hover:
//   1. Image zooms
//   2. Gradient overlay intensifies
//   3. Tags slide down from top
//   4. Description fades up from bottom
//   5. Border glow by category
// ─────────────────────────────────────────────────────

import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import type { Project, ProjectType } from '@/types/portfolio';

interface ProjectCardProps {
  project: Project;
  /** Bento span — large cards get more space */
  featured?: boolean;
  className?: string;
}

const typeGradient: Record<ProjectType, string> = {
  web:    'from-brand-accent/20 via-brand-mid/30 to-brand-dark',
  design: 'from-brand-mid/40 via-brand-dark/60 to-brand-dark',
  video:  'from-[#c0392b]/25 via-brand-dark/60 to-brand-dark',
  photo:  'from-brand-light/15 via-brand-dark/60 to-brand-dark',
  other:  'from-brand-mid/20 via-brand-dark/60 to-brand-dark',
};

const typeGlow: Record<ProjectType, string> = {
  web:    'group-hover:shadow-[0_0_30px_rgba(255,214,10,0.15)]',
  design: 'group-hover:shadow-[0_0_30px_rgba(111,52,139,0.25)]',
  video:  'group-hover:shadow-[0_0_30px_rgba(192,57,43,0.15)]',
  photo:  'group-hover:shadow-[0_0_30px_rgba(223,216,230,0.12)]',
  other:  'group-hover:shadow-glow-soft',
};

const typeAccent: Record<ProjectType, string> = {
  web:    'via-brand-accent',
  design: 'via-brand-mid',
  video:  'via-[#c0392b]',
  photo:  'via-brand-light/60',
  other:  'via-brand-mid',
};

export default function ProjectCard({ project, featured = false, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group relative rounded-xl overflow-hidden cursor-pointer',
        'border border-border/20',
        'transition-all duration-normal ease-smooth',
        'hover:-translate-y-1.5 hover:border-brand-mid/40',
        typeGlow[project.type],
        className,
      )}
    >
      {/* ── Image layer ── */}
      <div className={cn(
        'relative overflow-hidden',
        featured ? 'aspect-[3/4] sm:aspect-[16/10]' : 'aspect-[3/4]',
      )}>
        {/* Placeholder gradient */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            typeGradient[project.type],
            'transition-transform duration-slow ease-smooth',
            'group-hover:scale-105',
          )}
        />

        {/* ── Overlay layers ── */}
        {/* Base scrim — always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
        {/* Hover scrim — darkens for text legibility */}
        <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-colors duration-normal" />

        {/* ── Tags — slide in from top ── */}
        <div className={cn(
          'absolute top-3 left-3 right-3 flex flex-wrap gap-1.5',
          'opacity-0 -translate-y-3',
          'group-hover:opacity-100 group-hover:translate-y-0',
          'transition-all duration-normal ease-smooth',
        )}>
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} variant="accent" compact />
          ))}
        </div>

        {/* ── Project number — top right ── */}
        <div className={cn(
          'absolute top-3 right-3',
          'pixel-text text-pixel-sm text-white/10',
          'group-hover:text-white/25 transition-colors duration-normal',
        )}>
          #{project.id.padStart(2, '0')}
        </div>

        {/* ── Content at bottom ── */}
        <div className="absolute bottom-0 inset-x-0 p-5">
          {/* Year — pixel font */}
          <p className="pixel-text text-pixel-sm text-brand-accent uppercase mb-1.5 tracking-wider">
            {project.year}
          </p>

          {/* Title */}
          <h3 className={cn(
            'font-display text-white text-balance mb-1',
            featured ? 'text-display-md' : 'text-heading',
            'group-hover:text-brand-accent transition-colors duration-normal',
          )}>
            {project.title}
          </h3>

          {/* Author(s) */}
          <p className="text-small text-text-secondary">
            {project.authors ? project.authors.join(' · ') : project.author}
          </p>

          {/* Description — fade up on hover */}
          <p className={cn(
            'text-small text-text-muted mt-2 line-clamp-2',
            'opacity-0 translate-y-2',
            'group-hover:opacity-100 group-hover:translate-y-0',
            'transition-all duration-normal ease-smooth delay-75',
          )}>
            {project.description}
          </p>
        </div>

        {/* ── Bottom accent line ── */}
        <div className={cn(
          'absolute bottom-0 inset-x-0 h-[2px]',
          'bg-gradient-to-r from-transparent to-transparent',
          typeAccent[project.type],
          'opacity-0 group-hover:opacity-100 transition-opacity duration-normal',
        )} />
      </div>
    </article>
  );
}
