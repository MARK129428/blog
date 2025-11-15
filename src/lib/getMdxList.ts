import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MdxPostMeta {
  slug: string;
  filename: string;
  title: string;
  date: string;
  description?: string;
  cover?: string;
  tags?: string[];
}

export function getMdxList(moduleName: string): MdxPostMeta[] {
  const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', moduleName);
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      // 解析 YAML frontmatter
      const { data } = matter(fileContent);
      console.log(data);
      return {
        slug: filename.replace(/\.(mdx|md)$/, ''),
        filename,
        title: data.title ?? filename.replace(/\.(mdx|md)$/, ''),
        date: data.date ?? '',
        description: data.description ?? '',
        cover: data.cover ?? '/avatar.jpeg',
        tags: data.tags ?? [],
      };
    });
}
