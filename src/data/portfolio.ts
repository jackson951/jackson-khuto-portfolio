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
  phone: '066 180 2747',
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
    role: 'Software Developer',
    company: 'Barloworld Equipment',
    location: 'Isando, Gauteng',
    period: 'Dec 2025 — Present',
    current: true,
    bullets: [
      'Build and enhance enterprise internal applications across the full SDLC, from stakeholder requirements and feature design through testing, UAT, deployment, production support, and ongoing maintenance.',
      'Develop React and TypeScript interfaces for dashboards, request workflows, reports, filters, forms, role-based views, loading states, validation, and responsive layouts used by business teams.',
      'Implement backend functionality with Node.js, Express, REST APIs, service layers, scheduled jobs, request validation, error handling, and database access patterns for operational business processes.',
      'Design and maintain SQL Server and PostgreSQL data flows using Prisma ORM, including schema changes, migrations, CRUD operations, transactions, and query troubleshooting.',
      'Secure applications with Microsoft Entra ID, MSAL, JWT authentication, protected routes, role-based access control, Azure App Registrations, and Microsoft Graph integrations.',
      'Deliver enterprise application enhancements including approval workflows, request management, dashboards, Excel reporting, audit logs, SAP-related process support, and usability improvements based on user feedback.',
      'Support deployments and enterprise operations across IIS, Azure, PM2, environment configuration, build troubleshooting, change management, CAB processes, and technical documentation.',
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
