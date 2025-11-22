'use client';

interface AuthorBioProps {
  name?: string;
  date?: string;
}

export function AuthorBio({ name, date }: AuthorBioProps) {
  return (
    <div className='mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg'>
          {name?.[0]?.toUpperCase() || 'A'}
        </div>
        <div>
          <p className='font-semibold text-gray-900 dark:text-gray-100'>
            {name || '作者'}
          </p>
          {date && (
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              发布于 {date}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

