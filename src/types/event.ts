// src/types/event.ts

export type EventCategory = 'bde' | 'university' | 'bordeaux';

export interface Event {
  id: string;
  title: string;
  description?: string;
  /** Display-ready date string (e.g. "27 mars 2026") */
  date: string;
  startDate: string; // ISO 8601
  endDate?: string;
  location?: string;
  category: EventCategory;
  imageUrl?: string;
  registrationUrl?: string;
}
