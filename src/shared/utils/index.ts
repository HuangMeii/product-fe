import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Create a URL-friendly slug from a product name.
 * Keeps alphanumerics and replaces spaces/invalid chars with '-'.
 */
export function slugify(input?: string) {
    if (!input) return '';
    return input
        .toString()
        .normalize('NFKD') // decompose accents
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}
