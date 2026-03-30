// src/app/events/new/page.tsx
// Protected page — only authenticated users can create events.

import type { Metadata } from 'next';
import { requireAuth } from '@/lib/supabase/auth';
import CreateEventForm from '@/components/features/events/CreateEventForm';

export const metadata: Metadata = {
  title: 'Nouvel événement',
};

export default async function NewEventPage() {
  const user = await requireAuth('/events/new');

  return (
    <main className="pt-28 pb-16 min-h-[100dvh]">
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <div className="mb-8">
          <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] mb-3 block">
            Créer
          </span>
          <h1 className="font-display text-display-lg text-white">
            Nouvel événement
          </h1>
        </div>
        <CreateEventForm userId={user.id} />
      </div>
    </main>
  );
}
