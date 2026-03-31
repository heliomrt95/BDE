// src/app/lunch/page.tsx — CROUS lunch menu (route: /lunch)

import type { Metadata } from 'next';
import { getLunchMenu } from '@/services/lunchService';
import SectionTitle from '@/components/ui/SectionTitle';
import { FadeIn } from '@/components/motion/ScrollReveal';
import LunchMenu from '@/components/features/lunch/LunchMenu';

export const revalidate = 3600; // ISR: refresh every hour

export const metadata: Metadata = {
  title: 'Menu CROUS',
  description: 'Les menus de la semaine au RU Bordeaux — pour les étudiants MMI.',
};

export default async function LunchPage() {
  const menus = await getLunchMenu();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-14 md:pt-36 md:pb-16 overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(111,52,139,0.28) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        {/* Grid overlay */}
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

        <div className="relative max-w-4xl mx-auto px-5 md:px-8">
          <FadeIn>
            <SectionTitle pixelLabel="CROUS" title="Menu de la semaine" />
            <p className="mt-4 text-brand-light/70 max-w-lg leading-relaxed">
              Les plats du jour au RU Bordeaux — mis à jour chaque matin.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Menu ── */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 pb-24">
        <LunchMenu menus={menus} />
      </section>
    </>
  );
}
