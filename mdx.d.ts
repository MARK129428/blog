// src/types/mdx.d.ts
declare module '*.mdx' {
  import * as React from 'react';

  export const meta: {
    title: string;
    date: string;
    author?: string;
    description?: string;
    cover?: string;
    tags?: string[];
  };

  const MDXComponent: React.ComponentType<React.PropsWithChildren<any>>;
  export default MDXComponent;
}
