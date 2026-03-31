// src/services/portfolioService.ts

import type { Project } from '@/types';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Refonte Musée d\'Aquitaine',
    description: 'Refonte complète du site web du musée. Recherche UX, maquettes Figma, développement Next.js.',
    author: 'Léa Martinez',
    authors: ['Léa M.', 'Hugo T.'],
    year: '2025–2026',
    type: 'web',
    tags: ['UX', 'Next.js', 'Figma'],
    thumbnail: '',
  },
  {
    id: '2',
    title: 'App Bordeaux Vélo',
    description: 'Application mobile de location de vélos. Interface fluide, géolocalisation, paiement intégré.',
    author: 'Ines Rousseau',
    authors: ['Ines R.'],
    year: '2025–2026',
    type: 'design',
    tags: ['Mobile', 'UI/UX', 'Prototype'],
    thumbnail: '',
  },
];

export async function getProjects(): Promise<Project[]> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return MOCK_PROJECTS;
    return data as Project[];
  } catch {
    return MOCK_PROJECTS;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data as Project;
  } catch {
    return null;
  }
}
