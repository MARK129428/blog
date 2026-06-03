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
  // {
  //   name: '示例博客',
  //   url: 'https://example.com',
  //   avatar: 'https://example.com/avatar.png',
  //   description: '一个很棒的博客',
  // },
];

export const metadata: Metadata = {
  title: `友链 - ${siteConfig.title}`,
  description: '朋友们',
};

export default function FriendsPage() {
  return (
    <main className='max-w-2xl mx-auto p-6 md:p-10'>
      <h1 className='text-2xl font-bold mb-2'>友链</h1>
      <p className='text-muted-foreground mb-8'>
        欢迎交换友链，联系{' '}
        <a href={`mailto:${siteConfig.social.email}`} className='text-primary hover:underline'>
          {siteConfig.social.email}
        </a>
      </p>

      {friends.length === 0 ? (
        <div className='text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-lg'>
          <p>暂无友链</p>
          <p className='text-sm mt-2'>联系我交换友链吧</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {friends.map((friend) => (
            <a
              key={friend.url}
              href={friend.url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors'
            >
              <Image
                src={friend.avatar}
                alt={friend.name}
                width={48}
                height={48}
                className='rounded-full'
                unoptimized
              />
              <div>
                <p className='font-medium'>{friend.name}</p>
                <p className='text-sm text-muted-foreground'>{friend.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
