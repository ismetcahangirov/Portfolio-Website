import { getDict } from "@/app/_i18n";
import Container from "../Container";

export default function AboutSection({ lang }) {
  const t = getDict(lang).about;
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 text-white sm:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-signal/20 blur-[140px]"
      />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="flex items-center gap-2.5 text-[13px] font-medium text-white/60">
              <span className="h-3.5 w-px bg-signal" />
              {t.label}
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              {t.headline[0]}
              <br />
              <span className="text-white/45">{t.headline[1]}</span>
            </h2>
            <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-white/70">{t.body}</p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:max-w-[420px]">
              {t.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-wide text-[clamp(1.8rem,3.4vw,2.8rem)] font-black leading-none tracking-tight">
                    {s.value}
                  </dd>
                  <dd className="mt-2 text-[12px] leading-snug text-white/55">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ul className="border-t border-white/10">
            {t.areas.map((a) => (
              <li
                key={a.title}
                className="group relative grid gap-3 border-b border-white/10 py-7 sm:grid-cols-[180px_1fr] sm:gap-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-1px] left-0 h-px w-0 bg-signal transition-all duration-500 group-hover:w-full"
                />
                <h3 className="font-display text-[20px] font-semibold tracking-tight">{a.title}</h3>
                <div>
                  <p className="text-[15px] leading-relaxed text-white/65">{a.body}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    {a.keys.map((k) => (
                      <li key={k} className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
