import { Metadata } from 'next';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

interface Friend {
  name: string;
  url: string;
  avatar: string;
  description: string;
}

const friends: Friend[] = [
  // 在这里添加友链
];

export const metadata: Metadata = {
  title: `友链 - ${siteConfig.title}`,
  description: '朋友们',
};

export default function FriendsPage() {
  return (
    <main className='mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16'>
      <div className='mb-10 border-b border-border/60 pb-8'>
        <p className='mb-2 text-sm font-medium tracking-wide text-muted-foreground uppercase'>
          Friends
        </p>
        <h1 className='text-3xl font-bold tracking-tight md:text-5xl'>友链</h1>
        <p className='mt-3 text-muted-foreground'>
          欢迎交换友链，联系{' '}
          <a
            href={`mailto:${siteConfig.social.email}`}
            className='text-[#0070f3] hover:underline dark:text-[#3291ff]'
          >
            {siteConfig.social.email}
          </a>
        </p>
      </div>

      {friends.length === 0 ? (
        <div className='rounded-lg border border-dashed border-border/60 py-16 text-center text-sm text-muted-foreground'>
          <p>暂无友链</p>
          <p className='mt-2'>联系我交换友链吧</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {friends.map((friend) => (
            <a
              key={friend.url}
              href={friend.url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-4 rounded-lg border border-border/60 bg-card/50 p-4 transition-colors hover:border-foreground/20'
            >
              <Image
                src={friend.avatar}
                alt={friend.name}
                width={48}
                height={48}
                className='rounded-full border border-border/60'
                unoptimized
              />
              <div>
                <p className='font-medium tracking-tight'>{friend.name}</p>
                <p className='text-sm text-muted-foreground'>
                  {friend.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
