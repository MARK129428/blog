'use client';

import { useEffect, useState } from 'react';
import { TocItem } from '@/lib/extractToc';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    // 观察所有标题元素
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
      // 递归观察子项
      if (item.children) {
        item.children.forEach((child) => {
          const childElement = document.getElementById(child.id);
          if (childElement) {
            observer.observe(childElement);
          }
        });
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const scrollToHeading = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // 考虑固定头部的高度
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      // 直接使用 scrollIntoView，更可靠
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // 如果 scrollIntoView 没有正确对齐，使用 window.scrollTo 微调
      setTimeout(() => {
        const currentPosition = element.getBoundingClientRect().top + window.scrollY;
        if (Math.abs(currentPosition - offsetPosition) > 10) {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 300);
    }
  };

  const renderItem = (item: TocItem, depth = 0, parentPath = ''): React.ReactElement => {
    const isActive = activeId === item.id;
    const paddingLeft = depth * 16;
    // 生成唯一的 key，使用路径来确保唯一性
    const uniqueKey = parentPath ? `${parentPath}-${item.id}` : item.id;

    return (
      <div key={uniqueKey}>
        <button
          onClick={(e) => scrollToHeading(item.id, e)}
          className={cn(
            'block w-full text-left py-1.5 px-3 rounded-md text-sm transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            isActive
              ? 'bg-accent text-accent-foreground font-medium'
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
            {item.children.map((child) => renderItem(child, depth + 1, uniqueKey))}
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
      <div className='rounded-lg border bg-card p-4'>
        <h2 className='text-lg font-semibold mb-4'>目录</h2>
        <nav className='space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto'>
          {items.map((item, index) => renderItem(item, 0, `toc-${index}`))}
        </nav>
      </div>
    </div>
  );
}

