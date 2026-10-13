import Link from "next/link";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getMessage, listMessages, parseFilters } from "@/lib/server/messages";
import MessagesTable from "./messages-table";
import MarkAllReadButton from "./mark-all-read";

export const metadata = { title: "Mesajlar" };

const STATUSES = [
  { value: "all", label: "Hamısı" },
  { value: "unread", label: "Oxunmamış" },
  { value: "read", label: "Oxunmuş" },
];

const qs = (filters, patch) => {
  const p = new URLSearchParams();
  const next = { ...filters, ...patch };
  if (next.q) p.set("q", next.q);
  if (next.status !== "all") p.set("status", next.status);
  if (next.page > 1) p.set("page", String(next.page));
  const s = p.toString();
  return s ? `?${s}` : "";
};

export default async function MessagesPage({ searchParams }) {
  const params = await searchParams;
  const filters = parseFilters(params);
  const [{ rows, total, pages }, opened] = await Promise.all([
    listMessages(filters),
    params?.open ? getMessage(params.open) : null,
  ]);

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
          <form className="relative w-full sm:w-72" role="search">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            {filters.status !== "all" && <input type="hidden" name="status" value={filters.status} />}
            <Input name="q" defaultValue={filters.q} placeholder="Ad, e-poçt və ya mətn…" className="pl-8" aria-label="Mesajlarda axtar" />
          </form>
          <nav aria-label="Status filtri" className="inline-flex w-full rounded-lg bg-muted p-1 sm:w-auto">
            {STATUSES.map((s) => (
              <Link
                key={s.value}
                href={`/admin/messages${qs(filters, { status: s.value, page: 1 })}`}
                aria-current={filters.status === s.value ? "page" : undefined}
                className={`flex-1 rounded-md px-3 py-1.5 text-center text-sm font-medium transition-colors sm:flex-none ${
                  filters.status === s.value ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex gap-2">
          <MarkAllReadButton />
          <Button variant="outline" size="sm" asChild>
            <a href={`/admin/messages/export${qs(filters, { page: 1 })}`} download>
              <Download />
              CSV
            </a>
          </Button>
        </div>
      </div>

      <Card className="py-0">
        <CardContent className="px-0">
          <MessagesTable rows={rows} opened={opened} emptyText={filters.q || filters.status !== "all" ? "Filtrə uyğun mesaj tapılmadı." : "Hələ mesaj yoxdur."} />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>
          Cəmi {total} mesaj · Səhifə {Math.min(filters.page, pages)} / {pages}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild={filters.page > 1} disabled={filters.page <= 1}>
            {filters.page > 1 ? (
              <Link href={`/admin/messages${qs(filters, { page: filters.page - 1 })}`} aria-label="Əvvəlki səhifə">
                <ChevronLeft />
              </Link>
            ) : (
              <span aria-label="Əvvəlki səhifə"><ChevronLeft /></span>
            )}
          </Button>
          <Button variant="outline" size="sm" asChild={filters.page < pages} disabled={filters.page >= pages}>
            {filters.page < pages ? (
              <Link href={`/admin/messages${qs(filters, { page: filters.page + 1 })}`} aria-label="Növbəti səhifə">
                <ChevronRight />
              </Link>
            ) : (
              <span aria-label="Növbəti səhifə"><ChevronRight /></span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
