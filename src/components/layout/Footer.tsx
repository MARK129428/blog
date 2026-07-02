import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Rss } from 'lucide-react';

export function Footer() {
  return (
    <footer className='mt-auto border-t border-border/60'>
      <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row'>
        <div className='flex items-center gap-4'>
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.author}
          </span>
          <Link href='/rss.xml' className='vercel-link flex items-center gap-1'>
            <Rss className='h-3.5 w-3.5' />
            RSS
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <Link href='/tags' className='vercel-link'>
            标签
          </Link>
          <Link href='/friends' className='vercel-link'>
            友链
          </Link>
          <a
            href={siteConfig.social.github}
            target='_blank'
            rel='noopener noreferrer'
            className='vercel-link'
          >
            GitHub
          </a>
          <a href={`mailto:${siteConfig.social.email}`} className='vercel-link'>
            邮箱
          </a>
        </div>
      </div>
    </footer>
  );
}
