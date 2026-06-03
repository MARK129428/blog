import { Metadata } from 'next';
import Link from 'next/link';
import { ThemeProvider } from 'next-themes';
import { SearchDialog } from '@/components/SearchDialog';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/layout/Footer';
import { Analytics } from '@/components/layout/Analytics';
import { ScrollToTop } from '@/components/ScrollToTop';
import { siteConfig } from '@/config/site';
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
  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500&display=swap' rel='stylesheet' />
      </head>
      <body className='antialiased bg-background text-foreground'>
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
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
