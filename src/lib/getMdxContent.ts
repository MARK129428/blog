import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MdxFrontmatter } from '@/types/mdx';
import { extractToc, TocItem } from './extractToc';
import { parseDate } from './content';
import { estimateReadingTime } from './readingTime';

export interface MdxPost {
  meta: MdxFrontmatter;
  content: string;
  toc: TocItem[];
  headingIdMap: Record<string, string[]>;
  readingTime: number;
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

  const meta: MdxFrontmatter = {
    ...(data as MdxFrontmatter),
    date: parseDate(data.date),
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
    readingTime: estimateReadingTime(content),
  };
}
