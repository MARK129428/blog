import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { getRecentThoughts } from '@/lib/thoughts';
import { HomeTagFilter } from '@/components/home/HomeTagFilter';
import { formatDate } from '@/lib/formatDate';
import { siteConfig } from '@/config/site';

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getAllPosts();
  const thoughts = await getRecentThoughts(3);

  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const t of post.tags || []) {
      tagSet.add(t);
    }
  }
  const allTags = Array.from(tagSet).sort();

  return (
    <div className='mx-auto max-w-6xl px-6 md:px-10'>
      <section className='border-b border-border/60 py-16 text-center md:py-24'>
        <p className='mb-4 text-sm font-medium tracking-wide text-muted-foreground uppercase'>
          Personal Blog
        </p>
        <h1 className='text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.1]'>
          {siteConfig.title}
        </h1>
        <p className='mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg'>
          {siteConfig.description}
        </p>
        <div className='mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground'>
          <span>{posts.length} 篇文章</span>
          <span className='text-border'>|</span>
          <span>{allTags.length} 个标签</span>
          {thoughts.length > 0 && (
            <>
              <span className='text-border'>|</span>
              <Link href='/thoughts' className='vercel-link'>
                {thoughts.length} 条说说
              </Link>
            </>
          )}
        </div>
      </section>

      <section className='py-12 md:py-16'>
        <div className='mb-8 flex items-end justify-between gap-4'>
          <div>
            <h2 className='text-2xl font-semibold tracking-tight'>最新文章</h2>
            <p className='mt-1 text-sm text-muted-foreground'>
              记录学习与生活的点滴
            </p>
          </div>
        </div>

        <HomeTagFilter allTags={allTags} allPosts={posts} />
      </section>

      {thoughts.length > 0 && (
        <section className='border-t border-border/60 py-12 md:py-16'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-2xl font-semibold tracking-tight'>最新说说</h2>
            <Link href='/thoughts' className='vercel-link text-sm'>
              查看全部 →
            </Link>
          </div>
          <div className='divide-y divide-border/60 rounded-lg border border-border/60 bg-card/50'>
            {thoughts.map((thought) => (
              <div key={thought.slug} className='px-5 py-4'>
                <p className='mb-2 text-xs text-muted-foreground'>
                  {formatDate(thought.date)}
                </p>
                <p className='text-sm leading-relaxed'>{thought.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
