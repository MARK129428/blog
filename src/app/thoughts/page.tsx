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
    <main className='max-w-2xl mx-auto p-6 md:p-10'>
      <h1 className='text-2xl font-bold mb-8'>说说</h1>

      {thoughts.length === 0 ? (
        <p className='text-muted-foreground text-center py-12'>暂无说说。</p>
      ) : (
        <div className='relative pl-6 border-l-2 border-border space-y-8'>
          {thoughts.map((thought) => (
            <div key={thought.slug} className='relative'>
              <div className='absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-background' />
              <div>
                <p className='text-sm text-muted-foreground mb-2'>
                  {formatDate(thought.date)}
                </p>
                <div className='prose dark:prose-invert text-sm leading-relaxed'>
                  {thought.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
