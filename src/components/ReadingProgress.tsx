'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0,
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className='fixed top-0 left-0 z-50 h-px w-full bg-border/60'>
      <div
        className='h-full vercel-gradient-bar transition-[width] duration-150 ease-out'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
