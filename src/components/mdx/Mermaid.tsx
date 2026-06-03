'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  children: string;
  id?: string;
}

let mermaidInitialized = false;

export function Mermaid({ children, id }: MermaidProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const uniqueId =
    id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!mermaidInitialized) {
      mermaidInitialized = true;
      mermaid.initialize({
        startOnLoad: true,
        theme: 'base' as const,
        securityLevel: 'loose',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 14,
        themeVariables: {
          primaryColor: '#ffffff',
          primaryTextColor: '#111111',
          primaryBorderColor: '#111111',
          lineColor: '#111111',
          secondaryColor: '#f5f5f5',
          tertiaryColor: '#ebebeb',
          background: '#ffffff',
          mainBkg: '#ffffff',
          secondBkg: '#f8f8f8',
          textColor: '#111111',
          nodeBorder: '#111111',
          clusterBkg: '#f5f5f5',
          clusterBorder: '#111111',
          titleColor: '#111111',
          edgeLabelBackground: '#ffffff',
          darkMode: false,
        },
        flowchart: {
          nodeSpacing: 40,
          rankSpacing: 60,
          curve: 'basis',
          padding: 10,
          htmlLabels: true,
          useMaxWidth: true,
        },
        sequence: {
          actorMargin: 50,
          messageMargin: 40,
          mirrorActors: true,
          useMaxWidth: true,
        },
      });
    }

    mermaid.render(uniqueId, children.trim()).then((result) => {
      el.innerHTML = result.svg;
      const svg = el.querySelector('svg');
      if (svg) {
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.maxWidth = 'none';
        svg.style.display = 'block';
        const paths = svg.querySelectorAll('path, line, polyline, rect, circle, ellipse');
        paths.forEach((p) => {
          const s = p.getAttribute('stroke');
          const sw = p.getAttribute('stroke-width');
          if (s && s !== 'none' && s !== 'transparent') {
            if (s === '#333333') p.setAttribute('stroke', '#000000');
            if (sw && parseFloat(sw) < 1.5) p.setAttribute('stroke-width', '1.5');
          }
        });
        if (isFullscreen) {
          svg.style.transform = 'scale(1.0)';
          svg.style.transformOrigin = 'top center';
        }
      }
    }).catch((error) => {
      el.innerHTML = '<div class="text-red-400 p-4 bg-red-900/20 rounded-lg border border-red-800"><h3 class="font-semibold mb-2">图表渲染失败</h3><p class="text-sm mb-2 text-red-300">' + (error.message || '未知错误') + '</p></div>';
    });
  }, [children, uniqueId, isFullscreen]);

  return (
    <div
      className={`my-6 relative group ${
        isFullscreen ? 'fixed inset-0 z-50 bg-black/95' : ''
      }`}
    >
      {isFullscreen && (
        <div className='absolute top-4 left-1/2 transform -translate-x-1/2 z-20'>
          <div className='bg-black/75 text-white text-sm px-4 py-2 rounded shadow-lg'>
            点击任意位置退出全屏
          </div>
        </div>
      )}

      {!isFullscreen && (
        <div className='absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
          <div className='bg-black/75 text-white text-xs px-2 py-1 rounded shadow-lg'>
            单击全屏查看
          </div>
        </div>
      )}

      <div
        className={`${
          isFullscreen
            ? 'fixed inset-0 z-50 bg-black/95'
            : 'flex justify-center'
        }`}
      >
        <div
          ref={ref}
          className={`overflow-auto transition-all duration-300 cursor-pointer ${
            isFullscreen
              ? 'w-full h-full p-8 bg-white'
              : 'bg-white dark:bg-gray-900 rounded-lg border border-border w-full p-4'
          }`}
          style={{
            minHeight: isFullscreen ? '100vh' : '350px',
            fontSize: isFullscreen ? '16px' : '14px',
          }}
          onClick={() =>
            isFullscreen ? setIsFullscreen(false) : setIsFullscreen(true)
          }
        />
      </div>
    </div>
  );
}
