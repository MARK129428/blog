'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { ZoomIn } from 'lucide-react';

interface MdxImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  unoptimized?: boolean;
}

export function MdxImage({
  src,
  alt = '',
  width,
  height,
  priority,
  className,
  fill,
  sizes,
  unoptimized,
}: MdxImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className='relative group cursor-pointer w-full my-4'>
          <div className='relative overflow-hidden rounded-lg'>
            {fill ? (
              <div className='relative w-full aspect-video'>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className={`${className || ''} object-cover transition-transform duration-300 group-hover:scale-105`}
                  sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px'}
                  priority={priority}
                  unoptimized={unoptimized}
                />
              </div>
            ) : (
              <div className='relative w-full'>
                <Image
                  src={src}
                  alt={alt}
                  width={width || 1200}
                  height={height || 800}
                  className={`${className || ''} w-full h-auto transition-transform duration-300 group-hover:scale-105`}
                  priority={priority}
                  sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px'}
                  unoptimized={unoptimized}
                />
              </div>
            )}
            {/* 悬停时显示放大图标 */}
            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center rounded-lg'>
              <ZoomIn className='w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent 
        className='!max-w-[100vw] !max-h-[100vh] !w-screen !h-screen !p-0 !bg-black/95 !border-none !m-0 !rounded-none !inset-0 !translate-x-0 !translate-y-0 !left-0 !top-0 !grid-rows-none'
        style={{ 
          maxWidth: '100vw', 
          maxHeight: '100vh',
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          left: 0,
          top: 0,
          transform: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DialogTitle className='sr-only'>{alt || '图片预览'}</DialogTitle>
        <div className='relative w-full h-full flex items-center justify-center overflow-hidden'>
          <div className='relative w-full h-full flex items-center justify-center pointer-events-none'>
            <Image
              src={src}
              alt={alt}
              width={width || 5000}
              height={height || 5000}
              className='max-w-[99vw] max-h-[99vh] w-auto h-auto object-contain pointer-events-auto'
              unoptimized={unoptimized}
              priority
              sizes='100vw'
              style={{ maxWidth: '99vw', maxHeight: '99vh' }}
            />
          </div>
          {alt && (
            <p className='text-white text-sm text-center absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded backdrop-blur-sm z-10 pointer-events-none'>
              {alt}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

