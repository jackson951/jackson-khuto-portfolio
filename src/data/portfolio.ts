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
  /** Request flow, left to right. Each stage is a column of nodes in the architecture diagram. */
  flow: { label: string; nodes: string[] }[];
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
    flow: [
      { label: 'client', nodes: ['React Flow editor'] },
      { label: 'api', nodes: ['NestJS REST', 'Workspace auth'] },
      { label: 'queue', nodes: ['Redis', 'BullMQ'] },
      { label: 'worker', nodes: ['Execution engine', 'Webhooks'] },
      { label: 'data', nodes: ['PostgreSQL', 'Prisma'] },
    ],
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
    flow: [
      { label: 'client', nodes: ['React SPA'] },
      { label: 'api', nodes: ['Express REST', 'JWT + RBAC'] },
      { label: 'domain', nodes: ['Approvals', 'Balances'] },
      { label: 'data', nodes: ['Prisma', 'PostgreSQL'] },
    ],
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
    flow: [
      { label: 'client', nodes: ['Next.js app'] },
      { label: 'auth', nodes: ['Supabase Auth'] },
      { label: 'server', nodes: ['Repo ingestion', 'AI Q&A'] },
      { label: 'sources', nodes: ['GitHub API', 'PostgreSQL'] },
    ],
    highlights: [
      'Natural-language GitHub repository exploration',
      'Code structure and dependency analysis',
      'GitHub authentication and repository integration',
      'Documentation and onboarding capabilities described in the project',
    ],
  },
];

export const stackGroups: { label: string; items: string[] }[] = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'ASP.NET Core (C#)', 'Spring Boot (Java)', 'REST APIs'] },
  { label: 'Data', items: ['SQL Server', 'PostgreSQL', 'MongoDB', 'Prisma', 'Excel reporting'] },
  { label: 'Cloud', items: ['Microsoft Azure', 'Microsoft Entra ID', 'IIS', 'Docker', 'GitHub Actions'] },
  // TODO(Jackson): add the mobile tools you use (e.g. React Native, Expo, Flutter). Hidden while empty.
  { label: 'Mobile', items: [] },
  // TODO(Jackson): add Power Apps / Power Automate / Power BI here if you use them.
  { label: 'Low-code / Power Platform', items: ['SharePoint'] },
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
    role: 'Graduate Intern: Application Development & Support',
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

/* ------------------------------------------------------------------ */
/* What I offer — the "advertisement" side of the portfolio           */
/* ------------------------------------------------------------------ */

export type ServiceIcon = 'tools' | 'workflow' | 'security' | 'api' | 'reporting' | 'launch';

export interface Service {
  id: string;
  icon: ServiceIcon;
  title: string;
  /** The pain the visitor recognises, phrased the way they'd say it. */
  problem: string;
  /** What I build to fix it. */
  pitch: string;
  deliverables: string[];
  tech: string[];
  /** Where to see it done: a project path, or the experience page. */
  proof: { label: string; path: string };
  /** Pre-selects this topic on the contact form. */
  topic: string;
}

export const services: Service[] = [
  {
    id: 'internal-tools',
    icon: 'tools',
    title: 'Internal business tools',
    problem: 'Your team runs on spreadsheets, email chains and copy-paste.',
    pitch: 'A web app built around how your team actually works: forms, screens, search and records in one place everyone can use.',
    deliverables: ['Role-specific screens and dashboards', 'Forms with proper validation', 'Search, filters and exports', 'Works on desktop and mobile'],
    tech: ['React', 'TypeScript', 'Node.js', 'SQL'],
    proof: { label: 'See FlexiLeave', path: '/projects/flexileave-app' },
    topic: 'Internal tool',
  },
  {
    id: 'workflow',
    icon: 'workflow',
    title: 'Approval & workflow automation',
    problem: 'Requests get lost, approvals stall, and nobody knows the status.',
    pitch: 'Turn a manual process into a tracked workflow with clear steps, approvals, history, and background jobs that run on their own.',
    deliverables: ['Multi-step approval flows', 'Status tracking and audit history', 'Scheduled and background jobs', 'Safe retries when something fails'],
    tech: ['NestJS', 'Express', 'Redis', 'BullMQ'],
    proof: { label: 'See FlowForge', path: '/projects/flowforge' },
    topic: 'Workflow automation',
  },
  {
    id: 'security',
    icon: 'security',
    title: 'Secure sign-in & access control',
    problem: 'Everyone can see everything, or the login was bolted on as an afterthought.',
    pitch: 'Single sign-on with Microsoft Entra ID, or JWT-based login, with roles that decide exactly who can see and do what.',
    deliverables: ['Microsoft Entra ID / MSAL single sign-on', 'Role-based access control', 'Protected APIs and routes', 'Microsoft Graph integration'],
    tech: ['Entra ID', 'MSAL', 'JWT', 'Azure'],
    proof: { label: 'See my experience', path: '/experience' },
    topic: 'Secure login / SSO',
  },
  {
    id: 'apis',
    icon: 'api',
    title: 'APIs & system integrations',
    problem: "Your systems don't talk to each other, so people re-type the same data.",
    pitch: 'Clean, documented REST APIs and integrations that move data between your apps, databases and third-party services.',
    deliverables: ['REST API design and build', 'Webhooks and third-party integrations', 'Database design', 'Clear API documentation'],
    tech: ['ASP.NET Core', 'Node.js', 'PostgreSQL', 'SQL Server'],
    proof: { label: 'See FlowForge', path: '/projects/flowforge' },
    topic: 'API or integration',
  },
  {
    id: 'reporting',
    icon: 'reporting',
    title: 'Dashboards & reporting',
    problem: 'Getting a simple answer means an afternoon in Excel.',
    pitch: 'Dashboards and one-click Excel reports built on the data you already have, so decisions take minutes instead of days.',
    deliverables: ['Live operational dashboards', 'Excel report exports', 'Audit logs', 'Filter by team, date or status'],
    tech: ['React', 'SQL', 'Excel export', 'REST APIs'],
    proof: { label: 'See my experience', path: '/experience' },
    topic: 'Dashboard / reporting',
  },
  {
    id: 'launch',
    icon: 'launch',
    title: 'Deployment & ongoing support',
    problem: 'It works on one laptop, and nobody wants to touch production.',
    pitch: 'Reliable deployments to Azure or IIS, environment setup, documentation, and fixes and improvements after go-live.',
    deliverables: ['Azure and IIS deployments', 'Docker and CI/CD pipelines', 'Documentation and handover', 'Bug fixes and enhancements'],
    tech: ['Azure', 'IIS', 'Docker', 'GitHub Actions'],
    proof: { label: 'See my experience', path: '/experience' },
    topic: 'Deployment & support',
  },
];

