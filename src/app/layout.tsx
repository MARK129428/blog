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
      <body className='antialiased bg-background text-foreground'>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <div className='min-h-screen flex flex-col'>
            <header className='sticky top-0 z-40 p-3 border-b border-border flex items-center gap-4 bg-card/80 backdrop-blur'>
              <Link
                href='/'
                className='text-lg font-semibold hover:text-primary transition-colors'
              >
                {siteConfig.title}
              </Link>
              <Link
                href='/tags'
                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                标签
              </Link>
              <Link
                href='/about'
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
