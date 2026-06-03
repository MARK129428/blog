import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PostCardSkeleton() {
  return (
    <Card className='h-full flex flex-col overflow-hidden'>
      <Skeleton className='w-full h-48' />
      <CardHeader className='flex-1'>
        <Skeleton className='h-6 w-3/4 mb-2' />
        <Skeleton className='h-4 w-full' />
      </CardHeader>
      <CardContent className='flex-1'>
        <div className='flex gap-2'>
          <Skeleton className='h-5 w-14' />
          <Skeleton className='h-5 w-14' />
        </div>
      </CardContent>
      <CardFooter className='flex items-center justify-between border-t pt-4'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-4 w-16' />
      </CardFooter>
    </Card>
  );
}
