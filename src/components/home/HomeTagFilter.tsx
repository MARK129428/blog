'use client';

import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { PostCard } from '@/components/home/PostCard';
import type { MdxPostMeta } from '@/types/mdx';

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
      <div className='flex flex-wrap gap-2 mb-6'>
        {allTags.map((tag) => (
          <button
            key={tag}
            type='button'
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
          >
            <Badge
              variant={tag === activeTag ? 'default' : 'secondary'}
              className='text-sm px-3 py-1 cursor-pointer hover:bg-accent transition-colors'
            >
              {tag}
            </Badge>
          </button>
        ))}
      </div>

      {activeTag && (
        <p className='text-muted-foreground mb-6'>
          标签「{activeTag}」共 {filtered.length} 篇文章
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
    </>
  );
}
