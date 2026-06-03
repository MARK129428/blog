import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseDate } from './content';

export interface Thought {
  slug: string;
  content: string;
  date?: string;
  tags?: string[];
}

const THOUGHTS_DIR = path.join(process.cwd(), 'src/content/thoughts');

export async function getThoughts(): Promise<Thought[]> {
  if (!fs.existsSync(THOUGHTS_DIR)) return [];

  const files = fs
    .readdirSync(THOUGHTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const thoughts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(THOUGHTS_DIR, filename), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug: filename.replace(/\.mdx?$/, ''),
      content: content.trim(),
      date: parseDate(data.date),
      tags: data.tags || [],
    } satisfies Thought;
  });

  thoughts.sort(
    (a, b) =>
      new Date(b.date || '').getTime() - new Date(a.date || '').getTime(),
  );

  return thoughts;
}

export async function getRecentThoughts(count = 5): Promise<Thought[]> {
  const all = await getThoughts();
  return all.slice(0, count);
}
