import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import { Github, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: `关于 - ${siteConfig.title}`,
  description: `关于${siteConfig.author}的介绍`,
};

export default async function AboutPage() {
  const postCount = (await getAllPosts()).length;

  return (
    <main className='mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16'>
      <div className='mb-10 border-b border-border/60 pb-8 text-center'>
        <Image
          src='/avatar.jpeg'
          alt={siteConfig.author}
          width={96}
          height={96}
          className='mx-auto mb-5 rounded-full border border-border/60'
        />
        <p className='mb-2 text-sm font-medium tracking-wide text-muted-foreground uppercase'>
          About
        </p>
        <h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
          {siteConfig.author}
        </h1>
        <p className='mx-auto mt-3 max-w-md text-muted-foreground'>
          {siteConfig.description}
        </p>
      </div>

      <div className='flex flex-col items-center gap-6 text-center'>
        <div>
          <span className='text-3xl font-bold tracking-tight'>{postCount}</span>
          <p className='mt-1 text-xs text-muted-foreground'>篇文章</p>
        </div>
        <div className='flex items-center gap-3'>
          <a
            href={siteConfig.social.github}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 rounded-md border border-border/60 px-4 py-2 text-sm transition-colors hover:border-foreground/20'
          >
            <Github className='h-4 w-4' /> GitHub
          </a>
          <a
            href={`mailto:${siteConfig.social.email}`}
            className='inline-flex items-center gap-2 rounded-md border border-border/60 px-4 py-2 text-sm transition-colors hover:border-foreground/20'
          >
            <Mail className='h-4 w-4' /> 邮箱
          </a>
        </div>
      </div>

      <div className='mt-10 text-center'>
        <Link href='/' className='vercel-link text-sm'>
          ← 返回首页
        </Link>
      </div>
    </main>
  );
}
