import { Metadata } from 'next';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { siteConfig } from '@/config/site';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body
        className="antialiased bg-background text-foreground"
      >
        <SidebarProvider>
          <div className='flex h-screen w-screen'>
            {/* 左侧 Sidebar */}
            <AppSidebar />

            {/* 右侧内容区 */}
            <div className='flex-1 flex flex-col overflow-auto bg-background'>
              {/* 顶部 header */}
              <header className='p-2 border-b border-border flex items-center bg-card text-card-foreground'>
                <SidebarTrigger className='mr-2' />
                <h1 className='text-lg font-semibold'>
                  <Link href='/'>{siteConfig.title}</Link>
                </h1>
              </header>

              {/* 页面内容 */}
              <main className='flex-1 p-4 overflow-auto'>
                <ScrollArea className='h-full'>
                  <Card className='p-6 bg-card text-card-foreground shadow-sm rounded-lg prose dark:prose-invert'>
                    {children}
                  </Card>
                </ScrollArea>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
