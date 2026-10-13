import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("[migrate] DATABASE_URL not set, skipping");
  process.exit(0);
}

const sql = postgres(url, {
  max: 1,
  prepare: false,
  ssl: /localhost|127\.0\.0\.1/.test(url) ? false : "require",
});

await sql.begin(async (tx) => {
  await tx`
    create table if not exists messages (
      id bigserial primary key,
      name text not null,
      email text not null,
      message text not null,
      lang text not null default 'az',
      ip_hash text,
      user_agent text,
      read_at timestamptz,
      created_at timestamptz not null default now()
    )`;
  await tx`create index if not exists messages_created_at_idx on messages (created_at desc)`;
  await tx`create index if not exists messages_ip_hash_created_at_idx on messages (ip_hash, created_at desc)`;
  await tx`
    create table if not exists settings (
      key text primary key,
      value jsonb not null,
      updated_at timestamptz not null default now()
    )`;
  await tx`
    create table if not exists admin_sessions (
      token_hash text primary key,
      created_at timestamptz not null default now(),
      expires_at timestamptz not null
    )`;
  await tx`
    create table if not exists login_attempts (
      id bigserial primary key,
      ip_hash text not null,
      created_at timestamptz not null default now()
    )`;
  await tx`create index if not exists login_attempts_ip_idx on login_attempts (ip_hash, created_at desc)`;
  await tx`delete from admin_sessions where expires_at < now()`;
  await tx`delete from login_attempts where created_at < now() - interval '1 day'`;
});

await sql.end();
console.log("[migrate] done");
