import "server-only";
import { unstable_cache } from "next/cache";
import { DEFAULT_CONTACT } from "@/lib/contact-defaults";
import { getSql } from "./db";

export const CONTACT_TAG = "contact";

export const normalizeContact = (value) => ({
  ...DEFAULT_CONTACT,
  ...(value || {}),
  location: { ...DEFAULT_CONTACT.location, ...(value?.location || {}) },
});

export async function readContact() {
  const sql = getSql();
  if (!sql) return DEFAULT_CONTACT;
  const [row] = await sql`select value from settings where key = 'contact'`;
  return normalizeContact(row?.value);
}

export const getContact = unstable_cache(
  async () => {
    try {
      return await readContact();
    } catch (error) {
      console.error("[contact] falling back to defaults", error);
      return DEFAULT_CONTACT;
    }
  },
  ["contact"],
  { tags: [CONTACT_TAG] }
);
