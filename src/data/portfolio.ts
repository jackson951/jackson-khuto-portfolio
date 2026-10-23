export interface Project {
  id: string;
  name: string;
  path: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  architecture: string[];
  challenges: string[];
  lessons: string[];
  stack: string[];
  status: 'live' | 'api' | 'archived' | 'development';
  repoUrl: string;
  additionalRepoUrls?: string[];
  liveUrl?: string;
  highlights: string[];
}

export const featuredProjectId = 'flowforge';

export const projects: Project[] = [
  {
    id: 'flowforge',
    name: 'FlowForge',
    path: '/projects/flowforge',
    description: 'Workflow automation platform with background workers and integrations.',
    longDescription: 'FlowForge is an integration and workflow automation project. Its NestJS backend supports authenticated workspaces, versioned workflows, queued execution, webhooks and third-party integrations. The React frontend is under active development and is being aligned with the backend API.',
    problem: 'Automating multi-step business processes requires reliable execution, secure credentials, clear workflow definitions and visibility into failures.',
    solution: 'Designed a backend that separates API requests from background execution, with queue-based processing, workspace access controls, execution history and integration boundaries.',
    architecture: [
      'React and TypeScript frontend with React Flow',
      'NestJS REST API and authenticated workspaces',
      'PostgreSQL persistence with Prisma',
      'Redis and BullMQ queue processing',
      'Separate background worker and execution engine',
      'Webhooks and external integrations',
      'Docker development environment',
    ],
    challenges: [
      'Coordinating asynchronous workflow execution and run states',
      'Designing safe retries and idempotent processing',
      'Protecting workspace data and integration credentials',
      'Aligning frontend flows with evolving backend contracts',
    ],
    lessons: [
      'Reliable automation requires explicit states and failure handling',
      'Background processing should be separate from HTTP request handling',
      'Security and observability belong in the architecture from the start',
    ],
    stack: ['TypeScript', 'NestJS', 'React', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Docker'],
    status: 'development',
    repoUrl: 'https://github.com/jackson951/forge-flow-api',
    additionalRepoUrls: ['https://github.com/jackson951/flow-forge-web'],
    highlights: [
      'Versioned workflows with queue-based execution and background workers',
      'Workspace access control and credential protection',
      'Webhook and external service integrations',
      'Documented unit, integration and end-to-end testing',
      'React frontend in active development',
    ],
  },
  {
    id: 'flexileave',
    name: 'FlexiLeave',
    path: '/projects/flexileave-app',
    description: 'Full-stack employee leave management and approval system.',
    longDescription: 'A full-stack leave management application for employees and administrators, bringing leave requests, balances, approval decisions and reporting into a single system with authenticated access and role-specific functionality.',
    problem: 'Manual leave processes make it difficult to track balances, request history, approvals and team availability consistently.',
    solution: 'Built a role-aware application where employees submit and track requests while administrators manage approvals, users and reporting.',
    architecture: [
      'React frontend with responsive screens',
      'Node.js and Express REST API',
      'PostgreSQL accessed through Prisma',
      'JWT authentication and role-based authorization',
      'Employee and administrator workflows',
    ],
    challenges: [
      'Representing leave requests and approval states consistently',
      'Enforcing permissions across frontend and backend',
      'Keeping leave balances and history understandable',
    ],
    lessons: [
      'Business workflows benefit from clear state transitions',
      'Authorization must be enforced on the backend',
      'Database design influences reporting capabilities',
    ],
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'Tailwind CSS'],
    status: 'live',
    repoUrl: 'https://github.com/jackson951/flexileave-app',
    highlights: [
      'Employee leave requests, balances and history',
      'Administrator approval and user management workflows',
      'JWT authentication and role-based access control',
      'Reporting dashboards and responsive interface',
    ],
  },
  {
    id: 'stackmap',
    name: 'StackMap',
    path: '/projects/stackmap',
    description: 'AI-assisted GitHub repository exploration and codebase intelligence.',
    longDescription: 'StackMap is a developer-focused project for exploring GitHub repositories through natural-language questions, codebase analysis and generated documentation. Its frontend uses Next.js and TypeScript with Supabase for authentication and persistence.',
    problem: 'Understanding an unfamiliar codebase takes time navigating files, tracing dependencies and reconstructing architectural decisions.',
    solution: 'Created a repository exploration interface combining code structure, AI-assisted questions and developer onboarding information.',
    architecture: [
      'Next.js and TypeScript frontend',
      'Supabase authentication and PostgreSQL persistence',
      'GitHub repository integration',
      'AI-assisted codebase questions',
      'Separate StackMap server repository',
    ],
    challenges: [
      'Presenting repository information clearly',
      'Providing useful context for code questions',
      'Integrating repository exploration with authentication',
    ],
    lessons: [
      'AI answers benefit from links to source context',
      'Developer tools need understandable outputs',
      'Repository analysis benefits from separation of ingestion and presentation',
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'AI Integration'],
    status: 'development',
    repoUrl: 'https://github.com/jackson951/stackmap',
    additionalRepoUrls: ['https://github.com/jackson951/Stackmap-Server'],
    highlights: [
      'Natural-language GitHub repository exploration',
      'Code structure and dependency analysis',
      'GitHub authentication and repository integration',
      'Documentation and onboarding capabilities described in the project',
    ],
  },
];

export const stackGroups: { label: string; items: string[] }[] = [
  { label: 'languages', items: ['C#', 'TypeScript', 'JavaScript', 'SQL', 'Java'] },
  { label: 'frontend', items: ['React.js', 'Next.js', 'Tailwind CSS'] },
  { label: 'backend', items: ['ASP.NET Core', 'Express.js', 'Spring Boot', 'NestJS'] },
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
  summary: 'I approach software by first understanding the business process, the users involved, and the data that needs to move through the system. From there, I design maintainable features with clear separation between the interface, API, business logic, and database layers. I care about secure authentication, role-based access, reliable workflows, useful reporting, and interfaces that are simple for people to use. My goal is to build systems that solve the real problem, are easy to support, and can grow without becoming fragile.',
};

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
}

export const experienceImpactGroups: { title: string; points: string[] }[] = [
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
