'use client';

import { useState, useEffect, useTransition } from 'react';
import { adminGetPosts, adminCreatePost, adminDeletePost, type PostInsert } from '@/services/adminService';
import type { Post } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AdminTable, { Td } from './AdminTable';

const EMPTY_FORM: PostInsert = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  author: '',
  tags: [],
  cover_image_url: '',
  published_at: new Date().toISOString().slice(0, 16),
};

export default function PostsPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PostInsert>(EMPTY_FORM);
  const [tagsRaw, setTagsRaw] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await adminGetPosts();
      setPosts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setFormError('Titre, slug et contenu requis.');
      return;
    }
    setFormError(null);
    const tags = tagsRaw.split(',').map((t) => t.trim()).filter(Boolean);
    startTransition(async () => {
      try {
        const created = await adminCreatePost({ ...form, tags, published_at: new Date(form.published_at).toISOString() });
        setPosts((prev) => [created, ...prev]);
        setForm(EMPTY_FORM);
        setTagsRaw('');
        setShowForm(false);
      } catch (e) {
        setFormError(e instanceof Error ? e.message : 'Erreur lors de la création');
      }
    });
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await adminDeletePost(id);
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirm(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Erreur lors de la suppression');
      }
    });
  }

  const columns = [
    { key: 'title', label: 'Titre' },
    { key: 'author', label: 'Auteur', width: 'w-32' },
    { key: 'tags', label: 'Tags', width: 'w-40' },
    { key: 'published_at', label: 'Publié le', width: 'w-32' },
    { key: 'actions', label: '', width: 'w-28' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-white text-xl">Articles</h2>
          <p className="text-brand-light/50 text-xs mt-0.5">{posts.length} au total</p>
        </div>
        <Button
          variant={showForm ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => { setShowForm((v) => !v); setFormError(null); }}
        >
          {showForm ? 'Annuler' : '+ Nouvel article'}
        </Button>
      </div>

      {/* Inline create form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-brand-mid/30 bg-brand-mid/10 p-5 flex flex-col gap-4"
        >
          <p className="font-pixel text-[10px] uppercase tracking-widest text-brand-accent">Nouvel article</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input id="title" name="title" label="Titre *" value={form.title} onChange={handleChange} required />
            <Input id="slug" name="slug" label="Slug *" placeholder="mon-article" value={form.slug} onChange={handleChange} required />
            <Input id="author" name="author" label="Auteur" value={form.author} onChange={handleChange} />
            <Input id="tagsRaw" name="tagsRaw" label="Tags (séparés par virgule)" value={tagsRaw} onChange={(e) => setTagsRaw(e.target.value)} placeholder="BDE, Design, Dev" />
            <Input id="published_at" name="published_at" label="Date de publication" type="datetime-local" value={form.published_at} onChange={handleChange} />
            <Input id="cover_image_url" name="cover_image_url" label="Image de couverture" value={form.cover_image_url ?? ''} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="excerpt" className="text-small font-medium text-text-secondary">Extrait</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={form.excerpt ?? ''}
              onChange={handleChange}
              rows={2}
              className="w-full bg-surface-raised/60 text-white border border-border rounded-md px-4 py-2.5 text-body transition-all duration-fast ease-smooth focus:outline-none focus:border-brand-mid focus:bg-surface-raised focus:shadow-glow-purple resize-none placeholder:text-text-muted"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="content" className="text-small font-medium text-text-secondary">Contenu * (Markdown)</label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={8}
              required
              className="w-full bg-surface-raised/60 text-white border border-border rounded-md px-4 py-2.5 text-body font-mono text-xs transition-all duration-fast ease-smooth focus:outline-none focus:border-brand-mid focus:bg-surface-raised focus:shadow-glow-purple resize-y placeholder:text-text-muted"
              placeholder="# Mon article&#10;&#10;Contenu en Markdown..."
            />
          </div>
          {formError && <p className="text-red-400 text-xs">{formError}</p>}
          <div className="flex gap-3">
            <Button type="submit" variant="accent" size="sm" disabled={isPending}>
              {isPending ? 'Création…' : 'Publier l\'article'}
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
              <div className="h-4 w-28 rounded bg-brand-mid/15 animate-pulse" />
              <div className="h-4 w-24 rounded bg-brand-mid/10 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <AdminTable
          columns={columns}
          rows={posts}
          emptyMessage="Aucun article. Écris le premier !"
          renderRow={(post) => (
            <>
              <Td className="font-medium text-white max-w-xs truncate" title={post.title}>{post.title}</Td>
              <Td className="text-brand-light/60 text-xs">{post.author}</Td>
              <Td>
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded bg-brand-mid/25 text-brand-light/70 text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </Td>
              <Td className="text-brand-light/60 text-xs">
                {new Date(post.published_at).toLocaleDateString('fr-FR')}
              </Td>
              <Td>
                {deleteConfirm === post.id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(post.id)}
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
                    onClick={() => setDeleteConfirm(post.id)}
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
