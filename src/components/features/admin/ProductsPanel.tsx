'use client';

import { useState, useEffect, useTransition } from 'react';
import { adminGetProducts, adminCreateProduct, adminDeleteProduct, type ProductInsert } from '@/services/adminService';
import type { Product } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AdminTable, { Td } from './AdminTable';
import { cn } from '@/lib/utils/cn';

const STATUS_CONFIG = {
  available: { label: 'Disponible', className: 'bg-emerald-500/15 text-emerald-300' },
  out_of_stock: { label: 'Épuisé', className: 'bg-red-500/15 text-red-300' },
  coming_soon: { label: 'Bientôt', className: 'bg-brand-accent/15 text-brand-accent' },
} as const;

const EMPTY_FORM: ProductInsert = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  status: 'available',
  sizes: [],
  colors: [],
};

export default function ProductsPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ProductInsert>(EMPTY_FORM);
  const [sizesRaw, setSizesRaw] = useState('');
  const [colorsRaw, setColorsRaw] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await adminGetProducts();
      setProducts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const value = e.target.name === 'price' ? parseFloat(e.target.value) || 0 : e.target.value;
    setForm((f) => ({ ...f, [e.target.name]: value }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setFormError('Le nom est requis.');
      return;
    }
    setFormError(null);
    const sizes = sizesRaw.split(',').map((s) => s.trim()).filter(Boolean);
    const colors = colorsRaw.split(',').map((c) => c.trim()).filter(Boolean);
    startTransition(async () => {
      try {
        const created = await adminCreateProduct({ ...form, sizes, colors });
        setProducts((prev) => [...prev, created]);
        setForm(EMPTY_FORM);
        setSizesRaw('');
        setColorsRaw('');
        setShowForm(false);
      } catch (e) {
        setFormError(e instanceof Error ? e.message : 'Erreur lors de la création');
      }
    });
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await adminDeleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirm(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Erreur lors de la suppression');
      }
    });
  }

  const columns = [
    { key: 'name', label: 'Produit' },
    { key: 'price', label: 'Prix', width: 'w-20' },
    { key: 'status', label: 'Statut', width: 'w-28' },
    { key: 'sizes', label: 'Tailles', width: 'w-32' },
    { key: 'actions', label: '', width: 'w-28' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-white text-xl">Produits</h2>
          <p className="text-brand-light/50 text-xs mt-0.5">{products.length} au total</p>
        </div>
        <Button
          variant={showForm ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => { setShowForm((v) => !v); setFormError(null); }}
        >
          {showForm ? 'Annuler' : '+ Nouveau produit'}
        </Button>
      </div>

      {/* Inline create form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-brand-mid/30 bg-brand-mid/10 p-5 flex flex-col gap-4"
        >
          <p className="font-pixel text-[10px] uppercase tracking-widest text-brand-accent">Nouveau produit</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input id="name" name="name" label="Nom *" value={form.name} onChange={handleChange} required />
            <Input id="price" name="price" label="Prix (€)" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} />
            <Input id="imageUrl" name="imageUrl" label="Image URL" value={form.imageUrl} onChange={handleChange} />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="status" className="text-small font-medium text-text-secondary">Statut</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-surface-raised/60 text-white border border-border rounded-md px-4 py-2.5 text-body transition-all duration-fast ease-smooth focus:outline-none focus:border-brand-mid focus:bg-surface-raised focus:shadow-glow-purple"
              >
                <option value="available">Disponible</option>
                <option value="out_of_stock">Épuisé</option>
                <option value="coming_soon">Bientôt</option>
              </select>
            </div>
            <Input id="sizesRaw" name="sizesRaw" label="Tailles (séparées par virgule)" value={sizesRaw} onChange={(e) => setSizesRaw(e.target.value)} placeholder="XS, S, M, L, XL" />
            <Input id="colorsRaw" name="colorsRaw" label="Coloris (séparés par virgule)" value={colorsRaw} onChange={(e) => setColorsRaw(e.target.value)} placeholder="Noir, Blanc, Violet" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-small font-medium text-text-secondary">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-surface-raised/60 text-white border border-border rounded-md px-4 py-2.5 text-body transition-all duration-fast ease-smooth focus:outline-none focus:border-brand-mid focus:bg-surface-raised focus:shadow-glow-purple resize-none placeholder:text-text-muted"
            />
          </div>
          {formError && <p className="text-red-400 text-xs">{formError}</p>}
          <div className="flex gap-3">
            <Button type="submit" variant="accent" size="sm" disabled={isPending}>
              {isPending ? 'Création…' : 'Créer le produit'}
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
              <div className="h-4 w-40 rounded bg-brand-mid/20 animate-pulse" />
              <div className="h-4 w-16 rounded bg-brand-mid/15 animate-pulse" />
              <div className="h-4 w-20 rounded bg-brand-mid/15 animate-pulse" />
              <div className="h-4 w-28 rounded bg-brand-mid/10 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <AdminTable
          columns={columns}
          rows={products}
          emptyMessage="Aucun produit. Ajoute le premier !"
          renderRow={(product) => {
            const s = STATUS_CONFIG[product.status];
            return (
              <>
                <Td className="font-medium text-white">{product.name}</Td>
                <Td className="text-brand-light/80 tabular-nums">{product.price.toFixed(2).replace('.', ',')} €</Td>
                <Td>
                  <span className={cn('px-2 py-0.5 rounded text-[10px] font-pixel uppercase tracking-wider', s.className)}>
                    {s.label}
                  </span>
                </Td>
                <Td className="text-brand-light/50 text-xs">{product.sizes?.join(', ') || '—'}</Td>
                <Td>
                  {deleteConfirm === product.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={isPending}
                        className="text-xs text-red-400 hover:text-red-300 font-medium"
                      >
                        Confirmer
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="text-xs text-brand-light/40 hover:text-brand-light/70"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(product.id)}
                      className="text-xs text-brand-light/40 hover:text-red-400 transition-colors duration-150"
                    >
                      Supprimer
                    </button>
                  )}
                </Td>
              </>
            );
          }}
        />
      )}
    </div>
  );
}
