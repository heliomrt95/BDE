// src/app/lunch/page.tsx — CROUS lunch menu (route: /lunch)
// Revalidates every hour; no client-side fetching needed.

import { getLunchMenu } from '@/services/lunchService';
import LunchMenu from '@/components/features/lunch/LunchMenu';
import PageWrapper from '@/components/layout/PageWrapper';

export const revalidate = 3600; // ISR: refresh every hour

export default async function LunchPage() {
  const menu = await getLunchMenu();

  return (
    <PageWrapper>
      <h1>Menu du jour — CROUS</h1>
      <LunchMenu menu={menu} />
    </PageWrapper>
  );
}
