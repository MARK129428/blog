import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] p-6 gap-4 text-center'>
      <h1 className='text-6xl font-bold text-muted-foreground'>404</h1>
      <p className='text-xl text-muted-foreground'>页面不存在</p>
      <Link
        href='/'
        className='text-primary hover:underline mt-4'
      >
        返回首页
      </Link>
    </div>
  );
}
