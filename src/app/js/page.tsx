// src/app/js/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getMdxList, MdxPostMeta } from '@/lib/getMdxList';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function jsIndexPage() {
  const posts: MdxPostMeta[] = getMdxList('js'); // 服务端执行
  console.log(posts, 'posts');
  return (
    <main className='p-4 sm:p-8 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8 text-center sm:text-left'>
        最新文章
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
        {posts.map((post) => (
          <Link key={post.slug} href={`/js/${post.slug}`}>
            <Card className='flex flex-col cursor-pointer border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-105'>
              {/* 封面图 */}
              {post.cover && (
                <div className='relative w-full aspect-video overflow-hidden'>
                  <Image
                    src={post.cover}
                    alt={post.title}
                    className='object-cover w-full h-full transition-transform duration-500 hover:scale-110'
                    width={400}
                    height={225}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent'></div>
                </div>
              )}

              <CardContent className='flex-1 p-4 flex flex-col'>
                <CardTitle className='text-lg font-semibold mb-1 line-clamp-2'>
                  {post.title}
                </CardTitle>
                <CardDescription className='text-xs text-muted-foreground mb-2'>
                  {post.date}
                </CardDescription>

                <div className='mt-2 text-right'>
                  <span className='text-xs text-blue-600 hover:underline'>
                    阅读全文 →
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
