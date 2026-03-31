// src/components/features/auth/SignupForm.tsx
'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { signUp } from '@/services/authService';
import { cn } from '@/lib/utils/cn';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Une erreur est survenue.';
      if (message.includes('already registered')) {
        setError('Un compte avec cet email existe déjà.');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className={cn(
        'rounded-xl overflow-hidden text-center',
        'bg-surface-raised/40 border border-border/50',
        'backdrop-blur-lg',
      )}>
        <div className="h-[3px] w-full bg-gradient-to-r from-brand-accent via-brand-mid to-transparent" />
        <div className="p-8 md:p-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-accent/15 border border-brand-accent/30 mb-5">
            <span className="pixel-text text-pixel-xl text-brand-accent">✓</span>
          </div>
          <h1 className="font-display text-display-md text-white mb-3">Inscription réussie !</h1>
          <p className="text-body text-text-secondary mb-6">
            Un email de confirmation a été envoyé à{' '}
            <strong className="text-white">{email}</strong>.{' '}
            Vérifie ta boîte mail pour activer ton compte.
          </p>
          <Link
            href="/login"
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-body',
              'bg-brand-accent text-brand-dark',
              'hover:bg-[#ffe14d] transition-colors duration-fast',
              'focus-brand',
            )}
          >
            Se connecter <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'rounded-xl overflow-hidden',
      'bg-surface-raised/40 border border-border/50',
      'backdrop-blur-lg',
    )}>
      {/* Accent top bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-brand-mid via-brand-accent to-transparent" />

      <div className="p-8 md:p-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-mid/15 border border-brand-mid/30 mb-4">
          <span className="pixel-text text-pixel-md text-brand-light">+</span>
        </div>
        <h1 className="font-display text-display-md text-white mb-2">Inscription</h1>
        <p className="text-small text-text-secondary">
          Crée ton compte pour rejoindre le BDE
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          id="signup-name"
          label="Prénom"
          type="text"
          placeholder="Ton prénom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="given-name"
          disabled={loading}
        />

        <Input
          id="signup-email"
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
          id="signup-password"
          label="Mot de passe"
          type="password"
          placeholder="6 caractères minimum"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          disabled={loading}
          hint="Au moins 6 caractères"
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
              Inscription...
            </span>
          ) : (
            'Créer mon compte'
          )}
        </Button>
      </form>

      <p className="text-center text-small text-text-muted mt-6">
        Déjà un compte ?{' '}
        <Link href="/login" className="text-brand-accent hover:underline focus-brand rounded-sm">
          Se connecter
        </Link>
      </p>
      </div>
    </div>
  );
}
