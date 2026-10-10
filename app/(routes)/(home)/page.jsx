import Hero from "@/app/_components/HeroSection";
import ProjectsSection from "@/app/_components/ProjectsSection";
import SkillsSection from "@/app/_components/SkillsSection";
import AboutSection from "@/app/_components/AboutSection";
import ContactSection from "@/app/_components/ContactSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
