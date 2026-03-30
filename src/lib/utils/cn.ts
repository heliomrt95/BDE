// src/lib/utils/cn.ts
// Lightweight className merger (wraps clsx + tailwind-merge)

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
