

import Link from 'next/link';
import { getMdxList } from '@/lib/getMdxList';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function JsIndexPage() {
  const posts = getMdxList('Js');

  return (
    <main className='p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {posts.map((post) => (
        <Link key={post.slug} href={`/js/${post.slug}`}>
          <Card className='cursor-pointer hover:shadow-lg transition-shadow'>
            <CardContent>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>创建时间: {post.date}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </main>
  );
}
