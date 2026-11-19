/**
 * ============================================================================
 *  site.ts: THE file to edit when something about you changes.
 * ============================================================================
 *
 *  Everything personal or time-sensitive lives here: name, tagline, bio,
 *  contact details, CV, availability, skills, projects and case studies.
 *  Components read from this file; nothing personal is hard-coded elsewhere.
 *
 *  Keep wording timeless: describe what you do, not your current title or
 *  employer. Your title and employer belong on LinkedIn and in your CV.
 */

/* --------------------------------------------------------------------------
 * 1. About you
 * ------------------------------------------------------------------------ */

export const site = {
  name: 'Jackson Khuto',
  firstName: 'Jackson',
  /** What you are, not a job title. */
  role: 'Full-stack developer',
  location: 'Gauteng, South Africa',
  /** Used for structured data (JSON-LD). */
  address: { region: 'Gauteng', country: 'ZA' },
  url: 'https://jackson-khuto-portfolio.vercel.app',

  email: 'jacksonkhuto591@gmail.com',
  github: 'https://github.com/jackson951',
  linkedin: 'https://www.linkedin.com/in/jackson-khuto-03533437b/',
  /** File in /public. Replace the PDF and keep this name, or update the path. */
  cvPath: '/Jackson_Khuto_CV.pdf',

  /** Shown as the badge at the top of the homepage. Set to null to hide it. */
  availability: 'Available for projects' as string | null,
  /** The year you started building software professionally. Use `yearsOfExperience()`, never a hard-coded number. */
  startYear: 2024,

  /** Homepage headline. `taglineHighlight` must be the end of `tagline`; it is shown in the accent colour. */
  tagline: 'Software that takes the busywork off your team.',
  taglineHighlight: 'off your team.',
  subhead:
    'I build internal tools, workflows, dashboards and apps for businesses of any size and industry, so your team spends less time on admin and more on the work that matters.',
  /** Search engines and link previews (keep under ~160 characters). */
  description:
    'Internal tools, workflows, dashboards and apps for any business still running on spreadsheets, email chains or paper forms.',
  /** Shown under your photo in the hero. */
  heroTags: ['Internal tools', 'Workflows', 'Dashboards', 'Apps'],

  /** Short bio for the homepage About section. */
  bio: [
    "I'm Jackson, a full-stack developer based in Gauteng, South Africa. I build software for the everyday work that keeps a business running: requests, approvals, records and reports.",
    "I've built business applications in an enterprise environment, from requirements and solution design through to deployment and support. The projects on this site are my own, and their code is public on GitHub.",
  ],
  /** Longer summary for the About page. */
  summary:
    'I approach software by first understanding the business process, the users involved, and the data that needs to move through the system. From there, I design maintainable features with clear separation between the interface, API, business logic, and database layers. I care about secure authentication, role-based access, reliable workflows, useful reporting, and interfaces that are simple for people to use. My goal is to build systems that solve the real problem, are easy to support, and can grow without becoming fragile.',

  education: {
    degree: 'BSc Information Technology',
    school: 'North-West University',
    period: '2022 – 2024',
  },
};

/* --------------------------------------------------------------------------
 * 2. Skills (groups with no items are hidden)
 * ------------------------------------------------------------------------ */

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

/* --------------------------------------------------------------------------
 * 3. Projects (detail pages under /projects). Your own public projects only.
 * ------------------------------------------------------------------------ */

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
    liveUrl: 'https://flexileave.vercel.app',
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
    liveUrl: 'https://stackmap-8ipx.vercel.app/',
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

/* --------------------------------------------------------------------------
 * 4. Homepage case studies
 *
 *  Write problem / built / outcome in business language; keep tech for `stack`.
 *  Anything in [square brackets] is a placeholder: highlighted in `npm run dev`,
 *  hidden in production so unfinished text never goes live.
 * ------------------------------------------------------------------------ */

