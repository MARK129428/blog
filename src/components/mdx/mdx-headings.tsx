import React, { type ComponentProps } from 'react';
import { Tip } from '@/components/mdx/Tip';
import { MdxImage } from '@/components/mdx/MdxImage';
import { AuthorBio } from '@/components/article/AuthorBio';
import { DynamicMermaid } from '@/components/mdx/DynamicMermaid';
import { TikzSvg } from '@/components/mdx/TikzSvg';
import { Music } from '@/components/mdx/Music';
import { CopyButton } from '@/components/mdx/CopyButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { generateId } from '@/lib/extractToc';
import { getTextContent } from '@/lib/getTextContent';

type HeadingProps = ComponentProps<'h1'>;
type PreProps = ComponentProps<'pre'>;

interface CodeElementProps {
  children: string;
  className?: string;
}

function makeHeading(
  level: number,
  headingIdMap: Record<string, string[]>,
  headingCounters: Map<string, number>,
) {
  const classNames: Record<number, string> = {
    1: 'text-4xl font-bold mt-8 mb-4 scroll-mt-20',
    2: 'text-3xl font-bold mt-6 mb-3 scroll-mt-20',
    3: 'text-2xl font-semibold mt-4 mb-2 scroll-mt-20',
    4: 'text-xl font-semibold mt-4 mb-2 scroll-mt-20',
  };

  return function Heading(props: HeadingProps) {
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
    return React.createElement(`h${level}`, { id, className: classNames[level], ...props });
  };
}

export function createHeadingComponents(headingIdMap: Record<string, string[]>) {
  const headingCounters = new Map<string, number>();

  return {
    Tip,
    AuthorBio,
    Mermaid: DynamicMermaid,
    mermaid: DynamicMermaid,
    TikzSvg,
    tikzsvg: TikzSvg,
    Music,
    Image: MdxImage,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Badge,
    Separator,
    h1: makeHeading(1, headingIdMap, headingCounters),
    h2: makeHeading(2, headingIdMap, headingCounters),
    h3: makeHeading(3, headingIdMap, headingCounters),
    h4: makeHeading(4, headingIdMap, headingCounters),
    p: (props: ComponentProps<'p'>) => (
      <p className='mb-4 leading-relaxed text-foreground/85' {...props} />
    ),
    ul: (props: ComponentProps<'ul'>) => (
      <ul className='list-disc list-inside mb-4 space-y-2 ml-4' {...props} />
    ),
    ol: (props: ComponentProps<'ol'>) => (
      <ol className='list-decimal list-inside mb-4 space-y-2 ml-4' {...props} />
    ),
    li: (props: ComponentProps<'li'>) => (
      <li className='ml-2' {...props} />
    ),
    blockquote: (props: ComponentProps<'blockquote'>) => (
      <blockquote className='border-l-4 border-primary pl-4 italic my-4 py-2 bg-muted/50 rounded-r' {...props} />
    ),
    code: (props: ComponentProps<'code'>) => (
      <code className='px-1.5 py-0.5 rounded text-sm font-mono before:content-none after:content-none' {...props} />
    ),
    a: (props: ComponentProps<'a'>) => (
      <a
        className='hover:underline font-medium text-blue-600'
        target={props.href?.startsWith('http') ? '_blank' : undefined}
        rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      />
    ),
    hr: () => <Separator className='my-8' />,
    table: (props: ComponentProps<'table'>) => (
      <div className='my-6 overflow-x-auto not-prose rounded-lg border border-gray-300 dark:border-gray-600'>
        <table className='w-full border-collapse text-sm' {...props} />
      </div>
    ),
    thead: (props: ComponentProps<'thead'>) => (
      <thead className='border-b-2 border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-800' {...props} />
    ),
    tbody: (props: ComponentProps<'tbody'>) => (
      <tbody className='divide-y divide-gray-200 dark:divide-gray-700' {...props} />
    ),
    tr: (props: ComponentProps<'tr'>) => (
      <tr className='hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors' {...props} />
    ),
    th: (props: ComponentProps<'th'>) => (
      <th className='px-4 py-3 text-left font-semibold text-foreground' {...props} />
    ),
    td: (props: ComponentProps<'td'>) => (
      <td className='px-4 py-2.5 text-foreground border-t border-gray-200 dark:border-gray-700' {...props} />
    ),
    pre: (props: PreProps) => {
      const codeElement = props.children as React.ReactElement<CodeElementProps>;
      if (
        codeElement &&
        React.isValidElement(codeElement) &&
        codeElement.props &&
        typeof codeElement.props.children === 'string' &&
        codeElement.props.className?.includes('language-mermaid')
      ) {
        return <DynamicMermaid>{codeElement.props.children}</DynamicMermaid>;
      }

      // Extract language label and code text
      let lang = '';
      let codeText = '';
      if (codeElement && React.isValidElement(codeElement) && codeElement.props) {
        const cls = codeElement.props.className || '';
        const match = cls.match(/language-(\w+)/);
        if (match) lang = match[1];
        codeText = getTextContent(codeElement.props.children);
      }

      return (
        <div className='my-4 relative group'>
          {lang && (
            <span className='absolute top-2 left-4 z-10 text-xs text-gray-500 dark:text-gray-400 font-mono'>
              {lang}
            </span>
          )}
          <CopyButton code={codeText} />
          <pre
            className='overflow-x-auto rounded-lg border border-border p-0 [&>code]:block [&>code]:p-4 [&>code]:pt-8'
            {...props}
          />
        </div>
      );
    },
    figure: (props: ComponentProps<'figure'>) => (
      <figure className='my-4 not-prose' {...props} />
    ),
  };
}
