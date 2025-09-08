import Link from "next/link";

import { Icon } from "@/components/icons/icon";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: "home" as const },
  {
    title: "Wasm Insert JSON",
    url: "/wasm-insert-json",
    icon: "database" as const,
  },
  { title: "Wasm Snapshot", url: "/wasm-snapshot", icon: "database" as const },
  { title: "SSR", url: "/ssr", icon: "settings" as const },
  { title: "CSR", url: "/csr", icon: "search" as const },
];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <Icon name={item.icon} decorative />
                      <span className="group-data-[open=false]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export { AppSidebar };
