import { PostCard } from '@/components/home/PostCard';
import type { MdxPostMeta } from '@/types/mdx';

interface RelatedPostsProps {
  posts: MdxPostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className='not-prose mt-12'>
      <h2 className='text-2xl font-bold mb-6'>相关文章</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {posts.map((post) => (
          <PostCard key={`${post.catalog}-${post.slug}`} post={post} />
        ))}
      </div>
    </section>
  );
}
