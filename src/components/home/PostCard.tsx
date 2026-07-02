import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import type { MdxPostMeta } from '@/types/mdx';
import { formatDate } from '@/lib/formatDate';
import { getCatalogLabel } from '@/config/catalogs';

interface PostCardProps {
  post: MdxPostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const href = `/${post.catalog}/${post.slug}`;

  return (
    <Link href={href} className='group block h-full'>
      <article className='flex h-full flex-col overflow-hidden rounded-lg border border-border/60 bg-card/50 transition-colors hover:border-foreground/20 hover:bg-card'>
        {post.cover && (
          <div className='relative h-44 w-full overflow-hidden border-b border-border/60 bg-muted'>
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className='object-cover transition-opacity duration-300 group-hover:opacity-90'
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              unoptimized={post.cover.startsWith('http')}
            />
          </div>
        )}

        <div className='flex flex-1 flex-col p-5'>
          <div className='mb-3 flex items-center gap-2 text-xs text-muted-foreground'>
            <span className='rounded-full border border-border/60 px-2 py-0.5'>
              {getCatalogLabel(post.catalog)}
            </span>
            {post.date && (
              <span className='flex items-center gap-1'>
                <Calendar className='h-3 w-3' />
                {formatDate(post.date)}
              </span>
            )}
          </div>

          <h3 className='mb-2 line-clamp-2 text-base font-semibold tracking-tight transition-colors group-hover:text-[#0070f3] dark:group-hover:text-[#3291ff]'>
            {post.title}
          </h3>

          {post.description && (
            <p className='mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground'>
              {post.description}
            </p>
          )}

          <div className='mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground'>
            <div className='flex flex-wrap gap-1.5'>
              {post.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className='rounded-full border border-border/60 px-2 py-0.5'
                >
                  {tag}
                </span>
              ))}
            </div>
            {post.readingTime && (
              <span className='flex shrink-0 items-center gap-1'>
                <Clock className='h-3 w-3' />
                {post.readingTime} 分钟
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
