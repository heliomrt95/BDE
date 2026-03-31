'use client';

// Feature component: weekly CROUS lunch menu with day selection

import { useState } from 'react';
import { WeekMenu } from '@/types/lunch';
import DaySelector from './DaySelector';
import MealSection from './MealSection';
import { FadeIn } from '@/components/motion/ScrollReveal';

interface LunchMenuProps {
  menus: WeekMenu;
}

export default function LunchMenu({ menus }: LunchMenuProps) {
  const days = menus.map((m) => m.date);
  const todayStr = new Date().toDateString();
  const defaultDay =
    days.find((iso) => new Date(iso).toDateString() === todayStr) ?? days[0] ?? '';

  const [selected, setSelected] = useState<string>(defaultDay);

  const menu = menus.find((m) => m.date === selected);

  // Weekend / closed state (no menu found and not in our list)
  if (!menu) {
    return (
      <div className="flex flex-col gap-8">
        <DaySelector days={days} selected={selected} onSelect={setSelected} />
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <span className="font-pixel text-[11px] uppercase tracking-widest text-brand-accent">
            Fermé
          </span>
          <p className="font-display text-white text-xl">Le restaurant est fermé ce jour.</p>
          <p className="text-brand-light/50 text-sm">
            Le RU est ouvert du lundi au vendredi.
          </p>
        </div>
      </div>
    );
  }

  const menuDate = new Date(menu.date);
  const formattedDate = menuDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Day selector */}
      <DaySelector days={days} selected={selected} onSelect={setSelected} />

      {/* Date + restaurant label */}
      <FadeIn key={selected}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 pb-5 border-b border-brand-mid/20">
          <p className="font-display text-white text-xl capitalize">{formattedDate}</p>
          <span className="font-pixel text-[10px] uppercase tracking-widest text-brand-light/40">
            {menu.restaurant}
          </span>
        </div>

        {/* Meal sections — stacked on mobile, 3-col on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 pt-2">
          <MealSection
            title="Entrées"
            emoji="🥗"
            dishes={menu.starters}
            color="green"
          />
          <MealSection
            title="Plats"
            emoji="🍽️"
            dishes={menu.mains}
            color="orange"
          />
          <MealSection
            title="Desserts"
            emoji="🍮"
            dishes={menu.desserts}
            color="purple"
          />
        </div>

        {/* Student price note */}
        <p className="mt-8 text-brand-light/40 text-xs leading-relaxed">
          Tarif étudiant boursier&nbsp;: 1,00€ &middot; Tarif étudiant&nbsp;: 3,30€ &middot; Sur présentation de la carte étudiant.
        </p>
      </FadeIn>
    </div>
  );
}
