export interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}

/**
 * 从文本中提取标题并生成目录结构
 * 排除代码块中的内容
 */
export function extractToc(content: string): TocItem[] {
  // 先移除代码块内容，避免代码中的 # 被误识别为标题
  // 移除 Markdown 代码块 (```...```)
  const markdownCodeBlockRegex = /```[\s\S]*?```/g;
  let cleanedContent = content.replace(markdownCodeBlockRegex, '');

  // 移除 MDX CodeBlock 组件及其内容
  const codeBlockComponentRegex = /<CodeBlock[^>]*>[\s\S]*?<\/CodeBlock>/g;
  cleanedContent = cleanedContent.replace(codeBlockComponentRegex, '');

  // 也移除行内代码
  const inlineCodeRegex = /`[^`]+`/g;
  const finalContent = cleanedContent.replace(inlineCodeRegex, '');

  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  const stack: TocItem[] = [];
  const idCounts = new Map<string, number>(); // 跟踪 ID 出现次数

  let match;
  while ((match = headingRegex.exec(finalContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    
    // 跳过空文本
    if (!text) continue;
    
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

