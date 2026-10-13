import Link from "next/link";
import { ArrowRight, Inbox, MailOpen, CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireSql } from "@/lib/server/db";
import { readContact } from "@/lib/server/contact";
import { formatRelative } from "@/lib/format";

export const metadata = { title: "İcmal" };

export default async function OverviewPage() {
  const sql = requireSql();
  const [[stats], recent, contact] = await Promise.all([
    sql`
      select
        count(*)::int as total,
        count(*) filter (where read_at is null)::int as unread,
        count(*) filter (where created_at > now() - interval '7 days')::int as week,
        max(created_at) as last
      from messages`,
    sql`select id, name, email, message, read_at, created_at from messages order by created_at desc limit 5`,
    readContact(),
  ]);

  const cards = [
    { label: "Ümumi mesaj", value: stats.total, icon: Inbox },
    { label: "Oxunmamış", value: stats.unread, icon: MailOpen, accent: stats.unread > 0 },
    { label: "Son 7 gün", value: stats.week, icon: CalendarDays },
    { label: "Son mesaj", value: stats.last ? formatRelative(stats.last) : "—", icon: Clock, small: true },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, accent, small }) => (
          <Card key={label} className="gap-2 py-5">
            <CardHeader className="px-5">
              <CardDescription className="flex items-center gap-2">
                <Icon className="size-4" />
                {label}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5">
              <p className={`font-semibold tabular-nums ${small ? "text-lg" : "text-3xl"} ${accent ? "text-signal" : ""}`}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Son mesajlar</CardTitle>
            <CardDescription>Saytdakı formdan gələn son 5 mesaj</CardDescription>
            <CardAction>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/messages">
                  Hamısı <ArrowRight />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {recent.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Hələ mesaj yoxdur.</p>
            ) : (
              <ul className="divide-y">
                {recent.map((m) => (
                  <li key={m.id}>
                    <Link href={`/admin/messages?open=${m.id}`} className="flex items-start gap-3 rounded-md px-2 py-3 hover:bg-muted/60">
                      <span className={`mt-1.5 size-2 shrink-0 rounded-full ${m.read_at ? "bg-transparent" : "bg-signal"}`} aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className={`truncate text-sm ${m.read_at ? "" : "font-semibold"}`}>{m.name}</span>
                          {!m.read_at && <Badge variant="secondary" className="shrink-0">Yeni</Badge>}
                          <span className="ml-auto shrink-0 text-xs text-muted-foreground">{formatRelative(m.created_at)}</span>
                        </span>
                        <span className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{m.message}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Əlaqə məlumatları</CardTitle>
            <CardDescription>Saytda göstərilən məlumatlar</CardDescription>
            <CardAction>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/contact">Dəyiş</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 text-sm">
              {[
                ["E-poçt", contact.email],
                ["Telefon", contact.phone],
                ["GitHub", contact.github],
                ["Ünvan (AZ)", contact.location.az],
                ["Ünvan (EN)", contact.location.en],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-0.5">
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="truncate font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
