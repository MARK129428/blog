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
    <main className='p-6 md:p-10 max-w-6xl mx-auto'>
      <h1 className='text-4xl font-bold mb-2'>
        标签：{tag}
      </h1>
      <p className='text-muted-foreground mb-8'>
        共 {filtered.length} 篇文章
      </p>

      {filtered.length === 0 ? (
        <p className='text-muted-foreground'>暂无文章。</p>
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
