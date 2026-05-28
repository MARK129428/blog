import React, { type ComponentProps } from 'react';
import { Tip } from '@/components/mdx/Tip';
import { MdxImage } from '@/components/mdx/MdxImage';
import { AuthorBio } from '@/components/article/AuthorBio';
import { DynamicMermaid } from '@/components/mdx/DynamicMermaid';
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
      <p className='mb-4 leading-relaxed text-foreground' {...props} />
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
      <code className='bg-muted px-1.5 py-0.5 rounded text-sm font-mono before:content-none after:content-none' {...props} />
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
      return (
        <pre
          className='my-4 overflow-x-auto rounded-lg border border-border bg-[#0d1117] p-0 [&>code]:block [&>code]:p-4'
          {...props}
        />
      );
    },
    figure: (props: ComponentProps<'figure'>) => (
      <figure className='my-4 not-prose' {...props} />
    ),
  };
}
