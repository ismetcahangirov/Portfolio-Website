import Hero from "@/app/_components/HeroSection";
import ProjectsSection from "@/app/_components/ProjectsSection";
import SkillsSection from "@/app/_components/SkillsSection";
import AboutSection from "@/app/_components/AboutSection";
import ContactSection from "@/app/_components/ContactSection";
import { getContact } from "@/lib/server/contact";

export default async function HomePage({ params }) {
  const { lang } = await params;
  const contact = await getContact();
  return (
    <main>
      <Hero lang={lang} />
      <ProjectsSection lang={lang} />
      <SkillsSection lang={lang} />
      <AboutSection lang={lang} />
      <ContactSection lang={lang} contact={contact} />
    </main>
  );
}
