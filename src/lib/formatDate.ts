export function formatDate(dateStr?: string): string {
  if (!dateStr) return '';

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
