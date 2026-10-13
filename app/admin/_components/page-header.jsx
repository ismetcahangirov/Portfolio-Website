"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NAV } from "./app-sidebar";

export default function PageHeader() {
  const pathname = usePathname();
  const current = [...NAV].reverse().find((n) => (n.href === "/admin" ? pathname === n.href : pathname.startsWith(n.href)));
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/90 px-4 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
      <h1 className="truncate text-sm font-medium">{current?.label ?? "Admin"}</h1>
    </header>
  );
}
