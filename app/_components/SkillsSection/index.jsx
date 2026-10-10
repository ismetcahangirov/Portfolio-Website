import BrandIcon from "@/components/BrandIcon";
import { notes } from "@/app/_data/stack";
import Container from "../Container";
import TvScene from "./TvScene";

const tilts = ["-rotate-2", "rotate-[1.5deg]", "-rotate-1", "rotate-2", "-rotate-[1.5deg]", "rotate-1", "-rotate-2"];

function Note({ note, tilt }) {
  return (
    <article
      className={`notebook group relative w-full max-w-[300px] rounded-[3px] pb-3 pl-[2.5rem] pr-2.5 pt-3 sm:pl-[2.7rem] sm:pr-4 shadow-[0_1px_0_rgb(0_0_0/0.06),0_14px_28px_-14px_rgb(0_0_0/0.45)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] ${tilt}`}
    >
      <span aria-hidden="true" className="absolute left-1/2 top-[-9px] z-10 h-[18px] w-[18px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ff7a84,#e3202f_45%,#7a0f1c)] shadow-[0_3px_4px_rgb(0_0_0/0.35)]" />
      <span aria-hidden="true" className="absolute left-[0.7rem] top-0 flex h-full flex-col justify-evenly">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-fog shadow-[inset_0_1px_2px_rgb(0_0_0/0.3)]" />
        ))}
      </span>
      <h3 className="font-hand text-[21px] font-bold leading-[2.6rem] text-ink sm:text-[26px]">
        {note.title}
        <span className="ml-1 text-signal">.</span>
      </h3>
      <ul>
        {note.items.map((item) => (
          <li key={item.name} className="flex h-[1.65rem] items-center gap-2 text-[12px] font-medium leading-none text-ink/80 sm:gap-2.5 sm:text-[13.5px]">
            <BrandIcon icon={item.icon} name={item.name} className="h-[15px] w-[15px] shrink-0 text-ink" />
            {item.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function SkillsSection() {
  const leftTitles = ["Frameworks", "State & data", "UI", "AI tools"];
  const left = notes.filter((n) => leftTitles.includes(n.title));
  const right = notes.filter((n) => !leftTitles.includes(n.title));
  return (
    <section id="stack" className="relative scroll-mt-20 overflow-hidden bg-fog py-24 sm:py-32">
      <Container>
        <div className="text-center">
          <p className="font-display text-[clamp(1.6rem,4vw,3.2rem)] font-medium leading-none tracking-[-0.04em] text-ink/85">
            What I <em className="font-bold text-signal">build</em> with
          </p>
          <h2 className="mt-1 font-display text-[clamp(3.4rem,11vw,9.5rem)] font-extrabold leading-[0.9] tracking-[-0.06em]">
            The Stack
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-relaxed text-ink/60">
            Languages run on the screens. Everything else I reach for daily is pinned to the board.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-y-10 lg:mt-16 lg:grid-cols-[1fr_minmax(0,560px)_1fr] lg:gap-x-6">
          <div className="order-2 grid grid-cols-2 items-start justify-items-center gap-x-3 gap-y-8 sm:gap-x-8 lg:order-1 lg:grid-cols-1 lg:justify-items-end">
            {left.map((note, i) => (
              <Note key={note.title} note={note} tilt={tilts[i]} />
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <TvScene />
          </div>

          <div className="order-3 grid grid-cols-2 items-start justify-items-center gap-x-3 gap-y-8 sm:gap-x-8 lg:grid-cols-1 lg:justify-items-start">
            {right.map((note, i) => (
              <Note key={note.title} note={note} tilt={tilts[i + 4]} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
