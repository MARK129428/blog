import { Metadata } from 'next';
import { getThoughts } from '@/lib/thoughts';
import { formatDate } from '@/lib/formatDate';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `说说 - ${siteConfig.title}`,
  description: '随想记录',
};

export default async function ThoughtsPage() {
  const thoughts = await getThoughts();

  return (
    <main className='mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16'>
      <div className='mb-10 border-b border-border/60 pb-8'>
        <p className='mb-2 text-sm font-medium tracking-wide text-muted-foreground uppercase'>
          Thoughts
        </p>
        <h1 className='text-3xl font-bold tracking-tight md:text-5xl'>说说</h1>
        <p className='mt-3 text-muted-foreground'>随想与日常记录</p>
      </div>

      {thoughts.length === 0 ? (
        <p className='py-16 text-center text-sm text-muted-foreground'>
          暂无说说。
        </p>
      ) : (
        <div className='divide-y divide-border/60 rounded-lg border border-border/60 bg-card/50'>
          {thoughts.map((thought) => (
            <article key={thought.slug} className='px-5 py-5'>
              <time className='mb-2 block text-xs text-muted-foreground'>
                {formatDate(thought.date)}
              </time>
              <p className='text-sm leading-relaxed'>{thought.content}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
