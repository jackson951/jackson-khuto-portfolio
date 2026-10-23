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
    description:
      'Workflow automation platform with background workers, integrations and versioned workflows.',
    longDescription:
      'FlowForge is a full-stack integration and workflow automation project. Its NestJS backend supports authenticated workspaces, versioned workflows, asynchronous execution, webhooks and third-party integrations. The React frontend is under active development and is being aligned with the backend API.',
    problem:
      'Connecting services and automating multi-step business processes requires reliable execution, secure credentials, clear workflow definitions and visibility into failures.',
    solution:
      'Designed a backend architecture that separates API requests from background workflow execution, with queue-based processing, workspace access controls, execution history and integration boundaries.',
    architecture: [
      'React and TypeScript frontend with React Flow',
      'NestJS REST API with authenticated workspaces',
      'PostgreSQL persistence through Prisma',
      'Redis and BullMQ for queued workflow execution',
      'Separate background worker and execution engine',
      'Webhooks and third-party integration modules',
      'Docker-based development infrastructure',
    ],
    challenges: [
      'Coordinating asynchronous workflow execution and tracking run states',
      'Designing safe retry and idempotency behaviour',
      'Protecting workspace data and integration credentials',
      'Keeping the frontend aligned with evolving backend contracts',
    ],
    lessons: [
      'Reliable automation needs explicit execution states and failure handling',
      'Background processing should be separated from request handling',
      'Security and observability need to be part of the architecture from the beginning',
    ],
    stack: [
      'TypeScript',
      'NestJS',
      'React',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'BullMQ',
      'Docker',
    ],
    status: 'development',
    repoUrl: 'https://github.com/jackson951/forge-flow-api',
    additionalRepoUrls: [
      'https://github.com/jackson951/flow-forge-web',
    ],
    highlights: [
      'Versioned workflows with queue-based execution and background workers',
      'Workspace authentication, access control and credential protection',
      'Webhook and external service integrations',
      'Unit, integration and end-to-end testing documented in the backend',
      'React frontend under active development',
    ],
  },
  {
    id: 'flexileave',
    name: 'FlexiLeave',
    path: '/projects/flexileave-app',
    description:
      'Full-stack employee leave management and approval system.',
    longDescription:
      'A full-stack leave management application for employees and administrators. It brings leave requests, balances, approval decisions and reporting into a single system, with authenticated access and role-specific functionality.',
    problem:
      'Manual leave processes make it difficult to track balances, request history, approvals and team availability consistently.',
    solution:
      'Built a role-aware application where employees can submit and track leave requests while administrators manage approvals, users and reporting.',
    architecture: [
      'React frontend with responsive application screens',
      'Node.js and Express REST API',
      'PostgreSQL database accessed through Prisma',
      'JWT authentication and role-based authorization',
      'Employee and administrator workflows',
    ],
    challenges: [
      'Representing leave requests and approval states consistently',
      'Enforcing role permissions across frontend and backend',
      'Keeping leave balances and request history understandable',
    ],
    lessons: [
      'Business workflows benefit from clear state transitions',
      'Authorization must be enforced by the backend, not only the UI',
      'Database design influences how easily reporting features can grow',
    ],
    stack: [
      'React',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
      'JWT',
      'Tailwind CSS',
    ],
    status: 'live',
    repoUrl: 'https://github.com/jackson951/flexileave-app',
    highlights: [
      'Employee leave requests, balances and request history',
      'Administrator approval and user management workflows',
      'JWT authentication and role-based access control',
      'Reporting dashboards and responsive application interface',
    ],
  },
  {
    id: 'stackmap',
    name: 'StackMap',
    path: '/projects/stackmap',
    description:
      'AI-assisted GitHub repository exploration and codebase intelligence.',
    longDescription:
      'StackMap is a developer-focused platform for exploring GitHub repositories through natural-language questions, codebase analysis and generated documentation. Its frontend uses Next.js and TypeScript, with Supabase supporting authentication and persistence.',
    problem:
      'Understanding an unfamiliar codebase can require hours of navigating files, tracing dependencies and reconstructing architectural decisions.',
    solution:
      'Created a repository exploration interface that brings code structure, AI-assisted questions and developer onboarding information into one experience.',
    architecture: [
      'Next.js and TypeScript application',
      'Supabase authentication and PostgreSQL persistence',
      'GitHub repository integration',
      'AI-assisted codebase question-answering',
      'Separate StackMap server repository',
    ],
    challenges: [
      'Presenting large amounts of repository information clearly',
      'Providing useful context for natural-language code questions',
      'Connecting repository exploration with authentication and user data',
    ],
    lessons: [
      'AI-assisted answers are more useful when linked to source context',
      'Developer tools need clear navigation and understandable outputs',
      'Repository analysis requires careful separation of ingestion and presentation',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'AI Integration',
    ],
    status: 'development',
    repoUrl: 'https://github.com/jackson951/stackmap',
    additionalRepoUrls: [
      'https://github.com/jackson951/Stackmap-Server',
    ],
    highlights: [
      'Natural-language exploration of GitHub repositories',
      'Code structure and dependency analysis',
      'GitHub authentication and repository integration',
      'Architecture documentation and onboarding features described in the project',
    ],
  },
];
