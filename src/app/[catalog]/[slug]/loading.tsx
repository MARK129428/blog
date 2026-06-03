import { Skeleton } from '@/components/ui/skeleton';
import { MdxBodySkeleton } from '@/components/article/MdxBodySkeleton';

export default function PostLoading() {
  return (
    <div className='flex gap-8 p-6 md:p-10 max-w-[784px] mx-auto'>
      <div className='flex-1 min-w-0 space-y-6'>
        <Skeleton className='w-full h-64 md:h-80 rounded-xl' />
        <Skeleton className='h-10 w-3/4' />
        <Skeleton className='h-5 w-full' />
        <div className='flex gap-4'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-16' />
        </div>
        <div className='flex gap-2 mt-4'>
          <Skeleton className='h-6 w-14 rounded-full' />
          <Skeleton className='h-6 w-14 rounded-full' />
        </div>
        <Skeleton className='h-px w-full' />
        <MdxBodySkeleton />
      </div>
    </div>
  );
}
