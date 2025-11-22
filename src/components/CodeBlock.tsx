'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  language?: string;
  children: string;
}

export function CodeBlock({ language = 'javascript', children }: CodeBlockProps) {
  return (
    <div className='my-4 rounded-lg overflow-hidden'>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          padding: '1rem',
        }}
        showLineNumbers
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
}

