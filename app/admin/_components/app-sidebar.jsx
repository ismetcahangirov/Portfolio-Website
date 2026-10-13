"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsUpDown, ExternalLink, Inbox, KeyRound, LayoutDashboard, LogOut, Contact } from "lucide-react";
import Logo from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "../actions";

export const NAV = [
  { href: "/admin", label: "İcmal", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Mesajlar", icon: Inbox, badge: "unread" },
  { href: "/admin/contact", label: "Əlaqə məlumatları", icon: Contact },
  { href: "/admin/settings", label: "Təhlükəsizlik", icon: KeyRound },
];

export default function AppSidebar({ unread, ...props }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const isActive = (href) => (href === "/admin" ? pathname === href : pathname.startsWith(href));
  const close = () => isMobile && setOpenMobile(false);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin" onClick={close}>
                <span className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg border border-sidebar-border bg-white">
                  <Logo className="size-5" />
                </span>
                <span className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Ismat Jahangirov</span>
                  <span className="truncate text-xs text-muted-foreground">Portfolio admin</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>İdarəetmə</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map(({ href, label, icon: Icon, badge }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild isActive={isActive(href)} tooltip={label} className="relative">
                    <Link href={href} onClick={close}>
                      <Icon />
                      {badge === "unread" && unread > 0 && (
                        <span aria-hidden="true" className="absolute right-1 top-1 hidden size-2 rounded-full bg-signal group-data-[collapsible=icon]:block" />
                      )}
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                  {badge === "unread" && unread > 0 && (
                    <SidebarMenuBadge className="rounded-full bg-signal px-1.5 text-white peer-hover/menu-button:text-white peer-data-[active=true]/menu-button:text-white">
                      {unread > 99 ? "99+" : unread}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Sayta keç">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    <span>Sayta keç</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                    IJ
                  </span>
                  <span className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Admin</span>
                    <span className="truncate text-xs text-muted-foreground">ismatjahangirov.is-a.dev</span>
                  </span>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">Hesab</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" onClick={close}>
                    <KeyRound />
                    Parolu dəyiş
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={logout}>
                  <DropdownMenuItem asChild variant="destructive">
                    <button type="submit" className="w-full">
                      <LogOut />
                      Çıxış
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
