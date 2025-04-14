import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number | undefined, decimals = 2) => {
  return value !== undefined
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: decimals,
      }).format(value)
    : null;
};

export const formatBtcAmount = (amount: number | undefined | null): string => {
  return amount ? amount.toFixed(3) : '0.000';
};
