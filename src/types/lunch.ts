// src/types/lunch.ts

export interface LunchDish {
  name: string;
  description?: string;
  price?: number;
}

export interface LunchMenu {
  date: string; // ISO 8601
  restaurant: string;
  starters: LunchDish[];
  mains: LunchDish[];
  desserts: LunchDish[];
}
