'use client';

import { Button } from '@/components/ui/button';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6 gap-4 text-center'>
      <h2 className='text-2xl font-bold'>出错了</h2>
      <p className='text-muted-foreground max-w-md'>
        {error.message || '页面加载时发生错误，请稍后重试。'}
      </p>
      <Button onClick={reset} variant='default'>
        重试
      </Button>
    </div>
  );
}
