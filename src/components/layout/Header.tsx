// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NAV_ITEMS } from '@/config/nav';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/');
    router.refresh();
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Glass bar */}
      <div className="glass border-b border-border/30">
        <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-brand rounded-sm"
          >
            <span className="pixel-text text-pixel-xl text-brand-accent group-hover:animate-pixel-glitch">
              BDE
            </span>
            <span className="text-small text-text-muted hidden sm:inline">
              MMI Bordeaux
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.filter((item) => !item.protected || user).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-small text-text-secondary',
                    'hover:text-white hover:bg-brand-mid/15',
                    'transition-all duration-fast ease-smooth',
                    'focus-brand',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA — auth state */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-9 rounded-md bg-brand-mid/20 animate-pulse" />
            ) : user ? (
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    'px-3 py-2 rounded-md text-small text-text-secondary',
                    'hover:text-white hover:bg-brand-mid/15',
                    'transition-all duration-fast ease-smooth',
                    'focus-brand',
                  )}
                >
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className={cn(
                    'px-4 py-2 rounded-md text-small font-medium',
                    'border border-border-strong text-brand-light',
                    'hover:bg-brand-mid/10 hover:border-brand-light/40',
                    'transition-colors duration-fast',
                    'focus-brand',
                  )}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className={cn(
                  'inline-flex items-center px-4 py-2 rounded-md text-small font-medium',
                  'bg-brand-accent text-brand-dark',
                  'hover:bg-[#ffe14d] transition-colors duration-fast',
                  'focus-brand',
                )}
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus-brand rounded-sm"
          >
            <span
              className={cn(
                'w-5 h-[2px] bg-white transition-all duration-normal',
                mobileOpen && 'rotate-45 translate-y-[5px]',
              )}
            />
            <span
              className={cn(
                'w-5 h-[2px] bg-white transition-all duration-normal',
                mobileOpen && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'w-5 h-[2px] bg-white transition-all duration-normal',
                mobileOpen && '-rotate-45 -translate-y-[5px]',
              )}
            />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden glass border-b border-border/30',
          'overflow-hidden transition-all duration-normal ease-smooth',
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul className="px-5 py-4 flex flex-col gap-1">
          {NAV_ITEMS.filter((item) => !item.protected || user).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-3 py-2.5 rounded-md text-body text-text-secondary',
                  'hover:text-white hover:bg-brand-mid/15',
                  'transition-colors duration-fast',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 pt-2 border-t border-border/30">
            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-body text-brand-accent"
                >
                  Mon espace ({user.name})
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="block px-3 py-2.5 rounded-md text-body text-red-400 text-left hover:bg-red-400/10 transition-colors duration-fast"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-md text-body font-medium text-brand-accent"
              >
                Connexion
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
