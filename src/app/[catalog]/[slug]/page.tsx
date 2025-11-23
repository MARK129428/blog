import { getMdxContent } from '@/lib/getMdxContent';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CodeBlock } from '@/components/CodeBlock';
import { Tip } from '@/components/Tip';
import { AuthorBio } from '@/components/AuthorBio';
import { TableOfContents } from '@/components/TableOfContents';
import { MdxImage } from '@/components/MdxImage';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from 'lucide-react';
import { generateId } from '@/lib/extractToc';
import { getTextContent } from '@/lib/getTextContent';
import type { ComponentProps } from 'react';
import React from 'react';

type HeadingProps = ComponentProps<'h1'>;
type ParagraphProps = ComponentProps<'p'>;
type UnorderedListProps = ComponentProps<'ul'>;
type OrderedListProps = ComponentProps<'ol'>;
type ListItemProps = ComponentProps<'li'>;
type BlockquoteProps = ComponentProps<'blockquote'>;
type CodeProps = ComponentProps<'code'>;
type AnchorProps = ComponentProps<'a'>;

// 创建标题组件工厂函数，使用 headingIdMap
const createHeadingComponents = (
  headingIdMap: Record<string, string[]>
) => {
  // 用于跟踪每个标题文本出现的次数
  const headingCounters = new Map<string, number>();

  return {
  CodeBlock,
  Tip,
  AuthorBio,
  Image: MdxImage, // 使用可点击放大的图片组件
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Separator,
  h1: (props: HeadingProps) => {
    const text = getTextContent(props.children);
    let id: string | undefined;
    if (text) {
      const ids = headingIdMap[text];
      if (ids && ids.length > 0) {
        const count = headingCounters.get(text) || 0;
        id = ids[count] || ids[0];
        headingCounters.set(text, count + 1);
      } else {
        id = generateId(text);
      }
    }
    return (
      <h1
        id={id}
        className='text-4xl font-bold mt-8 mb-4 scroll-mt-20'
        {...props}
      />
    );
  },
  h2: (props: HeadingProps) => {
    const text = getTextContent(props.children);
    let id: string | undefined;
    if (text) {
      const ids = headingIdMap[text];
      if (ids && ids.length > 0) {
        const count = headingCounters.get(text) || 0;
        id = ids[count] || ids[0];
        headingCounters.set(text, count + 1);
      } else {
        id = generateId(text);
      }
    }
    return (
      <h2
        id={id}
        className='text-3xl font-bold mt-6 mb-3 scroll-mt-20'
        {...props}
      />
    );
  },
  h3: (props: HeadingProps) => {
    const text = getTextContent(props.children);
    let id: string | undefined;
    if (text) {
      const ids = headingIdMap[text];
      if (ids && ids.length > 0) {
        const count = headingCounters.get(text) || 0;
        id = ids[count] || ids[0];
        headingCounters.set(text, count + 1);
      } else {
        id = generateId(text);
      }
    }
    return (
      <h3
        id={id}
        className='text-2xl font-semibold mt-4 mb-2 scroll-mt-20'
        {...props}
      />
    );
  },
  h4: (props: HeadingProps) => {
    const text = getTextContent(props.children);
    let id: string | undefined;
    if (text) {
      const ids = headingIdMap[text];
      if (ids && ids.length > 0) {
        const count = headingCounters.get(text) || 0;
        id = ids[count] || ids[0];
        headingCounters.set(text, count + 1);
      } else {
        id = generateId(text);
      }
    }
    return (
      <h4
        id={id}
        className='text-xl font-semibold mt-4 mb-2 scroll-mt-20'
        {...props}
      />
    );
  },
  p: (props: ParagraphProps) => (
    <p className='mb-4 leading-relaxed text-foreground' {...props} />
  ),
  ul: (props: UnorderedListProps) => (
    <ul className='list-disc list-inside mb-4 space-y-2 ml-4' {...props} />
  ),
  ol: (props: OrderedListProps) => (
    <ol className='list-decimal list-inside mb-4 space-y-2 ml-4' {...props} />
  ),
  li: (props: ListItemProps) => (
    <li className='ml-2' {...props} />
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote className='border-l-4 border-primary pl-4 italic my-4 py-2 bg-muted/50 rounded-r' {...props} />
  ),
  code: (props: CodeProps) => (
    <code className='bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground' {...props} />
  ),
  a: (props: AnchorProps) => (
    <a 
      className='hover:underline font-medium text-blue-600' 
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props} 
    />
  ),
  hr: () => <Separator className='my-8' />,
  table: (props: ComponentProps<'table'>) => (
    <div className='my-6 overflow-x-auto'>
      <table className='w-full border-collapse border border-border rounded-lg' {...props} />
    </div>
  ),
  thead: (props: ComponentProps<'thead'>) => (
    <thead className='bg-muted' {...props} />
  ),
  tbody: (props: ComponentProps<'tbody'>) => (
    <tbody {...props} />
  ),
  tr: (props: ComponentProps<'tr'>) => (
    <tr className='border-b border-border hover:bg-muted/50 transition-colors' {...props} />
  ),
  th: (props: ComponentProps<'th'>) => (
    <th className='border border-border px-4 py-2 text-left font-semibold' {...props} />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td className='border border-border px-4 py-2' {...props} />
  ),
  };
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ catalog: string; slug: string }>;
}) {
  const { catalog, slug } = await params;
  const { meta, content, toc, headingIdMap } = await getMdxContent(
    catalog,
    slug
  );

  return (
    <div className='flex gap-8 p-6 md:p-10 max-w-7xl mx-auto'>
      {/* 主内容区 */}
      <article className='prose lg:prose-xl dark:prose-invert flex-1 min-w-0'>
      {/* 头图 */}
      {meta.cover && (
        <div className='relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700'>
          <Image
            src={meta.cover}
            alt={meta.title}
            fill
            className='object-cover'
            priority
            sizes='(max-width: 768px) 100vw, 896px'
            unoptimized={meta.cover.startsWith('/') && !meta.cover.startsWith('//')}
          />
        </div>
      )}

      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-4'>{meta.title}</h1>
        
        {meta.description && (
          <p className='text-lg text-muted-foreground mb-4 italic'>
            {meta.description}
          </p>
        )}

        <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
          {meta.date && (
            <div className='flex items-center gap-2'>
              <Calendar className='w-4 h-4' />
              <span>{String(meta.date)}</span>
            </div>
          )}
          {meta.author && (
            <div className='flex items-center gap-2'>
              <span>作者：{meta.author}</span>
            </div>
          )}
        </div>

        {meta.tags && meta.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-4'>
            {meta.tags.map((tag) => (
              <Badge key={tag} variant='secondary'>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator className='mb-8' />

        <div className='mt-8'>
          <MDXRemote
            source={content}
            options={{
              scope: {
                frontmatter: meta,
              },
            }}
            components={createHeadingComponents(headingIdMap)}
          />
        </div>
    </article>

      {/* 目录 */}
      <aside className='hidden lg:block w-64 flex-shrink-0'>
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
