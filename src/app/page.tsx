import { getAllPosts } from '@/lib/content';
import { PostCard } from '@/components/home/PostCard';
import { TagFilter } from '@/components/home/TagFilter';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const posts = await getAllPosts();

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
    <main className='max-w-6xl mx-auto p-6 md:p-10'>
      <div className='mb-8'>
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
    </main>
  );
}
