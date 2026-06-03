import { Metadata } from 'next';
import { getAllPosts } from '@/lib/content';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
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

  const tags = Array.from(tagMap.entries()).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <main className='p-6 md:p-10 max-w-4xl mx-auto'>
      <h1 className='text-4xl font-bold mb-8'>标签</h1>

      {tags.length === 0 ? (
        <p className='text-muted-foreground'>暂无标签。</p>
      ) : (
        <div className='flex flex-wrap gap-3'>
          {tags.map(([tag, count]) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge
                variant='secondary'
                className='text-sm px-4 py-2 hover:bg-accent transition-colors'
              >
                {tag}
                <span className='ml-2 text-muted-foreground'>{count}</span>
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
