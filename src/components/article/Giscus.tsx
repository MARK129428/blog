'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface GiscusProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
}

export function Giscus({ repo, repoId, category, categoryId }: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    ref.current.appendChild(script);
  }, [repo, repoId, category, categoryId]);

  // Update theme when it changes
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame',
    );
    if (iframe) {
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: { theme: theme === 'dark' ? 'dark' : 'light' },
          },
        },
        'https://giscus.app',
      );
    }
  }, [theme]);

  return <div ref={ref} className='mt-16 not-prose' />;
}
