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
    loading: () => <div className="h-80 bg-muted animate-pulse rounded-lg" />,
  },
);

export function DynamicMermaid({ children, id }: MermaidProps) {
  return <Mermaid id={id}>{children}</Mermaid>;
}
