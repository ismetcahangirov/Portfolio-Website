import Container from "../Container";
import { projects } from "@/app/_data/projects";

const areas = [
  {
    title: "Frontend",
    body: "Component-based interfaces in React, Next.js and TypeScript, with the rendering strategy (SSR, SSG or ISR) picked per page.",
    keys: ["React", "Next.js", "Redux Toolkit", "Zustand"],
  },
  {
    title: "Backend & APIs",
    body: "REST APIs in Node.js and Express, data models in PostgreSQL and MongoDB, auth flows, plus caching and rate limiting with Redis.",
    keys: ["Node.js", "Prisma", "Supabase", "Upstash"],
  },
  {
    title: "Mobile",
    body: "Cross-platform iOS and Android apps in React Native: native modules, push notifications, offline support and store releases.",
    keys: ["React Native", "Expo", "Push", "Offline"],
  },
  {
    title: "Real-time",
    body: "Live video, voice, instant notifications and collaboration over WebRTC, LiveKit, Jitsi and Socket.IO.",
    keys: ["WebRTC", "LiveKit", "WebSocket"],
  },
  {
    title: "SEO & performance",
    body: "Core Web Vitals work on LCP, INP and CLS: code splitting, lazy loading, image optimization, caching and semantic HTML.",
    keys: ["Core Web Vitals", "Caching", "a11y"],
  },
  {
    title: "Leadership",
    body: "Led a frontend team, built its code review culture, mentored junior and mid-level developers and owned an academy curriculum.",
    keys: ["Code review", "Mentoring", "Curriculum"],
  },
];

const stats = [
  { value: "3+", label: "years shipping with the MERN stack" },
  { value: "100+", label: "students taught to code" },
  { value: String(projects.length), label: "products live, each built solo" },
];

export default function AboutSection() {
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
              About me
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
              One developer,
              <br />
              <span className="text-white/45">the whole product.</span>
            </h2>
            <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-white/70">
              I&apos;m Ismat Cahangirov, a full stack developer from Baku. I take products from an empty repository
              to production: the database schema, the API, the web app, the mobile app and the deploy. Every project on
              this page was designed, built and shipped by me.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {stats.map((s) => (
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
            {areas.map((a) => (
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
