"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireSql } from "@/lib/server/db";
import { CONTACT_TAG, normalizeContact } from "@/lib/server/contact";
import { clientIpHash, hashPassword } from "@/lib/server/security";
import {
  checkPassword,
  createSession,
  destroySession,
  loginBlocked,
  recordFailedLogin,
  requireAdmin,
} from "@/lib/server/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function login(_prev, formData) {
  const password = String(formData.get("password") ?? "");
  const ipHash = await clientIpHash();
  if (await loginBlocked(ipHash)) {
    return { error: "Çox sayda uğursuz cəhd. 15 dəqiqə sonra yenidən yoxlayın." };
  }
  if (!password || !(await checkPassword(password))) {
    await recordFailedLogin(ipHash);
    return { error: "Parol yanlışdır." };
  }
  await createSession(ipHash);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export async function logoutEverywhere() {
  await requireAdmin();
  await destroySession({ all: true });
  redirect("/admin/login");
}

const toId = (id) => {
  const n = Number(id);
  if (!Number.isSafeInteger(n) || n <= 0) throw new Error("Invalid id");
  return n;
};

export async function setMessageRead(id, read) {
  await requireAdmin();
  const sql = requireSql();
  await sql`update messages set read_at = ${read ? sql`now()` : null} where id = ${toId(id)}`;
  revalidatePath("/admin", "layout");
}

export async function markAllRead() {
  await requireAdmin();
  await requireSql()`update messages set read_at = now() where read_at is null`;
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(id) {
  await requireAdmin();
  await requireSql()`delete from messages where id = ${toId(id)}`;
  revalidatePath("/admin", "layout");
}

export async function updateContact(_prev, formData) {
  await requireAdmin();
  const value = normalizeContact({
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    github: String(formData.get("github") ?? "").trim().replace(/^https?:\/\/github\.com\//i, "").replace(/\/+$/, ""),
    location: {
      az: String(formData.get("location_az") ?? "").trim(),
      en: String(formData.get("location_en") ?? "").trim(),
    },
  });

  const errors = {};
  if (!emailRegex.test(value.email)) errors.email = "Düzgün e-poçt ünvanı yazın.";
  if (!/^\+?[\d\s()-]{7,20}$/.test(value.phone)) errors.phone = "Telefon nömrəsi yalnız rəqəm, boşluq, +, (, ) və - ola bilər.";
  if (!/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(value.github)) errors.github = "GitHub istifadəçi adı düzgün deyil.";
  if (!value.location.az || value.location.az.length > 80) errors.location_az = "Ünvanı yazın (80 simvola qədər).";
  if (!value.location.en || value.location.en.length > 80) errors.location_en = "Ünvanı yazın (80 simvola qədər).";
  if (Object.keys(errors).length) return { errors, values: value };

  await requireSql()`
    insert into settings (key, value, updated_at) values ('contact', ${requireSql().json(value)}, now())
    on conflict (key) do update set value = excluded.value, updated_at = now()`;
  revalidateTag(CONTACT_TAG);
  revalidatePath("/admin/contact");
  return { ok: true, values: value, savedAt: Date.now() };
}

export async function changePassword(_prev, formData) {
  await requireAdmin();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (!(await checkPassword(current))) return { error: "Hazırkı parol yanlışdır." };
  if (next.length < 12) return { error: "Yeni parol ən azı 12 simvol olmalıdır." };
  if (next !== confirm) return { error: "Yeni parollar eyni deyil." };
  const hash = await hashPassword(next);
  await requireSql()`
    insert into settings (key, value, updated_at) values ('admin_password', ${requireSql().json({ hash })}, now())
    on conflict (key) do update set value = excluded.value, updated_at = now()`;
  return { ok: true, savedAt: Date.now() };
}
