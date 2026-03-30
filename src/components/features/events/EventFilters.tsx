// src/components/features/events/EventFilters.tsx
// ─────────────────────────────────────────────────────
// Filter bar for events page — category badges as
// toggle chips + active tag display.
// ─────────────────────────────────────────────────────

'use client';

import Badge from '@/components/ui/Badge';
import Tag from '@/components/ui/Tag';
import { cn } from '@/lib/utils/cn';

export type EventCategory = 'bde' | 'university' | 'bordeaux';

interface EventFiltersProps {
  /** Currently active filters */
  active: EventCategory[];
  /** Called when a filter is toggled */
  onChange: (categories: EventCategory[]) => void;
  className?: string;
}

const FILTERS: { key: EventCategory; label: string; variant: 'bde' | 'university' | 'bordeaux' }[] = [
  { key: 'bde',        label: 'BDE',       variant: 'bde' },
  { key: 'university', label: 'Université', variant: 'university' },
  { key: 'bordeaux',   label: 'Bordeaux',   variant: 'bordeaux' },
];

export default function EventFilters({ active, onChange, className }: EventFiltersProps) {
  function toggle(category: EventCategory) {
    if (active.includes(category)) {
      onChange(active.filter((c) => c !== category));
    } else {
      onChange([...active, category]);
    }
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Filter chips row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="pixel-text text-pixel-sm text-text-muted uppercase mr-1">
          Filtrer
        </span>
        {FILTERS.map((filter) => (
          <Badge
            key={filter.key}
            label={filter.label}
            variant={filter.variant}
            interactive
            active={active.includes(filter.key)}
            onClick={() => toggle(filter.key)}
          />
        ))}
      </div>

      {/* Active filters as removable tags */}
      {active.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-caption text-text-muted mr-1">Actifs :</span>
          {active.map((cat) => {
            const filter = FILTERS.find((f) => f.key === cat);
            return (
              <Tag
                key={cat}
                label={filter?.label ?? cat}
                onRemove={() => toggle(cat)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