export const processSteps: { title: string; body: string }[] = [
  {
    title: 'Discover',
    body: "We walk through how the work happens today, what's slowing your team down, and what better looks like. I turn that into a plain-language plan for what to build first.",
  },
  {
    title: 'Build in short iterations',
    body: 'You see working software early and often, and your feedback shapes each round, so there are no big surprises at the end.',
  },
  {
    title: 'Hand over & support',
    body: "I deploy it, show your team how to use it, write simple documentation, and stay available for fixes and improvements.",
  },
];

export const audiences: { id: 'business' | 'team' | 'hiring'; title: string; body: string; cta: string; topic: string }[] = [
  {
    id: 'business',
    title: 'You have a manual process',
    body: 'Spreadsheets, paper forms or email approvals that should be a proper system.',
    cta: 'Describe your process',
    topic: 'Internal tool',
  },
  {
    id: 'team',
    title: 'Your team needs another developer',
    body: 'Extra hands on a React, Node.js or .NET codebase, an API, or an integration.',
    cta: 'Tell me about the project',
    topic: 'Something else',
  },
  {
    id: 'hiring',
    title: "You're hiring a full-stack developer",
    body: 'Someone who can take a feature from requirements to production and support it.',
    cta: 'Talk about the role',
    topic: 'Full-time role',
  },
];

export const contactTopics = [
  'Internal tool',
  'Workflow automation',
  'Secure login / SSO',
  'API or integration',
  'Dashboard / reporting',
  'Deployment & support',
  'Full-time role',
  'Something else',
];

/** "Problems I solve": the business pain, then what I build to fix it. */
export const problems: { title: string; problem: string; solution: string; icon: 'approvals' | 'spreadsheets' | 'field' | 'visibility' }[] = [
  {
    icon: 'approvals',
    title: 'Approvals stuck in email',
    problem: 'Requests sit in inboxes, people chase each other for sign-off, and nobody knows where things stand.',
    solution: 'An approval workflow that routes each request to the right person, shows its status to everyone, and logs every decision.',
  },
  {
    icon: 'spreadsheets',
    title: 'Data living in spreadsheets',
    problem: 'Five versions of the same file, copy-paste errors, and one person who "owns" the master sheet.',
    solution: 'One shared system with proper forms, search and reports, so your team works from a single version of the truth.',
  },
  {
    icon: 'field',
    title: 'Field teams on paper job cards',
    problem: 'Job cards get lost, handwriting gets misread, and the office re-types everything at the end of the day.',
    solution: 'A mobile-friendly app for job cards, photos and sign-offs that lands in the office system straight away.',
  },
  {
    icon: 'visibility',
    title: 'No visibility for managers',
    problem: "Getting a simple answer like \"what's overdue?\" means asking around or building a report by hand.",
    solution: "Live dashboards and one-click Excel reports showing what's open, overdue and done, by team, site or person.",
  },
];

export const homeAbout = {
  body: [
    "I'm Jackson, a full-stack developer based in Gauteng, South Africa. I build software for the unglamorous, everyday work that keeps a business running: requests, approvals, records and reports.",
    "I'm currently a Graduate Intern in Application Development & Support at Barloworld Equipment, working on internal business applications: request and approval workflows, dashboards, reporting and secure company sign-in. I hold a BSc in Information Technology from North-West University.",
  ],
};

export const CV_PATH = '/Jackson_Khuto_CV.pdf';

/** "Book a chat" opens the visitor's email app with a ready-made subject and opening line. */
export const bookChatHref = `mailto:jacksonkhuto591@gmail.com?subject=${encodeURIComponent("Let's chat about a project")}&body=${encodeURIComponent(
  "Hi Jackson,\n\nHere's a bit about our business and the process we'd like to improve:\n\n",
)}`;
