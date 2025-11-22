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

    // 确保日期是字符串格式
    // gray-matter 可能返回 Date 对象，需要先检查
    const rawDate = data.date;
    const dateStr = rawDate
      ? rawDate instanceof Date
        ? rawDate.toISOString().split('T')[0]
        : String(rawDate)
      : undefined;

    const meta: MdxFrontmatter = {
      ...(data as MdxFrontmatter),
      date: dateStr,
    };

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
