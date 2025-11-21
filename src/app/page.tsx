'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Github, Mail, Zap, Cpu } from 'lucide-react';
import { Icon } from '@iconify/react';

export default function HomePage() {
  return (
    <main className='flex flex-col items-center justify-start min-h-screen bg-background text-foreground p-6 sm:p-12 space-y-12 transition-colors duration-300'>
      {/* Hero 区 */}
      <section className='flex flex-col sm:flex-row items-center gap-6 max-w-4xl w-full text-center sm:text-left'>
        {/* 头像 + 光环 */}
        {/* 头像 + 科技感光环 */}
        <div className='flex-shrink-0 relative group w-40 h-40'>
          {/* 渐变环 */}
          <div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30 blur-2xl animate-spin-slow'></div>

          {/* 头像 */}
          <Image
            src='/avatar.jpeg'
            alt='Gemini头像'
            width={160}
            height={160}
            className='rounded-full object-cover border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-transform duration-500 group-hover:scale-105'
          />

          {/* 在线状态 */}
          <span className='absolute bottom-2 right-2 bg-green-400 w-4 h-4 rounded-full ring-2 ring-background animate-ping'></span>
        </div>

        {/* 名字 + 描述 + 核心技能 + CTA */}
        <div className='flex flex-col gap-3'>
          {/* 名字 + Icon */}
          <h2 className='text-4xl sm:text-5xl font-extrabold flex items-center gap-3 justify-center sm:justify-start'>
            Gemini <Zap className='w-6 h-6 text-yellow-400 animate-bounce' />
          </h2>

          {/* 精炼描述 */}
          <p className='text-foreground/70 text-sm sm:text-base leading-relaxed'>
            24 岁 | 2年开发经验 | 江西财经大学毕业
          </p>
          <p className='text-foreground/70 text-sm sm:text-base leading-relaxed'>
            技术栈：React · Vue · NestJS · JavaScript/TypeScript
            工作方向：前端开发、全栈实践
          </p>
          <p className='text-foreground/70 text-sm sm:text-base leading-relaxed'>
            当前目标：学习 AI Agent，探索前端与 AI 的结合应用
          </p>
          <p className='text-foreground/70 text-sm sm:text-base leading-relaxed flex items-center gap-2'>
            爱好：
            <span className='flex items-center gap-1'>📚 历史</span>
            <span className='flex items-center gap-1'>💰 经济</span>
            <span className='flex items-center gap-1'>
              <span>🎨</span> 动漫
            </span>
          </p>

          {/* CTA 按钮 */}
          <div className='flex flex-wrap gap-3 mt-3 justify-center sm:justify-start'>
            <Button
              variant='outline'
              asChild
              size='sm'
              className='transition-transform duration-300 hover:-translate-y-1'
            >
              <a href='#contract'>联系我</a>
            </Button>
          </div>
        </div>
      </section>

      <Separator className='w-full border-border' />

      {/* 技能展示区 */}
      <section className='flex flex-wrap justify-center gap-2'>
        {[
          { name: 'React', icon: '⚛️' },
          { name: 'Vue', icon: '🖖' },
          { name: 'NestJS', icon: '🏗️' },
          { name: 'JavaScript', icon: '📜' },
          { name: 'TypeScript', icon: '🔷' },
          { name: 'Tailwind', icon: '💨' },
          { name: '前端开发', icon: '🖥️' },
          { name: 'AI Agent', icon: '🤖' },
          { name: 'Java', icon: '☕' },
          { name: '全栈开发', icon: '🌐' },
        ].map((skill) => (
          <Badge
            key={skill.name}
            variant='secondary'
            className='text-xs py-1 px-2 flex items-center gap-1 animate-fadeIn'
          >
            <span>{skill.icon}</span> {skill.name}
          </Badge>
        ))}
      </section>

      <Separator className='w-full border-border' />

      {/* 项目 / 工作展示 */}
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl w-full'>
        <Card className='hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 bg-card text-card-foreground border border-border'>
          <CardContent className='space-y-1'>
            <CardTitle className='text-base flex items-center gap-2'>
              前端开发项目{' '}
              <Cpu className='w-4 h-4 text-blue-400 animate-pulse' />
            </CardTitle>
            <CardDescription className='text-sm text-foreground/70'>
              参与 React 和 Vue 项目开发，注重性能和用户体验。
            </CardDescription>
          </CardContent>
        </Card>

        <Card className='hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 bg-card text-card-foreground border border-border'>
          <CardContent className='space-y-1'>
            <CardTitle className='text-base flex items-center gap-2'>
              AI Agent 实验{' '}
              <Zap className='w-4 h-4 text-yellow-400 animate-bounce' />
            </CardTitle>
            <CardDescription className='text-sm text-foreground/70'>
              学习并实践 AI Agent 技术，探索 AI 与前端结合的应用。
            </CardDescription>
          </CardContent>
        </Card>

        <Card className='hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 bg-card text-card-foreground border border-border'>
          <CardContent className='space-y-1'>
            <CardTitle className='text-base flex items-center gap-2'>
              后端基础 <Cpu className='w-4 h-4 text-green-400 animate-pulse' />
            </CardTitle>
            <CardDescription className='text-sm text-foreground/70'>
              对 Java 后端略知一二，可完成前后端协作的全栈项目。
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      <Separator className='w-full border-border' />

      {/* 联系方式 */}
      <section className='max-w-3xl w-full text-center' id='contract'>
        <h2 className='text-2xl sm:text-3xl font-bold flex items-center justify-center gap-3 mb-6'>
          联系方式 <Mail className='w-6 h-6 text-red-400 animate-bounce' />
        </h2>

        <div className='flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 text-lg sm:text-xl text-foreground/80'>
          {/* 邮箱 */}
          <a
            href='mailto:mark129428@gmail.com'
            className='flex items-center gap-2 px-4 py-2 rounded-md bg-card hover:bg-blue-600 hover:text-white transition-all duration-300'
          >
            <Icon icon='basil:gmail-outline' width='28' height='28' />{' '}
            mark129428@gmail.com
          </a>

          {/* GitHub */}
          <a
            href='https://github.com/MARK129428'
            target='_blank'
            className='flex items-center gap-2 px-4 py-2 rounded-md bg-card hover:bg-gray-700 hover:text-white transition-all duration-300'
          >
            <Github className='w-6 h-6' /> MARK129428
          </a>

          {/* QQ */}
          <a
            href='https://wpa.qq.com/msgrd?v=3&uin=1544832671&site=qq&menu=yes'
            target='_blank'
            className='flex items-center gap-2 px-4 py-2 rounded-md bg-card hover:bg-blue-500 hover:text-white transition-all duration-300'
          >
            <Icon icon='streamline-logos:qq-logo' width='28' height='28' />{' '}
            1544832671
          </a>
        </div>
      </section>
    </main>
  );
}
