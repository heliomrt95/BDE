'use client';

// Drag-and-drop / click-to-upload image field.
// Uploads to Supabase Storage and returns the public URL via onChange.

import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils/cn';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string; // e.g. "events", "posts", "products", "projects"
  label?: string;
}

export default function ImageUpload({ value, onChange, folder = 'misc', label = 'Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Fichier non supporté. Utilise JPG, PNG ou WebP.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image trop lourde (max 5 Mo).');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const supabase = createClient();
      const ext = file.name.split('.').pop() ?? 'jpg';
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(path, file, { upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('uploads').getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  }

  function handleFile(file: File | undefined) {
    if (file) upload(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-small font-medium text-text-secondary">{label}</label>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed',
          'cursor-pointer transition-all duration-fast select-none',
          dragging
            ? 'border-brand-accent bg-brand-accent/10'
            : 'border-border/40 hover:border-brand-mid/60 hover:bg-brand-mid/5',
          value ? 'min-h-[100px]' : 'min-h-[80px] py-5',
          uploading && 'opacity-60 cursor-wait',
        )}
      >
        {value ? (
          <>
            {/* Preview */}
            <img
              src={value}
              alt="Aperçu"
              className="w-full max-h-40 object-cover rounded-lg"
            />
            <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 text-white text-[10px]">
              Cliquer pour changer
            </span>
          </>
        ) : (
          <>
            <span className="text-2xl text-text-muted" aria-hidden="true">↑</span>
            <p className="text-small text-text-muted text-center">
              {uploading ? 'Upload en cours…' : 'Déposer une image ou cliquer pour choisir'}
            </p>
            <p className="text-caption text-text-muted/60">JPG, PNG, WebP — max 5 Mo</p>
          </>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-brand-dark/60 backdrop-blur-sm">
            <div className="w-5 h-5 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      {value && !uploading && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onChange(''); }}
          className="self-start text-caption text-text-muted/60 hover:text-red-400 transition-colors duration-fast"
        >
          Supprimer l&apos;image
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
