// src/components/features/dashboard/DashboardContent.tsx
'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { signOut } from '@/services/authService';
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

export default function DashboardContent({ name, email, role }: DashboardContentProps) {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <main className="pt-24 pb-16 min-h-[100dvh]">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="pixel-text text-pixel-sm text-brand-accent uppercase tracking-[0.2em] mb-3 block">
            Mon espace
          </span>
          <h1 className="font-display text-display-lg text-white">
            Salut, {name} 👋
          </h1>
        </div>

        {/* User info card */}
        <div className={cn(
          'rounded-xl p-6 md:p-8 mb-8',
          'bg-surface-raised/40 border border-border/50',
          'backdrop-blur-lg',
        )}>
          <h2 className="font-display text-heading text-white mb-4">Mon profil</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-caption text-text-muted uppercase tracking-wider mb-1">Nom</dt>
              <dd className="text-body text-white">{name}</dd>
            </div>
            <div>
              <dt className="text-caption text-text-muted uppercase tracking-wider mb-1">Email</dt>
              <dd className="text-body text-white">{email}</dd>
            </div>
            <div>
              <dt className="text-caption text-text-muted uppercase tracking-wider mb-1">Rôle</dt>
              <dd className="text-body text-white">
                <span className={cn(
                  'inline-block px-2.5 py-0.5 rounded-full text-small',
                  role === 'admin' && 'bg-brand-accent/20 text-brand-accent',
                  role === 'bde_member' && 'bg-brand-mid/30 text-brand-light',
                  role === 'student' && 'bg-brand-mid/20 text-text-secondary',
                )}>
                  {ROLE_LABELS[role] ?? role}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Actions */}
        <Button variant="secondary" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </div>
    </main>
  );
}
