import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Rss } from 'lucide-react';

export function Footer() {
  return (
    <footer className='border-t border-border mt-12'>
      <div className='max-w-6xl mx-auto p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground'>
        <div className='flex items-center gap-4'>
          <span>&copy; {new Date().getFullYear()} {siteConfig.author}</span>
          <Link
            href='/rss.xml'
            className='flex items-center gap-1 hover:text-foreground transition-colors'
          >
            <Rss className='w-4 h-4' />
            RSS
          </Link>
          <Link
            href='/tags'
            className='hover:text-foreground transition-colors'
          >
            标签
          </Link>
          <Link
            href='/friends'
            className='hover:text-foreground transition-colors'
          >
            友链
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <a
            href={siteConfig.social.github}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground transition-colors'
          >
            GitHub
          </a>
          <a
            href={`mailto:${siteConfig.social.email}`}
            className='hover:text-foreground transition-colors'
          >
            邮箱
          </a>
        </div>
      </div>
    </footer>
  );
}
