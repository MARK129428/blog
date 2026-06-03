import { getAllPosts, getCatalogNames } from '@/lib/content';
import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hehk.cn';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const catalogs = getCatalogNames();

  // Collect all unique tags
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags || []) {
      tagSet.add(tag);
    }
  }

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/${post.catalog}/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const catalogEntries: MetadataRoute.Sitemap = catalogs.map((catalog) => ({
    url: `${BASE_URL}/${catalog}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const tagEntries: MetadataRoute.Sitemap = Array.from(tagSet).map((tag) => ({
    url: `${BASE_URL}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...catalogEntries,
    ...tagEntries,
    ...postEntries,
  ];
}
