"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import Section from "../Section";

const skills = [
  {
    name: "HTML",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1024px-HTML5_logo_and_wordmark.svg.png",
    href: "https://www.w3schools.com/html/",
  },
  {
    name: "CSS",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png",
    href: "https://www.w3schools.com/css/",
  },
  {
    name: "JS",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/500px-JavaScript-logo.png",
    href: "https://www.w3schools.com/js/",
  },
  {
    name: "TS",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
    href: "https://www.typescriptlang.org/",
  },
  {
    name: "React",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
    href: "https://react.dev/",
  },
  {
    name: "TailwindCSS",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png",
    href: "https://tailwindcss.com/",
  },
  {
    name: "Bootstrap",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/512px-Bootstrap_logo.svg.png",
    href: "https://getbootstrap.com/",
  },
  {
    name: "Next.js",
    image: "https://www.svgrepo.com/show/354113/nextjs-icon.svg",
    href: "https://nextjs.org/",
  },
  {
    name: "Vite",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/2078px-Vitejs-logo.svg.png",
    href: "https://vite.dev/",
  },
  {
    name: "Redux Toolkit",
    image: "https://cdn.worldvectorlogo.com/logos/redux.svg",
    href: "https://redux-toolkit.js.org/",
  },
  {
    name: "NodeJs",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
    href: "https://nodejs.org/en",
  },
  {
    name: "Express.js",
    image: "https://img.icons8.com/color/512/express-js.png",
    href: "https://expressjs.com/",
  },
  {
    name: "MongoDB",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png",
    href: "https://www.mongodb.com/",
  },
];

const SkillsSection = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev >= skills.length * 120 ? 0 : prev + 1));
    }, 5);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section iD={"skills"} className={"overflow-hidden group"}>
      <Container>
        <div className="w-max  group relative mb-20 ">
          <h2 className="flex gap-2  w-max mx-auto  uppercase font-bold text-5xl md:text-7xl tracking-wide">
            My
            <span className="text-red-600 w-[157px] md:w-[235px]">Skills</span>
          </h2>
          <div
            className="absolute right-0 bottom-[-5px] w-0 h-[1.5px] bg-red-500 transition-all duration-200 group-hover:w-[157px] 
        md:group-hover:w-[235px]"
          ></div>
        </div>

        <div
          className="flex items-center whitespace-nowrap transition-transform"
          style={{
            transform: `translateX(-${offset}px)`,
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <div key={index} className="flex-shrink-0 h-max mx-8">
              <Link href={skill.href} target="_blank" rel="noopener noreferrer">
                <Image
                  alt={skill.name}
                  src={skill.image}
                  width={100}
                  height={100}
                  className="filter grayscale w-auto h-[90px] "
                />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default SkillsSection;
