import { cache } from 'react';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { spawn } from 'child_process';
import type { MdxFrontmatter } from '@/types/mdx';
import { extractToc, TocItem } from './extractToc';
import { parseDate } from './content';
import { estimateReadingTime } from './readingTime';

const renderScript = path.join(process.cwd(), 'scripts/render-tikz.mjs');

function batchRenderTikz(codes: string[]): Promise<string[]> {
  return new Promise((resolve) => {
    const input = JSON.stringify(codes);
    const child = spawn('node', [renderScript], {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 60000,
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));

    child.on('error', (err) => {
      console.error('[tikz] spawn error:', err.message);
      resolve(codes.map(() => '<span class="tikz-error">Error: render process failed</span>'));
    });

    child.on('close', (code) => {
      if (stderr) console.error('[tikz]', stderr.trim());
      if (code !== 0) {
        console.error('[tikz] exit code:', code);
        resolve(codes.map(() => '<span class="tikz-error">Error: render process failed</span>'));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (err: any) {
        console.error('[tikz] parse error:', err.message);
        resolve(codes.map(() => '<span class="tikz-error">Error: invalid output</span>'));
      }
    });

    child.stdin.write(input);
    child.stdin.end();
  });
}


export interface MdxPost {
  meta: MdxFrontmatter;
  content: string;
  toc: TocItem[];
  headingIdMap: Record<string, string[]>;
  readingTime: number;
}

export const getMdxContent = cache(async function getMdxContent(
  catalog: string,
  slug: string,
): Promise<MdxPost> {
  const filePath = path.join(
    process.cwd(),
    'src/content',
    catalog,
    `${slug}.mdx`,
  );

  let file: string;
  try {
    file = await fs.readFile(filePath, 'utf8');
  } catch {
    throw new Error(`文件不存在: ${filePath}`);
  }

  const { data, content: rawContent } = matter(file);

  // TikTok preprocessing: extract tikz blocks, render them, replace with SVGs
  let content = rawContent.trim();
  const tikzRegex = /```tikz\n([\s\S]*?)```/g;
  const tikzMatches = [...content.matchAll(tikzRegex)];

  if (tikzMatches.length > 0) {
    const codes = tikzMatches.map((m) => m[1]);
    const svgs = await batchRenderTikz(codes);

    for (let i = 0; i < tikzMatches.length; i++) {
      const [fullMatch] = tikzMatches[i];
      const svg = svgs[i];
      if (svg.startsWith('<span class="tikz-error"')) {
        const errorHtml = `<div className="tikz-diagram-error my-6 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">TikZ 渲染失败</div>`;
        content = content.replace(fullMatch, errorHtml);
      } else {
        const b64 = Buffer.from(svg).toString('base64');
        const replacement = `<img src="data:image/svg+xml;base64,${b64}" alt="TikZ diagram" className="tikz-diagram my-6 mx-auto block max-w-full h-auto" />`;
        content = content.replace(fullMatch, replacement);
      }
    }
  }

  const meta: MdxFrontmatter = {
    ...(data as MdxFrontmatter),
    date: parseDate(data.date),
  };

  const toc = extractToc(content);

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

  const headingIdMapObj: Record<string, string[]> = {};
  headingIdMap.forEach((ids, text) => {
    headingIdMapObj[text] = ids;
  });

  return {
    meta,
    content,
    toc,
    headingIdMap: headingIdMapObj,
    readingTime: estimateReadingTime(content),
  };
});
