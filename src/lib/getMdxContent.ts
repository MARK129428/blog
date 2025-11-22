import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MdxFrontmatter } from './getMdxList';

export interface MdxPost {
  meta: MdxFrontmatter;
  content: string;
}

export async function getMdxContent(
  catalog: string,
  slug: string,
): Promise<MdxPost> {
  const filePath = path.join(
    process.cwd(),
    'src/content',
    catalog,
    `${slug}.mdx`,
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`文件不存在: ${filePath}`);
  }

  const file = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(file);

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

  // 移除 MDX 文件中的 import 语句和注释，因为这些组件会通过 components prop 传递
  const cleanedContent = content
    .replace(/^\/\/.*$/gm, '') // 移除单行注释
    .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '') // 移除 import 语句
    .trim();

  return {
    meta,
    content: cleanedContent,
  };
}
