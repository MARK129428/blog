import { getAllPosts } from '@/lib/content';
import { PostCard } from '@/components/home/PostCard';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags || []) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `标签: ${tag}`,
    description: `查看所有标记为 ${tag} 的文章`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getAllPosts();
  const filtered = posts.filter((p) => (p.tags || []).includes(tag));

  return (
    <main className='mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16'>
      <div className='mb-10 border-b border-border/60 pb-8'>
        <p className='mb-2 text-sm font-medium tracking-wide text-muted-foreground uppercase'>
          Tag
        </p>
        <h1 className='text-3xl font-bold tracking-tight md:text-5xl'>{tag}</h1>
        <p className='mt-3 text-sm text-muted-foreground'>
          共 {filtered.length} 篇文章
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className='text-sm text-muted-foreground'>暂无文章。</p>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((post) => (
            <PostCard key={`${post.catalog}-${post.slug}`} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
