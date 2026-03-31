'use client';

import { useState, useEffect, useTransition } from 'react';
import { adminGetEvents, adminCreateEvent, adminDeleteEvent } from '@/services/adminService';
import type { Event, EventInsert } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AdminTable, { Td } from './AdminTable';
import { cn } from '@/lib/utils/cn';

const CATEGORY_LABELS: Record<string, { label: string; className: string }> = {
  bde: { label: 'BDE', className: 'bg-brand-mid/30 text-brand-light/80' },
  university: { label: 'Université', className: 'bg-emerald-500/15 text-emerald-300' },
  bordeaux: { label: 'Bordeaux', className: 'bg-orange-400/15 text-orange-300' },
};

const EMPTY_FORM: EventInsert = {
  title: '',
  description: '',
  date: '',
  start_date: '',
  end_date: '',
  location: '',
  category: 'bde',
  image_url: '',
  registration_url: '',
};

export default function EventsPanel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<EventInsert>(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await adminGetEvents();
      setEvents(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.start_date) {
      setFormError('Titre et date de début requis.');
      return;
    }
    setFormError(null);
    startTransition(async () => {
      try {
        const created = await adminCreateEvent(form);
        setEvents((prev) => [created, ...prev]);
        setForm(EMPTY_FORM);
        setShowForm(false);
      } catch (e) {
        setFormError(e instanceof Error ? e.message : 'Erreur lors de la création');
      }
    });
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await adminDeleteEvent(id);
        setEvents((prev) => prev.filter((ev) => ev.id !== id));
        setDeleteConfirm(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Erreur lors de la suppression');
      }
    });
  }

  const columns = [
    { key: 'title', label: 'Titre' },
    { key: 'category', label: 'Catégorie', width: 'w-28' },
    { key: 'date', label: 'Date', width: 'w-36' },
    { key: 'location', label: 'Lieu' },
    { key: 'actions', label: '', width: 'w-32' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-white text-xl">Événements</h2>
          <p className="text-brand-light/50 text-xs mt-0.5">{events.length} au total</p>
        </div>
        <Button
          variant={showForm ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => { setShowForm((v) => !v); setFormError(null); }}
        >
          {showForm ? 'Annuler' : '+ Nouvel événement'}
        </Button>
      </div>

      {/* Inline create form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-brand-mid/30 bg-brand-mid/10 p-5 flex flex-col gap-4"
        >
          <p className="font-pixel text-[10px] uppercase tracking-widest text-brand-accent">Nouvel événement</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input id="title" name="title" label="Titre *" value={form.title} onChange={handleChange} required />
            <Input id="location" name="location" label="Lieu" value={form.location ?? ''} onChange={handleChange} />
            <Input id="start_date" name="start_date" label="Début *" type="datetime-local" value={form.start_date} onChange={handleChange} required />
            <Input id="end_date" name="end_date" label="Fin" type="datetime-local" value={form.end_date ?? ''} onChange={handleChange} />
            <Input id="date" name="date" label="Date affichée" placeholder="ex: 15 sept. 2026" value={form.date} onChange={handleChange} />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="category" className="text-small font-medium text-text-secondary">Catégorie</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-surface-raised/60 text-white border border-border rounded-md px-4 py-2.5 text-body transition-all duration-fast ease-smooth focus:outline-none focus:border-brand-mid focus:bg-surface-raised focus:shadow-glow-purple"
              >
                <option value="bde">BDE</option>
                <option value="university">Université</option>
                <option value="bordeaux">Bordeaux</option>
              </select>
            </div>
            <Input id="image_url" name="image_url" label="Image URL" value={form.image_url ?? ''} onChange={handleChange} />
            <Input id="registration_url" name="registration_url" label="Lien inscription" value={form.registration_url ?? ''} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-small font-medium text-text-secondary">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description ?? ''}
              onChange={handleChange}
              rows={3}
              className="w-full bg-surface-raised/60 text-white border border-border rounded-md px-4 py-2.5 text-body transition-all duration-fast ease-smooth focus:outline-none focus:border-brand-mid focus:bg-surface-raised focus:shadow-glow-purple resize-none placeholder:text-text-muted"
            />
          </div>
          {formError && <p className="text-red-400 text-xs">{formError}</p>}
          <div className="flex gap-3">
            <Button type="submit" variant="accent" size="sm" disabled={isPending}>
              {isPending ? 'Création…' : 'Créer l\'événement'}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>Annuler</Button>
          </div>
        </form>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-400/20 px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="rounded-xl border border-brand-mid/20 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`flex gap-4 px-4 py-3.5 ${i < 3 ? 'border-b border-brand-mid/10' : ''} ${i % 2 !== 0 ? 'bg-brand-mid/5' : ''}`}>
              <div className="h-4 w-48 rounded bg-brand-mid/20 animate-pulse" />
              <div className="h-4 w-20 rounded bg-brand-mid/15 animate-pulse" />
              <div className="h-4 w-24 rounded bg-brand-mid/15 animate-pulse" />
              <div className="h-4 w-32 rounded bg-brand-mid/10 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <AdminTable
          columns={columns}
          rows={events}
          emptyMessage="Aucun événement. Crée le premier !"
          renderRow={(ev) => (
            <>
              <Td className="font-medium text-white max-w-xs truncate" title={ev.title}>{ev.title}</Td>
              <Td>
                <span className={cn('px-2 py-0.5 rounded text-[10px] font-pixel uppercase tracking-wider', CATEGORY_LABELS[ev.category]?.className)}>
                  {CATEGORY_LABELS[ev.category]?.label ?? ev.category}
                </span>
              </Td>
              <Td className="text-brand-light/60 text-xs">{ev.date || ev.start_date?.slice(0, 10)}</Td>
              <Td className="text-brand-light/60 text-xs truncate max-w-[160px]" title={ev.location ?? undefined}>{ev.location ?? '—'}</Td>
              <Td>
                {deleteConfirm === ev.id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(ev.id)}
                      disabled={isPending}
                      className="text-xs text-red-400 hover:text-red-300 font-medium disabled:opacity-40"
                    >
                      Confirmer
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      disabled={isPending}
                      className="text-xs text-brand-light/40 hover:text-brand-light/70 disabled:opacity-40"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(ev.id)}
                    disabled={isPending}
                    className="text-xs text-brand-light/40 hover:text-red-400 transition-colors duration-150 disabled:opacity-40"
                  >
                    Supprimer
                  </button>
                )}
              </Td>
            </>
          )}
        />
      )}
    </div>
  );
}
