import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag, Clock } from 'lucide-react';
import type { MdxPostMeta } from '@/types/mdx';
import { formatDate } from '@/lib/formatDate';

interface PostCardProps {
  post: MdxPostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const href = `/${post.catalog}/${post.slug}`;

  return (
    <Link href={href} className='block h-full'>
      <Card className='h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group'>
        {post.cover && (
          <div className='relative w-full h-48 overflow-hidden bg-muted'>
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className='object-cover group-hover:scale-110 transition-transform duration-500'
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              unoptimized={post.cover.startsWith('/') || post.cover.startsWith('http')}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </div>
        )}

        <CardHeader className='flex-1'>
          <CardTitle className='text-xl line-clamp-2 group-hover:text-primary transition-colors'>
            {post.title}
          </CardTitle>
          {post.description && (
            <CardDescription className='line-clamp-2'>
              {post.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className='flex-1'>
          {post.tags && post.tags.length > 0 && (
            <div className='flex flex-wrap gap-2 mb-4'>
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant='secondary' className='text-xs'>
                  <Tag className='w-3 h-3 mr-1' />
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant='outline' className='text-xs'>
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className='flex items-center justify-between text-sm text-muted-foreground border-t pt-4'>
          <div className='flex items-center gap-3'>
            {post.date && (
              <span className='flex items-center gap-1'>
                <Calendar className='w-3.5 h-3.5' />
                {formatDate(post.date)}
              </span>
            )}
            {post.readingTime && (
              <span className='flex items-center gap-1'>
                <Clock className='w-3.5 h-3.5' />
                {post.readingTime} 分钟
              </span>
            )}
          </div>
          {post.author && (
            <span className='text-xs'>{post.author}</span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
