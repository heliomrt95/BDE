// src/services/adminService.ts
// Client-side Supabase mutations for admin CRUD operations.

import { createClient } from '@/lib/supabase/client';
import type { Event, EventInsert, Post, Product, Project } from '@/types';

// ── Error mapping ─────────────────────────────────────────────────────────────

function friendlyError(error: { code?: string; message?: string }): string {
  switch (error.code) {
    case '23505': return 'Cette entrée existe déjà (doublon). Vérifie le slug ou l\'identifiant.';
    case '23502': return 'Un champ obligatoire est manquant.';
    case '23503': return 'Référence invalide — l\'élément lié n\'existe pas.';
    case '42501': return 'Permission refusée. Vérifie que tu es bien connecté en tant qu\'admin.';
    case 'PGRST116': return 'Aucun résultat trouvé.';
    default: return error.message ?? 'Une erreur inattendue s\'est produite.';
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert empty string to null for timestamp fields. */
function ts(v: string | null | undefined): string | null { return v || null; }

// ── Validation helpers ────────────────────────────────────────────────────────

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function validatePost(post: Omit<Post, 'id' | 'created_at'>): string | null {
  if (!post.title.trim()) return 'Le titre est requis.';
  if (!post.slug.trim()) return 'Le slug est requis.';
  if (!SLUG_RE.test(post.slug)) return 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets.';
  if (!post.content.trim()) return 'Le contenu est requis.';
  if (!post.author.trim()) return 'L\'auteur est requis.';
  return null;
}

function validateProduct(product: Omit<Product, 'id'>): string | null {
  if (!product.name.trim()) return 'Le nom est requis.';
  if (product.price < 0) return 'Le prix ne peut pas être négatif.';
  return null;
}

function validateEvent(event: EventInsert): string | null {
  if (!event.title.trim()) return 'Le titre est requis.';
  if (!event.start_date) return 'La date de début est requise.';
  return null;
}

// ── Events ────────────────────────────────────────────────────────────────────

export async function adminCreateEvent(event: EventInsert): Promise<Event> {
  const err = validateEvent(event);
  if (err) throw new Error(err);

  const supabase = createClient();
  const { data, error } = await supabase
    .from('events')
    .insert({ ...event, start_date: ts(event.start_date), end_date: ts(event.end_date) })
    .select()
    .single();
  if (error) throw new Error(friendlyError(error));
  return data as Event;
}

export async function adminUpdateEvent(id: string, event: Partial<EventInsert>): Promise<Event> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('events')
    .update({ ...event, start_date: ts(event.start_date), end_date: ts(event.end_date) })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(friendlyError(error));
  return data as Event;
}

export async function adminDeleteEvent(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) throw new Error(friendlyError(error));
}

export async function adminGetEvents(): Promise<Event[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: false });
  if (error) throw new Error(friendlyError(error));
  return (data ?? []) as Event[];
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export type PostInsert = Omit<Post, 'id' | 'created_at'>;

export async function adminCreatePost(post: PostInsert): Promise<Post> {
  const err = validatePost(post);
  if (err) throw new Error(err);

  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .insert({ ...post, published_at: ts(post.published_at) })
    .select()
    .single();
  if (error) throw new Error(friendlyError(error));
  return data as Post;
}

export async function adminUpdatePost(id: string, post: Partial<PostInsert>): Promise<Post> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .update({ ...post, published_at: ts(post.published_at) })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(friendlyError(error));
  return data as Post;
}

export async function adminDeletePost(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw new Error(friendlyError(error));
}

export async function adminGetPosts(): Promise<Post[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) throw new Error(friendlyError(error));
  return (data ?? []) as Post[];
}

// ── Products ──────────────────────────────────────────────────────────────────

export type ProductInsert = Omit<Product, 'id'>;

export async function adminCreateProduct(product: ProductInsert): Promise<Product> {
  const err = validateProduct(product);
  if (err) throw new Error(err);

  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();
  if (error) throw new Error(friendlyError(error));
  return data as Product;
}

export async function adminUpdateProduct(id: string, product: Partial<ProductInsert>): Promise<Product> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(friendlyError(error));
  return data as Product;
}

export async function adminDeleteProduct(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw new Error(friendlyError(error));
}

export async function adminGetProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw new Error(friendlyError(error));
  return (data ?? []) as Product[];
}

// ── Projects ──────────────────────────────────────────────────────────────────

export type ProjectInsert = Omit<Project, 'id' | 'created_at'>;

function validateProject(p: ProjectInsert): string | null {
  if (!p.title.trim()) return 'Le titre est requis.';
  if (!p.author.trim()) return 'L\'auteur est requis.';
  return null;
}

export async function adminGetProjects(): Promise<Project[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(friendlyError(error));
  return (data ?? []) as Project[];
}

export async function adminUpdateProject(id: string, project: Partial<ProjectInsert>): Promise<Project> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(friendlyError(error));
  return data as Project;
}

export async function adminCreateProject(project: ProjectInsert): Promise<Project> {
  const err = validateProject(project);
  if (err) throw new Error(err);
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();
  if (error) throw new Error(friendlyError(error));
  return data as Project;
}

export async function adminDeleteProject(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(friendlyError(error));
}
