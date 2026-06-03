import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getCatalogNames } from './content';

export interface SearchIndexEntry {
  title: string;
  description: string;
  content: string;
  catalog: string;
  slug: string;
  tags: string[];
  date?: string;
}

let _searchIndex: SearchIndexEntry[] | null = null;

export async function buildSearchIndex(): Promise<SearchIndexEntry[]> {
  if (_searchIndex) return _searchIndex;

  const catalogs = getCatalogNames();
  const entries: SearchIndexEntry[] = [];

  for (const catalog of catalogs) {
    const dir = path.join(process.cwd(), 'src/content', catalog);
    if (!fs.existsSync(dir)) continue;

    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

    for (const filename of files) {
      const fullPath = path.join(dir, filename);
      const file = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(file);

      entries.push({
        title: data.title || filename,
        description: data.description || '',
        content: content.slice(0, 2000),
        catalog,
        slug: filename.replace(/\.mdx?$/, ''),
        tags: data.tags || [],
        date: data.date
          ? data.date instanceof Date
            ? data.date.toISOString().split('T')[0]
            : String(data.date)
          : undefined,
      });
    }
  }

  _searchIndex = entries;
  return entries;
}

export function getSearchIndex(): SearchIndexEntry[] {
  return _searchIndex || [];
}
