// src/app/dashboard/page.tsx
// Protected page — uses requireAuth() for server-side auth check.

import type { Metadata } from 'next';
import { requireAuth } from '@/lib/supabase/auth';
import DashboardContent from '@/components/features/dashboard/DashboardContent';

export const metadata: Metadata = {
  title: 'Mon espace',
};

export default async function DashboardPage() {
  const user = await requireAuth('/dashboard');

  return (
    <DashboardContent
      name={user.name}
      email={user.email}
      role={user.role}
    />
  );
}
