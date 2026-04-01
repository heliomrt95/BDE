// src/config/site.ts
// Global site metadata — consumed by layout.tsx and SEO utilities

export const SITE_CONFIG = {
  name: 'BDE MMI Bordeaux',
  description: 'Le site officiel du Bureau des Étudiants du BUT MMI de Bordeaux',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bde-mmi-bordeaux.fr',
  socials: {
    instagram: 'https://www.instagram.com/vote4mmi/?hl=fr',
    linkedin: '',
  },
} as const;
