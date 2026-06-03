'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

interface TagFilterProps {
  allTags: string[];
  activeTag: string | null;
}

export function TagFilter({ allTags, activeTag }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleTagClick(tag: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag === activeTag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    router.push(`/?${params.toString()}`);
  }

  if (allTags.length === 0) return null;

  return (
    <div className='flex flex-wrap gap-2 justify-center'>
      {allTags.map((tag) => (
        <button key={tag} onClick={() => handleTagClick(tag)}>
          <Badge
            variant={tag === activeTag ? 'default' : 'secondary'}
            className='text-sm px-3 py-1 cursor-pointer hover:bg-accent transition-colors'
          >
            {tag}
          </Badge>
        </button>
      ))}
    </div>
  );
}
