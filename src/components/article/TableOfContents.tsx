'use client';

import { useEffect, useRef, useState } from 'react';
import { TocItem } from '@/lib/extractToc';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const navRef = useRef<HTMLDivElement>(null);

  // 存储指示器的位置信息（在 state 中统一管理，确保渲染一致性）
  const [indicatorStyle, setIndicatorStyle] = useState<{
    top: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // 取最靠近顶部的可见标题
          const topEntry = visibleEntries.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-10% 0% -60% 0%',
        threshold: 0,
      }
    );

    const flatItems = (items: TocItem[]): TocItem[] =>
      items.flatMap((item) => [
        item,
        ...(item.children ? flatItems(item.children) : []),
      ]);

    flatItems(items).forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  // 当 activeId 变化时计算指示器位置
  useEffect(() => {
    if (!navRef.current || !activeId) {
      setIndicatorStyle(null);
      return;
    }

    const buttons = navRef.current.querySelectorAll<HTMLButtonElement>(
      'button[data-toc-id]'
    );
    const parentRect = navRef.current.getBoundingClientRect();

    for (const btn of buttons) {
      if (btn.dataset.tocId === activeId) {
        const btnRect = btn.getBoundingClientRect();
        setIndicatorStyle({
          top: btnRect.top - parentRect.top,
          height: btnRect.height,
        });
        return;
      }
    }
    setIndicatorStyle(null);
  }, [activeId]);

  const scrollToHeading = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveId(id);
    }
  };

  const renderItem = (
    item: TocItem,
    depth = 0,
    parentPath = ''
  ): React.ReactElement => {
    const isActive = activeId === item.id;
    const paddingLeft = depth * 16;
    const uniqueKey = parentPath ? `${parentPath}-${item.id}` : item.id;

    return (
      <div key={uniqueKey}>
        <button
          data-toc-id={item.id}
          onClick={(e) => scrollToHeading(item.id, e)}
          className={cn(
            'block w-full text-left py-1.5 px-3 rounded-md text-sm transition-all duration-200 relative',
            'hover:bg-accent/50',
            isActive
              ? 'font-medium text-foreground bg-accent/30'
              : 'text-muted-foreground',
            depth === 0 && 'font-semibold',
            depth === 1 && 'font-medium'
          )}
          style={{ paddingLeft: `${paddingLeft + 12}px` }}
        >
          {item.text}
        </button>
        {item.children && item.children.length > 0 && (
          <div className='ml-2'>
            {item.children.map((child) =>
              renderItem(child, depth + 1, uniqueKey)
            )}
          </div>
        )}
      </div>
    );
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn('sticky top-20', className)}>
      <div className='rounded-lg border border-border/60 bg-card/50 p-4 backdrop-blur'>
        <h2 className='mb-4 text-sm font-semibold tracking-wide uppercase text-muted-foreground'>
          目录
        </h2>
        <nav
          ref={navRef}
          className='relative max-h-[calc(100vh-200px)] overflow-y-auto'
        >
          {/* 永久背景轨道 */}
          <div className='absolute left-1 top-0 bottom-0 w-0.5 bg-border/40 rounded-full' />

          {/* 浮动活跃指示条 —— 平滑跟随当前阅读位置 */}
          <div
            className={cn(
              'absolute left-1 w-0.5 rounded-full transition-all duration-300 ease-out',
              'bg-foreground/80 dark:bg-foreground/60',
              indicatorStyle ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              top: indicatorStyle?.top ?? 0,
              height: indicatorStyle?.height ?? 20,
            }}
          />

          <div className='space-y-0.5 relative'>
            {items.map((item, index) =>
              renderItem(item, 0, `toc-${index}`)
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
