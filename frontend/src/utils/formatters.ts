/**
 * Format Stellar public key to shortened version
 */
export function formatAddress(address: string | null, chars = 8): string {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Format XLM amount with proper decimals
 */
export function formatXLM(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 7,
  }).format(num);
}

/**
 * Convert stroops to XLM
 * 1 XLM = 10,000,000 stroops
 */
export function stroopsToXLM(stroops: number | string): number {
  const num = typeof stroops === 'string' ? parseInt(stroops, 10) : stroops;
  return num / 10_000_000;
}

/**
 * Convert XLM to stroops
 */
export function xlmToStroops(xlm: number | string): number {
  const num = typeof xlm === 'string' ? parseFloat(xlm) : xlm;
  return num * 10_000_000;
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format datetime for display
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number = 50): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}
