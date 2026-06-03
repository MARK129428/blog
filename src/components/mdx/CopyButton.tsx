'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      className='absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity'
      onClick={handleCopy}
      aria-label='复制代码'
    >
      {copied ? (
        <Check className='w-3.5 h-3.5 text-green-400' />
      ) : (
        <Copy className='w-3.5 h-3.5' />
      )}
    </Button>
  );
}
