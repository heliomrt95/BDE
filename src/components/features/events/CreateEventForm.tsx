// src/components/features/events/CreateEventForm.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { createEvent } from '@/services/eventService.client';
import { cn } from '@/lib/utils/cn';
import type { EventCategory } from '@/types';

const CATEGORIES: { value: EventCategory; label: string }[] = [
  { value: 'bde', label: 'BDE' },
  { value: 'university', label: 'Université' },
  { value: 'bordeaux', label: 'Bordeaux' },
];

interface CreateEventFormProps {
  userId: string;
}

export default function CreateEventForm({ userId }: CreateEventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<EventCategory>('bde');
  const [imageUrl, setImageUrl] = useState('');

  function formatDisplayDate(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createEvent({
        title,
        description: description || undefined,
        date: formatDisplayDate(startDate),
        start_date: new Date(startDate).toISOString(),
        end_date: endDate ? new Date(endDate).toISOString() : undefined,
        location: location || undefined,
        category,
        image_url: imageUrl || undefined,
        created_by: userId,
      });

      router.push('/events');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn(
      'rounded-xl overflow-hidden',
      'bg-surface-raised/40 border border-border/50',
      'backdrop-blur-lg',
    )}>
      <div className="h-[3px] w-full bg-gradient-to-r from-brand-accent via-brand-mid to-transparent" />
      <div className="p-6 md:p-8 flex flex-col gap-5">
      <Input
        id="event-title"
        label="Titre"
        type="text"
        placeholder="Soirée d'intégration"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        disabled={loading}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="event-description" className="text-small font-medium text-text-secondary">
          Description
        </label>
        <textarea
          id="event-description"
          placeholder="Décris ton événement..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          disabled={loading}
          className={cn(
            'w-full bg-surface-raised/60 text-white',
            'border border-border rounded-md',
            'px-4 py-2.5 text-body',
            'placeholder:text-text-muted',
            'transition-all duration-fast ease-smooth',
            'focus:outline-none focus:border-brand-mid focus:shadow-glow-purple focus:bg-surface-raised',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'resize-y min-h-[100px]',
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          id="event-start"
          label="Date de début"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          id="event-end"
          label="Date de fin (optionnel)"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={loading}
        />
      </div>

      <Input
        id="event-location"
        label="Lieu"
        type="text"
        placeholder="Campus Bordeaux Montaigne"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        disabled={loading}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-small font-medium text-text-secondary">
          Catégorie
        </label>
        <div className="flex gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              disabled={loading}
              className={cn(
                'px-4 py-2 rounded-md text-small font-medium',
                'border transition-all duration-fast',
                category === cat.value
                  ? 'bg-brand-accent text-brand-dark border-brand-accent'
                  : 'border-border text-text-secondary hover:border-brand-mid/60 hover:text-white',
                'disabled:opacity-40',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <Input
        id="event-image"
        label="URL de l'image (optionnel)"
        type="url"
        placeholder="https://..."
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        disabled={loading}
      />

      {error && (
        <p role="alert" className="text-small text-red-400 text-center bg-red-400/10 rounded-md py-2 px-3">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={loading}
        className="w-full mt-2"
        glow
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Création...
          </span>
        ) : (
          'Créer l\'événement'
        )}
      </Button>
      </div>
    </form>
  );
}
