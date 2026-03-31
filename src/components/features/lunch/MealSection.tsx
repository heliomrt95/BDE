// Meal section: one course category (starters / mains / desserts)

import { LunchDish } from '@/types/lunch';
import { cn } from '@/lib/utils/cn';

const COLOR_MAP = {
  green: {
    border: 'border-l-emerald-500/60',
    label: 'text-emerald-400',
    badge: 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/20',
    heading: 'text-emerald-400/80',
  },
  orange: {
    border: 'border-l-orange-400/60',
    label: 'text-orange-400',
    badge: 'bg-orange-950/50 text-orange-300 border border-orange-400/20',
    heading: 'text-orange-400/80',
  },
  purple: {
    border: 'border-l-brand-mid/80',
    label: 'text-brand-light/80',
    badge: 'bg-brand-mid/20 text-brand-light/70 border border-brand-mid/30',
    heading: 'text-brand-light/60',
  },
} as const;

interface MealSectionProps {
  title: string;
  emoji: string;
  dishes: LunchDish[];
  color: keyof typeof COLOR_MAP;
}

export default function MealSection({ title, emoji, dishes, color }: MealSectionProps) {
  const c = COLOR_MAP[color];

  if (dishes.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-lg leading-none" aria-hidden="true">{emoji}</span>
          <h3 className={cn('font-pixel text-[11px] uppercase tracking-widest', c.heading)}>
            {title}
          </h3>
        </div>
        <p className="text-brand-light/30 text-sm italic pl-1">Non renseigné</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Section heading */}
      <div className="flex items-center gap-2.5 pb-1 border-b border-brand-mid/20">
        <span className="text-lg leading-none" aria-hidden="true">{emoji}</span>
        <h3 className={cn('font-pixel text-[11px] uppercase tracking-widest', c.heading)}>
          {title}
        </h3>
      </div>

      {/* Dish list */}
      <ul className="flex flex-col gap-2">
        {dishes.map((dish, i) => (
          <li
            key={i}
            className={cn(
              'pl-3 border-l-2 py-0.5',
              c.border,
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-display text-white text-sm leading-snug">{dish.name}</p>
                {dish.description && (
                  <p className="text-brand-light/50 text-xs leading-relaxed mt-0.5">
                    {dish.description}
                  </p>
                )}
              </div>
              {dish.price !== undefined && dish.price > 0 && (
                <span className={cn('shrink-0 text-xs font-pixel px-2 py-1 rounded-md tabular-nums', c.badge)}>
                  {dish.price.toFixed(2).replace('.', ',')}€
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
