import { NextResponse } from "next/server";
import { getSession } from "@/lib/server/auth";
import { exportMessages, parseFilters } from "@/lib/server/messages";

const cell = (value) => {
  const s = value == null ? "" : value instanceof Date ? value.toISOString() : String(value);
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
};

export async function GET(request) {
  if (!(await getSession())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const filters = parseFilters(Object.fromEntries(request.nextUrl.searchParams));
  const rows = await exportMessages(filters);
  const header = ["id", "name", "email", "message", "lang", "read_at", "created_at"];
  const csv = [header.join(","), ...rows.map((r) => header.map((k) => cell(r[k])).join(","))].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="messages-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
