import Image from "next/image";
import Link from "next/link";
import Container from "../Container";
import Section from "../Section";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";

const skills = [
  {
    name: "HTML",
    image: "/skills/html.png",
    href: "https://www.w3schools.com/html/",
  },
  {
    name: "CSS",
    image: "/skills/css.png",
    href: "https://www.w3schools.com/css/",
  },
  {
    name: "JS",
    image: "/skills/js.png",
    href: "https://www.w3schools.com/js/",
  },
  {
    name: "TS",
    image: "/skills/ts.png",
    href: "https://www.typescriptlang.org/",
  },
  {
    name: "React",
    image: "/skills/react.png",
    href: "https://react.dev/",
  },
  {
    name: "SASS",
    image: "/skills/sass.png",
    href: "https://sass-lang.com/",
  },
  {
    name: "TailwindCSS",
    image: "/skills/tailwind.png",
    href: "https://tailwindcss.com/",
  },
  {
    name: "Bootstrap",
    image: "/skills/bootstrap.png",
    href: "https://getbootstrap.com/",
  },
  {
    name: "Next.js",
    image: "/skills/nextjs.png",
    href: "https://nextjs.org/",
  },
  {
    name: "Vite",
    image: "/skills/vite.png",
    href: "https://vite.dev/",
  },
  {
    name: "Redux Toolkit",
    image: "/skills/Redux.png",
    href: "https://redux-toolkit.js.org/",
  },
  {
    name: "NodeJs",
    image: "/skills/node.png",
    href: "https://nodejs.org/en",
  },
  {
    name: "Express.js",
    image: "/skills/ex.png",
    href: "https://expressjs.com/",
  },
  {
    name: "MongoDB",
    image: "/skills/MongoDb.png",
    href: "https://www.mongodb.com/",
  },
];

const SkillsSection = () => {
  return (
    <Section iD={"skills"} className={"select-none"}>
      <div className="w-full h-max flex flex-col space-y-20 group relative mb-20 ">
        <Container>
          <div className="relative  w-max">
            <h2 className="flex gap-2  w-max   uppercase font-bold text-5xl md:text-7xl tracking-wide">
              My
              <span className="text-red-600 w-[157px] md:w-[235px]">
                Skills
              </span>
            </h2>
            <div
              className="absolute right-0 bottom-[-5px] w-0 h-[1.5px] bg-red-500 transition-all duration-200 group-hover:w-[157px] 
        md:group-hover:w-[235px]"
            ></div>
          </div>
        </Container>

        <Marquee>
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />

          <MarqueeContent pauseOnHover={false} autoFill={false} speed={30}>
            {skills.map((skill, idx) => (
              <MarqueeItem key={idx} className="mx-4">
                <Link
                  href={skill.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={skill.name}
                >
                  <Image
                    alt={skill.name}
                    src={skill.image}
                    width={80}
                    height={80}
                    className="filter grayscale w-auto h-[90px] "
                  />
                </Link>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </Section>
  );
};

export default SkillsSection;
