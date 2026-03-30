// src/services/eventService.ts
// All data-fetching logic for events lives here.
// Pages call this — not Supabase/fetch directly.

import type { Event } from '@/types';

/* ── Mock data — will be replaced by Supabase ── */
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Soirée d\'intégration',
    description: 'La soirée de rentrée pour accueillir les nouveaux étudiants du MMI. DJ set, animations et bonne ambiance garantie !',
    date: '15 sept. 2026',
    startDate: '2026-09-15T20:00:00',
    location: 'Campus Bordeaux Montaigne',
    category: 'bde',
    imageUrl: '/images/events/integration.jpg',
  },
  {
    id: '2',
    title: 'Workshop UX Design',
    description: 'Atelier pratique sur les méthodes de design thinking avec des professionnels du secteur bordelais.',
    date: '22 sept. 2026',
    startDate: '2026-09-22T09:00:00',
    location: 'Salle B204',
    category: 'university',
    imageUrl: '/images/events/workshop-ux.jpg',
  },
  {
    id: '3',
    title: 'Nuit du Web',
    description: '24h pour coder un site web en équipe. Ouvert à toute la promo, tous niveaux. Pizzas offertes.',
    date: '5 oct. 2026',
    startDate: '2026-10-05T18:00:00',
    endDate: '2026-10-06T18:00:00',
    location: 'Bordeaux Métropole',
    category: 'bordeaux',
    imageUrl: '/images/events/nuit-web.jpg',
  },
  {
    id: '4',
    title: 'Tournoi FIFA inter-promo',
    description: 'Le grand tournoi FIFA annuel du BDE. 1v1, élimination directe. Prix pour le vainqueur !',
    date: '12 oct. 2026',
    startDate: '2026-10-12T14:00:00',
    location: 'Foyer étudiant',
    category: 'bde',
    imageUrl: '/images/events/tournoi-fifa.jpg',
  },
  {
    id: '5',
    title: 'Conférence Motion Design',
    description: 'Rencontre avec un directeur artistique de chez Superprod. Retour d\'expérience et projection de travaux.',
    date: '18 oct. 2026',
    startDate: '2026-10-18T14:00:00',
    location: 'Amphi A',
    category: 'university',
    imageUrl: '/images/events/conf-motion.jpg',
  },
  {
    id: '6',
    title: 'Creative Jam Bordeaux',
    description: 'Un weekend de création collaborative organisé par la communauté créative bordelaise. Design, code, vidéo.',
    date: '25 oct. 2026',
    startDate: '2026-10-25T10:00:00',
    endDate: '2026-10-26T18:00:00',
    location: 'Darwin Écosystème',
    category: 'bordeaux',
    imageUrl: '/images/events/creative-jam.jpg',
  },
  {
    id: '7',
    title: 'Soirée Halloween',
    description: 'Déguisements obligatoires, meilleur costume récompensé. Ambiance dark & fun au programme.',
    date: '31 oct. 2026',
    startDate: '2026-10-31T21:00:00',
    location: 'À définir',
    category: 'bde',
    imageUrl: '/images/events/halloween.jpg',
  },
  {
    id: '8',
    title: 'Hackathon Open Data',
    description: 'Hackathon organisé par Bordeaux Métropole. Utilise les données ouvertes pour créer une appli utile.',
    date: '8 nov. 2026',
    startDate: '2026-11-08T09:00:00',
    endDate: '2026-11-09T17:00:00',
    location: 'Hôtel de Ville',
    category: 'bordeaux',
    imageUrl: '/images/events/hackathon.jpg',
  },
  {
    id: '9',
    title: 'Masterclass Typographie',
    description: 'Intervention d\'un typographe professionnel. Apprends à choisir et composer tes fontes comme un pro.',
    date: '15 nov. 2026',
    startDate: '2026-11-15T10:00:00',
    location: 'Salle B102',
    category: 'university',
    imageUrl: '/images/events/typo.jpg',
  },
];

export async function getEvents(): Promise<Event[]> {
  // TODO: replace with Supabase query
  // const { data } = await supabase.from('events').select('*');
  return MOCK_EVENTS;
}

export async function getEventById(id: string): Promise<Event | null> {
  // TODO: replace with Supabase query
  return MOCK_EVENTS.find((e) => e.id === id) ?? null;
}
