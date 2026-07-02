import { getMdxContent } from '@/lib/getMdxContent';
import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ catalog: string; slug: string }>;
}) {
  const { catalog, slug } = await params;
  let title: string = siteConfig.title;
  let date = '';

  try {
    const { meta } = await getMdxContent(catalog, slug);
    title = meta.title;
    date = meta.date || '';
  } catch {
    // fallback to site title
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: '#000000',
          color: '#ededed',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 80,
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #0070f3, #7928ca, #ff0080)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 800,
            height: 400,
            background:
              'radial-gradient(ellipse, rgba(0,112,243,0.35), transparent 70%)',
          }}
        />
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: 24,
            maxWidth: '90%',
          }}
        >
          {title}
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 24,
            color: '#888888',
          }}
        >
          <span>{siteConfig.author}</span>
          {date && <span>· {date}</span>}
        </div>
      </div>
    ),
    { ...size },
  );
}
