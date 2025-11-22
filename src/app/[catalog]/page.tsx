import { getMdxList } from '@/lib/getMdxList';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag } from 'lucide-react';

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ catalog: string }>;
}) {
  const { catalog } = await params;
  const posts = await getMdxList(catalog);

  return (
    <main className='p-6 md:p-10'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-2'>分類：{catalog}</h1>
        <p className='text-muted-foreground'>
          共 {posts.length} 篇文章
        </p>
      </div>

      {posts.length === 0 && (
        <Card className='p-12 text-center'>
          <p className='text-muted-foreground'>沒有文章。</p>
        </Card>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${catalog}/${post.slug}`}
            className='block h-full'
          >
            <Card className='h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group'>
              {/* 头图 */}
              {post.cover && (
                <div className='relative w-full h-48 overflow-hidden bg-muted'>
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className='object-cover group-hover:scale-110 transition-transform duration-500'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    unoptimized={
                      post.cover.startsWith('/') &&
                      !post.cover.startsWith('//')
                    }
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </div>
              )}

              <CardHeader className='flex-1'>
                <div className='flex items-start justify-between gap-2 mb-2'>
                  <CardTitle className='text-xl line-clamp-2 group-hover:text-primary transition-colors'>
                    {post.title}
                  </CardTitle>
                </div>
                {post.description && (
                  <CardDescription className='line-clamp-2'>
                    {post.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className='flex-1'>
                {post.tags && post.tags.length > 0 && (
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant='secondary'
                        className='text-xs'
                      >
                        <Tag className='w-3 h-3 mr-1' />
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant='outline' className='text-xs'>
                        +{post.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>

              <CardFooter className='flex items-center justify-between text-sm text-muted-foreground border-t pt-4'>
                {post.date && (
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4' />
                    <span>{String(post.date)}</span>
                  </div>
                )}
                {post.author && (
                  <span className='text-xs'>{post.author}</span>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
