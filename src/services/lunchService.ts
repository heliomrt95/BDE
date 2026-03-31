// src/services/lunchService.ts
// Fetches the week's menus from the CROUStillant API.
// Docs: https://api.croustillant.menu
// Restaurant: Resto U' le Capu (ID 14) — 16 rue Jules Guesde, Bordeaux

import { WeekMenu, LunchMenu, LunchDish } from '@/types';

const CROUSTILLANT_BASE = 'https://api.croustillant.menu';
const RESTAURANT_CODE = 14; // Resto U' le Capu — Campus Victoire, Bordeaux

// ── API response types ────────────────────────────────────────────────────────

interface CrousPlat {
  code: number;
  ordre: number;
  libelle: string;
}

interface CrousCategorie {
  code: number;
  libelle: string;
  ordre: number;
  plats: CrousPlat[];
}

interface CrousRepas {
  code: number;
  type: 'midi' | 'soir' | 'matin';
  categories: CrousCategorie[];
}

interface CrousMenu {
  code: number;
  date: string; // "DD-MM-YYYY"
  repas: CrousRepas[];
}

interface CrousApiResponse {
  success: boolean;
  data: CrousMenu[];
}

// ── Mapper ────────────────────────────────────────────────────────────────────

// The CROUStillant API returns a flat "Menu" category with all dishes.
// Dishes before "OU" = main option 1, after "OU" = vegetarian option.
// Accompaniments (sauces, sides) are listed as separate plats.
function mapCrousMenuToLunchMenu(crousMenu: CrousMenu): LunchMenu {
  const [day, month, year] = crousMenu.date.split('-');
  const isoDate = new Date(`${year}-${month}-${day}T12:00:00`).toISOString();

  // Get the midi repas (lunch), fallback to first available
  const repas =
    crousMenu.repas.find((r) => r.type === 'midi') ?? crousMenu.repas[0];

  if (!repas) {
    return {
      date: isoDate,
      restaurant: "Resto U' le Capu",
      starters: [],
      mains: [],
      desserts: [],
    };
  }

  // Collect all plats from all categories, filter separators
  const allPlats: LunchDish[] = repas.categories
    .flatMap((cat) => cat.plats)
    .filter((p) => p.libelle !== 'OU' && p.libelle.trim() !== '')
    .map((p) => ({
      name: capitalizeFirst(p.libelle),
      price: 3.30,
    }));

  return {
    date: isoDate,
    restaurant: "Resto U' le Capu",
    starters: [],
    mains: allPlats,
    desserts: [],
  };
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Service ───────────────────────────────────────────────────────────────────

export async function getLunchMenu(): Promise<WeekMenu> {
  try {
    const res = await fetch(
      `${CROUSTILLANT_BASE}/v1/restaurants/${RESTAURANT_CODE}/menu`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      throw new Error(`CROUStillant API error: ${res.status}`);
    }

    const json: CrousApiResponse = await res.json();

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error('Unexpected CROUStillant API response shape');
    }

    // Only keep weekdays (lundi–vendredi) with at least one repas
    const weekMenus: WeekMenu = json.data
      .filter((m) => {
        const [d, mo, y] = m.date.split('-');
        const dow = new Date(`${y}-${mo}-${d}`).getDay();
        return dow >= 1 && dow <= 5 && m.repas.length > 0;
      })
      .map(mapCrousMenuToLunchMenu);

    if (weekMenus.length === 0) {
      throw new Error('No weekday menus returned');
    }

    return weekMenus;
  } catch (err) {
    console.error('[lunchService] Failed to fetch from CROUStillant, using fallback:', err);
    return FALLBACK_WEEK;
  }
}

// ── Fallback mock (used if API is down) ───────────────────────────────────────

function weekDate(dayOffset: number): string {
  const today = new Date();
  const dow = today.getDay();
  const diff = dow === 0 ? -6 : 1 - dow;
  const d = new Date(today);
  d.setDate(today.getDate() + diff + dayOffset);
  d.setHours(12, 0, 0, 0);
  return d.toISOString();
}

const FALLBACK_WEEK: WeekMenu = [
  {
    date: weekDate(0),
    restaurant: "Resto U' le Capu",
    starters: [],
    mains: [
      { name: 'Poulet rôti jus de thym', description: 'Gratin dauphinois', price: 3.30 },
      { name: 'Sans viande : lasagnes épinard chèvre', price: 3.30 },
    ],
    desserts: [],
  },
  {
    date: weekDate(1),
    restaurant: "Resto U' le Capu",
    starters: [],
    mains: [
      { name: 'Bœuf bourguignon', description: 'Carottes, champignons, purée', price: 3.30 },
      { name: 'Sans viande : chili sin carne', price: 3.30 },
    ],
    desserts: [],
  },
  {
    date: weekDate(2),
    restaurant: "Resto U' le Capu",
    starters: [],
    mains: [
      { name: 'Tajine d\'agneau aux pruneaux', description: 'Couscous', price: 3.30 },
      { name: 'Sans viande : curry de pois chiches', price: 3.30 },
    ],
    desserts: [],
  },
  {
    date: weekDate(3),
    restaurant: "Resto U' le Capu",
    starters: [],
    mains: [
      { name: 'Saumon grillé', description: 'Beurre blanc, haricots verts', price: 3.30 },
      { name: 'Sans viande : tarte aux légumes', price: 3.30 },
    ],
    desserts: [],
  },
  {
    date: weekDate(4),
    restaurant: "Resto U' le Capu",
    starters: [],
    mains: [
      { name: 'Confit de canard', description: 'Pommes sarladaises', price: 3.30 },
      { name: 'Sans viande : quiche aux légumes', price: 3.30 },
    ],
    desserts: [],
  },
];
