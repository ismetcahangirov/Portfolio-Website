import React from "react";
import Container from "../Container";
import Image from "next/image";
import TypingAnimation from "@/components/TypingAnimation";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen bg-black -z-20 overflow-hidden select-none"
    >
      <Container className="h-full  overflow-hidden relative">
        <Image
          alt="portfolio"
          src="/profil.png"
          width={600}
          height={800}
          className="contrast-170 h-full  absolute left-1/2 -translate-x-1/2 object-cover inset-0 -top-5 -z-10"
        />

        <div className="absolute inset-0 h-full w-full bg-black/85 z-0"></div>

        <article className="absolute inset-0 z-10  -top-26 md:-top-20 flex flex-col items-center justify-center ">
          <div className="inline-block text-white w-max">
            <TypingAnimation
              arr={["I'm Ismat", "I'm Frontend Developer"]}
              className={"text-white text-sm md:text-lg"}
            />
          </div>

          <div className="relative z-10  text-white text-5xl md:text-8xl uppercase font-bold tracking-wide">
            limitless
          </div>
        </article>
        <div className="absolute  left-1/2 -translate-x-1/2 animate-growY w-[2px] bg-white"></div>
      </Container>
    </section>
  );
};

export default Hero;
