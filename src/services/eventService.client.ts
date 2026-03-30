// src/services/eventService.client.ts
// Client-side event functions — safe to import in Client Components.

import type { Event, EventInsert } from '@/types';

export async function createEvent(event: EventInsert): Promise<Event> {
  const { createClient } = await import('@/lib/supabase/client');
  const supabase = createClient();

  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Event;
}

export async function deleteEvent(id: string): Promise<void> {
  const { createClient } = await import('@/lib/supabase/client');
  const supabase = createClient();

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
