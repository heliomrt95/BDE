// src/app/events/page.tsx — Events page (route: /events)

import type { Metadata } from 'next';
import Link from 'next/link';
import { getEvents } from '@/services/eventService';
import { getServerUser } from '@/lib/supabase/auth';
import EventCalendar from '@/components/features/events/EventCalendar';
import SectionTitle from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: 'Événements',
  description: 'Tous les événements du BDE MMI Bordeaux — soirées, workshops, conférences et plus.',
};

export default async function EventsPage() {
  const [events, user] = await Promise.all([getEvents(), getServerUser()]);

  return (
    <>
      {/* ── Hero header ── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(111,52,139,0.3) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(111,52,139,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(111,52,139,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <SectionTitle
                pixelLabel="Calendrier"
                title="Événements"
              />
              <p className="mt-4 text-body text-text-secondary max-w-xl">
                Soirées, workshops, hackathons, conférences — retrouve tous les événements du BDE,
                de l&apos;université et de Bordeaux.
              </p>
            </div>

            {user && (
              <Link
                href="/events/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-accent text-brand-dark font-medium text-small hover:bg-brand-accent/90 transition-colors duration-fast shrink-0"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Créer un événement
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Events content ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24">
        <EventCalendar events={events} currentUserId={user?.id} />
      </section>
    </>
  );
}
