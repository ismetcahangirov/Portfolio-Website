"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BrandIcon from "@/components/BrandIcon";
import useInViewport from "@/components/useInViewport";
import { screens, occluder } from "@/app/_data/stack";

const pct = (r) => ({ left: `${r.left}%`, top: `${r.top}%`, width: `${r.width}%`, height: `${r.height}%` });

function Screen({ lang, on, delay }) {
  const color = `#${lang.icon.hex}`;
  const start = lang.align === "start";
  return (
    <div
      className="absolute overflow-hidden rounded-[9%/12%] bg-[#07080a]"
      style={{ ...pct(lang.screen), containerType: "size" }}
      role="img"
      aria-label={lang.name}
    >
      <div
        className="absolute inset-0 transition-[transform,opacity] ease-out"
        style={{
          transform: on ? "scale(1, 1)" : "scale(1, 0.02)",
          opacity: on ? 1 : 0,
          transitionDuration: "650ms",
          transitionDelay: `${delay}ms`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at ${start ? "22%" : "50%"} 50%, ${color}55 0%, ${color}18 45%, #050506 85%)` }}
        />
        <div
          className={`absolute inset-0 flex items-center ${start ? "justify-start" : "flex-col justify-center"}`}
          style={{ paddingLeft: start ? "7cqw" : 0, gap: start ? "4cqw" : "4cqh" }}
        >
          <BrandIcon
            icon={lang.icon}
            name={lang.name}
            color="brand"
            style={{ height: start ? "46cqh" : "44cqh", width: "auto", filter: `drop-shadow(0 0 6px ${color}aa)` }}
          />
          <span
            className="font-mono font-semibold uppercase text-white/85"
            style={{ fontSize: start ? "10cqh" : "11cqh", letterSpacing: "0.08em", writingMode: start ? "vertical-rl" : undefined }}
          >
            {lang.name}
          </span>
        </div>
        <div className="crt-lines absolute inset-0" />
        <div className="absolute inset-0 shadow-[inset_0_0_18cqw_rgb(0_0_0/0.85)]" />
      </div>
    </div>
  );
}

export default function TvScene({ alt }) {
  const ref = useRef(null);
  const live = useInViewport(ref);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (live) setOn(true);
  }, [live]);

  return (
    <div ref={ref} className="relative mx-auto aspect-[928/1152] w-full max-w-[620px] select-none">
      <Image
        src="/scene/stack-tv-lit.jpg"
        alt={alt}
        fill
        draggable={false}
        sizes="(min-width: 1024px) 620px, 100vw"
        className="pointer-events-none object-cover [mask-image:radial-gradient(ellipse_50%_48%_at_50%_52%,#000_80%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_50%_48%_at_50%_52%,#000_80%,transparent_100%)]"
      />
      {screens.map((lang, i) => (
        <Screen key={lang.name} lang={lang} on={on} delay={180 + i * 160} />
      ))}
      <Image
        src="/scene/stack-tv-occluder-lit.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        width={153}
        height={395}
        className="pointer-events-none absolute max-w-none"
        style={pct(occluder)}
      />
    </div>
  );
}
