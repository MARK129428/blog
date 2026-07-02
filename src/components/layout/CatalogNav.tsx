'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface CatalogNavProps {
  catalogs: { id: string; label: string }[];
}

export function CatalogNav({ catalogs }: CatalogNavProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (catalogs.length === 0) return null;

  return (
    <div ref={ref} className='relative hidden sm:block'>
      <button
        type='button'
        onClick={() => setOpen((value) => !value)}
        className='vercel-link flex items-center gap-1 text-sm'
        aria-expanded={open}
        aria-haspopup='true'
      >
        分类
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className='absolute top-full left-0 z-50 mt-2 min-w-44 overflow-hidden rounded-lg border border-border/60 bg-background/95 py-1 shadow-lg backdrop-blur-xl'>
          {catalogs.map((catalog) => (
            <Link
              key={catalog.id}
              href={`/${catalog.id}`}
              onClick={() => setOpen(false)}
              className='block px-4 py-2 text-sm transition-colors hover:bg-accent'
            >
              {catalog.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
