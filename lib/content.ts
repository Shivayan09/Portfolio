export const RESUME_URL = "/resume.pdf";

export const profile = {
  name: "Shivayan Chakravarty",
  first: "SHIVAYAN",
  last: "/CHAKRAVARTY",
  location: "Guwahati, India · UTC+5:30",
  phone: "+91-9435553309",
  phoneHref: "tel:+919435553309",
  email: "shivayanchak@gmail.com",
  linkedin: "https://www.linkedin.com/in/shivayan-chakravarty-806702294/",
  github: "https://github.com/Shivayan09",
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
    "I work across the whole stack, and lately on RAG-based AI systems: typed React and Next.js interfaces on one end, authorization pipelines, caching and rate limiting, message queues and WebSocket state on the other. Owning both ends means the contract between them is something I design rather than inherit.",
    "Alongside that I compete regularly - 500+ problems on LeetCode, Specialist on Codeforces - and spent a year as president of my college coding club, mentoring students in DSA and software engineering.",
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

export type Attachment = {
  label: string;
  href: string;
};

export type ExperienceRole = {
  title: string;
  /** Only needed when a company has more than one role. */
  period?: string;
  bullets: string[];
};

export type ExperienceEntry = {
  company: string;
  /** Label in the company switcher. */
  short: string;
  /** Square mark under /public. Without one, a monogram tile is drawn instead. */
  logo?: string;
  /** "light" for marks that vanish on ink; "bleed" for marks with their own background. */
  logoTile?: "light" | "bleed";
  monogram: string;
  location: string;
  mode: string;
  period: string;
  current?: boolean;
  roles: ExperienceRole[];
  skills: string[];
  attachments: Attachment[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Vibrnd",
    short: "Vibrnd",
    logo: "/logos/vibrnd-mark.png",
    monogram: "VB",
    location: "Guwahati, Assam",
    mode: "On-site",
    period: "AUG 2026 - PRESENT",
    current: true,
    roles: [
      {
        title: "Software Engineer Intern",
        bullets: [
          "Shipped full-stack features across multiple modules of a production restaurant POS platform, streamlining order-to-billing workflows and improving transaction traceability.",
          "Built and deployed a full-stack registration platform for a cricket league, engineered to stay responsive under high concurrent traffic during peak registration windows.",
          "Architected a scalable event management platform with multiple modules, multi-step workflows and role-based access control (RBAC); reduced latency and DB load by caching hot endpoints and pooling connections, and designed a deeply nested schema for a task management engine.",
          "Working on RAG-based AI systems using LangChain and LLMs.",
        ],
      },
    ],
    skills: [
      "Next.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "LangChain",
      "LLMs",
    ],
    attachments: [
      { label: "Offer letter", href: "/docs/vibrnd-offer-letter.pdf" },
    ],
  },
  {
    company: "ScaleDojo",
    short: "ScaleDojo",
    logo: "/logos/scaledojo.png",
    monogram: "SD",
    location: "Bengaluru, Karnataka",
    mode: "Remote",
    period: "JUL 2026 - SEP 2026",
    roles: [
      {
        title: "Product and Content Intern",
        period: "AUG 2026 - SEP 2026",
        bullets: [
          "Ideated and contributed to product improvements focused on enhancing the learning experience on the platform.",
          "Created technical content including system design videos, review blogs and learning modules.",
        ],
      },
      {
        title: "Quality Assurance Intern",
        period: "JUL 2026",
        bullets: [
          "Identified, tested and documented 25+ active bugs through black-box testing and other QA strategies, helping resolve issues affecting critical user workflows and core platform functionality.",
        ],
      },
    ],
    skills: ["System Design", "Technical Writing", "Black-box Testing", "QA"],
    attachments: [],
  },
  {
    company: "VrixaaLabs Pvt Ltd",
    short: "VrixaaLabs",
    logo: "/logos/vrixaalabs.png",
    logoTile: "light",
    monogram: "VL",
    location: "Tezpur, Assam",
    mode: "Hybrid",
    period: "MAY 2026 - JUL 2026",
    roles: [
      {
        title: "Software Engineer Intern",
        bullets: [
          "Built scalable backend infrastructure for a production social networking platform using Node.js, Express.js, MongoDB, Redis, Socket.IO and GraphQL.",
          "Architected a centralized permission evaluation pipeline aggregating memberships, entity-role assignments and role-derived permissions; exposed the effective permission set through GraphQL, eliminating fragmented permission checks across backend flows.",
          "Implemented distributed authorization, global rate limiting, Redis-backed real-time communication and PM2 cluster-safe cron execution, plus backend performance optimizations that improved scalability and reliability.",
        ],
      },
    ],
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "Socket.IO",
      "GraphQL",
    ],
    attachments: [
      { label: "Offer letter", href: "/docs/vrixaalabs-offer-letter.pdf" },
      { label: "Certificate", href: "/docs/vrixaalabs-certificate.jpeg" },
    ],
  },
  {
    company: "Bootcoding Pvt. Ltd.",
    short: "Bootcoding",
    logo: "/logos/bootcoding.png",
    logoTile: "bleed",
    monogram: "BC",
    location: "Nagpur, Maharashtra",
    mode: "Remote",
    period: "OCT 2025 - NOV 2025",
    roles: [
      {
        title: "Software Engineer Intern",
        bullets: [
          "Developed production-ready frontend features using Next.js, React.js, JavaScript and REST APIs, contributing to live application modules and dashboard functionality.",
          "Collaborated on scalable application architecture, API integration, testing and code quality improvements to deliver reliable production software.",
        ],
      },
    ],
    skills: ["Next.js", "React.js", "JavaScript", "REST APIs"],
    attachments: [
      { label: "Certificate", href: "/docs/bootcoding-certificate.pdf" },
      { label: "Recommendation", href: "/docs/bootcoding-lor.pdf" },
    ],
  },
  {
    company: "Indian Institute of Technology, Guwahati",
    short: "IIT Guwahati",
    logo: "/logos/iitg.png",
    monogram: "IITG",
    location: "North Guwahati, Assam",
    mode: "Hybrid",
    period: "JUN 2025 - NOV 2025",
    roles: [
      {
        title: "Summer Research Intern",
        bullets: [
          "Conducted research on deep learning and deep neural networks, implementing models from scratch using NumPy and validating experiments with PyTorch.",
          "Investigated representation learning, optimization, model capacity, underfitting and overfitting through experimental analysis and reproducible research workflows.",
        ],
      },
    ],
    skills: ["Python", "NumPy", "PyTorch", "Deep Learning"],
    attachments: [{ label: "Certificate", href: "/docs/iitg-certificate.pdf" }],
  },
];

