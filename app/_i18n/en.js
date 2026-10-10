const en = {
  locale: "en",
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  name: "Ismat Cahangirov",
  meta: {
    title: "Ismat Cahangirov — Full Stack Developer",
    description:
      "Full stack developer from Baku. I design, build and ship web and mobile products end to end with Next.js, React Native, Node.js and PostgreSQL.",
    ogDescription: "Web and mobile products built end to end: IdeyaNest, Xira, Xeco, Docify, Minna, Cahan Academy.",
  },
  nav: { home: "Home", projects: "Projects", stack: "Stack", about: "About", contact: "Contact" },
  header: {
    brand: "Cahangirov",
    homeLabel: "Ismat Cahangirov, back to top",
    city: "Baku, GMT+4",
    cityShort: "Baku",
    talk: "Let's talk",
    menu: "MENU",
    menuLabel: "Menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  hero: {
    giant: "Full Stack",
    role: "Full Stack Developer",
    open: "Open to work",
    headline: ["From the database", "to the last pixel,", "I build it all."],
    shipped: "50+ projects shipped",
    students: "100+ students taught",
    cta: "Get in touch",
    work: "See my work",
    shipsWith: "Ships with",
    experience: "3+ years experience",
    based: "Based in Baku, Azerbaijan",
    scroll: "Scroll down",
    alt: "Figure in a black suit and a glossy black helmet with a glowing red visor",
  },
  featured: {
    live: "Live project",
    open: (name) => `Open ${name} in a new tab`,
    prev: "Previous project",
    next: "Next project",
  },
  projectsSection: {
    selected: ["Selected", "work"],
    hint: "Click a card to open it",
    title: "Projects",
    middle: "Designed, built and deployed solo",
    right: "Full stack developer",
  },
  wheel: {
    open: "Open project",
    me: "Me",
    ring: "Full stack • Web • Mobile • Real-time • Full stack • Web • Mobile • Real-time •",
    cardLabel: (name, kind) => `Open ${name}, ${kind}, in a new tab`,
    prev: "Previous project",
    next: "Next project",
  },
  projects: {
    IdeyaNest: {
      kind: "Crowdfunding platform",
      summary:
        "Reward-based crowdfunding for Azerbaijan. Creators launch campaigns with a goal and a deadline; backers are refunded in full if a campaign misses 80% of its goal.",
      tags: ["Web", "iOS & Android", "Payments"],
    },
    Xira: {
      kind: "Video calls & chat",
      summary:
        "Real-time messaging with live presence and one-tap video calls between friends, built around nicknames instead of phone numbers.",
      tags: ["Real-time", "Video", "Chat"],
    },
    Xeco: {
      kind: "Live creator calls",
      summary:
        "Creators go live and take one-on-one video calls with fans, with real-time chat and coins that fans send to support them.",
      tags: ["Video calls", "Coins", "Real-time"],
    },
    "Cahan Academy": {
      kind: "Academy dashboard",
      summary:
        "Management dashboard for an academy: teachers, students, courses, attendance, homework, exams, quizzes and schedules in one place.",
      tags: ["Dashboard", "Roles", "Multilingual"],
    },
    Docify: {
      kind: "File converter",
      summary:
        "Converts images, video, audio and PDFs entirely inside the browser. No uploads, no sign-up and no file size limit.",
      tags: ["Privacy-first", "Media", "PDF"],
    },
    Minna: {
      kind: "Anime streaming",
      summary: "Streams trending, popular and top-rated anime with favorites, blogs and a community space.",
      tags: ["Streaming", "Accounts", "Community"],
    },
  },
  stack: {
    lead: ["What I ", "build", " with"],
    title: "The Stack",
    subtitle: "Languages run on the screens. Everything else I reach for daily is pinned to the board.",
    tvAlt: "Faceless figure in a black helmet with a red visor sitting on a stack of vintage TVs",
    notes: {
      Frameworks: "Frameworks",
      "State & data": "State & data",
      UI: "UI",
      "Databases & BaaS": "Databases & BaaS",
      "Real-time": "Real-time",
      "DevOps & hosting": "DevOps & hosting",
      "AI tools": "AI tools",
    },
  },
  about: {
    label: "About me",
    headline: ["One developer,", "the whole product."],
    body:
      "I'm Ismat Cahangirov, a full stack developer from Baku. I take products from an empty repository to production: the database schema, the API, the web app, the mobile app and the deploy. Every project on this page was designed, built and shipped by me.",
    stats: [
      { value: "3+", label: "years shipping with the MERN stack" },
      { value: "100+", label: "students taught to code" },
    ],
    areas: [
      {
        title: "Frontend",
        body: "Component-based interfaces in React, Next.js and TypeScript, with the rendering strategy (SSR, SSG or ISR) picked per page.",
        keys: ["React", "Next.js", "Redux Toolkit", "Zustand"],
      },
      {
        title: "Backend & APIs",
        body: "REST APIs in Node.js and Express, data models in PostgreSQL and MongoDB, auth flows, plus caching and rate limiting with Redis.",
        keys: ["Node.js", "Prisma", "Supabase", "Upstash"],
      },
      {
        title: "Mobile",
        body: "Cross-platform iOS and Android apps in React Native: native modules, push notifications, offline support and store releases.",
        keys: ["React Native", "Expo", "Push", "Offline"],
      },
      {
        title: "Real-time",
        body: "Live video, voice, instant notifications and collaboration over WebRTC, LiveKit, Jitsi and Socket.IO.",
        keys: ["WebRTC", "LiveKit", "WebSocket"],
      },
      {
        title: "SEO & performance",
        body: "Core Web Vitals work on LCP, INP and CLS: code splitting, lazy loading, image optimization, caching and semantic HTML.",
        keys: ["Core Web Vitals", "Caching", "a11y"],
      },
      {
        title: "Leadership",
        body: "Led a frontend team, built its code review culture, mentored junior and mid-level developers and owned an academy curriculum.",
        keys: ["Code review", "Mentoring", "Curriculum"],
      },
    ],
  },
  contact: {
    label: "Contact",
    headline: ["Have a product", "in mind?", "Let's build it."],
    body: "Freelance projects, full-time roles or a second opinion on your architecture. I usually reply within a day.",
    methods: { email: "Email", phone: "Phone", github: "GitHub", location: "Location", locationValue: "Baku, Azerbaijan" },
    formTitle: "Write me a message",
    formSub: "It opens in your email app, ready to send.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    messageLabel: "Project",
    messagePlaceholder: "What are you building, and when do you need it?",
    submit: "Send message",
    errors: {
      name: "Enter your name.",
      email: "Enter an email address like name@example.com.",
      message: "Write at least a sentence about your project.",
    },
    subject: (name) => `Project inquiry from ${name}`,
    toast: "Your email app is opening with the message ready to send.",
  },
  footer: {
    giant: "Let's build",
    role: "Full stack developer, Baku",
    top: "Back to top",
    built: "Built with Next.js",
    navLabel: "Footer",
  },
  skip: "Skip to projects",
};

export default en;
