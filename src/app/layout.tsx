import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '何鸿凯的博客',
  description: '何鸿凯的技术博客，记录学习和生活的点滴。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
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
                <h1 className='text-lg font-semibold'>何鸿凯的博客</h1>
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
