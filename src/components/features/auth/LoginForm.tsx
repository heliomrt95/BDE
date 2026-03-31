// src/components/features/auth/LoginForm.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { signIn } from '@/services/authService';
import { cn } from '@/lib/utils/cn';

export default function LoginForm({ redirectTo: redirectToProp }: { redirectTo?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? redirectToProp ?? '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError('Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn(
      'rounded-xl overflow-hidden',
      'bg-surface-raised/40 border border-border/50',
      'backdrop-blur-lg',
    )}>
      {/* Accent top bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-brand-accent via-brand-mid to-transparent" />

      <div className="p-8 md:p-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 mb-4">
          <span className="pixel-text text-pixel-md text-brand-accent">→</span>
        </div>
        <h1 className="font-display text-display-md text-white mb-2">Connexion</h1>
        <p className="text-small text-text-secondary">
          Accède à ton espace BDE
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          id="login-email"
          label="Email"
          type="email"
          placeholder="exemple@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={loading}
        />

        <Input
          id="login-password"
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          disabled={loading}
        />

        {error && (
          <p role="alert" className="text-small text-red-400 text-center bg-red-400/10 rounded-md py-2 px-3">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={loading}
          className="w-full mt-1"
          glow
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Connexion...
            </span>
          ) : (
            'Se connecter'
          )}
        </Button>
      </form>

      <p className="text-center text-small text-text-muted mt-6">
        Pas encore de compte ?{' '}
        <Link href="/signup" className="text-brand-accent hover:underline focus-brand rounded-sm">
          S&apos;inscrire
        </Link>
      </p>
      </div>
    </div>
  );
}
