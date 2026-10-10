import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import { heroStack } from "@/app/_data/stack";
import { projects } from "@/app/_data/projects";
import { getDict } from "@/app/_i18n";
import Container from "../Container";
import FeaturedCard from "./FeaturedCard";

const reveal = "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700";

export default function Hero({ lang }) {
  const t = getDict(lang).hero;
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-fog">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex h-[62svh] justify-center sm:h-[78svh] lg:h-[96svh]">
        <Image
          src="/scene/hero-figure.png"
          alt={t.alt}
          width={928}
          height={1152}
          priority
          sizes="(min-width: 1024px) 80vh, 70vw"
          className="animate-in fade-in zoom-in-[0.97] fill-mode-both h-[112%] w-auto max-w-none translate-y-[3%] object-contain duration-1000"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[3.2rem] -z-0 flex select-none justify-center sm:bottom-14"
      >
        <span className="font-wide block shrink-0 whitespace-nowrap bg-gradient-to-b from-white via-white/70 to-white/0 bg-clip-text text-[16vw] font-black uppercase leading-[0.8] tracking-[-0.04em] text-transparent lg:text-[11.6vw]">
          {t.giant}
        </span>
      </div>

      <Container className="relative flex flex-1 flex-col pt-28 sm:pt-32">
        <div className="grid flex-1 gap-10 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="max-w-[620px]">
            <p className={`${reveal} flex flex-wrap items-center gap-2.5 text-[13px] font-medium text-ink/70`}>
              <span className="h-3.5 w-px bg-ink/60" />
              {t.role}
              <span className="text-ink/30">/</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">{t.open}</span>
            </p>

            <h1
              className={`${reveal} mt-5 font-display text-[clamp(2.5rem,5.3vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.045em] delay-100`}
            >
              {t.headline[0]}
              <br />
              {t.headline[1]}
              <br />
              <span className="text-graphite/70">{t.headline[2]}</span>
            </h1>

            <div className={`${reveal} mt-6 flex items-center gap-3 delay-200`}>
              <div className="flex -space-x-2.5">
                {projects.slice(0, 4).map((p) => (
                  <span key={p.name} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-fog bg-ink">
                    <Image src={p.image} alt="" fill sizes="32px" className="object-cover object-left-top" />
                  </span>
                ))}
              </div>
              <p className="text-[13px] leading-tight text-ink/70">
                <span className="font-semibold text-ink">{t.shipped}</span>
                <br />
                {t.students}
              </p>
            </div>

            <div className={`${reveal} mt-8 flex flex-wrap items-center gap-3 delay-300`}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-4 rounded-full bg-ink py-2 pl-6 pr-2 text-[14px] font-semibold text-white transition-colors hover:bg-ember"
              >
                {t.cta}
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center rounded-full bg-ink/10 px-6 py-[0.95rem] text-[14px] font-semibold text-ink/80 backdrop-blur-sm transition-colors hover:bg-ink/15 hover:text-ink"
              >
                {t.work}
              </a>
            </div>
          </div>

          <div className="hidden flex-col items-end gap-10 lg:flex">
            <div className={`${reveal} w-full delay-300`}>
              <FeaturedCard lang={lang} />
            </div>
            <div className={`${reveal} w-full max-w-[400px] delay-500`}>
              <p className="mb-3 text-right text-[13px] font-medium text-ink/70">{t.shipsWith}</p>
              <ul className="grid grid-cols-3 gap-x-4 gap-y-3">
                {heroStack.map((s) => (
                  <li key={s.name} className="flex items-center justify-end gap-1.5 text-[12px] font-semibold text-ink/55">
                    <BrandIcon icon={s.icon} name={s.name} className="h-3.5 w-3.5" />
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-3 sm:pb-4">
          <div className="glass-dark flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-[12px] font-medium text-white sm:text-[13px]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              {t.experience}
            </span>
            <span className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {t.based}
            </span>
            <a href="#projects" className="flex items-center gap-1.5 hover:text-signal">
              {t.scroll} <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
