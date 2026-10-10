import {
  siJavascript,
  siTypescript,
  siHtml5,
  siCss,
  siSass,
  siNextdotjs,
  siReact,
  siNodedotjs,
  siExpress,
  siExpo,
  siRedux,
  siTailwindcss,
  siShadcnui,
  siMui,
  siChakraui,
  siBootstrap,
  siPostgresql,
  siMongodb,
  siPrisma,
  siRedis,
  siSupabase,
  siFirebase,
  siUpstash,
  siNeon,
  siWebrtc,
  siLivekit,
  siSocketdotio,
  siJitsi,
  siDocker,
  siVercel,
  siCoolify,
  siHetzner,
  siRender,
  siClaude,
  siCursor,
  siAxios,
  siGit,
} from "simple-icons";

const siJavaCup = {
  hex: "5382A1",
  strokeHex: "F89820",
  path: "M3.5 13.5h12v1.75A4.75 4.75 0 0 1 10.75 20h-2.5A4.75 4.75 0 0 1 3.5 15.25ZM15.5 14.5h1.25a2.5 2.5 0 0 1 0 5H15.4a5.6 5.6 0 0 0 .55-1.5h.8a1 1 0 0 0 0-2h-1.25ZM2.5 21.25h15.5v1.25H2.5Z",
  strokePath: "M7.5 11.5c-1.3-1.5 1.3-2.7 0-4.3s1.3-2.9 0-4.4M11.5 11.5c-1.3-1.5 1.3-2.7 0-4.3s1.3-2.9 0-4.4",
};

export const screens = [
  { name: "TypeScript", icon: siTypescript, screen: { left: 68.1, top: 73.1, width: 17.7, height: 11.1 } },
  { name: "JavaScript", icon: siJavascript, screen: { left: 68.1, top: 58.3, width: 16.6, height: 9.6 } },
  { name: "HTML5", icon: siHtml5, screen: { left: 19.6, top: 75.7, width: 16, height: 9.8 } },
  { name: "CSS", icon: siCss, screen: { left: 41.6, top: 54, width: 20.9, height: 12.4 }, align: "start" },
  { name: "Java", icon: siJavaCup, screen: { left: 41.8, top: 72.2, width: 21.3, height: 12 }, align: "start" },
];

export const occluder = { left: 48.06, top: 51.56, width: 16.49, height: 34.29 };

export const notes = [
  {
    title: "Frameworks",
    items: [
      { name: "Next.js", icon: siNextdotjs },
      { name: "React", icon: siReact },
      { name: "React Native", icon: siReact },
      { name: "Expo", icon: siExpo },
      { name: "Node.js", icon: siNodedotjs },
      { name: "Express", icon: siExpress },
    ],
  },
  {
    title: "State & data",
    items: [
      { name: "Redux Toolkit", icon: siRedux },
      { name: "RTK Query", icon: siRedux },
      { name: "Zustand" },
      { name: "Axios", icon: siAxios },
    ],
  },
  {
    title: "UI",
    items: [
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "Sass", icon: siSass },
      { name: "shadcn/ui", icon: siShadcnui },
      { name: "Material UI", icon: siMui },
      { name: "Chakra UI", icon: siChakraui },
      { name: "Bootstrap", icon: siBootstrap },
    ],
  },
  {
    title: "Databases & BaaS",
    items: [
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "MongoDB", icon: siMongodb },
      { name: "Prisma", icon: siPrisma },
      { name: "Redis", icon: siRedis },
      { name: "Supabase", icon: siSupabase },
      { name: "Firebase", icon: siFirebase },
      { name: "Upstash", icon: siUpstash },
      { name: "Neon", icon: siNeon },
    ],
  },
  {
    title: "Real-time",
    items: [
      { name: "WebRTC", icon: siWebrtc },
      { name: "LiveKit", icon: siLivekit },
      { name: "Socket.IO", icon: siSocketdotio },
      { name: "Jitsi", icon: siJitsi },
    ],
  },
  {
    title: "DevOps & hosting",
    items: [
      { name: "Docker", icon: siDocker },
      { name: "Vercel", icon: siVercel },
      { name: "Coolify", icon: siCoolify },
      { name: "Hetzner", icon: siHetzner },
      { name: "Render", icon: siRender },
      { name: "Git", icon: siGit },
    ],
  },
  {
    title: "AI tools",
    items: [
      { name: "Claude Code", icon: siClaude },
      { name: "Codex CLI" },
      { name: "Cursor", icon: siCursor },
    ],
  },
];

export const heroStack = [
  { name: "Next.js", icon: siNextdotjs },
  { name: "React Native", icon: siReact },
  { name: "Node.js", icon: siNodedotjs },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Supabase", icon: siSupabase },
  { name: "LiveKit", icon: siLivekit },
];
