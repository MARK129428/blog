import { Metadata } from 'next';
import Link from 'next/link';
import { ThemeProvider } from 'next-themes';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SearchDialog } from '@/components/SearchDialog';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/layout/Footer';
import { CatalogNav } from '@/components/layout/CatalogNav';
import { GridBackground } from '@/components/layout/GridBackground';
import { Analytics } from '@/components/layout/Analytics';
import { ScrollToTop } from '@/components/ScrollToTop';
import { siteConfig } from '@/config/site';
import { getCatalogNames } from '@/lib/content';
import { getCatalogLabel } from '@/config/catalogs';
import './globals.css';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hehk.cn',
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const catalogs = getCatalogNames().map((id) => ({
    id,
    label: getCatalogLabel(id),
  }));

  return (
    <html
      lang='zh-CN'
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className={`${GeistSans.className} min-h-screen antialiased`}>
        <GridBackground />
        <a
          href='#content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md'
        >
          跳到内容
        </a>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='min-h-screen flex flex-col'>
            <header className='sticky top-0 z-40 h-14 border-b border-border/50 bg-background/70 backdrop-blur-xl'>
              <div className='mx-auto flex h-full max-w-6xl items-center gap-5 px-6'>
                <Link
                  href='/'
                  className='text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity'
                >
                  {siteConfig.title}
                </Link>
                <CatalogNav catalogs={catalogs} />
                <Link
                  href='/thoughts'
                  prefetch
                  className='vercel-link text-sm hidden sm:inline'
                >
                  说说
                </Link>
                <Link href='/tags' prefetch className='vercel-link text-sm'>
                  标签
                </Link>
                <Link href='/friends' prefetch className='vercel-link text-sm hidden sm:inline'>
                  友链
                </Link>
                <Link href='/about' prefetch className='vercel-link text-sm hidden sm:inline'>
                  关于
                </Link>
                <div className='flex-1' />
                <SearchDialog />
                <ThemeToggle />
              </div>
            </header>
            <main id='content' className='flex-1'>
              {children}
            </main>
            <Footer />
          </div>
          <ScrollToTop />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
