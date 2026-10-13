import { NextResponse } from "next/server";
import { requireSql } from "@/lib/server/db";
import { clientIpHash } from "@/lib/server/security";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HOURLY_LIMIT = 5;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (typeof body?.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const lang = body?.lang === "en" ? "en" : "az";

  if (!name || name.length > 100 || !emailRegex.test(email) || email.length > 200 || message.length < 10 || message.length > 5000) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  let sql;
  try {
    sql = requireSql();
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const ipHash = await clientIpHash();
  const [{ count }] = await sql`
    select count(*)::int as count from messages
    where ip_hash = ${ipHash} and created_at > now() - interval '1 hour'`;
  if (count >= HOURLY_LIMIT) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const userAgent = request.headers.get("user-agent")?.slice(0, 300) ?? null;
  await sql`
    insert into messages (name, email, message, lang, ip_hash, user_agent)
    values (${name}, ${email}, ${message}, ${lang}, ${ipHash}, ${userAgent})`;

  return NextResponse.json({ ok: true }, { status: 201 });
}
