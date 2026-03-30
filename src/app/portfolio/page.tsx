// src/app/portfolio/page.tsx — Portfolio page (route: /portfolio)

import type { Metadata } from 'next';
import { getProjects } from '@/services/portfolioService';
import ProjectGallery from '@/components/features/portfolio/ProjectGallery';
import SectionTitle from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Découvrez les projets étudiants du BUT MMI Bordeaux — web, design, vidéo, photo.',
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      {/* ── Hero header ── */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 70% 0%, rgba(255,214,10,0.08) 0%, transparent 50%), radial-gradient(ellipse at 30% 0%, rgba(111,52,139,0.25) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(rgba(111,52,139,0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <SectionTitle
                pixelLabel="Showcase"
                title="Projets étudiants"
              />
              <p className="mt-4 text-body text-text-secondary max-w-xl">
                Le meilleur des réalisations MMI — sites web, identités visuelles,
                courts-métrages, séries photo et plus encore.
              </p>
            </div>

            {/* Decorative counter */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-display text-display-xl text-brand-accent/20">
                {projects.length}
              </span>
              <span className="pixel-text text-pixel-sm text-text-muted uppercase">
                projets
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24">
        <ProjectGallery projects={projects} />
      </section>
    </>
  );
}
