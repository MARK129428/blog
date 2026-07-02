'use client';

import { useState, useMemo } from 'react';
import { PostCard } from '@/components/home/PostCard';
import type { MdxPostMeta } from '@/types/mdx';
import { cn } from '@/lib/utils';

interface Props {
  allTags: string[];
  allPosts: MdxPostMeta[];
}

export function HomeTagFilter({ allTags, allPosts }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeTag) return allPosts;
    return allPosts.filter((p) => (p.tags || []).includes(activeTag));
  }, [activeTag, allPosts]);

  return (
    <>
      {allTags.length > 0 && (
        <div className='mb-8 flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={() => setActiveTag(null)}
            className={cn(
              'rounded-full border px-3 py-1 text-sm transition-colors',
              activeTag === null
                ? 'border-foreground bg-foreground text-background'
                : 'border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground',
            )}
          >
            全部
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type='button'
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm transition-colors',
                tag === activeTag
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground',
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {activeTag && (
        <p className='mb-6 text-sm text-muted-foreground'>
          标签「{activeTag}」共 {filtered.length} 篇文章
        </p>
      )}

      {filtered.length === 0 ? (
        <p className='py-16 text-center text-sm text-muted-foreground'>
          暂无文章。
        </p>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((post) => (
            <PostCard key={`${post.catalog}-${post.slug}`} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
