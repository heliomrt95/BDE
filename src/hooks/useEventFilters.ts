// src/hooks/useEventFilters.ts
// Manages active event category filters and derived filtered list.

'use client';

import { useState, useMemo } from 'react';
import { Event, EventCategory } from '@/types';

export function useEventFilters(events: Event[]) {
  const [activeCategories, setActiveCategories] = useState<EventCategory[]>([
    'bde',
    'university',
    'bordeaux',
  ]);

  const filtered = useMemo(
    () => events.filter((e) => activeCategories.includes(e.category)),
    [events, activeCategories]
  );

  function toggle(category: EventCategory) {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }

  return { filtered, activeCategories, toggle };
}
