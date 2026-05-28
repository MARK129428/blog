import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MdxFrontmatter } from '@/types/mdx';
import { extractToc, TocItem } from './extractToc';

export interface MdxPost {
  meta: MdxFrontmatter;
  content: string;
  toc: TocItem[];
  headingIdMap: Record<string, string[]>; // 原始文本到实际 ID 数组的映射（处理重复标题）
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

  // 提取目录
  const toc = extractToc(content);

  // 创建标题文本到 ID 的映射（处理重复标题）
  // 使用数组存储，因为可能有多个相同文本的标题
  const headingIdMap = new Map<string, string[]>();
  const buildIdMap = (items: TocItem[]) => {
    items.forEach((item) => {
      if (!headingIdMap.has(item.text)) {
        headingIdMap.set(item.text, []);
      }
      headingIdMap.get(item.text)!.push(item.id);
      if (item.children) {
        buildIdMap(item.children);
      }
    });
  };
  buildIdMap(toc);

  // 转换为普通对象以便序列化
  const headingIdMapObj: Record<string, string[]> = {};
  headingIdMap.forEach((ids, text) => {
    headingIdMapObj[text] = ids;
  });

  return {
    meta,
    content: content.trim(),
    toc,
    headingIdMap: headingIdMapObj,
  };
}
