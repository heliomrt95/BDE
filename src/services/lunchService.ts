// src/services/lunchService.ts
// Fetches today's menu from the CROUS API.
// Actual endpoint TBD — placeholder structure ready.

import { LunchMenu } from '@/types';

const CROUS_API_BASE = process.env.CROUS_API_URL ?? '';
const RESTAURANT_ID = process.env.CROUS_RESTAURANT_ID ?? '';

export async function getLunchMenu(): Promise<LunchMenu> {
  // TODO: implement real CROUS API call
  // const res = await fetch(`${CROUS_API_BASE}/restaurants/${RESTAURANT_ID}/menus/today`);
  // const data = await res.json();
  // return mapCrousResponseToLunchMenu(data);

  return {
    date: new Date().toISOString(),
    restaurant: 'RU Bordeaux',
    starters: [],
    mains: [],
    desserts: [],
  };
}
