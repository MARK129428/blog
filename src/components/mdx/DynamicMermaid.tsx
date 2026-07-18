'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

interface MermaidProps {
  children: string;
  id?: string;
}

const Mermaid: ComponentType<MermaidProps> = dynamic(
  () => import('@/components/mdx/Mermaid').then((mod) => ({ default: mod.Mermaid })),
  {
    ssr: false,
    loading: () => (
      <div className='my-6 rounded-lg border border-border/60 bg-muted/30 p-4'>
        <div className='h-20 bg-muted animate-pulse rounded-md flex items-center justify-center text-sm text-muted-foreground'>
          加载图表...
        </div>
      </div>
    ),
  },
);

export function DynamicMermaid({ children, id }: MermaidProps) {
  return <Mermaid id={id}>{children}</Mermaid>;
}
