import { Metadata } from 'next';
import { getMdxList } from '@/lib/getMdxList';
import { PostCard } from '@/components/home/PostCard';
import { Pagination } from '@/components/Pagination';
import { Card } from '@/components/ui/card';
import { getCatalogNames } from '@/lib/content';
import { getCatalogLabel } from '@/config/catalogs';
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
  const { page: pageStr } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageStr || '1', 10) || 1);

  const posts = await getMdxList(catalog);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pagedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div className='max-w-6xl mx-auto p-6 md:p-10'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-2'>
          {getCatalogLabel(catalog)}
        </h1>
        <p className='text-muted-foreground'>共 {posts.length} 篇文章</p>
      </div>

      {posts.length === 0 && (
        <Card className='p-12 text-center'>
          <p className='text-muted-foreground'>暂无文章。</p>
        </Card>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
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
