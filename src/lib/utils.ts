import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInDays, format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd MMM yyyy');
}

export function calculateRentalDays(pickupDate: Date, returnDate: Date): number {
  const days = differenceInDays(returnDate, pickupDate);
  return Math.max(1, days);
}

export function calculateTotalAmount(pricePerDay: number, days: number): number {
  return pricePerDay * days;
}

export function generateBookingId(): string {
  return `PSR${Date.now().toString(36).toUpperCase()}`;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    scooter: 'Scooter',
    motorcycle: 'Motorcycle',
    premium: 'Premium Bike',
  };
  return labels[category] || category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    scooter: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    motorcycle: 'bg-green-500/20 text-green-400 border-green-500/30',
    premium: 'bg-brand-orange/20 text-brand-orange border-brand-orange/30',
  };
  return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
}
