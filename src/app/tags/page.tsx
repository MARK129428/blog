import { Metadata } from 'next';
import { getAllPosts } from '@/lib/content';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `标签 - ${siteConfig.title}`,
  description: '浏览所有文章标签',
};

export default async function TagsPage() {
  const posts = await getAllPosts();
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags || []) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  const tags = Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <main className='mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-16'>
      <div className='mb-10 border-b border-border/60 pb-8'>
        <p className='mb-2 text-sm font-medium tracking-wide text-muted-foreground uppercase'>
          Tags
        </p>
        <h1 className='text-3xl font-bold tracking-tight md:text-5xl'>标签</h1>
      </div>

      {tags.length === 0 ? (
        <p className='text-sm text-muted-foreground'>暂无标签。</p>
      ) : (
        <div className='flex flex-wrap gap-2'>
          {tags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className='inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm transition-colors hover:border-foreground/20'
            >
              {tag}
              <span className='text-muted-foreground'>{count}</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
