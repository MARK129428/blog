import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MdxFrontmatter, MdxPostMeta } from '@/types/mdx';
import { parseDate } from './content';
import { estimateReadingTime } from './readingTime';

export async function getMdxList(catalog: string): Promise<MdxPostMeta[]> {
  const dir = path.join(process.cwd(), 'src/content', catalog);

  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const posts = files.map((filename) => {
    const fullPath = path.join(dir, filename);
    const file = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(file);

    const meta: MdxFrontmatter = {
      ...(data as MdxFrontmatter),
      date: parseDate(data.date),
    };

    const content = file.replace(/---[\s\S]*?---/, '').trim();
    return {
      slug: filename.replace(/\.mdx?$/, ''),
      catalog,
      ...meta,
      readingTime: estimateReadingTime(content),
    } satisfies MdxPostMeta;
  });

  posts.sort((a, b) => {
    return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
  });

  return posts;
}
