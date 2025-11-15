import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getMdxList(moduleName: string) {
  const CONTENT_DIR = path.join(process.cwd(), 'src', `content/${moduleName}`);
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      return {
        slug: filename.replace(/\.(mdx|md)$/, ''),
        filename,
        title: data.title || filename.replace(/\.(mdx|md)$/, ''),
        date: data.date || '',
      };
    });
}
