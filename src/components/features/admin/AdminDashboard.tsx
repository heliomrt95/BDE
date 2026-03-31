'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import EventsPanel from './EventsPanel';
import PostsPanel from './PostsPanel';
import ProductsPanel from './ProductsPanel';

type Tab = 'events' | 'posts' | 'products';

const TABS: { id: Tab; label: string }[] = [
  { id: 'events', label: 'Événements' },
  { id: 'posts', label: 'Articles' },
  { id: 'products', label: 'Produits' },
];

interface AdminDashboardProps {
  userName: string;
}

export default function AdminDashboard({ userName }: AdminDashboardProps) {
  const [tab, setTab] = useState<Tab>('events');

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome */}
      <div>
        <p className="font-pixel text-[10px] uppercase tracking-widest text-brand-accent mb-1">Admin</p>
        <h1 className="font-display text-white text-2xl md:text-3xl">
          Bonjour, {userName.split(' ')[0]}.
        </h1>
      </div>

      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Sections du tableau de bord"
        className="flex gap-1 p-1 rounded-xl bg-brand-mid/10 border border-brand-mid/20 w-fit"
      >
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-brand',
              tab === id
                ? 'bg-brand-mid text-white shadow-inner-glow'
                : 'text-brand-light/60 hover:text-brand-light hover:bg-brand-mid/20',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="min-h-[400px]" key={tab}>
        {tab === 'events' && <EventsPanel />}
        {tab === 'posts' && <PostsPanel />}
        {tab === 'products' && <ProductsPanel />}
      </div>
    </div>
  );
}
