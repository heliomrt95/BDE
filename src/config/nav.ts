// src/config/nav.ts
// Navigation items — single source of truth for Header and mobile menu

export interface NavItem {
  label: string;
  href: string;
  protected?: boolean; // requires auth
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Programme', href: '/program' },
  { label: 'Événements', href: '/events' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Boutique', href: '/merch' },
  { label: 'Menu CROUS', href: '/lunch' },
];
