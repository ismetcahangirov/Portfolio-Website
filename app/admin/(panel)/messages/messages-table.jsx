"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Copy, Mail, MailCheck, MailOpen, MoreHorizontal, Reply, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTime, formatRelative } from "@/lib/format";
import { deleteMessage, setMessageRead } from "../../actions";

export default function MessagesTable({ rows, opened, emptyText }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(opened ?? null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (opened) setActive(opened);
  }, [opened]);

  const clearOpenParam = () => {
    if (!searchParams.has("open")) return;
    const p = new URLSearchParams(searchParams);
    p.delete("open");
    const s = p.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };

  const run = (fn, success) =>
    startTransition(async () => {
      try {
        await fn();
        if (success) toast.success(success);
        router.refresh();
      } catch {
        toast.error("Əməliyyat alınmadı. Yenidən cəhd edin.");
      }
    });

  const open = (m) => {
    setActive(m);
    if (!m.read_at) run(() => setMessageRead(m.id, true));
  };

  const close = () => {
    setActive(null);
    clearOpenParam();
  };

  useEffect(() => {
    if (opened && !opened.read_at) run(() => setMessageRead(opened.id, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened?.id]);

  const toggleRead = (m) =>
    run(() => setMessageRead(m.id, !m.read_at), m.read_at ? "Oxunmamış kimi işarələndi." : "Oxunmuş kimi işarələndi.");

  const remove = (m) =>
    run(async () => {
      await deleteMessage(m.id);
      setConfirmDelete(null);
      if (active?.id === m.id) close();
    }, "Mesaj silindi.");

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("E-poçt kopyalandı.");
    } catch {
      toast.error("Kopyalamaq alınmadı.");
    }
  };

  if (rows.length === 0) {
    return <p className="px-6 py-16 text-center text-sm text-muted-foreground">{emptyText}</p>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8 pl-4"><span className="sr-only">Status</span></TableHead>
            <TableHead>Göndərən</TableHead>
            <TableHead className="hidden md:table-cell">E-poçt</TableHead>
            <TableHead className="hidden lg:table-cell">Mesaj</TableHead>
            <TableHead className="hidden sm:table-cell">Tarix</TableHead>
            <TableHead className="w-12 pr-4"><span className="sr-only">Əməliyyatlar</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((m) => (
            <TableRow key={m.id} className="cursor-pointer" onClick={() => open(m)}>
              <TableCell className="pl-4">
                <span className={`block size-2 rounded-full ${m.read_at ? "bg-muted-foreground/25" : "bg-signal"}`} title={m.read_at ? "Oxunub" : "Oxunmayıb"} />
              </TableCell>
              <TableCell className="max-w-[180px] sm:max-w-none">
                <button type="button" className={`block max-w-full truncate text-left ${m.read_at ? "" : "font-semibold"}`} onClick={(e) => { e.stopPropagation(); open(m); }}>
                  {m.name}
                </button>
                <span className="block truncate text-xs text-muted-foreground md:hidden">{m.email}</span>
                <span className="block text-xs text-muted-foreground sm:hidden">{formatRelative(m.created_at)}</span>
              </TableCell>
              <TableCell className="hidden max-w-[220px] truncate md:table-cell">{m.email}</TableCell>
              <TableCell className="hidden max-w-[360px] truncate text-muted-foreground lg:table-cell">{m.message}</TableCell>
              <TableCell className="hidden whitespace-nowrap text-muted-foreground sm:table-cell" title={formatDateTime(m.created_at)}>
                {formatRelative(m.created_at)}
              </TableCell>
              <TableCell className="pr-4" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8" aria-label={`${m.name}: əməliyyatlar`}>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem onSelect={() => open(m)}>
                      <MailOpen /> Aç
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => toggleRead(m)}>
                      {m.read_at ? <Mail /> : <MailCheck />}
                      {m.read_at ? "Oxunmamış et" : "Oxunmuş et"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => copyEmail(m.email)}>
                      <Copy /> E-poçtu kopyala
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onSelect={() => setConfirmDelete(m)}>
                      <Trash2 /> Sil
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!active} onOpenChange={(v) => !v && close()}>
        {active && (
          <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex flex-wrap items-center gap-2 pr-6">
                {active.name}
                <Badge variant="outline" className="uppercase">{active.lang}</Badge>
              </DialogTitle>
              <DialogDescription className="break-all">
                <a href={`mailto:${active.email}`} className="underline-offset-4 hover:underline">{active.email}</a>
                <span className="mx-1.5">·</span>
                {formatDateTime(active.created_at)}
              </DialogDescription>
            </DialogHeader>
            <p className="whitespace-pre-wrap break-words rounded-lg bg-muted/60 p-4 text-sm leading-relaxed">{active.message}</p>
            <DialogFooter className="gap-2 sm:justify-between">
              <Button variant="outline" className="text-destructive hover:text-destructive" onClick={() => setConfirmDelete(active)} disabled={pending}>
                <Trash2 /> Sil
              </Button>
              <Button asChild>
                <a href={`mailto:${active.email}?subject=${encodeURIComponent("Re: portfolio mesajı")}`}>
                  <Reply /> Cavab yaz
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      <AlertDialog open={!!confirmDelete} onOpenChange={(v) => !v && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mesaj silinsin?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDelete?.name} tərəfindən göndərilən mesaj həmişəlik silinəcək. Bu əməliyyatı geri qaytarmaq olmur.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Ləğv et</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              disabled={pending}
              onClick={(e) => {
                e.preventDefault();
                remove(confirmDelete);
              }}
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
