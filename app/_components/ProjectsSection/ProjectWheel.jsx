"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects as baseProjects } from "@/app/_data/projects";
import { getDict, getProjects } from "@/app/_i18n";
import useInViewport from "@/components/useInViewport";

const BASE = baseProjects.length;
const COUNT = BASE * 2;
const STEP = 360 / COUNT;
const AUTO_SPEED = 4.2;

const mod = (n, m) => ((n % m) + m) % m;

function openProject(href) {
  window.open(href, "_blank", "noopener,noreferrer");
}

function useWheelGeometry(ref) {
  const [geo, setGeo] = useState({ cardW: 380, cardH: 238, radius: 780, ready: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const cardW = Math.round(Math.min(400, Math.max(210, w * 0.27)));
      const cardH = Math.round(cardW * 0.625);
      const radius = Math.round(((cardW * COUNT) / (2 * Math.PI)) * 0.93);
      setGeo({ cardW, cardH, radius, ready: true });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return geo;
}

export default function ProjectWheel({ lang }) {
  const t = getDict(lang).wheel;
  const localized = getProjects(lang);
  const cards = [...localized, ...localized];
  const stageRef = useRef(null);
  const wheelRef = useRef(null);
  const angle = useRef(0);
  const velocity = useRef(0);
  const target = useRef(null);
  const hovering = useRef(false);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const [active, setActive] = useState(0);
  const { cardW, cardH, radius, ready } = useWheelGeometry(stageRef);
  const inView = useInViewport(stageRef);

  const hubRadius = Math.round(radius * 0.56);
  const centerY = 36 + cardH / 2 + radius;
  const stageH = Math.round(centerY - hubRadius * 0.45);

  const anim = useRef(null);
  const animFrom = useRef(0);
  const physics = useRef(0);
  const reduceMotion = useRef(false);

  const readAngle = useCallback(() => {
    const a = anim.current;
    if (!a) return angle.current;
    return animFrom.current - ((a.currentTime || 0) / 1000) * AUTO_SPEED;
  }, []);

  const syncActive = useCallback(() => {
    const idx = mod(Math.round(-readAngle() / STEP), COUNT);
    setActive((prev) => (prev === idx ? prev : idx));
  }, [readAngle]);

  const applyAngle = useCallback(() => {
    if (wheelRef.current) wheelRef.current.style.transform = `rotate(${angle.current}deg)`;
  }, []);

  const stopAuto = useCallback(() => {
    if (!anim.current) return;
    angle.current = readAngle();
    anim.current.cancel();
    anim.current = null;
    applyAngle();
  }, [readAngle, applyAngle]);

  const startAuto = useCallback(() => {
    const el = wheelRef.current;
    if (!el || anim.current || reduceMotion.current || !el.animate) return;
    animFrom.current = angle.current;
    anim.current = el.animate(
      [{ transform: `rotate(${angle.current}deg)` }, { transform: `rotate(${angle.current - 360}deg)` }],
      { duration: (360 / AUTO_SPEED) * 1000, iterations: Infinity }
    );
    if (hovering.current) anim.current.pause();
  }, []);

  const runPhysics = useCallback(() => {
    if (physics.current) return;
    stopAuto();
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (drag.current) {
        target.current = null;
      } else if (target.current !== null) {
        const diff = target.current - angle.current;
        angle.current += diff * Math.min(1, dt * 7);
        if (Math.abs(diff) < 0.05) {
          angle.current = target.current;
          target.current = null;
        }
      } else if (Math.abs(velocity.current) > 0.5) {
        angle.current += velocity.current * dt;
        velocity.current *= Math.pow(0.04, dt);
      } else {
        velocity.current = 0;
        physics.current = 0;
        applyAngle();
        syncActive();
        startAuto();
        return;
      }
      applyAngle();
      syncActive();
      physics.current = requestAnimationFrame(tick);
    };
    physics.current = requestAnimationFrame(tick);
  }, [stopAuto, startAuto, applyAngle, syncActive]);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!inView) {
      stopAuto();
      return;
    }
    applyAngle();
    if (!physics.current) startAuto();
    const id = setInterval(syncActive, 250);
    return () => {
      clearInterval(id);
      stopAuto();
    };
  }, [inView, startAuto, stopAuto, applyAngle, syncActive]);

  useEffect(
    () => () => {
      cancelAnimationFrame(physics.current);
      physics.current = 0;
    },
    []
  );

  const seekTo = (index) => {
    stopAuto();
    const base = -index * STEP;
    const turns = Math.round((angle.current - base) / 360);
    target.current = base + turns * 360;
    velocity.current = 0;
    runPhysics();
  };

  const stepBy = (dir) => {
    stopAuto();
    const current = Math.round(-angle.current / STEP);
    target.current = -(current + dir) * STEP;
    velocity.current = 0;
    runPhysics();
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    stopAuto();
    drag.current = { x: e.clientX, lastX: e.clientX, lastT: performance.now(), moved: 0, v: 0, id: e.pointerId };
    target.current = null;
    velocity.current = 0;
    suppressClick.current = false;
    runPhysics();
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.lastX;
    const now = performance.now();
    const deg = (dx / radius) * (180 / Math.PI);
    angle.current += deg;
    d.moved += Math.abs(dx);
    if (d.moved > 6 && !suppressClick.current) {
      suppressClick.current = true;
      stageRef.current?.setPointerCapture?.(e.pointerId);
    }
    const dtMs = Math.max(1, now - d.lastT);
    d.v = (deg / dtMs) * 1000;
    d.lastX = e.clientX;
    d.lastT = now;
  };

  const onPointerUp = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    velocity.current = Math.max(-260, Math.min(260, d.v));
    drag.current = null;
  };

  const onEnter = () => {
    hovering.current = true;
    anim.current?.pause();
  };

  const onLeave = () => {
    hovering.current = false;
    anim.current?.play();
  };

  const project = cards[active];

  return (
    <div>
      <div
        ref={stageRef}
        className="relative w-full cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
        style={{ height: stageH }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2"
          style={{ top: centerY - hubRadius, width: hubRadius * 2, height: hubRadius * 2, marginLeft: -hubRadius }}
        >
          <div
            className="h-full w-full animate-[spin-slow_60s_linear_infinite] will-change-transform"
            style={{ animationPlayState: inView ? "running" : "paused" }}
          >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <defs>
              <path id="hub-ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
            </defs>
            <circle cx="100" cy="100" r="96" fill="none" stroke="rgb(14 14 15 / 0.18)" strokeDasharray="1.5 3" />
            <text className="fill-ink/35 font-mono uppercase" style={{ fontSize: 6.2, letterSpacing: 3.2 }}>
              <textPath href="#hub-ring">
                {t.ring}
              </textPath>
            </text>
          </svg>
          </div>
          <div className="absolute left-1/2 top-[8%] flex -translate-x-1/2 flex-col items-center gap-1">
            <span className="h-0 w-0 border-x-[5px] border-b-[7px] border-x-transparent border-b-ink" />
            <span className="font-wide text-[15px] font-black uppercase leading-none">{t.me}</span>
          </div>
        </div>

        <div
          ref={wheelRef}
          className={`absolute left-1/2 h-0 w-0 transition-opacity duration-700 will-change-transform ${ready ? "opacity-100" : "opacity-0"}`}
          style={{ top: centerY }}
        >
          {cards.map((p, i) => {
            const isDuplicate = i >= BASE;
            const dist = Math.min(mod(i - active, COUNT), mod(active - i, COUNT));
            return (
              <div
                key={`${p.name}-${i}`}
                className="absolute left-0 top-0"
                style={{ transform: `rotate(${i * STEP}deg)`, zIndex: COUNT - dist }}
              >
                <button
                  type="button"
                  tabIndex={isDuplicate ? -1 : 0}
                  aria-hidden={isDuplicate ? "true" : undefined}
                  aria-label={t.cardLabel(p.name, p.kind)}
                  onClick={() => openProject(p.href)}
                  onFocus={(e) => e.currentTarget.matches(":focus-visible") && seekTo(i)}
                  className="group absolute block rounded-[20px] bg-ink p-[5px] text-left shadow-[0_24px_50px_-20px_rgb(0_0_0/0.55)] transition-[box-shadow,transform] duration-500 focus-visible:outline-offset-4"
                  style={{ width: cardW, height: cardH, left: -cardW / 2, top: -radius - cardH / 2 }}
                >
                  <span className="relative block h-full w-full overflow-hidden rounded-[15px] bg-ink">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      draggable={false}
                      sizes="(min-width: 1024px) 400px, 60vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <span className="absolute right-3 top-3 inline-flex h-8 w-8 scale-75 items-center justify-center rounded-full bg-signal text-white opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                    <span className="absolute inset-x-3 bottom-2.5 flex items-end justify-between gap-2">
                      <span className="font-display text-[clamp(1rem,1.6vw,1.45rem)] font-bold leading-none tracking-tight text-white">
                        {p.name}
                      </span>
                      <span className="hidden font-mono text-[10px] uppercase tracking-wider text-white/60 sm:block">
                        {p.kind}
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-fog to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-fog to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-fog via-fog/60 to-transparent" />
      </div>

      <div className="mx-auto mt-2 grid max-w-[1100px] items-start gap-6 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:gap-10">
        <div key={project.name} aria-live="polite" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">{project.kind}</p>
          <h3 className="mt-2 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-none tracking-tight">
            {project.name}
          </h3>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink/65">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full border border-ink/15 px-3 py-1 text-[12px] font-medium text-ink/70">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2 md:pt-6">
          <button
            type="button"
            onClick={() => stepBy(-1)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-white"
            aria-label={t.prev}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => stepBy(1)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-white"
            aria-label={t.next}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => openProject(project.href)}
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-5 pr-1.5 text-[14px] font-semibold text-white transition-colors hover:bg-signal"
          >
            {t.open}
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
