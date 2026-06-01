import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes dynamically and safely resolve utility overlaps.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
