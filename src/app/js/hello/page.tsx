// src/app/js/hello/page.tsx
"use client"
import MDXComponent, { meta } from '@/content/js/hello.mdx';
import { MDXProvider } from '@mdx-js/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
 
import React from 'react';

// ------------------- 客户端组件：处理代码高亮 -------------------
function SyntaxHighlighterWrapper({ className, children, ...props }: any) {
 
  const match = /language-(\w+)/.exec(className || '');
  return (
    <SyntaxHighlighter
      style={oneDark}
      language={match ? match[1] : 'text'}
      PreTag="div"
      {...props}
    >
      {String(children).trim()}
    </SyntaxHighlighter>
  );
}

// ------------------- 客户端组件：MDXProvider 包裹 -------------------
function MDXContentClient({ children }: { children: React.ReactNode }) {
  const mdxComponents = {
    Button,
    Badge,
    a: (props: any) => (
      <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
    ),
    pre: (props: any) => (
      <div className="my-4 overflow-auto rounded-md border border-border">{props.children}</div>
    ),
    code: SyntaxHighlighterWrapper,
  };

  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}

// ------------------- 服务端组件：读取 meta -------------------
export default function HelloPage() {
  if (!meta) return <div>文章不存在</div>;

  return (
    <main className="p-8 max-w-5xl lg:max-w-7xl mx-auto prose dark:prose-invert transition-colors duration-300">
      {meta.cover && (
        <img src={meta.cover} alt={meta.title} className="w-full rounded-lg mb-6" />
      )}
      <h1 className="mb-4">{meta.title}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        作者：{meta.author} | 日期：{meta.date}
      </p>

      {/* 客户端渲染 MDX + 高亮 */}
      <MDXContentClient>
        <MDXComponent />
      </MDXContentClient>
    </main>
  );
}
