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
    <main className='max-w-3xl mx-auto p-6 md:p-10'>
      <div className='flex flex-col items-center text-center mb-8'>
        <Image
          src='/avatar.jpeg'
          alt={siteConfig.author}
          width={120}
          height={120}
          className='rounded-full mb-4'
        />
        <h1 className='text-3xl font-bold mb-2'>{siteConfig.author}</h1>
        <p className='text-muted-foreground'>{siteConfig.description}</p>
      </div>

      <div className='space-y-6 text-sm leading-relaxed'>
        <div className='flex justify-center gap-8 text-center'>
          <div>
            <span className='text-2xl font-bold'>{postCount}</span>
            <p className='text-xs text-muted-foreground'>文章</p>
          </div>
          <div className='flex items-center gap-4'>
            <a
              href={siteConfig.social.github}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 px-4 py-2 rounded-md bg-card hover:bg-accent transition-colors'
            >
              <Github className='w-5 h-5' /> GitHub
            </a>
            <a
              href={`mailto:${siteConfig.social.email}`}
              className='flex items-center gap-2 px-4 py-2 rounded-md bg-card hover:bg-accent transition-colors'
            >
              <Mail className='w-5 h-5' /> 邮箱
            </a>
          </div>
        </div>
      </div>

      <div className='mt-8 text-center'>
        <Link href='/' className='text-sm text-muted-foreground hover:text-foreground'>
          ← 返回首页
        </Link>
      </div>
    </main>
  );
}
