// src/app/admin/page.tsx — Admin dashboard (route: /admin)
// Only accessible to users with role: 'admin'

import type { Metadata } from 'next';
import { requireRole } from '@/lib/supabase/auth';
import AdminDashboard from '@/components/features/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin — BDE MMI',
};

export default async function AdminPage() {
  const user = await requireRole('admin', '/admin');

  return <AdminDashboard userName={user.name} />;
}
