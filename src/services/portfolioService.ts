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
    thumbnail: '/images/projects/musee.jpg',
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
    thumbnail: '/images/projects/velo.jpg',
  },
  {
    id: '3',
    title: 'Court-métrage "Signal"',
    description: 'Court-métrage expérimental sur la déconnexion numérique. Tourné en 16mm et monté sous DaVinci.',
    author: 'Axel Dupont',
    authors: ['Axel D.', 'Mina K.'],
    year: '2024–2025',
    type: 'video',
    tags: ['Vidéo', 'Motion', 'Narration'],
    thumbnail: '/images/projects/signal.jpg',
  },
  {
    id: '4',
    title: 'Identité visuelle Festival',
    description: 'Création de l\'identité visuelle complète pour un festival de musique électronique bordelais.',
    author: 'Camille Blanc',
    authors: ['Camille B.'],
    year: '2024–2025',
    type: 'design',
    tags: ['Branding', 'Print', 'Typographie'],
    thumbnail: '/images/projects/festival.jpg',
  },
  {
    id: '5',
    title: 'Portfolio interactif Three.js',
    description: 'Portfolio 3D interactif avec navigation spatiale. WebGL, shaders personnalisés, animations GSAP.',
    author: 'Tom Vidal',
    authors: ['Tom V.'],
    year: '2025–2026',
    type: 'web',
    tags: ['Three.js', 'WebGL', 'Creative Dev'],
    thumbnail: '/images/projects/threejs.jpg',
  },
  {
    id: '6',
    title: 'Série photo "Béton Vivant"',
    description: 'Série photo urbaine explorant l\'architecture brutaliste bordelaise. Argentique + retouche minimale.',
    author: 'Nina Leclerc',
    authors: ['Nina L.'],
    year: '2024–2025',
    type: 'photo',
    tags: ['Photo', 'Argentique', 'Urbain'],
    thumbnail: '/images/projects/beton.jpg',
  },
  {
    id: '7',
    title: 'Dashboard Analytics',
    description: 'Interface de data visualization pour une startup. Charts D3.js, dark mode, temps réel.',
    author: 'Samir Benali',
    authors: ['Samir B.', 'Clara D.'],
    year: '2025–2026',
    type: 'web',
    tags: ['React', 'D3.js', 'Dashboard'],
    thumbnail: '/images/projects/dashboard.jpg',
  },
  {
    id: '8',
    title: 'Motion Reel 2025',
    description: 'Compilation de projets motion design : génériques, pubs, lyric videos. After Effects + Cinema 4D.',
    author: 'Mina Kadi',
    authors: ['Mina K.'],
    year: '2024–2025',
    type: 'video',
    tags: ['Motion', 'After Effects', 'C4D'],
    thumbnail: '/images/projects/motion-reel.jpg',
  },
  {
    id: '9',
    title: 'Redesign appli CROUS',
    description: 'Concept de redesign de l\'application CROUS. Étude utilisateur, wireframes, UI kit complet.',
    author: 'Emma Faure',
    authors: ['Emma F.', 'Lucas G.'],
    year: '2025–2026',
    type: 'design',
    tags: ['UI/UX', 'Figma', 'Prototype'],
    thumbnail: '/images/projects/crous-app.jpg',
  },
  {
    id: '10',
    title: 'Reportage "Les Chartrons"',
    description: 'Reportage photographique et vidéo sur le quartier des Chartrons et ses artisans.',
    author: 'Jules Moreau',
    authors: ['Jules M.', 'Nina L.'],
    year: '2024–2025',
    type: 'photo',
    tags: ['Photo', 'Reportage', 'Vidéo'],
    thumbnail: '/images/projects/chartrons.jpg',
  },
];

export async function getProjects(): Promise<Project[]> {
  // TODO: replace with Supabase query
  return MOCK_PROJECTS;
}

export async function getProjectById(id: string): Promise<Project | null> {
  return MOCK_PROJECTS.find((p) => p.id === id) ?? null;
}
