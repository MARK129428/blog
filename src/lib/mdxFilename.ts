/** MDX 文件名：`YYYY-MM-DD-slug.mdx`，便于按日期管理 */
const DATE_PREFIX_RE = /^(\d{4}-\d{2}-\d{2})-/;

export function getFormattedDate(date = new Date()): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function toSlug(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** 生成不带扩展名的 MDX 文件名（含日期前缀） */
export function buildMdxBasename(date: string, slug: string): string {
  const cleanSlug = slug.replace(DATE_PREFIX_RE, '').replace(/^-|-$/g, '');
  if (!cleanSlug) {
    throw new Error('slug 不能为空');
  }
  return `${date}-${cleanSlug}`;
}

export function mdxBasenameFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, '');
}

export function isThoughtCatalog(catalog: string): boolean {
  return catalog.toLowerCase() === 'thoughts';
}
