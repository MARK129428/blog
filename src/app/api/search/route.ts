import { buildSearchIndex } from '@/lib/search';

export async function GET() {
  const index = await buildSearchIndex();
  return Response.json(index);
}
