import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { getRecentThoughts } from '@/lib/thoughts';
import { PostCard } from '@/components/home/PostCard';
import { TagFilter } from '@/components/home/TagFilter';
import { formatDate } from '@/lib/formatDate';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const posts = await getAllPosts();
  const thoughts = await getRecentThoughts(3);

  // Collect all unique tags
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const t of post.tags || []) {
      tagSet.add(t);
    }
  }
  const allTags = Array.from(tagSet).sort();

  // Filter by selected tag
  const filtered = tag
    ? posts.filter((p) => (p.tags || []).includes(tag))
    : posts;

  return (
    <main className='max-w-[784px] mx-auto p-6 md:p-10'>
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

      <div className='mb-6'>
        <TagFilter allTags={allTags} activeTag={tag || null} />
      </div>

      {tag && (
        <p className='text-muted-foreground mb-6'>
          标签「{tag}」共 {filtered.length} 篇文章
        </p>
      )}

      {filtered.length === 0 ? (
        <p className='text-muted-foreground text-center py-12'>暂无文章。</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filtered.map((post) => (
            <PostCard key={`${post.catalog}-${post.slug}`} post={post} />
          ))}
        </div>
      )}

      {thoughts.length > 0 && !tag && (
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
    </main>
  );
}