export interface CaseStudyMedia {
  kind: 'image' | 'video';
  /** Path under /public, e.g. '/case-studies/flexileave.webp' */
  src: string;
  /** Describe what the screenshot shows, for screen readers. */
  alt: string;
  /** Optional still frame for videos. */
  poster?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  /** Short category line, e.g. "Leave management". */
  category: string;
  /** e.g. "In progress" / "In development". Leave out for finished projects. */
  status?: string;
  problem: string;
  built: string[];
  outcome: string;
  /** Screenshot or short demo video. Until one is added, `steps` is shown instead. */
  media?: CaseStudyMedia;
  /** The process the software runs, in plain words. Used as the visual when there is no media. */
  steps: string[];
  stack: string[];
  /**
   * Public GitHub repos. Only your OWN public projects belong here: every case study
   * needs at least one public repo or a live demo, and nothing done for an employer.
   */
  repos: { label: string; url: string }[];
  liveUrl?: string;
  /** Optional link to the longer write-up under /projects. */
  link?: { label: string; href: string };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'flexileave',
    title: 'FlexiLeave',
    category: 'Leave management',
    problem:
      "When leave runs on email and spreadsheets, balances drift, requests get lost, and managers can't easily see who is away next week.",
    built: [
      'Employees request leave and see their balance and history in one place',
      'Managers approve or decline in one click, and every decision is recorded',
      'A team calendar, employee directory and reports, without touching a spreadsheet',
      'Secure login with roles, so people only see what they should',
    ],
    // TODO(Jackson): replace with a real result, even a rough one.
    outcome: '[Outcome, e.g. "leave approvals went from 3 days to same-day"]',
    media: {
      kind: 'image',
      src: '/case-studies/flexileave-dashboard.webp',
      alt: 'FlexiLeave analytics dashboard showing total leave requests, pending approvals, approved leave and charts of leave status and leave types.',
    },
    steps: ['Employee requests leave', 'Manager approves', 'Balance updates', 'Reports ready'],
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT'],
    repos: [{ label: 'Code on GitHub', url: 'https://github.com/jackson951/flexileave-app' }],
    liveUrl: 'https://flexileave.vercel.app',
    link: { label: 'Full case study', href: '/projects/flexileave-app' },
  },
  {
    id: 'flowforge',
    title: 'FlowForge',
    category: 'Workflow automation',
    status: 'In progress',
    problem:
      "Teams repeat the same multi-step tasks by hand: copying data between systems, sending follow-ups, checking whether something ran. When a step quietly fails, nobody notices until it's too late.",
    built: [
      'Workflows defined once, then run automatically in the background',
      'Connections to other systems through webhooks and integrations',
      'A run history that shows what happened and exactly where it failed',
      'Separate workspaces with secure handling of passwords and API keys',
    ],
    // TODO(Jackson): fill in once FlowForge is piloted.
    outcome: '[Outcome once piloted, e.g. "X manual steps removed per week"]',
    steps: ['Something happens', 'Workflow starts', 'Steps run automatically', 'Results logged'],
    stack: ['TypeScript', 'NestJS', 'React', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker'],
    repos: [
      { label: 'API on GitHub', url: 'https://github.com/jackson951/forge-flow-api' },
      { label: 'Web app on GitHub', url: 'https://github.com/jackson951/flow-forge-web' },
    ],
    link: { label: 'Full case study', href: '/projects/flowforge' },
  },
  {
    id: 'stackmap',
    title: 'StackMap',
    category: 'AI-powered codebase intelligence',
    status: 'In development',
    problem:
      'Getting to know an unfamiliar codebase means hours of clicking through files and piecing together how everything fits, before anyone can make a safe change.',
    built: [
      'Connect a GitHub repository and ask questions about it in plain English',
      'See how the code is structured and which parts depend on each other',
      'Sign in with GitHub to work with your own repositories',
    ],
    // TODO(Jackson): fill in once StackMap has real users.
    outcome: '[Outcome once in use, e.g. "new developers productive in X days instead of Y"]',
    steps: ['Connect a repository', 'Code is analysed', 'Ask a question', 'Get an answer'],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'AI integration'],
    repos: [
      { label: 'App on GitHub', url: 'https://github.com/jackson951/stackmap' },
      { label: 'Server on GitHub', url: 'https://github.com/jackson951/Stackmap-Server' },
    ],
    liveUrl: 'https://stackmap-8ipx.vercel.app/',
    link: { label: 'Full case study', href: '/projects/stackmap' },
  },
];

/* --------------------------------------------------------------------------
 * Derived values (no need to edit below this line)
 * ------------------------------------------------------------------------ */

/** Whole years since `site.startYear`; updates automatically every January. */
export const yearsOfExperience = (now: Date = new Date()) => Math.max(1, now.getFullYear() - site.startYear);

/** e.g. "github.com/jackson951" */
export const githubHandle = site.github.replace(/^https?:\/\//, '').replace(/\/$/, '');

/** "Book a chat" opens the visitor's email app with a ready-made subject and opening line. */
export const bookChatHref = `mailto:${site.email}?subject=${encodeURIComponent("Let's chat about a project")}&body=${encodeURIComponent(
  `Hi ${site.firstName},\n\nHere's a bit about our business and the process we'd like to improve:\n\n`,
)}`;

export const isPlaceholder = (text: string) => /\[[^\]]+\]/.test(text);
