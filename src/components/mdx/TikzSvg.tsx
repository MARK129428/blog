'use client';

import { useState } from 'react';

interface TikzSvgProps {
  children?: string;
}

export function TikzSvg({ children }: TikzSvgProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!children) return null;

  const isError = children.includes('TikZ 渲染失败');

  return (
    <div
      className={`my-6 relative group ${
        isFullscreen ? 'fixed inset-0 z-50 flex items-center justify-center' : ''
      }`}
    >
      {!isFullscreen && !isError && (
        <div className='absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
          <div className='bg-black/75 text-white text-xs px-2 py-1 rounded shadow-lg'>
            单击全屏查看
          </div>
        </div>
      )}

      {isFullscreen && (
        <div className='absolute top-4 left-1/2 transform -translate-x-1/2 z-20'>
          <div className='bg-black/75 text-white text-sm px-4 py-2 rounded shadow-lg'>
            点击任意位置退出全屏
          </div>
        </div>
      )}

      <div
        className={`overflow-auto transition-all duration-300 ${
          isError
            ? ''
            : 'cursor-pointer'
        } ${
          isFullscreen
            ? 'w-full h-full p-8 bg-white dark:bg-gray-950'
            : 'bg-white dark:bg-gray-900 rounded-lg border border-border w-full p-4 flex justify-center'
        }`}
        onClick={() => {
          if (!isError) {
            setIsFullscreen(!isFullscreen);
          }
        }}
      >
        <div
          className={`tikz-diagram [&_svg]:max-w-full [&_svg]:h-auto ${isFullscreen ? '[&_svg]:max-h-[90vh] [&_svg]:w-auto' : ''}`}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      </div>
    </div>
  );
}
