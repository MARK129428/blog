'use client';

import { Button } from '@/components/ui/button';

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] p-6 gap-4 text-center'>
      <h2 className='text-2xl font-bold'>文章加载失败</h2>
      <p className='text-muted-foreground max-w-md'>
        {error.message || '无法加载文章内容，请稍后重试。'}
      </p>
      <Button onClick={reset} variant='default'>
        重试
      </Button>
    </div>
  );
}
