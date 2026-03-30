// src/types/event.ts

export type EventCategory = 'bde' | 'university' | 'bordeaux';

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  start_date: string; // ISO 8601
  end_date?: string;
  location?: string;
  category: EventCategory;
  image_url?: string;
  registration_url?: string;
  created_by?: string;
  created_at?: string;
}

/** Shape for creating a new event */
export type EventInsert = Omit<Event, 'id' | 'created_at'>;
