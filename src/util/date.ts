export function formatDateTimeNs(timestamp: number) {
  return new Date(timestamp).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Africa/Johannesburg'
  });
}

export function formatDateTime(timestamp: number) {
  return formatDateTimeNs(timestamp * 1000);
}