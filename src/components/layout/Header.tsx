// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { NAV_ITEMS } from '@/config/nav';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils/cn';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await logout();
    router.push('/');
    router.refresh();
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* ── Bar ── */}
      <div
        className={cn(
          'border-b transition-all duration-normal',
          'border-border/20 bg-brand-dark/70 backdrop-blur-xl',
        )}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-8 h-[60px] flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-brand rounded-sm shrink-0"
          >
            {/* Pixel square accent */}
            <span
              className={cn(
                'inline-flex items-center justify-center w-7 h-7 rounded-sm',
                'bg-brand-accent/15 border border-brand-accent/30',
                'transition-all duration-fast group-hover:bg-brand-accent/25',
              )}
            >
              <span className="pixel-text text-[10px] text-brand-accent leading-none">BDE</span>
            </span>
            <span className="font-display text-body text-white hidden sm:inline tracking-tight">
              MMI <span className="text-text-muted font-normal">Bordeaux</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <ul className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_ITEMS.filter((item) => !item.protected || user).map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'relative flex items-center px-3.5 py-2 rounded-md text-small',
                      'transition-all duration-fast ease-smooth focus-brand',
                      isActive
                        ? 'text-white'
                        : 'text-text-muted hover:text-white hover:bg-white/5',
                    )}
                  >
                    {item.label}
                    {/* Active dot */}
                    {isActive && (
                      <span
                        className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-accent"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {loading ? (
              <div className="w-24 h-8 rounded-lg bg-white/5 animate-pulse" />
            ) : user ? (
              <>
                {/* Avatar + name */}
                <Link
                  href="/dashboard"
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg',
                    'text-small text-text-secondary',
                    'hover:text-white hover:bg-white/5',
                    'transition-all duration-fast focus-brand',
                  )}
                >
                  <span className={cn(
                    'inline-flex items-center justify-center w-6 h-6 rounded-md shrink-0',
                    'bg-brand-mid/40 border border-brand-mid/50',
                    'text-[10px] font-bold text-brand-accent',
                  )}>
                    {user.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg text-small font-medium',
                    'border border-border/40 text-text-muted',
                    'hover:border-red-400/40 hover:text-red-400 hover:bg-red-400/5',
                    'transition-all duration-fast focus-brand',
                  )}
                >
                  Déco
                </button>
              </>
            ) : null}
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            className={cn(
              'md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px]',
              'rounded-md border border-border/30 focus-brand',
              'transition-colors duration-fast',
              mobileOpen ? 'bg-white/10 border-white/20' : 'hover:bg-white/5',
            )}
          >
            <span className={cn('w-4 h-[1.5px] bg-white rounded-full transition-all duration-normal origin-center', mobileOpen && 'rotate-45 translate-y-[6.5px]')} />
            <span className={cn('w-4 h-[1.5px] bg-white rounded-full transition-all duration-normal', mobileOpen && 'opacity-0 scale-x-0')} />
            <span className={cn('w-4 h-[1.5px] bg-white rounded-full transition-all duration-normal origin-center', mobileOpen && '-rotate-45 -translate-y-[6.5px]')} />
          </button>

        </nav>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-normal ease-smooth',
          'bg-brand-dark/95 backdrop-blur-xl border-b border-border/20',
          mobileOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        )}
      >
        <div className="px-4 py-3 flex flex-col gap-1">

          {/* Nav links */}
          {NAV_ITEMS.filter((item) => !item.protected || user).map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-3 rounded-lg text-body transition-colors duration-fast',
                  isActive
                    ? 'text-white bg-white/8 font-medium'
                    : 'text-text-muted hover:text-white hover:bg-white/5',
                )}
              >
                {/* Active indicator */}
                <span className={cn(
                  'w-1 h-1 rounded-full shrink-0 transition-all duration-fast',
                  isActive ? 'bg-brand-accent' : 'bg-transparent',
                )} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-1 border-t border-border/20" />

          {/* Auth section */}
          {user ? (
            <div className="flex flex-col gap-1">
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-3 rounded-lg text-body',
                  'text-brand-accent hover:bg-brand-accent/5 transition-colors duration-fast',
                )}
              >
                <span className={cn(
                  'inline-flex items-center justify-center w-6 h-6 rounded-md shrink-0',
                  'bg-brand-accent/15 border border-brand-accent/30 text-[10px] font-bold text-brand-accent',
                )}>
                  {user.name.slice(0, 2).toUpperCase()}
                </span>
                {user.name}
              </Link>
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="flex items-center gap-3 px-3.5 py-3 rounded-lg text-body text-red-400 text-left hover:bg-red-400/8 transition-colors duration-fast"
              >
                <span className="w-1 h-1 rounded-full bg-transparent shrink-0" aria-hidden="true" />
                Déconnexion
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
