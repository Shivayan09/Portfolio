export const RESUME_URL = "/Shivayan-Chakravarty-Resume.pdf";

export const profile = {
  name: "Shivayan Chakravarty",
  first: "SHIVAYAN",
  last: "/CHAKRAVARTY",
  location: "Guwahati, India · UTC+5:30",
  phone: "+91-9435553309",
  phoneHref: "tel:+919435553309",
  email: "shivayanchak@gmail.com",
  linkedin: "#",
  github: "#",
  intro:
    "I build and ship full products end to end. Next.js and React on the front, distributed systems, real-time services and AI pipelines in Node.js and TypeScript behind them. B.Tech student at Assam Engineering College, Guwahati.",
};

export const sections = [
  { id: "about", index: "01", label: "About" },
  { id: "experience", index: "02", label: "Work" },
  { id: "projects", index: "03", label: "Builds" },
  { id: "skills", index: "04", label: "Stack" },
  { id: "leadership", index: "05", label: "Lead" },
  { id: "education", index: "06", label: "Edu" },
] as const;

export const marqueeItems = [
  "Node.js",
  "TypeScript",
  "Redis",
  "MongoDB",
  "GraphQL",
  "Socket.IO",
  "RabbitMQ",
  "Docker",
  "Next.js",
  "PostgreSQL",
  "Distributed systems",
];

export const stats = [
  { value: "500+", label: "LeetCode solved" },
  { value: "1419", label: "Codeforces specialist" },
  { value: "200+", label: "PRs merged" },
  { value: "50+", label: "Contributors mentored" },
];

export const about = {
  paragraphs: [
    "I work across the whole stack: typed React and Next.js interfaces on one end, authorization pipelines, caching and rate limiting, message queues and WebSocket state on the other. Owning both ends means the contract between them is something I design rather than inherit.",
    "Alongside that I compete regularly — 500+ problems on LeetCode, Specialist on Codeforces — and mentor students in DSA and software engineering at my college.",
  ],
  tags: [
    { label: "Full-stack engineering", accent: true },
    { label: "Node.js / TypeScript", accent: false },
    { label: "Next.js / React", accent: false },
    { label: "Distributed systems", accent: false },
    { label: "System design", accent: false },
    { label: "Competitive programming", accent: false },
  ],
};

export const experience = {
  role: "Software Engineer Intern",
  period: "MAY 2026 — JUL 2026",
  company: "VRIXAALABS PVT LTD · HYBRID",
  bullets: [
    "Engineered 3 production-oriented backend improvements in a Node.js/TypeScript microservices platform — centralized RBAC authorization, utility refactoring, and global Redis-based rate limiting.",
    "Strengthened distributed-system infrastructure with Redis Pub/Sub, Socket.IO Adapter and clustered-cron strategies, global request throttling, and MongoDB connection-pool tuning.",
    "Architected a centralized permission evaluation pipeline aggregating memberships, entity-role assignments, and role-derived permissions; exposed the effective permission set through GraphQL and integrated it into entitlement authorization, eliminating fragmented permission evaluation across backend flows and improving consistency.",
  ],
};

export type Project = {
  number: string;
  name: string;
  tagline: string;
  date: string;
  bullets: string[];
  stack: string[];
  live: string;
  source: string;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "Vector",
    tagline: "Social media platform",
    date: "JAN 2026",
    bullets: [
      "Built a full-stack social platform with REST APIs, cookie-based JWT authentication, and Google OAuth.",
      "Implemented real-time chat using WebSockets with scalable state-driven UI updates.",
      "Developed social features including profiles, posts, likes, comments, follows, and user interactions.",
    ],
    stack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Socket.IO"],
    live: "#",
    source: "#",
  },
  {
    number: "02",
    name: "Syntropy",
    tagline: "AI-powered mock test platform",
    date: "AUG 2025",
    bullets: [
      "Engineered microservices using Node.js, TypeScript, MongoDB and Redis caching for frequently accessed data.",
      "Implemented asynchronous workflows with message queues for emails, document processing, and AI evaluation.",
      "Built AI pipelines with PDF extraction, text preprocessing, prompt optimization, and response validation workflows.",
      "Implemented WebSockets for real-time timed assessments, synchronized countdowns, and live session state updates.",
    ],
    stack: [
      "Next.js",
      "Express.js",
      "TypeScript",
      "MongoDB",
      "Redis",
      "RabbitMQ",
      "Docker",
      "Gemini",
      "Groq",
    ],
    live: "#",
    source: "#",
  },
];

export const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "JavaScript", "TypeScript", "Python", "C", "C++", "SQL"],
  },
  {
    label: "Development",
    items: [
      "Node.js",
      "Express.js",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "REST APIs",
      "GraphQL",
      "Socket.IO",
    ],
  },
  {
    label: "Data & tools",
    items: [
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Git",
      "GitHub",
      "GitHub Actions",
      "Postman",
      "Cloudinary",
    ],
  },
];

export const engineeringSkills =
  "Data Structures and Algorithms, Object-Oriented Programming, High-Level Design, Low-Level Design, Distributed Systems, Competitive Programming, Computer Networks, Operating Systems, DevOps";

export const leadership = [
  {
    period: "MAY 2026 — JUL 2026",
    role: "Project Admin",
    org: "NEXUS SPRING OF CODE · REMOTE",
    summary:
      "Merged 200+ pull requests, mentored 50+ contributors, and helped grow the project to 30+ GitHub stars.",
  },
  {
    period: "JUL 2025 — JUN 2026",
    role: "President",
    org: "ASSAM ENGINEERING COLLEGE, GUWAHATI",
    summary:
      "Organized 15+ technical events, mentored students in DSA, competitive programming, and software engineering.",
  },
];

export const education = [
  {
    degree: "B.Tech, Electronics and Telecommunication Engineering",
    institution: "ASSAM ENGINEERING COLLEGE, GUWAHATI",
    result: "CGPA 7.87",
    resultPrefix: "CGPA ",
    years: "2023 — 2027",
  },
  {
    degree: "Higher Secondary Certificate",
    institution: "SAI RNS ACADEMY",
    result: "91%",
    resultPrefix: "",
    years: "2022",
  },
  {
    degree: "Senior Secondary Certificate",
    institution: "MAHARISHI VIDYA MANDIR, GUWAHATI",
    result: "97%",
    resultPrefix: "",
    years: "2020",
  },
];
