'use client';

import { useEffect, useState } from 'react';
import { TocItem } from '@/lib/extractToc';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { List, X } from 'lucide-react';

interface MobileTOCProps {
  items: TocItem[];
}

export function MobileTOC({ items }: MobileTOCProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-10% 0% -80% 0%' },
    );

    const observe = (item: TocItem) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
      item.children?.forEach(observe);
    };
    items.forEach(observe);

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      <div className='lg:hidden fixed bottom-20 right-6 z-40'>
        <Button
          size='icon'
          variant='outline'
          className='rounded-full shadow-lg'
          onClick={() => setOpen(!open)}
          aria-label='目录'
        >
          <List className='w-4 h-4' />
        </Button>
      </div>

      {open && (
        <div className='lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur'>
          <div className='flex flex-col h-full p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-lg font-semibold'>目录</h2>
              <Button variant='ghost' size='icon' onClick={() => setOpen(false)}>
                <X className='w-5 h-5' />
              </Button>
            </div>
            <nav className='flex-1 overflow-auto space-y-0.5'>
              {items.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      document
                        .getElementById(item.id)
                        ?.scrollIntoView({ behavior: 'smooth' });
                      setOpen(false);
                    }}
                    className={cn(
                      'block w-full text-left py-2.5 px-4 rounded-md text-sm transition-all duration-200',
                      activeId === item.id
                        ? 'bg-accent font-medium text-accent-foreground border-l-2 border-foreground'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground/80',
                    )}
                  >
                    {item.text}
                  </button>
                  {item.children?.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => {
                        document
                          .getElementById(child.id)
                          ?.scrollIntoView({ behavior: 'smooth' });
                        setOpen(false);
                      }}
                      className={cn(
                        'block w-full text-left py-2 px-6 rounded-md text-sm transition-all duration-200',
                        activeId === child.id
                          ? 'bg-accent font-medium text-accent-foreground border-l-2 border-foreground'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground/80',
                      )}
                    >
                      {child.text}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
