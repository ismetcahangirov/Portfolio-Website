import az from "./az";
import en from "./en";
import { projects } from "@/app/_data/projects";

export const locales = ["az", "en"];
export const defaultLocale = "az";

const dictionaries = { az, en };

export const getDict = (lang) => dictionaries[lang] ?? dictionaries[defaultLocale];

export const localePath = (lang) => (lang === defaultLocale ? "/" : `/${lang}`);

export const getProjects = (lang) => {
  const t = getDict(lang);
  return projects.map((p) => ({ ...p, ...t.projects[p.name] }));
};
