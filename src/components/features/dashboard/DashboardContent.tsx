// src/components/features/dashboard/DashboardContent.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { signOut } from '@/services/authService';
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/ScrollReveal';
import { cn } from '@/lib/utils/cn';

interface DashboardContentProps {
  name: string;
  email: string;
  role: string;
}

const ROLE_LABELS: Record<string, string> = {
  student: 'Étudiant',
  bde_member: 'Membre BDE',
  admin: 'Admin',
};

const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30',
  bde_member: 'bg-brand-mid/30 text-brand-light border border-brand-mid/40',
  student: 'bg-brand-mid/20 text-text-secondary border border-border/40',
};

const QUICK_LINKS = [
  {
    href: '/events',
    label: 'Événements',
    description: 'Voir tout le calendrier',
    pixel: '→',
    accent: false,
  },
  {
    href: '/events/new',
    label: 'Créer un event',
    description: 'Proposer un événement',
    pixel: '+',
    accent: true,
  },
  {
    href: '/portfolio',
    label: 'Portfolio',
    description: 'Projets de la promo',
    pixel: '◈',
    accent: false,
  },
];

export default function DashboardContent({ name, email, role }: DashboardContentProps) {
  const router = useRouter();
  const initials = name.slice(0, 2).toUpperCase();

  async function handleLogout() {
    await signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <main className="pt-24 pb-16 min-h-[100dvh]">
      <div className="max-w-3xl mx-auto px-5 md:px-8">

        {/* ── Header ── */}
        <FadeIn className="flex items-start gap-5 mb-10">
          {/* Initials avatar */}
          <div className={cn(
            'shrink-0 w-14 h-14 rounded-xl',
            'bg-gradient-to-br from-brand-mid to-[#3a1a52]',
            'border border-brand-mid/40',
            'flex items-center justify-center',
          )}>
            <span className="font-display text-heading text-brand-accent">{initials}</span>
          </div>

          <div>
            <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] mb-1 block">
              Mon espace
            </span>
            <h1 className="font-display text-display-lg text-white leading-tight">
              Salut, {name}
            </h1>
          </div>
        </FadeIn>

        {/* ── Profile card ── */}
        <FadeIn delay={0.08}>
        <div className={cn(
          'rounded-xl overflow-hidden mb-6',
          'bg-surface-raised/40 border border-border/50',
          'backdrop-blur-lg',
        )}>
          <div className="h-[2px] w-full bg-gradient-to-r from-brand-mid/60 via-brand-accent/40 to-transparent" />
          <div className="p-6 md:p-8">
            <h2 className="font-display text-heading text-white mb-5 flex items-center gap-2">
              <span className="pixel-text text-pixel-sm text-brand-mid">◈</span>
              Mon profil
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-brand-mid/10 rounded-lg px-4 py-3 border border-border/30">
                <dt className="text-caption text-text-muted uppercase tracking-wider mb-1.5">Nom</dt>
                <dd className="text-body text-white font-medium truncate">{name}</dd>
              </div>
              <div className="bg-brand-mid/10 rounded-lg px-4 py-3 border border-border/30">
                <dt className="text-caption text-text-muted uppercase tracking-wider mb-1.5">Email</dt>
                <dd className="text-small text-white font-medium truncate">{email}</dd>
              </div>
              <div className="bg-brand-mid/10 rounded-lg px-4 py-3 border border-border/30">
                <dt className="text-caption text-text-muted uppercase tracking-wider mb-1.5">Rôle</dt>
                <dd className="mt-1">
                  <span className={cn(
                    'inline-block px-2.5 py-0.5 rounded-full text-small font-medium',
                    ROLE_COLORS[role] ?? ROLE_COLORS.student,
                  )}>
                    {ROLE_LABELS[role] ?? role}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        </FadeIn>

        {/* ── Quick links ── */}
        <Stagger stagger={0.09} delay={0.15} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {QUICK_LINKS.map((link) => (
            <StaggerItem key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'group rounded-xl p-5 border transition-all duration-normal',
                'backdrop-blur-sm',
                link.accent
                  ? 'bg-brand-accent/10 border-brand-accent/30 hover:bg-brand-accent/15 hover:border-brand-accent/50 hover:shadow-glow-accent'
                  : 'bg-surface-raised/30 border-border/40 hover:bg-surface-raised/50 hover:border-brand-mid/40',
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center mb-3',
                link.accent ? 'bg-brand-accent/20' : 'bg-brand-mid/20',
              )}>
                <span className={cn(
                  'pixel-text text-pixel-sm',
                  link.accent ? 'text-brand-accent' : 'text-brand-mid',
                )}>
                  {link.pixel}
                </span>
              </div>
              <p className={cn(
                'font-display text-body font-medium mb-0.5 transition-colors duration-fast',
                link.accent
                  ? 'text-brand-accent'
                  : 'text-white group-hover:text-brand-accent',
              )}>
                {link.label}
              </p>
              <p className="text-caption text-text-muted">{link.description}</p>
            </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ── Logout ── */}
        <FadeIn delay={0.3}>
        <Button variant="secondary" onClick={handleLogout} className="gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Se déconnecter
        </Button>
        </FadeIn>
      </div>
    </main>
  );
}
