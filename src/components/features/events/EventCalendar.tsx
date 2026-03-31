// src/components/features/events/EventCalendar.tsx
// ─────────────────────────────────────────────────────
// Main events container — client component that handles
// filtering, view mode toggle, and rendering.
// ─────────────────────────────────────────────────────

'use client';

import { useMemo, useState } from 'react';
import EventCard from './EventCard';
import EventFilters, { type EventCategory } from './EventFilters';
import { Stagger, StaggerItem, FadeIn } from '@/components/motion/ScrollReveal';
import { cn } from '@/lib/utils/cn';
import type { Event } from '@/types/event';

type ViewMode = 'grid' | 'list';

interface EventCalendarProps {
  events: Event[];
  currentUserId?: string;
}

export default function EventCalendar({ events, currentUserId }: EventCalendarProps) {
  const [activeFilters, setActiveFilters] = useState<EventCategory[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cet événement ?')) return;
    setDeletingId(id);
    try {
      const { deleteEvent } = await import('@/services/eventService.client');
      await deleteEvent(id);
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la suppression.');
    } finally {
      setDeletingId(null);
    }
  }

  const filteredEvents = useMemo(() => {
    if (activeFilters.length === 0) return events;
    return events.filter((e) => activeFilters.includes(e.category));
  }, [events, activeFilters]);

  const eventCount = filteredEvents.length;
  const totalCount = events.length;

  return (
    <div className="flex flex-col gap-8">
      {/* ── Toolbar: filters + view toggle + count ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <EventFilters
          active={activeFilters}
          onChange={setActiveFilters}
          className="flex-1"
        />

        <div className="flex items-center gap-4">
          {/* Result count */}
          <span className="text-caption text-text-muted whitespace-nowrap">
            {eventCount === totalCount
              ? `${totalCount} événements`
              : `${eventCount} / ${totalCount}`}
          </span>

          {/* View toggle */}
          <div className="flex items-center bg-surface-raised/60 border border-border rounded-md p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Vue grille"
              className={cn(
                'p-1.5 rounded-sm transition-all duration-fast',
                viewMode === 'grid'
                  ? 'bg-brand-mid/30 text-white'
                  : 'text-text-muted hover:text-white',
              )}
            >
              {/* Grid icon */}
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1" />
                <rect x="9" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="9" width="6" height="6" rx="1" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="Vue liste"
              className={cn(
                'p-1.5 rounded-sm transition-all duration-fast',
                viewMode === 'list'
                  ? 'bg-brand-mid/30 text-white'
                  : 'text-text-muted hover:text-white',
              )}
            >
              {/* List icon */}
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="14" height="3" rx="1" />
                <rect x="1" y="6.5" width="14" height="3" rx="1" />
                <rect x="1" y="12" width="14" height="3" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Event grid / list ── */}
      {filteredEvents.length > 0 ? (
        <Stagger
          stagger={0.07}
          className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'flex flex-col gap-4 max-w-3xl',
          )}
        >
          {filteredEvents.map((event) => (
            <StaggerItem key={event.id}>
              <EventCard
                event={event}
                variant={viewMode === 'grid' ? 'image' : 'compact'}
                canDelete={!!currentUserId && event.created_by === currentUserId}
                onDelete={() => handleDelete(event.id)}
                deleting={deletingId === event.id}
              />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        /* Empty state */
        <FadeIn>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="pixel-text text-pixel-xl text-brand-mid/40 mb-4" aria-hidden="true">
              ¯\_(ツ)_/¯
            </span>
            <p className="text-body text-text-secondary mb-2">
              Aucun événement pour ces filtres.
            </p>
            <button
              onClick={() => setActiveFilters([])}
              className="text-small text-brand-accent hover:underline focus-brand rounded-sm"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
