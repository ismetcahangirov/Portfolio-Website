"use client";

import React from "react";
import Container from "../Container";
import Section from "../Section";

const AboutSection = () => {
  return (
    <Section iD={"about"} className={"group"}>
      <Container>
        <div className="w-max  mb-15 ">
          <h2 className="  uppercase font-bold text-5xl md:text-7xl tracking-wide">
            About
          </h2>
          <div className="mt-1 w-0 h-[2px] bg-black transition-all duration-200 group-hover:w-full"></div>
        </div>
        <article className="w-full">
          <p className=" text-left text-Gray w-full text-sm tracking-wide">
            I am a Frontend Developer with experience in building web
            applications using HTML, CSS, and JavaScript, with some familiarity
            in TypeScript. I create dynamic and responsive user interfaces using
            React, Next.js, and Vite.
          </p>
          <p className=" text-left w-full text-Gray text-sm tracking-wide my-4">
            I also use Bootstrap and Tailwind CSS to build clean and modern
            designs. Additionally, I can develop simple backend APIs with
            Node.js and Express to add functionality to web projects.
          </p>
          <p className=" text-left w-full text-Gray text-sm tracking-wide">
            I enjoy learning new technologies and aim to create high-quality,
            user-friendly web experiences.
          </p>
        </article>
      </Container>
    </Section>
  );
};

export default AboutSection;
