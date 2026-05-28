import { getMdxContent } from '@/lib/getMdxContent';
import { getMdxList } from '@/lib/getMdxList';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { createHeadingComponents } from '@/components/mdx/mdx-headings';
import { TableOfContents } from '@/components/article/TableOfContents';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from 'lucide-react';
import rehypePrettyCode from 'rehype-pretty-code';
import { rehypePrettyCodeOptions } from '@/lib/rehypePrettyCode';
import fs from 'fs';
import path from 'path';

export const revalidate = 3600;

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'src/content');
  if (!fs.existsSync(contentDir)) return [];

  const catalogs = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const params: { catalog: string; slug: string }[] = [];
  for (const catalog of catalogs) {
    const posts = await getMdxList(catalog);
    for (const post of posts) {
      params.push({ catalog, slug: post.slug });
    }
  }
  return params;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ catalog: string; slug: string }>;
}) {
  const { catalog, slug } = await params;
  const { meta, content, toc, headingIdMap } = await getMdxContent(catalog, slug);

  return (
    <div className='flex gap-8 p-6 md:p-10 max-w-7xl mx-auto'>
      <article className='prose lg:prose-xl dark:prose-invert flex-1 min-w-0'>
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
            <p className='text-lg text-muted-foreground mb-4 italic'>{meta.description}</p>
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
                <Badge key={tag} variant='secondary'>{tag}</Badge>
              ))}
            </div>
          )}
        </div>

        <Separator className='mb-8' />

        <div className='mt-8'>
          <MDXRemote
            source={content}
            options={{
              scope: { frontmatter: meta },
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
              },
            }}
            components={createHeadingComponents(headingIdMap)}
          />
        </div>
      </article>

      <aside className='hidden lg:block w-64 flex-shrink-0'>
        <TableOfContents items={toc} />
      </aside>
    </div>
  );
}
