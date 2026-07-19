import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

export function timeAgo(date: string | Date): string {
  const then = typeof date === "string" ? new Date(date) : date;
  const diff = (Date.now() - then.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

/**
 * Debounce a function.
 */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms = 300): T {
  let id: ReturnType<typeof setTimeout> | null = null;
  return ((...args: unknown[]) => {
    if (id) clearTimeout(id);
    id = setTimeout(() => fn(...args), ms);
  }) as T;
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate an id-safe slug.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Safe window check (SSR friendly).
 */
export const isBrowser = typeof window !== "undefined";

/**
 * Group an array by a key.
 */
export function groupBy<T, K extends string | number>(
  arr: T[],
  fn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce<Record<K, T[]>>((acc, item) => {
    const key = fn(item);
    (acc[key] ||= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}
