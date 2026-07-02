'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Search } from 'lucide-react';
import type { SearchIndexEntry } from '@/lib/search';

let _fuseInstance: any = null;
let _fuseIndex: SearchIndexEntry[] | null = null;

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const indexLoaded = useRef(false);

  useEffect(() => {
    if (indexLoaded.current) return;
    indexLoaded.current = true;
    fetch('/api/search')
      .then((res) => res.json())
      .then((data) => {
        _fuseIndex = data;
      })
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

  const doSearch = useCallback(async (q: string) => {
    setQuery(q);
    if (!q.trim() || !_fuseIndex) {
      setResults([]);
      return;
    }
    if (!_fuseInstance) {
      const { default: Fuse } = await import('fuse.js');
      _fuseInstance = new Fuse(_fuseIndex, {
        keys: ['title', 'description', 'content', 'tags'],
        threshold: 0.3,
        includeScore: true,
      });
    }
    setResults(_fuseInstance.search(q).map((r: any) => r.item));
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='flex items-center gap-2 rounded-md border border-border/60 bg-background/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground'
      >
        <Search className='h-3.5 w-3.5' />
        <span className='hidden sm:inline'>搜索</span>
        <kbd className='ml-1 hidden rounded border border-border/60 bg-muted px-1.5 py-0.5 text-[10px] sm:inline'>
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-2xl gap-0 overflow-hidden border-border/60 p-0'>
          <DialogTitle className='sr-only'>搜索文章</DialogTitle>
          <div className='border-b border-border/60 p-4'>
            <input
              type='text'
              placeholder='搜索文章...'
              value={query}
              onChange={(e) => doSearch(e.target.value)}
              className='w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground'
              autoFocus
            />
          </div>

          {results.length > 0 && (
            <div className='max-h-96 overflow-y-auto p-2'>
              {results.map((item) => (
                <Link
                  key={`${item.catalog}-${item.slug}`}
                  href={`/${item.catalog}/${item.slug}`}
                  onClick={() => setOpen(false)}
                  className='block rounded-md px-3 py-3 transition-colors hover:bg-accent'
                >
                  <div className='mb-1 font-medium tracking-tight'>
                    {item.title}
                  </div>
                  {item.description && (
                    <p className='line-clamp-1 text-sm text-muted-foreground'>
                      {item.description}
                    </p>
                  )}
                  {item.tags.length > 0 && (
                    <div className='mt-2 flex flex-wrap gap-1.5'>
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className='rounded-full border border-border/60 px-2 py-0.5 text-xs text-muted-foreground'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className='p-10 text-center text-sm text-muted-foreground'>
              未找到相关文章
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
