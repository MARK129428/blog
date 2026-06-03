import { PostCardSkeleton } from '@/components/ui/PostCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function CatalogLoading() {
  return (
    <div className='p-6 md:p-10'>
      <div className='mb-8'>
        <Skeleton className='h-10 w-48 mb-2' />
        <Skeleton className='h-5 w-32' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
