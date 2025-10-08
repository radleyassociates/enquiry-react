export const formatNumber = (value: number | null | undefined, locale = 'en-US'): string => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Number(value));
};

export const formatCurrency = (value: number | null | undefined, locale = 'en-US', currency = 'USD'): string => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(Number(value));
};