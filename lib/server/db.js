import "server-only";
import postgres from "postgres";

const globalForDb = globalThis;

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForDb.__portfolioSql) {
    globalForDb.__portfolioSql = postgres(url, {
      max: 3,
      idle_timeout: 20,
      prepare: false,
      ssl: /localhost|127\.0\.0\.1/.test(url) ? false : "require",
    });
  }
  return globalForDb.__portfolioSql;
}

export function requireSql() {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");
  return sql;
}
