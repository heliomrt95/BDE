// src/types/portfolio.ts

export type ProjectType = 'web' | 'design' | 'video' | 'photo' | 'other';

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Primary author name */
  author: string;
  /** Co-authors / team members */
  authors?: string[];
  /** Display-ready year (e.g. "2025–2026") */
  year: string;
  type: ProjectType;
  tags: string[];
  /** Card thumbnail URL */
  thumbnail: string;
  imageUrl?: string;
  projectUrl?: string;
}
