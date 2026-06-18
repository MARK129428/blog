import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { getRecentThoughts } from '@/lib/thoughts';
import { PostCard } from '@/components/home/PostCard';
import { HomeTagFilter } from '@/components/home/HomeTagFilter';
import { formatDate } from '@/lib/formatDate';

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
    <div className='max-w-6xl mx-auto p-6 md:p-10'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
          <span>{posts.length} 篇文章</span>
          <span>·</span>
          <span>{allTags.length} 个标签</span>
          {thoughts.length > 0 && (
            <>
              <span>·</span>
              <Link href='/thoughts' className='hover:text-foreground transition-colors'>
                {thoughts.length} 条说说
              </Link>
            </>
          )}
        </div>
      </div>

      <HomeTagFilter allTags={allTags} allPosts={posts} />

      {thoughts.length > 0 && (
        <section className='mt-12'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold'>最新说说</h2>
            <Link
              href='/thoughts'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              查看全部 →
            </Link>
          </div>
          <div className='space-y-3'>
            {thoughts.map((thought) => (
              <div
                key={thought.slug}
                className='p-4 rounded-lg border border-border bg-card'
              >
                <p className='text-xs text-muted-foreground mb-1.5'>
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
