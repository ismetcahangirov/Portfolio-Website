import { locales, localePath } from "@/app/_i18n";

const SITE = "https://ismatjahangirov.is-a.dev";

export default function sitemap() {
  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE}${localePath(l)}`]));
  return locales.map((lang) => ({
    url: `${SITE}${localePath(lang)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "az" ? 1 : 0.9,
    alternates: { languages },
  }));
}
