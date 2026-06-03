import { getAllPosts } from '@/lib/content';
import { siteConfig } from '@/config/site';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hehk.cn';

export async function GET() {
  const posts = await getAllPosts();

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/${post.catalog}/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/${post.catalog}/${post.slug}</guid>
      <description><![CDATA[${post.description || ''}]]></description>
      ${post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ''}
      ${(post.tags || []).map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`,
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.title}</title>
    <link>${BASE_URL}</link>
    <description>${siteConfig.description}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
