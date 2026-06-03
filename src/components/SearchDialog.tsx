'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import type { SearchIndexEntry } from '@/lib/search';

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const [index, setIndex] = useState<SearchIndexEntry[]>([]);

  useEffect(() => {
    fetch('/api/search')
      .then((res) => res.json())
      .then(setIndex)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const doSearch = useCallback(
    async (q: string) => {
      setQuery(q);
      if (!q.trim() || index.length === 0) {
        setResults([]);
        return;
      }

      const { default: Fuse } = await import('fuse.js');
      const fuse = new Fuse(index, {
        keys: ['title', 'description', 'content', 'tags'],
        threshold: 0.3,
        includeScore: true,
      });
      setResults(fuse.search(q).map((r) => r.item));
    },
    [index],
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted rounded-md hover:bg-accent transition-colors'
      >
        <Search className='w-4 h-4' />
        <span className='hidden sm:inline'>搜索文章...</span>
        <kbd className='hidden sm:inline ml-2 px-1.5 py-0.5 text-xs rounded border border-border bg-background'>
          Ctrl+K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-2xl p-0 gap-0'>
          <DialogTitle className='sr-only'>搜索文章</DialogTitle>
          <div className='p-4 border-b border-border'>
            <input
              type='text'
              placeholder='输入关键词搜索...'
              value={query}
              onChange={(e) => doSearch(e.target.value)}
              className='w-full px-4 py-3 text-lg bg-transparent border-0 outline-none placeholder:text-muted-foreground'
              autoFocus
            />
          </div>

          {results.length > 0 && (
            <div className='max-h-96 overflow-y-auto'>
              <div className='p-2'>
                {results.map((item) => (
                  <Link
                    key={`${item.catalog}-${item.slug}`}
                    href={`/${item.catalog}/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className='block p-3 rounded-lg hover:bg-accent transition-colors'
                  >
                    <div className='flex items-center gap-2 mb-1'>
                      <span className='font-medium'>{item.title}</span>
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant='outline' className='text-xs'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {item.description && (
                      <p className='text-sm text-muted-foreground line-clamp-1'>
                        {item.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className='p-8 text-center text-muted-foreground'>
              未找到相关文章
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
