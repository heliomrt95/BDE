// src/services/blogService.ts — Server-side blog queries with Supabase + mock fallback

import type { Post } from '@/types';

// ─── Mock data (shown when Supabase is not configured) ─────────────────────
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    slug: 'bienvenue-bde-mmi-2026',
    title: 'Bienvenue au BDE MMI 2026 !',
    excerpt: 'Une nouvelle année commence — voici tout ce qu\'on a prévu pour vous cette année.',
    content: `# Bienvenue au BDE MMI 2026 !

Après un été bien mérité, le Bureau des Étudiants est de retour avec plein de projets pour cette nouvelle année universitaire.

## Ce qui nous attend

Cette année, on a décidé de mettre le paquet. Au programme : plus d'événements, une boutique merch repensée, des workshops réguliers et un système de lunch communautaire.

### Les événements

On commence fort avec la **soirée d'intégration** le 15 septembre. Tous les nouveaux sont attendus — c'est le meilleur moyen de se faire des potes avant les cours.

### Les ateliers

On organise des **workshops techniques** toutes les deux semaines. Le premier portera sur Figma et le design de composants.

## Rejoindre l'équipe

Tu veux t'impliquer ? Envoie-nous un message ou viens nous voir lors de la prochaine réunion ouverte.

À très vite !`,
    author: 'BDE MMI',
    tags: ['BDE', 'Rentrée', 'Événements'],
    published_at: '2026-09-01T10:00:00Z',
  },
  {
    id: '2',
    slug: 'retour-hackathon-48h',
    title: 'Retour sur le Hackathon 48h',
    excerpt: 'Deux jours de code, de design et de café. Retour sur l\'édition 2026 du hackathon MMI.',
    content: `# Retour sur le Hackathon 48h

Le week-end dernier, une vingtaine d'étudiants du MMI se sont lancés dans le hackathon annuel. Voici le bilan.

## Le contexte

Le thème cette année : **"Accessibilité et numérique inclusif"**. Les équipes avaient 48h pour concevoir et développer une application répondant à ce défi.

## Les projets

Cinq équipes ont présenté leurs projets devant un jury composé de professionnels :

- **HandSign** — application de traduction de la langue des signes via IA
- **ReaderMate** — lecteur d'écran simplifié pour seniors
- **PathFinder** — cartographie des lieux accessibles en fauteuil roulant
- **ToneMate** — outil de vérification du niveau de contraste en temps réel
- **VoiceUI** — interface entièrement contrôlée à la voix

## Les résultats

Le jury a été bluffé par la qualité des rendus. **HandSign** a remporté le premier prix, mais tous les projets méritaient d'être salués.

## La suite

Les projets sont open source — retrouvez-les sur le portfolio MMI.`,
    author: 'Helio M.',
    tags: ['Hackathon', 'Dev', 'Accessibilité'],
    published_at: '2026-10-20T14:00:00Z',
  },
  {
    id: '3',
    slug: 'guide-stage-mmi',
    title: 'Comment trouver un bon stage en MMI ?',
    excerpt: 'Nos conseils concrets pour décrocher le stage qui lance une carrière.',
    content: `# Comment trouver un bon stage en MMI ?

La recherche de stage est souvent stressante. Voici ce qu'on a appris — et ce qu'on aurait aimé savoir avant.

## Commencer tôt

La règle d'or : **commencez 6 mois avant**. Les bonnes agences et studios ont des pipelines de recrutement remplis bien à l'avance.

## Soigner son portfolio

Un portfolio MMI doit montrer **la variété** de tes compétences. Ne te cantonne pas à un seul domaine — les recruteurs cherchent des profils polyvalents.

### Ce qu'ils regardent

1. La qualité des projets (pas la quantité)
2. La capacité à expliquer tes choix UX/créatifs
3. Le code propre et documenté
4. Une présence en ligne cohérente

## Les plateformes à surveiller

- **Welcome to the Jungle** — idéal pour les structures tech
- **LinkedIn** — indispensable pour le réseau
- **Behance** — pour les agences créatives
- **Les offres des anciens MMI** — réseau alumni très actif

## Le mot de la fin

Le meilleur stage est celui qui te fait progresser, pas celui qui te fait briller sur le papier. Sois curieux, pose des questions, et implique-toi vraiment.`,
    author: 'BDE MMI',
    tags: ['Stage', 'Conseils', 'Carrière'],
    published_at: '2026-11-05T09:00:00Z',
  },
];

// ─── Service functions ──────────────────────────────────────────────────────

export async function getPosts(): Promise<Post[]> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('posts')
      .select('id, slug, title, excerpt, author, tags, cover_image_url, published_at, created_at')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });

    if (error) return MOCK_POSTS;
    return data as Post[];
  } catch {
    return MOCK_POSTS;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .lte('published_at', new Date().toISOString())
      .single();

    if (error || !data) return null;
    return data as Post;
  } catch {
    return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
  }
}
