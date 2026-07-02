import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMdxList } from '@/lib/getMdxList';
import { PostCard } from '@/components/home/PostCard';
import { Pagination } from '@/components/Pagination';
import { getCatalogNames } from '@/lib/content';
import {
  getCatalogDescription,
  getCatalogLabel,
  isValidCatalog,
} from '@/config/catalogs';
import { siteConfig } from '@/config/site';

export const revalidate = 3600;
const POSTS_PER_PAGE = 9;

export function generateStaticParams() {
  return getCatalogNames().map((catalog) => ({ catalog }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ catalog: string }>;
}): Promise<Metadata> {
  const { catalog } = await params;
  return {
    title: `${getCatalogLabel(catalog)} - ${siteConfig.title}`,
    description: `${getCatalogLabel(catalog)}分类下的技术文章`,
  };
}

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ catalog: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { catalog } = await params;
  if (!isValidCatalog(catalog)) {
    notFound();
  }

  const { page: pageStr } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageStr || '1', 10) || 1);

  const posts = await getMdxList(catalog);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pagedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div className='mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16'>
      <div className='mb-10 border-b border-border/60 pb-8'>
        <p className='mb-2 text-sm font-medium tracking-wide text-muted-foreground uppercase'>
          Category
        </p>
        <h1 className='text-3xl font-bold tracking-tight md:text-5xl'>
          {getCatalogLabel(catalog)}
        </h1>
        {getCatalogDescription(catalog) && (
          <p className='mt-3 max-w-2xl text-muted-foreground'>
            {getCatalogDescription(catalog)}
          </p>
        )}
        <p className='mt-4 text-sm text-muted-foreground'>
          共 {posts.length} 篇文章
        </p>
      </div>

      {posts.length === 0 && (
        <div className='rounded-lg border border-border/60 bg-card/50 p-16 text-center'>
          <p className='text-sm text-muted-foreground'>暂无文章。</p>
        </div>
      )}

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {pagedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/${catalog}`}
      />
    </div>
  );
}
