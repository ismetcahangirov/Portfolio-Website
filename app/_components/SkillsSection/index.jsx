import BrandIcon from "@/components/BrandIcon";
import { notes } from "@/app/_data/stack";
import { getDict } from "@/app/_i18n";
import Container from "../Container";
import TvScene from "./TvScene";

const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1", "rotate-2", "-rotate-[1.5deg]", "rotate-1", "-rotate-2"];
const leftTitles = ["Frameworks", "State & data", "UI", "AI tools"];

function Note({ note, title, tilt, className = "" }) {
  return (
    <article
      className={`notebook group relative w-full max-w-[300px] rounded-[3px] pb-2 pl-[2rem] pr-2 pt-3 shadow-[0_1px_0_rgb(0_0_0/0.06),0_12px_24px_-14px_rgb(0_0_0/0.45)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] lg:pb-3 lg:pl-[2.7rem] lg:pr-4 ${tilt} ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[-7px] z-10 h-[14px] w-[14px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ff7a84,#e3202f_45%,#7a0f1c)] shadow-[0_3px_4px_rgb(0_0_0/0.35)] lg:top-[-9px] lg:h-[18px] lg:w-[18px]"
      />
      <span aria-hidden="true" className="absolute left-[0.5rem] top-0 flex h-full flex-col justify-evenly lg:left-[0.7rem]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-full bg-fog shadow-[inset_0_1px_2px_rgb(0_0_0/0.3)] lg:h-2.5 lg:w-2.5" />
        ))}
      </span>
      <h3 className="font-hand text-[17px] font-bold leading-[2.1rem] text-ink lg:text-[26px] lg:leading-[2.6rem]">
        {title}
        <span className="ml-0.5 text-signal">.</span>
      </h3>
      <ul>
        {note.items.map((item) => (
          <li
            key={item.name}
            className="flex h-[1.3rem] items-center gap-1.5 text-[10.5px] font-medium leading-none text-ink/80 lg:h-[1.65rem] lg:gap-2.5 lg:text-[13.5px]"
          >
            <BrandIcon icon={item.icon} name={item.name} className="h-3 w-3 shrink-0 text-ink lg:h-[15px] lg:w-[15px]" />
            <span className="truncate">{item.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function SkillsSection({ lang }) {
  const t = getDict(lang).stack;
  const left = notes.filter((n) => leftTitles.includes(n.title));
  const right = notes.filter((n) => !leftTitles.includes(n.title));
  const tiltOf = (note) => tilts[notes.indexOf(note) % tilts.length];

  return (
    <section id="stack" className="relative scroll-mt-20 overflow-hidden bg-fog py-14 sm:py-24 lg:py-32">
      <Container>
        <div className="text-center">
          <p className="font-display text-[clamp(1.4rem,4vw,3.2rem)] font-medium leading-none tracking-[-0.04em] text-ink/85">
            {t.lead[0]}
            <em className="font-bold text-signal">{t.lead[1]}</em>
            {t.lead[2]}
          </p>
          <h2 className="mt-1 font-display text-[clamp(2.4rem,9vw,8.5rem)] font-extrabold leading-[0.9] tracking-[-0.06em]">
            {t.title}
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[13px] leading-relaxed text-ink/60 sm:mt-5 sm:text-[15px]">
            {t.subtitle}
          </p>
        </div>

        <div className="-mt-4 sm:mt-4 lg:hidden">
          <div className="mx-auto max-w-[380px] sm:max-w-[460px]">
            <TvScene alt={t.tvAlt} />
          </div>
          <div className="mx-auto -mt-4 max-w-[560px] columns-2 gap-3 sm:gap-6">
            {notes.map((note) => (
              <div key={note.title} className="break-inside-avoid pb-3 pt-3 sm:pb-5">
                <Note note={note} title={t.notes[note.title]} tilt={tiltOf(note)} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 hidden items-center gap-x-6 lg:grid lg:grid-cols-[1fr_minmax(0,560px)_1fr]">
          <div className="grid grid-cols-1 justify-items-end gap-8">
            {left.map((note) => (
              <Note key={note.title} note={note} title={t.notes[note.title]} tilt={tiltOf(note)} />
            ))}
          </div>
          <TvScene alt={t.tvAlt} />
          <div className="grid grid-cols-1 justify-items-start gap-8">
            {right.map((note) => (
              <Note key={note.title} note={note} title={t.notes[note.title]} tilt={tiltOf(note)} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
