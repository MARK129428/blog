import Link from 'next/link';
import { Metadata } from 'next';
import { getMdxContent } from '@/lib/getMdxContent';
import { getMdxList } from '@/lib/getMdxList';
import { MdxBody } from '@/components/article/MdxBody';
import { TableOfContents } from '@/components/article/TableOfContents';
import { MobileTOC } from '@/components/article/MobileTOC';
import { Giscus } from '@/components/article/Giscus';
import { ReadingProgress } from '@/components/ReadingProgress';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllPosts } from '@/lib/content';
import { siteConfig } from '@/config/site';
import { formatDate } from '@/lib/formatDate';
import 'katex/dist/katex.min.css';
export const revalidate = 3600;

export async function generateStaticParams() {
  const { getAllPostSlugs } = await import('@/lib/content');
  return getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ catalog: string; slug: string }>;
}): Promise<Metadata> {
  const { catalog, slug } = await params;
  const { meta } = await getMdxContent(catalog, slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hehk.cn';

  return {
    title: `${meta.title} - ${siteConfig.title}`,
    description: meta.description || `${meta.title} - ${siteConfig.title}`,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'article',
      publishedTime: meta.date,
      authors: [meta.author || siteConfig.author],
      tags: meta.tags,
      images: meta.cover ? [{ url: meta.cover }] : [`${baseUrl}/avatar.jpeg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: meta.cover ? [meta.cover] : [`${baseUrl}/avatar.jpeg`],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ catalog: string; slug: string }>;
}) {
  const { catalog, slug } = await params;
  const { meta, content, toc, headingIdMap, readingTime } =
    await getMdxContent(catalog, slug);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hehk.cn';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: { '@type': 'Person', name: meta.author || siteConfig.author },
    image: meta.cover ? `${baseUrl}${meta.cover}` : `${baseUrl}/avatar.jpeg`,
    url: `${baseUrl}/${catalog}/${slug}`,
  };

  return (
    <>
      <ReadingProgress />
      <div className='flex gap-8 p-6 md:p-10 max-w-5xl mx-auto'>
        <article className='prose prose-base dark:prose-invert flex-1 min-w-0 max-w-none prose-headings:font-[family-name:var(--font-newsreader)] prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline'>
          {meta.cover && (
            <div className='relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden bg-muted'>
              <Image
                src={meta.cover}
                alt={meta.title}
                fill
                className='object-cover'
                priority
                sizes='(max-width: 768px) 100vw, 784px'
                unoptimized={meta.cover.startsWith('http')}
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
                  <span>{formatDate(meta.date)}</span>
                </div>
              )}
              {meta.author && (
                <div className='flex items-center gap-2'>
                  <span>作者：{meta.author}</span>
                </div>
              )}
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4' />
                <span>约 {readingTime} 分钟阅读</span>
              </div>
            </div>

            {meta.tags && meta.tags.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-4'>
                {meta.tags.map((tag) => (
                  <Link key={tag} href={`/tags/${tag}`}>
                    <Badge variant='secondary' className='hover:bg-accent transition-colors cursor-pointer'>
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Separator className='mb-8' />

          <MdxBody content={content} meta={meta} headingIdMap={headingIdMap} />

          <PostNavigation catalog={catalog} slug={slug} />
          <RelatedPostsSection catalog={catalog} slug={slug} tags={meta.tags} />

          {siteConfig.giscus.repo && (
            <Giscus
              repo={siteConfig.giscus.repo}
              repoId={siteConfig.giscus.repoId}
              category={siteConfig.giscus.category}
              categoryId={siteConfig.giscus.categoryId}
            />
          )}
        </article>

        <aside className='hidden lg:block w-64 flex-shrink-0'>
          <TableOfContents items={toc} />
        </aside>

        <MobileTOC items={toc} />
      </div>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

async function PostNavigation({
  catalog,
  slug,
}: {
  catalog: string;
  slug: string;
}) {
  const allPosts = await getMdxList(catalog);
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  if (!prevPost && !nextPost) return null;

  return (
    <>
      <Separator className='my-8' />
      <nav className='flex justify-between gap-4 not-prose'>
        {prevPost ? (
          <Link
            href={`/${catalog}/${prevPost.slug}`}
            className='flex-1 p-4 rounded-lg border border-border hover:bg-accent transition-colors group'
          >
            <span className='text-xs text-muted-foreground flex items-center gap-1'>
              <ChevronLeft className='w-3 h-3' />上一篇
            </span>
            <span className='text-sm font-medium group-hover:text-primary transition-colors line-clamp-1'>
              {prevPost.title}
            </span>
          </Link>
        ) : (
          <div className='flex-1' />
        )}
        {nextPost ? (
          <Link
            href={`/${catalog}/${nextPost.slug}`}
            className='flex-1 p-4 rounded-lg border border-border hover:bg-accent transition-colors group text-right'
          >
            <span className='text-xs text-muted-foreground flex items-center justify-end gap-1'>
              下一篇
              <ChevronRight className='w-3 h-3' />
            </span>
            <span className='text-sm font-medium group-hover:text-primary transition-colors line-clamp-1'>
              {nextPost.title}
            </span>
          </Link>
        ) : (
          <div className='flex-1' />
        )}
      </nav>
    </>
  );
}

async function RelatedPostsSection({
  catalog,
  slug,
  tags,
}: {
  catalog: string;
  slug: string;
  tags?: string[];
}) {
  if (!tags || tags.length === 0) return null;

  const allSitePosts = await getAllPosts();
  const related = allSitePosts
    .filter(
      (p) =>
        !(p.catalog === catalog && p.slug === slug) &&
        p.tags?.some((t) => tags.includes(t)),
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  // Lazy import RelatedPosts since it's not needed immediately
  const { RelatedPosts } = await import('@/components/article/RelatedPosts');
  return <RelatedPosts posts={related} />;
}
