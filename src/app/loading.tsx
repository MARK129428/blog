import { PostCardSkeleton } from '@/components/ui/PostCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomeLoading() {
  return (
    <div className='max-w-6xl mx-auto p-6 md:p-10'>
      <div className='flex flex-wrap gap-2 mb-8'>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className='h-7 w-16 rounded-full' />
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[1, 2, 3].map((i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
