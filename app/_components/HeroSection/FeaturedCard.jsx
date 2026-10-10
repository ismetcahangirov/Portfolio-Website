"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/app/_data/projects";

const featured = projects.slice(0, 5);

export default function FeaturedCard() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const project = featured[index];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % featured.length), 4500);
    return () => clearTimeout(id);
  }, [index, paused]);

  const go = (step) => setIndex((i) => (i + step + featured.length) % featured.length);

  return (
    <div
      className="glass relative w-full max-w-[400px] rounded-[26px] p-2.5 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.35)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => window.open(project.href, "_blank", "noopener,noreferrer")}
          aria-label={`Open ${project.name} in a new tab`}
          className="group relative block aspect-square w-[46%] shrink-0 overflow-hidden rounded-[20px] bg-ink"
        >
          {featured.map((p, i) => (
            <Image
              key={p.name}
              src={p.image}
              alt=""
              fill
              sizes="190px"
              className={`object-cover object-left-top transition-all duration-700 group-hover:scale-105 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <span className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          <span className="absolute bottom-2.5 left-2.5 font-mono text-[10px] uppercase tracking-wider text-white/80">
            {String(index + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
          </span>
        </button>

        <div className="flex min-w-0 flex-1 flex-col py-1.5 pr-1.5">
          <div className="flex items-start justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">Live project</span>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/60 text-ink">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <p key={project.name} className="animate-in fade-in slide-in-from-bottom-1 mt-2 duration-500">
            <span className="block font-display text-[26px] font-bold leading-[1.05] tracking-tight text-ink">
              {project.name}
            </span>
            <span className="mt-1 block text-[13px] leading-snug text-ink/60">{project.kind}</span>
          </p>
          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <div className="flex flex-1 gap-1" aria-hidden="true">
              {featured.map((p, i) => (
                <span
                  key={p.name}
                  className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
                    i === index ? "bg-ink" : "bg-ink/15"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/80 text-white transition-colors hover:bg-signal"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/80 text-white transition-colors hover:bg-signal"
                aria-label="Next project"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
