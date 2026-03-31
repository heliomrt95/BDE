// src/services/lunchService.ts
// Fetches the week's menus from the CROUS API.
// Actual endpoint TBD — mock data ready for the full week.

import { WeekMenu } from '@/types';

const CROUS_API_BASE = process.env.CROUS_API_URL ?? '';
const RESTAURANT_ID = process.env.CROUS_RESTAURANT_ID ?? '';

// Returns ISO date string for a given day offset from this week's Monday
function weekDate(dayOffset: number): string {
  const today = new Date();
  const monday = new Date(today);
  const dow = today.getDay(); // 0=Sun, 1=Mon...
  const diff = dow === 0 ? -6 : 1 - dow; // shift to Monday
  monday.setDate(today.getDate() + diff + dayOffset);
  monday.setHours(12, 0, 0, 0);
  return monday.toISOString();
}

const MOCK_WEEK: WeekMenu = [
  {
    date: weekDate(0), // Monday
    restaurant: 'RU Bordeaux — Campus Victoire',
    starters: [
      { name: 'Taboulé maison', description: 'Semoule fine, menthe fraîche, tomate, citron', price: 0 },
      { name: 'Velouté de potimarron', description: 'Crème fraîche, noix grillées', price: 0 },
      { name: 'Carottes râpées vinaigrette', price: 0 },
    ],
    mains: [
      { name: 'Poulet rôti jus de thym', description: 'Servi avec gratin dauphinois', price: 3.30 },
      { name: 'Lasagnes végétariennes', description: 'Béchamel, courgettes, ricotta', price: 3.30 },
    ],
    desserts: [
      { name: 'Tarte aux pommes', description: 'Pâte brisée maison, compote', price: 0 },
      { name: 'Yaourt nature', price: 0 },
      { name: 'Fruit de saison', price: 0 },
    ],
  },
  {
    date: weekDate(1), // Tuesday
    restaurant: 'RU Bordeaux — Campus Victoire',
    starters: [
      { name: 'Salade niçoise', description: 'Thon, haricots verts, olives, œuf dur', price: 0 },
      { name: 'Soupe de lentilles corail', description: 'Cumin, coriandre fraîche', price: 0 },
      { name: 'Betterave vinaigrette', price: 0 },
    ],
    mains: [
      { name: 'Bœuf bourguignon', description: 'Carottes, champignons, purée maison', price: 3.30 },
      { name: 'Filet de cabillaud vapeur', description: 'Sauce vierge, riz parfumé', price: 3.30 },
    ],
    desserts: [
      { name: 'Mousse au chocolat', description: 'Chocolat noir 70%', price: 0 },
      { name: 'Compote poire-vanille', price: 0 },
      { name: 'Fruit de saison', price: 0 },
    ],
  },
  {
    date: weekDate(2), // Wednesday
    restaurant: 'RU Bordeaux — Campus Victoire',
    starters: [
      { name: 'Brandade de morue gratinée', description: 'Huile d\'olive, ail, persil', price: 0 },
      { name: 'Gaspacho de tomates', description: 'Basilic, concombre, poivron', price: 0 },
      { name: 'Crudités du marché', price: 0 },
    ],
    mains: [
      { name: 'Tajine d\'agneau aux pruneaux', description: 'Amandes grillées, couscous', price: 3.30 },
      { name: 'Omelette aux fines herbes', description: 'Salade verte, croûtons', price: 3.30 },
    ],
    desserts: [
      { name: 'Crème brûlée', description: 'Vanille Bourbon', price: 0 },
      { name: 'Salade de fruits frais', price: 0 },
      { name: 'Fromage blanc miel', price: 0 },
    ],
  },
  {
    date: weekDate(3), // Thursday
    restaurant: 'RU Bordeaux — Campus Victoire',
    starters: [
      { name: 'Houmous & pita maison', description: 'Pois chiches, tahini, paprika fumé', price: 0 },
      { name: 'Velouté de champignons', description: 'Crème de truffe, croutons', price: 0 },
      { name: 'Salade de concombres au yaourt', price: 0 },
    ],
    mains: [
      { name: 'Saumon grillé beurre blanc', description: 'Haricots verts, pommes vapeur', price: 3.30 },
      { name: 'Curry de pois chiches', description: 'Lait de coco, riz basmati', price: 3.30 },
    ],
    desserts: [
      { name: 'Tarte citron meringuée', description: 'Meringue italienne', price: 0 },
      { name: 'Yaourt aux fruits', price: 0 },
      { name: 'Fruit de saison', price: 0 },
    ],
  },
  {
    date: weekDate(4), // Friday
    restaurant: 'RU Bordeaux — Campus Victoire',
    starters: [
      { name: 'Salade César maison', description: 'Romaine, parmesan, anchois, croûtons', price: 0 },
      { name: 'Minestrone de légumes', description: 'Basilic, parmesan râpé', price: 0 },
      { name: 'Avocat vinaigrette', price: 0 },
    ],
    mains: [
      { name: 'Confit de canard sarladais', description: 'Pommes sarladaises, salade frisée', price: 3.30 },
      { name: 'Quiche lorraine & salade', description: 'Lardons fumés, gruyère', price: 3.30 },
    ],
    desserts: [
      { name: 'Île flottante', description: 'Crème anglaise vanille, caramel', price: 0 },
      { name: 'Brownie chocolat noix', price: 0 },
      { name: 'Fruit de saison', price: 0 },
    ],
  },
];

export async function getLunchMenu(): Promise<WeekMenu> {
  // TODO: replace with real CROUS API call
  // const res = await fetch(`${CROUS_API_BASE}/restaurants/${RESTAURANT_ID}/menus/week`);
  // const data = await res.json();
  // return mapCrousResponseToWeekMenu(data);
  void CROUS_API_BASE;
  void RESTAURANT_ID;
  return MOCK_WEEK;
}
