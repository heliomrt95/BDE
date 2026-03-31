// src/app/program/page.tsx — Programme BUT MMI (route: /program)

import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { FadeIn, Stagger, StaggerItem, SlideIn, ScaleReveal } from '@/components/motion/ScrollReveal';
import { cn } from '@/lib/utils/cn';

export const metadata: Metadata = {
  title: 'Programme',
  description: 'Découvre le programme du BUT MMI Bordeaux Montaigne — dev, design, com, ateliers et projets.',
};

// ─── Data ──────────────────────────────────────────────────────────────────

const STATS = [
  { value: '3', label: 'ans de formation', pixel: '◈' },
  { value: '6', label: 'semestres', pixel: '◈' },
  { value: '3', label: 'parcours au choix', pixel: '◈' },
];

const PILLARS = [
  {
    pixel: '</>',
    title: 'Développement Web',
    color: 'accent',
    tags: ['HTML / CSS', 'JavaScript', 'React', 'PHP / SQL', 'API REST'],
    description:
      'On code des projets concrets dès la première année. Front-end, back-end, frameworks modernes — tu repars avec un vrai portfolio technique.',
  },
  {
    pixel: '◎',
    title: 'Design & UX',
    color: 'mid',
    tags: ['Figma', 'UI / UX', 'Motion', 'Typographie', 'Identité visuelle'],
    description:
      "Du wireframe au prototype interactif, tu apprends à penser l'expérience utilisateur et à créer des interfaces qui ont du sens.",
  },
  {
    pixel: '▶',
    title: 'Communication',
    color: 'red',
    tags: ['Vidéo', 'Réseaux sociaux', 'Stratégie digitale', 'Photo', 'Copywriting'],
    description:
      "Production audiovisuelle, community management, storytelling — tu construis une présence en ligne et tu sais raconter une marque.",
  },
];

const SEMESTERS = [
  {
    sem: 'S1',
    year: '1ère année',
    title: 'Les fondamentaux',
    description: 'Introduction aux trois piliers : dev, design et com. Tu explores, tu expérimentes, tu trouves ta voie.',
    modules: ['HTML / CSS / JS bases', 'Introduction au design graphique', 'Stratégie de communication', 'Culture numérique', 'Projet intégrateur'],
    badge: 'Tronc commun',
    badgeColor: 'bg-brand-accent/15 text-brand-accent border-brand-accent/30',
  },
  {
    sem: 'S3',
    year: '2ème année',
    title: 'Approfondissement',
    description: 'On monte en compétences. Les projets deviennent plus ambitieux et tu commences à te spécialiser.',
    modules: ['Frameworks front-end (React, Vue)', 'UX Research & prototypage', 'Production vidéo avancée', 'Gestion de projet agile', 'Stage de 8 semaines'],
    badge: 'Montée en compétences',
    badgeColor: 'bg-brand-mid/20 text-brand-light border-brand-mid/40',
  },
  {
    sem: 'S5',
    year: '3ème année',
    title: 'Spécialisation & pro',
    description: 'Choix du parcours (dev, design ou com), projets clients réels, alternance possible.',
    modules: ['Parcours au choix (LP DEV / UI-UX / SIM)', 'Projets commandités', 'Portfolio professionnel', 'Alternance ou stage long', "Mémoire de fin d'études"],
    badge: 'Spécialisation',
    badgeColor: 'bg-[#c0392b]/15 text-[#e57070] border-[#c0392b]/30',
  },
];

