import { getDict } from "@/app/_i18n";
import Container from "../Container";
import ProjectWheel from "./ProjectWheel";

function Cross({ className }) {
  return (
    <span aria-hidden="true" className={`absolute h-3 w-3 ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/40" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink/40" />
    </span>
  );
}

export default function ProjectsSection({ lang }) {
  const t = getDict(lang);
  const s = t.projectsSection;
  const size = lang === "az" ? "text-[clamp(2.3rem,10.6vw,10rem)]" : "text-[clamp(2.9rem,13vw,11.5rem)]";
  return (
    <section id="projects" className="relative scroll-mt-20 overflow-hidden bg-fog pb-24 pt-20 sm:pt-24">
      <Container>
        <div className="relative px-2 py-10 sm:px-10 sm:py-14">
          <Cross className="left-0 top-0" />
          <Cross className="right-0 top-0" />
          <Cross className="bottom-0 left-0" />
          <Cross className="bottom-0 right-0" />

          <div className="flex items-start justify-between">
            <p className="font-wide text-[12px] font-extrabold uppercase leading-[1.05] tracking-tight sm:text-[14px]">
              {s.selected[0]}
              <br />
              {s.selected[1]}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/50">{s.hint}</p>
          </div>

          <div className="relative mt-6 flex justify-center sm:mt-4">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[150%] w-[15%] -translate-x-1/2 -translate-y-1/2 bg-signal"
            />
            <h2 className="relative text-center">
              <span
                aria-hidden="true"
                className={`font-wide text-outline absolute inset-0 translate-x-[0.06em] translate-y-[0.16em] ${size} font-black uppercase leading-none tracking-[-0.03em] text-ink/70`}
              >
                {s.title}
              </span>
              <span className={`font-wide relative block ${size} font-black uppercase leading-none tracking-[-0.03em]`}>
                {s.title}
              </span>
            </h2>
          </div>

          <div className="mt-12 flex items-end justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60 sm:mt-16 sm:text-[11px]">
            <span>{t.name}</span>
            <span className="hidden text-center sm:block">{s.middle}</span>
            <span className="text-right">{s.right}</span>
          </div>
        </div>
      </Container>

      <div className="mt-8">
        <ProjectWheel lang={lang} />
      </div>
    </section>
  );
}
