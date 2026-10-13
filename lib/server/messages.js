import "server-only";
import { requireSql } from "./db";

export const PAGE_SIZE = 20;

export function parseFilters(searchParams) {
  const q = String(searchParams?.q ?? "").trim().slice(0, 100);
  const status = searchParams?.status === "unread" ? "unread" : searchParams?.status === "read" ? "read" : "all";
  const page = Math.max(1, Number.parseInt(searchParams?.page, 10) || 1);
  return { q, status, page };
}

function where(sql, { q, status }) {
  const pattern = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
  return sql`
    where true
    ${q ? sql`and (name ilike ${pattern} or email ilike ${pattern} or message ilike ${pattern})` : sql``}
    ${status === "unread" ? sql`and read_at is null` : status === "read" ? sql`and read_at is not null` : sql``}`;
}

export async function listMessages(filters) {
  const sql = requireSql();
  const offset = (filters.page - 1) * PAGE_SIZE;
  const [rows, [{ total }]] = await Promise.all([
    sql`
      select id, name, email, message, lang, read_at, created_at from messages
      ${where(sql, filters)}
      order by created_at desc
      limit ${PAGE_SIZE} offset ${offset}`,
    sql`select count(*)::int as total from messages ${where(sql, filters)}`,
  ]);
  return { rows, total, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export async function exportMessages(filters) {
  const sql = requireSql();
  return sql`
    select id, name, email, message, lang, read_at, created_at from messages
    ${where(sql, filters)}
    order by created_at desc`;
}

export async function getMessage(id) {
  const n = Number(id);
  if (!Number.isSafeInteger(n) || n <= 0) return null;
  const [row] = await requireSql()`select id, name, email, message, lang, read_at, created_at from messages where id = ${n}`;
  return row ?? null;
}