const WORKSHOPS = [
  {
    pixel: '{w}',
    title: 'Hackathon',
    duration: '48h',
    description: 'Coder un projet from scratch en équipe, du brief au démo. Adrénaline garantie.',
  },
  {
    pixel: '[d]',
    title: 'Design Sprint',
    duration: '1 semaine',
    description: "Méthode Google Ventures appliquée à un vrai problème. Du Post-it au prototype en 5 jours.",
  },
  {
    pixel: '(v)',
    title: 'Web Série',
    duration: '1 mois',
    description: "Écriture, tournage, montage et diffusion d'une série courte en équipe pluridisciplinaire.",
  },
  {
    pixel: '<r>',
    title: 'Projet réel',
    duration: 'Semestre entier',
    description: 'Un vrai client, un vrai brief, une vraie livraison. La mise en pratique la plus formatrice.',
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────

export default function ProgramPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(111,52,139,0.35) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(111,52,139,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(111,52,139,0.5) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <FadeIn>
            <SectionTitle pixelLabel="Le cursus" title="Programme BUT MMI" />
            <p className="mt-5 text-body md:text-subheading text-text-secondary max-w-2xl text-balance">
              Métiers du Multimédia et de l&apos;Internet — 3 ans pour devenir un créatif
              polyvalent du numérique, ancré dans les réalités du terrain.
            </p>
          </FadeIn>

          {/* Stats */}
          <Stagger className="mt-12 flex flex-wrap gap-4" stagger={0.07} delay={0.1}>
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border/40 bg-surface-raised/30 backdrop-blur-sm">
                  <span className="pixel-text text-pixel-sm text-brand-accent">{s.pixel}</span>
                  <span className="font-display text-display-sm text-white leading-none">{s.value}</span>
                  <span className="text-small text-text-muted">{s.label}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── 3 piliers ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <FadeIn className="mb-14">
            <SectionTitle pixelLabel="Les matières" title="3 piliers, 1 formation" />
            <p className="mt-4 text-body text-text-secondary max-w-xl">
              MMI ne choisit pas entre technique, créativité et communication — il les enseigne ensemble.
            </p>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.09}>
            {PILLARS.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className={cn(
                  'group relative flex flex-col h-full rounded-xl overflow-hidden',
                  'border border-border/40 bg-surface-raised/20 backdrop-blur-sm',
                  'hover:border-brand-mid/50 hover:-translate-y-1',
                  'transition-all duration-normal ease-smooth',
                )}>
                  {/* Accent bar */}
                  <div className={cn(
                    'h-[2px] w-full',
                    pillar.color === 'accent' && 'bg-gradient-to-r from-brand-accent via-brand-accent/40 to-transparent',
                    pillar.color === 'mid'    && 'bg-gradient-to-r from-brand-mid via-brand-mid/40 to-transparent',
                    pillar.color === 'red'    && 'bg-gradient-to-r from-[#c0392b] via-[#c0392b]/40 to-transparent',
                  )} />

                  <div className="p-7 flex flex-col flex-1 gap-5">
                    {/* Icon */}
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      pillar.color === 'accent' && 'bg-brand-accent/15 border border-brand-accent/25',
                      pillar.color === 'mid'    && 'bg-brand-mid/20 border border-brand-mid/30',
                      pillar.color === 'red'    && 'bg-[#c0392b]/15 border border-[#c0392b]/25',
                    )}>
                      <span className={cn(
                        'pixel-text text-pixel-sm group-hover:animate-pixel-glitch',
                        pillar.color === 'accent' && 'text-brand-accent',
                        pillar.color === 'mid'    && 'text-brand-light',
                        pillar.color === 'red'    && 'text-[#e57070]',
                      )}>
                        {pillar.pixel}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-heading text-white mb-2.5 group-hover:text-brand-accent transition-colors duration-fast">
                        {pillar.title}
                      </h3>
                      <p className="text-small text-text-secondary leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="mt-auto flex flex-wrap gap-2">
                      {pillar.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full text-caption bg-brand-mid/15 text-text-muted border border-border/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Timeline semesters ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(111,52,139,0.6) 50%, transparent 100%)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-5 md:px-8">
          <FadeIn className="mb-14">
            <SectionTitle pixelLabel="Organisation" title="Les 3 ans en détail" />
            <p className="mt-4 text-body text-text-secondary max-w-xl">
              Une progression logique, du socle commun à la spécialisation pro.
            </p>
          </FadeIn>

          <div className="relative flex flex-col gap-0">
            {/* Vertical line */}
            <div
              className="absolute left-5 md:left-[29px] top-6 bottom-6 w-[1px] bg-gradient-to-b from-brand-accent via-brand-mid/60 to-transparent"
              aria-hidden="true"
            />

            {SEMESTERS.map((sem, i) => (
              <SlideIn key={sem.sem} from="left" delay={i * 0.1}>
                <div className="relative flex gap-6 md:gap-10 pb-12 last:pb-0">
                  {/* Dot */}
                  <div className="shrink-0 mt-0.5">
                    <div className="w-10 h-10 md:w-[58px] md:h-[58px] rounded-xl border border-brand-mid/40 bg-surface-raised/50 backdrop-blur-sm flex items-center justify-center">
                      <span className="pixel-text text-pixel-sm text-brand-accent">{sem.sem}</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span className="text-caption text-text-muted uppercase tracking-wider">{sem.year}</span>
                      <span className={cn('px-2.5 py-0.5 rounded-full text-caption border', sem.badgeColor)}>
                        {sem.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-heading text-white mb-2">{sem.title}</h3>
                    <p className="text-small text-text-secondary mb-5 max-w-lg">{sem.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {sem.modules.map((mod) => (
                        <span
                          key={mod}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-small bg-surface-raised/40 border border-border/30 text-text-secondary hover:border-brand-mid/40 hover:text-white transition-colors duration-fast"
                        >
                          <span className="w-1 h-1 rounded-full bg-brand-accent/60 shrink-0" aria-hidden="true" />
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ateliers ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <FadeIn className="mb-14">
            <SectionTitle pixelLabel="Pratique" title="Ateliers & projets" />
            <p className="mt-4 text-body text-text-secondary max-w-xl">
              En MMI, on apprend en faisant. Voici les formats qui rythment la formation.
            </p>
          </FadeIn>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5" stagger={0.08}>
            {WORKSHOPS.map((w) => (
              <StaggerItem key={w.title}>
                <div className={cn(
                  'group relative flex gap-5 p-6 rounded-xl',
                  'border border-border/40 bg-surface-raised/20 backdrop-blur-sm',
                  'hover:border-brand-mid/50 hover:bg-surface-raised/30',
                  'transition-all duration-normal ease-smooth',
                )}>
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-mid/20 border border-brand-mid/30 flex items-center justify-center">
                    <span className="pixel-text text-pixel-sm text-brand-mid">{w.pixel}</span>
                  </div>

                  <div className="min-w-0 pr-6">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-display text-body text-white group-hover:text-brand-accent transition-colors duration-fast">
                        {w.title}
                      </h3>
                      <span className="shrink-0 px-2 py-0.5 rounded-md text-caption bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                        {w.duration}
                      </span>
                    </div>
                    <p className="text-small text-text-secondary">{w.description}</p>
                  </div>

                  <span
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-accent/30 group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all duration-fast"
                    aria-hidden="true"
                  >→</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <ScaleReveal>
            <div className={cn(
              'relative rounded-2xl overflow-hidden',
              'border border-brand-mid/30 bg-surface-raised/30 backdrop-blur-sm',
              'px-8 py-12 md:px-14 md:py-16 text-center',
            )}>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(111,52,139,0.25) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <div className="relative">
                <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] block mb-4">
                  Tu veux en savoir plus ?
                </span>
                <h2 className="font-display text-display-md text-white mb-4">
                  Viens aux événements du BDE
                </h2>
                <p className="text-body text-text-secondary max-w-md mx-auto mb-8">
                  Journées portes ouvertes, afterworks, soirées promo — le meilleur moyen de découvrir
                  le MMI, c&apos;est de vivre avec ses étudiants.
                </p>
                <Link
                  href="/events"
                  className={cn(
                    'inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium text-body',
                    'bg-brand-accent text-brand-dark',
                    'hover:bg-[#ffe14d] hover:shadow-glow-accent',
                    'transition-all duration-normal ease-smooth focus-brand',
                  )}
                >
                  Voir les événements <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </ScaleReveal>
        </div>
      </section>
    </>
  );
}
