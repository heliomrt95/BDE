// src/components/layout/AppShell.tsx
// Conditionally renders Header/Footer — hidden on auth pages.
'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

const AUTH_ROUTES = ['/login', '/signup', '/admin'];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  return (
    <>
      {!isAuthPage && <Header />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
}
