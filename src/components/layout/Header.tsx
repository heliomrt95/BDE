'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/config/nav';
import { cn } from '@/lib/utils/cn';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="border-b transition-all duration-normal border-border/20 bg-brand-dark/70 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-5 md:px-8 h-[60px] flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group focus-brand rounded-sm shrink-0">
            <span className={cn(
              'inline-flex items-center justify-center w-7 h-7 rounded-sm',
              'bg-brand-accent/15 border border-brand-accent/30',
              'transition-all duration-fast group-hover:bg-brand-accent/25',
            )}>
              <span className="pixel-text text-[10px] text-brand-accent leading-none">BDE</span>
            </span>
            <span className="font-display text-body text-white hidden sm:inline tracking-tight">
              MMI <span className="text-text-muted font-normal">Bordeaux</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <ul className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'relative flex items-center px-3.5 py-2 rounded-md text-small',
                      'transition-all duration-fast ease-smooth focus-brand',
                      isActive ? 'text-white' : 'text-text-muted hover:text-white hover:bg-white/5',
                    )}
                  >
                    {item.label}
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

          {/* ── Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            className={cn(
              'md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px]',
              'rounded-md border border-border/30 focus-brand transition-colors duration-fast',
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
      <div className={cn(
        'md:hidden overflow-hidden transition-all duration-normal ease-smooth',
        'bg-brand-dark/95 backdrop-blur-xl border-b border-border/20',
        mobileOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
      )}>
        <div className="px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-3 rounded-lg text-body transition-colors duration-fast',
                  isActive ? 'text-white bg-white/8 font-medium' : 'text-text-muted hover:text-white hover:bg-white/5',
                )}
              >
                <span className={cn(
                  'w-1 h-1 rounded-full shrink-0 transition-all duration-fast',
                  isActive ? 'bg-brand-accent' : 'bg-transparent',
                )} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
