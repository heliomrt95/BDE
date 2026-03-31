'use client';

// Day pill selector — horizontal scrollable, highlights today

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

const DAY_NAMES = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const DAY_NAMES_FULL = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

interface DaySelectorProps {
  days: string[];       // ISO date strings
  selected: string;
  onSelect: (date: string) => void;
}

export default function DaySelector({ days, selected, onSelect }: DaySelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = new Date().toDateString();

  // Scroll selected pill into view on mount
  useEffect(() => {
    const el = scrollRef.current?.querySelector('[data-active="true"]') as HTMLElement | null;
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [selected]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
      role="tablist"
      aria-label="Sélectionner un jour"
    >
      {days.map((iso) => {
        const d = new Date(iso);
        const isSelected = iso === selected;
        const isToday = d.toDateString() === today;
        const dayIdx = d.getDay();
        const dateNum = d.getDate();
        const month = d.toLocaleDateString('fr-FR', { month: 'short' });

        return (
          <button
            key={iso}
            role="tab"
            aria-selected={isSelected}
            data-active={isSelected}
            onClick={() => onSelect(iso)}
            className={cn(
              'flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-xl shrink-0',
              'transition-all duration-200 focus-visible:outline-none focus-brand',
              isSelected
                ? 'bg-brand-accent text-brand-dark shadow-[0_0_16px_rgba(255,214,10,0.25)]'
                : isToday
                ? 'bg-brand-mid/10 border border-brand-accent/40 text-brand-light/70 hover:bg-brand-mid/20 hover:text-brand-light'
                : 'bg-brand-mid/10 border border-brand-mid/25 text-brand-light/70 hover:bg-brand-mid/20 hover:text-brand-light hover:border-brand-mid/40',
            )}
          >
            <span
              className={cn(
                'text-[10px] font-pixel uppercase tracking-widest leading-none',
                isSelected ? 'text-brand-dark/70' : isToday ? 'text-brand-accent' : 'text-brand-light/40',
              )}
            >
              {isToday ? 'Auj.' : DAY_NAMES[dayIdx]}
            </span>
            <span
              className={cn(
                'font-display text-lg leading-none',
                isSelected ? 'text-brand-dark' : 'text-white',
              )}
            >
              {dateNum}
            </span>
            <span
              className={cn(
                'text-[10px] font-pixel leading-none',
                isSelected ? 'text-brand-dark/60' : 'text-brand-light/40',
              )}
            >
              {month}
            </span>
            <span className="sr-only">{DAY_NAMES_FULL[dayIdx]}</span>
          </button>
        );
      })}
    </div>
  );
}
