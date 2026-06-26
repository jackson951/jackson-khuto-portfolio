export interface Project {
  id: string;
  name: string;
  path: string;
  description: string;
  longDescription: string;
  stack: string[];
  status: 'live' | 'api' | 'archived';
  repoUrl: string;
  liveUrl?: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: 'streetluxcity-shop',
    name: 'StreetLuxCity',
    path: '/projects/streetluxcity-shop',
    description: 'E-commerce storefront with native mobile packaging',
    longDescription:
      'A full e-commerce storefront built on Next.js, wired to a Spring Boot REST API and packaged with Capacitor so the same codebase ships as a native mobile app alongside the web build.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Capacitor'],
    status: 'live',
    repoUrl: 'https://github.com/jackson951/streetluxcity-shop',
    highlights: [
      'Single codebase compiled to web and native mobile via Capacitor',
      'Connects to a dedicated Spring Boot backend over REST',
      'Responsive storefront UI built with Tailwind CSS',
    ],
  },
  {
    id: 'api-streetluxcity',
    name: 'StreetLuxCity API',
    path: '/projects/api-streetluxcity',
    description: 'Spring Boot REST API powering the storefront',
    longDescription:
      'The backend service for StreetLuxCity — a Spring Boot REST API handling catalog, orders, and the data layer behind the storefront.',
    stack: ['Java', 'Spring Boot', 'REST', 'SQL'],
    status: 'api',
    repoUrl: 'https://github.com/jackson951/api.streetluxcity',
    highlights: [
      'REST API design serving the StreetLuxCity storefront',
      'Built on Spring Boot with a relational data layer',
    ],
  },
  {
    id: 'flexileave',
    name: 'FlexiLeave',
    path: '/projects/flexileave-app',
    description: 'Full-stack leave management system',
    longDescription:
      'A full-stack web application for managing employee leave requests, with secure JWT authentication, role-based access control, and a modern responsive interface.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
    status: 'live',
    repoUrl: 'https://github.com/jackson951/flexileave-app',
    highlights: [
      'JWT-based authentication with role-based access control',
      'PostgreSQL data layer with a Node.js/Express API',
      'Responsive React frontend for request submission and approval',
    ],
  },
  {
    id: 'stackmap',
    name: 'StackMap',
    path: '/projects/stackmap',
    description: 'AI-powered codebase intelligence platform',
    longDescription:
      'A platform that connects to GitHub repositories and lets developers ask natural-language questions about a codebase. StackMap uses AI to analyse code structure and dependencies to speed up onboarding.',
    stack: ['TypeScript', 'Node.js', 'AI Integration'],
    status: 'live',
    repoUrl: 'https://github.com/jackson951/stackmap',
    highlights: [
      'Natural-language Q&A over connected GitHub repositories',
      'Analyses code structure and dependency graphs',
      'Paired client (stackmap) and server (Stackmap-Server) architecture',
    ],
  },
];

export const stackGroups: { label: string; items: string[] }[] = [
  { label: 'languages', items: ['C#', 'TypeScript', 'JavaScript', 'SQL'] },
  { label: 'frontend', items: ['React.js', 'Next.js', 'Tailwind CSS'] },
  { label: 'backend', items: ['ASP.NET Core', 'Express.js', 'Spring Boot'] },
  { label: 'databases', items: ['SQL Server', 'PostgreSQL', 'MongoDB'] },
  { label: 'cloud & deployment', items: ['Microsoft Azure', 'IIS', 'Docker', 'GitHub Actions'] },
  { label: 'microsoft ecosystem', items: ['MS Entra ID', 'SharePoint'] },
  { label: 'practices', items: ['REST APIs', 'Agile / Scrum', 'CI/CD', 'Code Review'] },
];

export const profile = {
  name: 'Jackson Khuto',
  role: 'Full-Stack Software Developer',
  location: 'Midrand, Gauteng, South Africa',
  tagline: 'Building systems that work, scale, and last.',
  email: 'jacksonkhuto591@gmail.com',
  phone: '06 618 0274',
  github: 'https://github.com/jackson951',
  linkedin: 'https://www.linkedin.com/in/jackson-khuto-03533437b/',
  summary:
    'Full-stack software developer with practical experience building and shipping production applications using C#, ASP.NET Core, React.js, and SQL Server. Comfortable across the full development lifecycle — from database design and API integration through to cloud deployment on Microsoft Azure. Works well in Agile teams, values clean and maintainable code, and picks up new requirements quickly.',
};

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Graduate Software Developer',
    company: 'Barloworld Equipment',
    location: 'Isando, Gauteng',
    period: 'Dec 2025 — Present',
    current: true,
    bullets: [
      'Build internal business applications using React.js and Tailwind CSS on the frontend, with Express.js and Spring Boot powering backend services depending on application requirements.',
      'Integrated Microsoft SharePoint as a document management layer within internal tools, enabling structured content access directly from business applications.',
      'Implemented authentication and access control using Microsoft Entra ID (Azure AD), securing internal applications with role-based access aligned to organisational identity policies.',
      'Manage application deployments across both IIS (on-premise) and Microsoft Azure, navigating environment-specific configurations to ensure stable and reliable releases.',
      'Work within an Agile delivery team, contributing to sprint planning and code reviews while consistently applying feedback to improve solution quality and maintainability.',
    ],
  },
  {
    role: 'Software Developer Learnership',
    company: 'Bluu Car Rental',
    location: 'Kempton Park, Gauteng',
    period: 'Feb 2025 — Jul 2025',
    bullets: [
      'Developed and shipped internal business features using C# and ASP.NET Core on the backend and React.js on the frontend, working across the full stack from requirements to production.',
      'Designed and maintained relational database schemas in SQL Server, writing and optimising queries to support business operations while enforcing data integrity in a live environment.',
      'Built and consumed RESTful APIs to connect frontend and backend systems, troubleshooting data-flow issues and supporting internal users through to resolution.',
      'Deployed applications to Microsoft Azure, gaining practical exposure to cloud hosting, environment configuration, and CI/CD pipeline behaviour in a production context.',
      'Participated in Agile ceremonies and peer code reviews, developing habits around structured delivery and incorporating senior feedback to steadily improve code quality.',
    ],
  },
];

export const education = {
  degree: 'BSc Information Technology',
  school: 'North-West University, Vanderbijlpark',
  period: 'Feb 2022 – Dec 2024',
  detail: 'Data Structures, Algorithms, DB Management, Software Engineering, OOP, Security',
};

export const certifications: string[] = [
  'JS Algorithms & Data Structures — freeCodeCamp',
  'Intro to REST APIs — Great Learning',
  'Data Analytics (Excel) — Great Learning',
  'CompTIA A+ & Network+ — in progress',
];
