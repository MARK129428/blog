import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
export interface MdxFrontmatter {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  cover?: string;
  tags?: string[];
}

export interface MdxPostMeta extends MdxFrontmatter {
  slug: string;
}

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

    const meta = data as MdxFrontmatter;

    // 确保日期是字符串格式
    const dateStr = meta.date
      ? meta.date instanceof Date
        ? meta.date.toISOString().split('T')[0]
        : String(meta.date)
      : undefined;

    return {
      slug: filename.replace(/\.mdx?$/, ''),
      ...meta,
      date: dateStr,
    } satisfies MdxPostMeta;
  });

  posts.sort((a, b) => {
    return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
  });

  return posts;
}
