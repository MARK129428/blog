import { Metadata } from 'next';
import Link from 'next/link';
import { ThemeProvider } from 'next-themes';
import { Inter, Newsreader } from 'next/font/google';
import { SearchDialog } from '@/components/SearchDialog';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@/components/layout/Analytics';
import { ScrollToTop } from '@/components/ScrollToTop';
import { siteConfig } from '@/config/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  style: ['italic', 'normal'],
});

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
  return (
    <html lang='zh-CN' suppressHydrationWarning className={`${inter.variable} ${newsreader.variable}`}>
      <body className='antialiased bg-background text-foreground'>
        <a
          href='#content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded'
        >
          跳到内容
        </a>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <div className='min-h-screen flex flex-col'>
            <header className='sticky top-0 z-40 px-6 py-3 border-b border-border/60 flex items-center gap-5 bg-background/80 backdrop-blur'>
              <Link
                href='/'
                className='text-lg font-semibold hover:text-primary transition-colors'
              >
                {siteConfig.title}
              </Link>
              <Link
                href='/thoughts'
                prefetch
                className='text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline'
              >
                说说
              </Link>
              <Link
                href='/tags'
                prefetch
                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                标签
              </Link>
              <Link
                href='/friends'
                prefetch
                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                友链
              </Link>
              <Link
                href='/about'
                prefetch
                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                关于
              </Link>
              <div className='flex-1' />
              <SearchDialog />
              <ThemeToggle />
            </header>
            <main id='content' className='flex-1'>{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
