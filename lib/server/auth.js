import "server-only";
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireSql } from "./db";
import { sha256, verifyPassword } from "./security";

export const SESSION_COOKIE = "admin_session";
const SESSION_DAYS = 7;
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_WINDOW_MINUTES = 15;

export async function storedPasswordHash() {
  const sql = requireSql();
  const [row] = await sql`select value from settings where key = 'admin_password'`;
  return row?.value?.hash || process.env.ADMIN_PASSWORD_HASH || null;
}

export async function checkPassword(password) {
  return verifyPassword(password, await storedPasswordHash());
}

export async function loginBlocked(ipHash) {
  const sql = requireSql();
  const [{ count }] = await sql`
    select count(*)::int as count from login_attempts
    where ip_hash = ${ipHash} and created_at > now() - make_interval(mins => ${LOGIN_WINDOW_MINUTES})`;
  return count >= MAX_LOGIN_ATTEMPTS;
}

export async function recordFailedLogin(ipHash) {
  await requireSql()`insert into login_attempts (ip_hash) values (${ipHash})`;
}

export async function createSession(ipHash) {
  const sql = requireSql();
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5);
  await sql`insert into admin_sessions (token_hash, expires_at) values (${sha256(token)}, ${expires})`;
  await sql`delete from login_attempts where ip_hash = ${ipHash}`;
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const sql = requireSql();
  const [row] = await sql`
    select token_hash, expires_at from admin_sessions
    where token_hash = ${sha256(token)} and expires_at > now()`;
  return row || null;
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function destroySession({ all = false } = {}) {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const sql = requireSql();
  if (all) await sql`delete from admin_sessions`;
  else if (token) await sql`delete from admin_sessions where token_hash = ${sha256(token)}`;
  store.delete(SESSION_COOKIE);
}
