import { cookies } from "next/headers";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requireAdmin } from "@/lib/server/auth";
import { requireSql } from "@/lib/server/db";
import AppSidebar from "../_components/app-sidebar";
import PageHeader from "../_components/page-header";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }) {
  await requireAdmin();
  const [{ unread }] = await requireSql()`select count(*)::int as unread from messages where read_at is null`;
  const defaultOpen = (await cookies()).get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar unread={unread} />
      <SidebarInset>
        <PageHeader />
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
