import { MDXRemote } from 'next-mdx-remote/rsc';
import { createHeadingComponents } from '@/components/mdx/mdx-headings';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import { rehypePrettyCodeOptions } from '@/lib/rehypePrettyCode';
import { rehypePreMermaid } from '@/lib/rehypeMermaid';
import type { MdxFrontmatter } from '@/types/mdx';

interface MdxBodyProps {
  content: string;
  meta: MdxFrontmatter;
  headingIdMap: Record<string, string[]>;
}

export function MdxBody({ content, meta, headingIdMap }: MdxBodyProps) {
  return (
    <MDXRemote
      source={content}
      options={{
        scope: { frontmatter: meta },
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [
            rehypePreMermaid,
            rehypeKatex,
            [rehypePrettyCode, rehypePrettyCodeOptions],
          ],
        },
      }}
      components={createHeadingComponents(headingIdMap)}
    />
  );
}
