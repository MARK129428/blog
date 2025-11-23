export interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}

/**
 * 从文本中提取标题并生成目录结构
 */
export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  const stack: TocItem[] = [];
  const idCounts = new Map<string, number>(); // 跟踪 ID 出现次数

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    let id = generateId(text);

    // 如果 ID 已存在，添加数字后缀确保唯一性
    const count = idCounts.get(id) || 0;
    if (count > 0) {
      id = `${id}-${count}`;
    }
    idCounts.set(generateId(text), count + 1);

    const item: TocItem = {
      id,
      text,
      level,
    };

    // 构建层级结构
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      headings.push(item);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(item);
    }

    stack.push(item);
  }

  return headings;
}

/**
 * 生成标题 ID（用于锚点）
 */
export function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .trim();
}

