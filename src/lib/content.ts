import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MdxFrontmatter, MdxPostMeta } from '@/types/mdx';
import { estimateReadingTime } from './readingTime';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

export function parseDate(rawDate: unknown): string | undefined {
  if (!rawDate) return undefined;
  if (rawDate instanceof Date) return rawDate.toISOString().split('T')[0];
  return String(rawDate);
}

export function getCatalogNames(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export async function getAllPostSlugs(): Promise<
  { catalog: string; slug: string }[]
> {
  const catalogs = getCatalogNames();
  const slugs: { catalog: string; slug: string }[] = [];
  for (const catalog of catalogs) {
    const dir = path.join(CONTENT_DIR, catalog);
    if (!fs.existsSync(dir)) continue;
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
    for (const file of files) {
      slugs.push({ catalog, slug: file.replace(/\.mdx?$/, '') });
    }
  }
  return slugs;
}

export async function getAllPosts(): Promise<MdxPostMeta[]> {
  const catalogs = getCatalogNames();
  const posts: MdxPostMeta[] = [];

  for (const catalog of catalogs) {
    const dir = path.join(CONTENT_DIR, catalog);
    if (!fs.existsSync(dir)) continue;
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

    for (const filename of files) {
      const fullPath = path.join(dir, filename);
      const file = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(file);

      posts.push({
        slug: filename.replace(/\.mdx?$/, ''),
        catalog,
        ...(data as MdxFrontmatter),
        date: parseDate(data.date),
        readingTime: estimateReadingTime(content),
      } satisfies MdxPostMeta);
    }
  }

  posts.sort(
    (a, b) =>
      new Date(b.date || '').getTime() - new Date(a.date || '').getTime(),
  );

  return posts;
}
