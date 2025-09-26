import React from "react";
import Container from "../Container";
import ProjectCard from "@/components/ProjectCard";
import Section from "../Section";

const projects = [
  {
    name: "Movix",
    href: "https://movix-livid-one.vercel.app/",
    image: "/Movix.jpg",
  },
  {
    name: "WeatherApp",
    href: "https://weather-app-beta-flame-55.vercel.app/",
    image: "/WeatherApp.jpg",
  },
];

const ProjectsSection = () => {
  return (
    <Section iD={"projects"} className={"select-none"}>
      <Container>
        <div className="group">
          <div className="w-max  mb-15 ">
            <h2 className="  uppercase font-bold text-5xl md:text-7xl tracking-wide">
              Projects
            </h2>
            <div className="mt-1 w-0 h-[2px] bg-black transition-all duration-200 group-hover:w-full"></div>
          </div>
        </div>

        <div className="flex justify-between space-y-4 flex-wrap">
          {projects.map((project) => {
            return (
              <ProjectCard
                key={project.name}
                href={project.href}
                alt={project.name}
                image={project.image}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default ProjectsSection;
