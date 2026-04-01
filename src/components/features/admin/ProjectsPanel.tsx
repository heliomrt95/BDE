'use client';

import { useState, useEffect, useTransition } from 'react';
import { adminGetProjects, adminCreateProject, adminUpdateProject, adminDeleteProject, type ProjectInsert } from '@/services/adminService';
import type { Project } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUpload from '@/components/ui/ImageUpload';
import AdminTable, { Td } from './AdminTable';

const TYPE_LABELS: Record<string, string> = {
  web: 'Web',
  design: 'Design',
  video: 'Vidéo',
  photo: 'Photo',
  other: 'Autre',
};

const EMPTY_FORM: ProjectInsert = {
  title: '',
  description: '',
  author: '',
  authors: [],
  year: '',
  type: 'web',
  tags: [],
  thumbnail: '',
  image_url: '',
  project_url: '',
};

export default function ProjectsPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectInsert>(EMPTY_FORM);
  const [tagsRaw, setTagsRaw] = useState('');
  const [authorsRaw, setAuthorsRaw] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await adminGetProjects();
      setProjects(data);
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

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setTagsRaw('');
    setAuthorsRaw('');
    setFormError(null);
    setShowForm(true);
  }

  function openEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      author: project.author,
      authors: project.authors ?? [],
      year: project.year,
      type: project.type,
      tags: project.tags,
      thumbnail: project.thumbnail,
      image_url: project.image_url ?? '',
      project_url: project.project_url ?? '',
    });
    setTagsRaw(project.tags.join(', '));
    setAuthorsRaw((project.authors ?? []).join(', '));
    setFormError(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setTagsRaw('');
    setAuthorsRaw('');
    setFormError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      setFormError('Titre et auteur requis.');
      return;
    }
    setFormError(null);
    const tags = tagsRaw.split(',').map((t) => t.trim()).filter(Boolean);
    const authors = authorsRaw.split(',').map((a) => a.trim()).filter(Boolean);
    startTransition(async () => {
      try {
        if (editingId) {
          const updated = await adminUpdateProject(editingId, { ...form, tags, authors });
          setProjects((prev) => prev.map((p) => p.id === editingId ? updated : p));
        } else {
          const created = await adminCreateProject({ ...form, tags, authors });
          setProjects((prev) => [created, ...prev]);
        }
        closeForm();
      } catch (e) {
        setFormError(e instanceof Error ? e.message : 'Erreur');
      }
    });
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await adminDeleteProject(id);
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirm(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Erreur lors de la suppression');
      }
    });
  }

  const columns = [
    { key: 'title', label: 'Projet' },
    { key: 'author', label: 'Auteur', width: 'w-32' },
    { key: 'type', label: 'Type', width: 'w-24' },
    { key: 'year', label: 'Année', width: 'w-24' },
    { key: 'actions', label: '', width: 'w-40' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-white text-xl">Portfolio</h2>
          <p className="text-brand-light/50 text-xs mt-0.5">{projects.length} projets</p>
        </div>
        <Button
          variant={showForm && !editingId ? 'secondary' : 'primary'}
          size="sm"
          onClick={showForm && !editingId ? closeForm : openCreate}
        >
          {showForm && !editingId ? 'Annuler' : '+ Nouveau projet'}
        </Button>
      </div>

      {/* Form (create or edit) */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-brand-mid/30 bg-brand-mid/10 p-5 flex flex-col gap-4"
        >
          <p className="font-pixel text-[10px] uppercase tracking-widest text-brand-accent">
            {editingId ? 'Modifier le projet' : 'Nouveau projet'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input id="title" name="title" label="Titre *" value={form.title} onChange={handleChange} required />
            <Input id="author" name="author" label="Auteur principal *" value={form.author} onChange={handleChange} required />
            <Input id="authorsRaw" name="authorsRaw" label="Équipe (séparés par virgule)" value={authorsRaw} onChange={(e) => setAuthorsRaw(e.target.value)} placeholder="Léa M., Hugo T." />
            <Input id="year" name="year" label="Année" placeholder="2025–2026" value={form.year} onChange={handleChange} />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="type" className="text-small font-medium text-text-secondary">Type</label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full bg-surface-raised/60 text-white border border-border rounded-md px-4 py-2.5 text-body transition-all duration-fast ease-smooth focus:outline-none focus:border-brand-mid focus:bg-surface-raised focus:shadow-glow-purple"
              >
                <option value="web">Web</option>
                <option value="design">Design</option>
                <option value="video">Vidéo</option>
                <option value="photo">Photo</option>
                <option value="other">Autre</option>
              </select>
            </div>
            <Input id="tagsRaw" name="tagsRaw" label="Tags (séparés par virgule)" value={tagsRaw} onChange={(e) => setTagsRaw(e.target.value)} placeholder="UX, Next.js, Figma" />
            <Input id="project_url" name="project_url" label="Lien du projet" value={form.project_url ?? ''} onChange={handleChange} />
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
          <ImageUpload
            folder="projects"
            label="Image du projet (thumbnail)"
            value={form.thumbnail}
            onChange={(url) => setForm((f) => ({ ...f, thumbnail: url }))}
          />
          {formError && <p className="text-red-400 text-xs">{formError}</p>}
          <div className="flex gap-3">
            <Button type="submit" variant="accent" size="sm" disabled={isPending}>
              {isPending ? 'Enregistrement…' : editingId ? 'Enregistrer' : 'Ajouter au portfolio'}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={closeForm}>Annuler</Button>
          </div>
        </form>
      )}

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-400/20 px-4 py-3 text-red-300 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="rounded-xl border border-brand-mid/20 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`flex gap-4 px-4 py-3.5 ${i < 3 ? 'border-b border-brand-mid/10' : ''} ${i % 2 !== 0 ? 'bg-brand-mid/5' : ''}`}>
              <div className="h-4 w-48 rounded bg-brand-mid/20 animate-pulse" />
              <div className="h-4 w-24 rounded bg-brand-mid/15 animate-pulse" />
              <div className="h-4 w-16 rounded bg-brand-mid/15 animate-pulse" />
              <div className="h-4 w-20 rounded bg-brand-mid/10 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <AdminTable
          columns={columns}
          rows={projects}
          emptyMessage="Aucun projet. Ajoute le premier !"
          renderRow={(project) => (
            <>
              <Td className="font-medium text-white max-w-xs truncate" title={project.title}>
                <div className="flex items-center gap-2.5">
                  {project.thumbnail && (
                    <img src={project.thumbnail} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
                  )}
                  {project.title}
                </div>
              </Td>
              <Td className="text-brand-light/60 text-xs">{project.author}</Td>
              <Td className="text-brand-light/60 text-xs">{TYPE_LABELS[project.type] ?? project.type}</Td>
              <Td className="text-brand-light/60 text-xs">{project.year || '—'}</Td>
              <Td>
                {deleteConfirm === project.id ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDelete(project.id)} disabled={isPending} className="text-xs text-red-400 hover:text-red-300 font-medium disabled:opacity-40">Confirmer</button>
                    <button onClick={() => setDeleteConfirm(null)} disabled={isPending} className="text-xs text-brand-light/40 hover:text-brand-light/70 disabled:opacity-40">Annuler</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button onClick={() => openEdit(project)} disabled={isPending} className="text-xs text-brand-light/50 hover:text-white transition-colors duration-150 disabled:opacity-40">Modifier</button>
                    <button onClick={() => setDeleteConfirm(project.id)} disabled={isPending} className="text-xs text-brand-light/40 hover:text-red-400 transition-colors duration-150 disabled:opacity-40">Supprimer</button>
                  </div>
                )}
              </Td>
            </>
          )}
        />
      )}
    </div>
  );
}
