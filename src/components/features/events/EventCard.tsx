// src/components/features/events/EventCard.tsx
// ─────────────────────────────────────────────────────
// Event card — two variants:
//   • "image" — tall card with image, overlay gradient
//   • "compact" — glass card without image (list view)
// Both have category badge, date, hover glow.
// ─────────────────────────────────────────────────────

import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import type { Event, EventCategory } from '@/types/event';

interface EventCardProps {
  event: Event;
  variant?: 'image' | 'compact';
  className?: string;
  canDelete?: boolean;
  onDelete?: () => void;
  deleting?: boolean;
}

const categoryVariant: Record<EventCategory, 'bde' | 'university' | 'bordeaux'> = {
  bde: 'bde',
  university: 'university',
  bordeaux: 'bordeaux',
};

const categoryGradient: Record<EventCategory, string> = {
  bde: 'from-brand-accent/20 via-brand-dark/80 to-brand-dark',
  university: 'from-brand-mid/30 via-brand-dark/80 to-brand-dark',
  bordeaux: 'from-[#c0392b]/20 via-brand-dark/80 to-brand-dark',
};

export default function EventCard({ event, variant = 'image', className, canDelete, onDelete, deleting }: EventCardProps) {
  if (variant === 'compact') {
    return <CompactCard event={event} className={className} canDelete={canDelete} onDelete={onDelete} deleting={deleting} />;
  }

  return (
    <article
      className={cn(
        'group relative rounded-xl overflow-hidden cursor-pointer',
        'border border-border/30',
        'transition-all duration-normal ease-smooth',
        'hover:-translate-y-1.5 hover:shadow-card-hover hover:border-brand-mid/50',
        className,
      )}
    >
      {/* Image area */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
        {/* Placeholder gradient (replace with real images) */}
        <div
          className={cn(
            'absolute inset-0 transition-transform duration-slow ease-smooth',
            'group-hover:scale-105',
            'bg-gradient-to-br',
            categoryGradient[event.category],
          )}
        />

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />

        {/* Top row: badge + date */}
        <div className="absolute top-0 inset-x-0 p-4 flex items-start justify-between">
          <Badge
            label={event.category}
            variant={categoryVariant[event.category]}
            compact
          />

          {/* Date chip */}
          <div className="glass-light rounded-md px-2.5 py-1">
            <time className="pixel-text text-pixel-sm text-white uppercase">
              {event.date}
            </time>
          </div>
        </div>

        {/* Hover glow ring */}
        <div
          className={cn(
            'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100',
            'transition-opacity duration-normal',
            'ring-1 ring-inset',
            event.category === 'bde' && 'ring-brand-accent/30',
            event.category === 'university' && 'ring-brand-mid/40',
            event.category === 'bordeaux' && 'ring-[#c0392b]/30',
          )}
          aria-hidden="true"
        />

        {/* Content at bottom */}
        <div className="absolute bottom-0 inset-x-0 p-5">
          {/* Title */}
          <h3 className="font-display text-heading text-white mb-2 group-hover:text-brand-accent transition-colors duration-normal">
            {event.title}
          </h3>

          {/* Description */}
          {event.description && (
            <p className="text-small text-text-secondary line-clamp-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
              {event.description}
            </p>
          )}

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-1.5 text-caption text-text-muted">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {event.location}
            </div>
          )}
        </div>
      </div>

      {/* Delete button */}
      {canDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
          disabled={deleting}
          aria-label="Supprimer l'événement"
          className={cn(
            'absolute top-4 right-4 z-10 p-2 rounded-md',
            'bg-red-500/20 text-red-400 border border-red-500/30',
            'opacity-0 group-hover:opacity-100 transition-all duration-fast',
            'hover:bg-red-500/30 hover:text-red-300',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      )}

      {/* Bottom accent line */}
      <div
        className={cn(
          'absolute bottom-0 inset-x-0 h-[2px]',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-normal',
          event.category === 'bde' && 'bg-gradient-to-r from-transparent via-brand-accent to-transparent',
          event.category === 'university' && 'bg-gradient-to-r from-transparent via-brand-mid to-transparent',
          event.category === 'bordeaux' && 'bg-gradient-to-r from-transparent via-[#c0392b] to-transparent',
        )}
        aria-hidden="true"
      />
    </article>
  );
}

/* ── Compact variant (no image) ── */
function CompactCard({ event, className, canDelete, onDelete, deleting }: { event: Event; className?: string; canDelete?: boolean; onDelete?: () => void; deleting?: boolean }) {
  return (
    <article
      className={cn(
        'group relative rounded-lg overflow-hidden cursor-pointer',
        'glass',
        'transition-all duration-normal ease-smooth',
        'hover:-translate-y-0.5 hover:shadow-card-hover hover:border-brand-mid/50',
        className,
      )}
    >
      {/* Left accent strip */}
      <div
        className={cn(
          'absolute top-0 left-0 w-1 h-full rounded-l-lg bg-gradient-to-b',
          event.category === 'bde' && 'from-brand-accent via-brand-accent/40 to-transparent',
          event.category === 'university' && 'from-brand-mid via-brand-mid/40 to-transparent',
          event.category === 'bordeaux' && 'from-[#c0392b] via-[#c0392b]/40 to-transparent',
        )}
      />

      {/* Delete button */}
      {canDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
          disabled={deleting}
          aria-label="Supprimer l'événement"
          className={cn(
            'absolute top-3 right-3 z-10 p-1.5 rounded-md',
            'bg-red-500/20 text-red-400 border border-red-500/30',
            'opacity-0 group-hover:opacity-100 transition-all duration-fast',
            'hover:bg-red-500/30 hover:text-red-300',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      )}

      <div className="p-5 pl-7">
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

        <h3 className="font-display text-heading text-white mb-1.5 group-hover:text-brand-accent transition-colors duration-normal">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-small text-text-secondary line-clamp-2">
            {event.description}
          </p>
        )}

        {event.location && (
          <div className="mt-3 flex items-center gap-1.5 text-caption text-text-muted">
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}
          </div>
        )}
      </div>
    </article>
  );
}
