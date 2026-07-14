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

export const featuredProjectId = 'flexileave';

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

export const buildAreas = [
  {
    title: 'Enterprise Applications',
    body: 'Internal tools that support real business processes, approvals, records, and day-to-day operations.',
  },
  {
    title: 'Workflow Automation',
    body: 'Request flows, approval rules, status tracking, notifications, and business logic that reduce manual work.',
  },
  {
    title: 'Secure APIs',
    body: 'REST APIs with validation, authentication, authorization, service layers, and predictable data contracts.',
  },
  {
    title: 'Dashboards & Reporting',
    body: 'Operational dashboards, filters, exports, audit history, and reporting views that make work visible.',
  },
  {
    title: 'Identity Integration',
    body: 'Microsoft Entra ID, MSAL, JWT, protected routes, role-based access, and Microsoft Graph integrations.',
  },
  {
    title: 'Database Design',
    body: 'Relational schemas, migrations, CRUD flows, transactions, query troubleshooting, and data integrity.',
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
  email: 'jacksonkhuto591@gmail.com',
  phone: '066 180 2747',
  github: 'https://github.com/jackson951',
  linkedin: 'https://www.linkedin.com/in/jackson-khuto-03533437b/',
  summary:
    'I approach software by first understanding the business process, the users involved, and the data that needs to move through the system. From there, I design maintainable features with clear separation between the interface, API, business logic, and database layers. I care about secure authentication, role-based access, reliable workflows, useful reporting, and interfaces that are simple for people to use. My goal is to build systems that solve the real problem, are easy to support, and can grow without becoming fragile.',
};

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
}

export const experienceImpactGroups = [
  {
    title: 'Enterprise Application Development',
    points: [
      'Build and enhance internal applications across requirements, feature design, implementation, testing, UAT, deployment, support, and maintenance.',
      'Develop React and TypeScript interfaces for dashboards, forms, filters, request workflows, validation states, and responsive business screens.',
      'Implement backend functionality with Node.js, Express, REST APIs, service layers, scheduled jobs, validation, error handling, and database access patterns.',
    ],
  },
  {
    title: 'Identity & Security',
    points: [
      'Secure applications with Microsoft Entra ID, MSAL, JWT authentication, protected routes, and role-based access control.',
      'Work with Azure App Registrations, enterprise identity configuration, token handling, and Microsoft Graph integrations.',
    ],
  },
  {
    title: 'Business Processes & Reporting',
    points: [
      'Deliver approval workflows, request management, dashboards, Excel reporting, audit logs, and SAP-related process support.',
      'Translate business requirements into usable application flows with clearer navigation, cleaner layouts, and user-focused improvements.',
    ],
  },
  {
    title: 'Delivery & Support',
    points: [
      'Support IIS and Azure deployments, PM2 process management, environment configuration, build troubleshooting, and release fixes.',
      'Contribute to UAT support, bug fixing, technical documentation, change management, CAB processes, and production enhancements.',
    ],
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: 'Software Developer',
    company: 'Barloworld Equipment',
    location: 'Isando, Gauteng',
    period: 'Dec 2025 — Present',
    current: true,
  },
];

export const education = {
  degree: 'BSc Information Technology',
  school: 'North-West University, Vanderbijlpark',
  period: 'Feb 2022 – Dec 2024',
};
