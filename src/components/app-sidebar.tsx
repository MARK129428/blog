import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import menuGroups from '@/lib/menuGroups';
import Image from 'next/image';

export function AppSidebar() {
  return (
    <Sidebar className='bg-sidebar text-sidebar-foreground border-r border-sidebar-border'>
      <SidebarContent>
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className='text-sidebar-foreground/60'>
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className='flex items-center gap-2 px-2 py-1 rounded hover:bg-sidebar-accent transition-colors'
                      >
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={20} // 对应 w-5
                          height={20} // 对应 h-5
                          className='object-contain'
                        />

                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
