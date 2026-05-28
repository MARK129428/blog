'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import mermaid from 'mermaid';

interface MermaidProps {
  children: string;
  id?: string;
}


export function Mermaid({ children, id }: MermaidProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const uniqueId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;


  useEffect(() => {
    console.log('Mermaid useEffect triggered, isFullscreen:', isFullscreen, 'content length:', children.length);
    if (ref.current) {
      // 初始化 Mermaid 配置
      mermaid.initialize({
        startOnLoad: true,
        theme: 'base' as const,
        securityLevel: 'loose',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: isFullscreen ? 16 : 14,
        themeVariables: {
          // 黑白主题 - 高对比度，适配暗色模式
          primaryColor: '#ffffff',
          primaryTextColor: '#000000',
          primaryBorderColor: '#000000',
          lineColor: '#333333',
          secondaryColor: '#f5f5f5',
          tertiaryColor: '#e5e5e5',
          background: '#ffffff',
          mainBkg: '#ffffff',
          secondBkg: '#f8f8f8',
          textColor: '#000000',
          // 暗色模式下的变量
          darkMode: false, // 强制使用亮色主题，确保黑白对比清晰
        },
        flowchart: {
          nodeSpacing: isFullscreen ? 60 : 40, // 减少间距
          rankSpacing: isFullscreen ? 80 : 60, // 减少间距
          curve: 'basis',
          padding: isFullscreen ? 15 : 10, // 减少padding
          htmlLabels: true,
          useMaxWidth: true,
        },
      });

      // 渲染图表
      mermaid.render(uniqueId, children.trim()).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
          // 设置SVG样式 - 简化样式，减少留白
          const svg = ref.current.querySelector('svg');
          if (svg) {
            svg.style.width = '100%';
            svg.style.height = 'auto';
            svg.style.maxWidth = 'none';
            svg.style.display = 'block'; // 移除默认的inline-block留白
            // 根据状态设置变换
            if (isFullscreen) {
              svg.style.transform = 'scale(1.0)'; // 移除放大，保持原始大小
              svg.style.transformOrigin = 'top center';
              svg.style.transition = 'transform 0.3s ease-in-out';
            } else {
              svg.style.transform = 'scale(1)';
              svg.style.transition = 'transform 0.2s ease-in-out';
            }
          }
        }
      }).catch((error) => {
        console.error('Mermaid render error:', error);
        console.error('Mermaid content:', children.trim());
        if (ref.current) {
          ref.current.innerHTML = `<div class="text-red-400 p-4 bg-red-900/20 rounded-lg border border-red-800">
            <h3 class="font-semibold mb-2">图表渲染失败</h3>
            <p class="text-sm mb-2 text-red-300">错误信息：${error.message || '未知错误'}</p>
            <details class="mt-4">
              <summary class="cursor-pointer text-sm text-red-300 hover:text-red-200">查看图表源码</summary>
              <pre class="text-xs mt-2 p-3 bg-black/50 rounded border overflow-auto max-h-40 whitespace-pre-wrap">${children.trim()}</pre>
            </details>
          </div>`;
        }
      });
    }
  }, [children, uniqueId, isFullscreen]);

  return (
    <div className={`my-6 relative group ${isFullscreen ? 'fixed inset-0 z-50 bg-black/95' : ''}`}>
      {/* 全屏时的控制提示 */}
      {isFullscreen && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/75 text-white text-sm px-4 py-2 rounded shadow-lg">
            点击任意位置退出全屏
          </div>
        </div>
      )}

      {/* 普通状态的单击提示 */}
      {!isFullscreen && (
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-black/75 text-white text-xs px-2 py-1 rounded shadow-lg">
            单击全屏查看
          </div>
        </div>
      )}

      {/* 图表容器 */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black/95' : 'flex justify-center'}`}>
        <div
          ref={ref}
          className={`overflow-auto transition-all duration-300 cursor-pointer ${
            isFullscreen ? 'w-full h-full p-2 bg-white dark:bg-gray-900' : 'bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 w-full p-4'
          }`}
          style={{
            minHeight: isFullscreen ? '100vh' : '350px',
            fontSize: isFullscreen ? '16px' : '14px'
          }}
          onClick={() => isFullscreen ? setIsFullscreen(false) : setIsFullscreen(true)}
        />
      </div>

    </div>
  );
}
