import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='flex items-center justify-center gap-2 mt-8'>
      <Button
        variant='outline'
        size='sm'
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={`${basePath}?page=${currentPage - 1}`}>
            <ChevronLeft className='w-4 h-4 mr-1' />
            上一页
          </Link>
        ) : (
          <span>
            <ChevronLeft className='w-4 h-4 mr-1' />
            上一页
          </span>
        )}
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'default' : 'outline'}
          size='sm'
          asChild={page !== currentPage}
        >
          {page !== currentPage ? (
            <Link href={`${basePath}?page=${page}`}>{page}</Link>
          ) : (
            <span>{page}</span>
          )}
        </Button>
      ))}

      <Button
        variant='outline'
        size='sm'
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={`${basePath}?page=${currentPage + 1}`}>
            下一页
            <ChevronRight className='w-4 h-4 ml-1' />
          </Link>
        ) : (
          <span>
            下一页
            <ChevronRight className='w-4 h-4 ml-1' />
          </span>
        )}
      </Button>
    </div>
  );
}
