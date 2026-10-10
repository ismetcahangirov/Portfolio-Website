"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import Logo from "@/components/Logo";
import { getDict, locales, localePath } from "@/app/_i18n";
import Container from "../Container";

const sectionIds = ["home", "projects", "stack", "about", "contact"];

function useBakuClock(months) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { time: "--:--", date: "" };
  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Baku" }).format(now);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "numeric", year: "numeric", timeZone: "Asia/Baku" })
      .formatToParts(now)
      .map((p) => [p.type, p.value])
  );
  const date = `${parts.day} ${months[Number(parts.month) - 1]} ${parts.year}`;
  return { time, date };
}

function LanguageSwitch({ lang, dark, label, className = "" }) {
  const go = (e, target) => {
    e.preventDefault();
    window.location.href = localePath(target) + window.location.hash;
  };
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center rounded-xl p-1 text-[11px] font-semibold tracking-[0.08em] ${
        dark ? "bg-white/10" : "bg-ink/[0.07]"
      } ${className}`}
    >
      {locales.map((l) => (
        <a
          key={l}
          href={localePath(l)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          onClick={(e) => go(e, l)}
          className={`rounded-lg px-2.5 py-1.5 uppercase transition-colors ${
            l === lang
              ? dark
                ? "bg-white text-ink"
                : "bg-ink text-white"
              : dark
                ? "text-white/60 hover:text-white"
                : "text-ink/55 hover:text-ink"
          }`}
        >
          {l}
        </a>
      ))}
    </div>
  );
}

export default function Header({ lang }) {
  const t = getDict(lang);
  const links = sectionIds.map((id) => ({ id, name: t.nav[id], href: `#${id}` }));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const { time, date } = useBakuClock(t.months);
  const dark = active === "#about";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container>
        <div
          className={`mt-3 flex items-center justify-between gap-4 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4 ${
            scrolled
              ? dark
                ? "glass-dark text-white"
                : "glass shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)]"
              : "border border-transparent"
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5" aria-label={t.header.homeLabel}>
            <Logo className={`h-8 w-8 transition-colors ${dark ? "text-white" : "text-ink"}`} />
            <span className="font-display text-[15px] font-bold tracking-tight">{t.header.brand}</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={active === l.href ? "true" : undefined}
                    className={`relative flex flex-col items-center px-3 py-1.5 text-[14px] font-medium transition-colors ${
                      dark
                        ? "text-white/60 hover:text-white aria-[current]:text-white"
                        : "text-ink/70 hover:text-ink aria-[current]:text-ink"
                    }`}
                  >
                    {l.name}
                    <span
                      className={`absolute -bottom-0.5 h-1 w-1 rounded-full bg-signal transition-all duration-300 ${
                        active === l.href ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`hidden border-l pl-3 font-mono text-[11px] leading-tight xl:block ${
                dark ? "border-white/15" : "border-ink/15"
              }`}
            >
              <div className={dark ? "text-white/45" : "text-ink/45"}>{t.header.city}</div>
              <div className={dark ? "text-white" : "text-ink"}>
                {time} <span className="text-signal">•</span> {date}
              </div>
            </div>
            <LanguageSwitch lang={lang} dark={dark} label={t.header.language} className="hidden sm:flex" />
            <a
              href="#contact"
              className={`hidden items-center gap-1.5 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors lg:inline-flex ${
                dark ? "bg-signal text-white hover:bg-ember" : "bg-ink text-white hover:bg-ember"
              }`}
            >
              {t.header.talk} <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[12px] font-semibold tracking-[0.12em] lg:hidden ${
                dark ? "glass-dark text-white" : "glass"
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="flex flex-col gap-[3px]" aria-hidden="true">
                <span className={`block h-[1.5px] w-4 ${dark ? "bg-white" : "bg-ink"}`} />
                <span className={`block h-[1.5px] w-4 ${dark ? "bg-white" : "bg-ink"}`} />
              </span>
              {t.header.menu}
            </button>
          </div>
        </div>
      </Container>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.header.menuLabel}
        className={`fixed inset-0 z-50 flex flex-col bg-ink text-white transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-5">
          <span className="font-mono text-[11px] text-white/50">
            {time} <span className="text-signal">•</span> {t.header.cityShort}
          </span>
          <div className="flex items-center gap-3">
            <LanguageSwitch lang={lang} dark label={t.header.language} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
              aria-label={t.header.closeMenu}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
          {links.map((l, i) => (
            <li
              key={l.href}
              className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-wide block py-1 text-[clamp(2rem,10vw,3rem)] font-extrabold uppercase leading-tight tracking-tight hover:text-signal"
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-8 font-mono text-[12px] text-white/50">
          <a href="mailto:cahangirovismat@gmail.com" className="block py-1 hover:text-white">
            cahangirovismat@gmail.com
          </a>
          <a href="tel:+994552972759" className="block py-1 hover:text-white">
            +994 55 297 27 59
          </a>
        </div>
      </div>
    </header>
  );
}
