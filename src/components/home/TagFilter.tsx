'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface TagFilterProps {
  allTags: string[];
  activeTag: string | null;
}

export function TagFilter({ allTags, activeTag }: TagFilterProps) {
  if (allTags.length === 0) return null;

  return (
    <div className='flex flex-wrap gap-2'>
      {allTags.map((tag) => (
        <Link
          key={tag}
          href={tag === activeTag ? '/' : `/?tag=${encodeURIComponent(tag)}`}
          prefetch
        >
          <Badge
            variant={tag === activeTag ? 'default' : 'secondary'}
            className='text-sm px-3 py-1 cursor-pointer hover:bg-accent transition-colors'
          >
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
