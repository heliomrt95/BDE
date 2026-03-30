// src/app/(auth)/signup/page.tsx

import type { Metadata } from 'next';
import SignupForm from '@/components/features/auth/SignupForm';

export const metadata: Metadata = {
  title: 'Inscription',
};

export default function SignupPage() {
  return <SignupForm />;
}