export type Project = {
  number: string;
  name: string;
  tagline: string;
  date: string;
  bullets: string[];
  stack: string[];
  /** Screenshots under /public; the first one is the cover. */
  images: { src: string; alt: string }[];
  live: string;
  source: string;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "Syntropy",
    tagline: "AI-powered mock test platform",
    date: "AUG 2025",
    bullets: [
      "Designed a microservices architecture of 5+ Dockerized services that scale and fail independently.",
      "Offloaded email, document processing and AI evaluation to RabbitMQ async workers, keeping APIs fast.",
      "Built an LLM pipeline for PDF extraction and response validation, plus WebSocket-driven live timed tests.",
      "Automated answer evaluation with prompt-optimized LLM scoring across Gemini and Groq models.",
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
    images: [
      { src: "/projects/syntropy-1.png", alt: "Syntropy landing page" },
      {
        src: "/projects/syntropy-2.png",
        alt: "Syntropy dashboard with exam readiness and subject accuracy",
      },
    ],
    live: "https://syntropytest.in",
    source: "https://syntropytest.in",
  },
  {
    number: "02",
    name: "Vector",
    tagline: "Context-based social media platform",
    date: "JAN 2026",
    bullets: [
      "Implemented secure auth with HTTP-only cookie JWTs and Google OAuth 2.0 over a RESTful API.",
      "Built real-time messaging with Socket.IO: live delivery, read receipts and deletes synced across clients.",
      "Modeled a social graph with posts, likes, comments, follows, private accounts and follow requests.",
      "Developed an event-driven notification system with read, delete and bulk-clear operations.",
      "Built profile onboarding with avatar uploads and secure session management across user accounts.",
    ],
    stack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Socket.IO"],
    images: [
      {
        src: "/projects/vector-1.png",
        alt: "Vector feed with intent-tagged posts",
      },
      {
        src: "/projects/vector-2.png",
        alt: "Vector activity panel with notifications",
      },
    ],
    live: "https://vector-social-media.vercel.app/",
    source: "https://github.com/Shivayan09/Vector-social-media",
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
      "LangChain",
    ],
  },
  {
    label: "Data & DevOps",
    items: [
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Docker",
      "Git",
      "GitHub",
      "GitHub Actions",
      "Postman",
      "Cloudinary",
    ],
  },
];

export const engineeringSkills =
  "Data Structures and Algorithms, Object-Oriented Programming, High-Level Design, Low-Level Design, Microservices, Distributed Systems, Competitive Programming, Computer Networks, Operating Systems, DevOps";

export const leadership = [
  {
    period: "MAY 2026 - JUL 2026",
    role: "Project Admin",
    org: "NEXUS SPRING OF CODE · REMOTE",
    summary:
      "Merged 200+ pull requests, mentored 50+ contributors, and helped grow the project to 30+ GitHub stars.",
  },
  {
    period: "JUL 2025 - JUN 2026",
    role: "President",
    org: "AEC CODING CLUB · GUWAHATI",
    summary:
      "Led the college coding club: organized 15+ technical events including competitive programming contests, DSA bootcamps and workshops, and mentored students in algorithms, problem solving and software engineering.",
  },
];

export const education = [
  {
    degree: "B.Tech, Electronics and Telecommunication Engineering",
    institution: "ASSAM ENGINEERING COLLEGE, GUWAHATI",
    result: "CGPA 7.87",
    resultPrefix: "CGPA ",
    years: "2023 - 2027",
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
