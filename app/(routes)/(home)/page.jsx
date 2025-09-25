import AboutSection from "@/app/_components/AboutSection";
import ContactSection from "@/app/_components/ContactSection";
import Hero from "@/app/_components/HeroSection";
import ProjectsSection from "@/app/_components/ProjectsSection";
import SkillsSection from "@/app/_components/SkillsSection";
import React from "react";

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <ProjectsSection />
    </main>
  );
};

export default HomePage;
