export * from './types';
export * from './utils';

// Utility functions
export const formatCurrency = (amount: number, currency: string = 'ALL'): string => {
  return new Intl.NumberFormat('sq-AL', {
    style: 'currency',
    currency: currency === 'ALL' ? 'EUR' : currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('sq-AL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

export const generateNIPT = (): string => {
  const prefix = 'L';
  const random = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `${prefix}${random}`;
};