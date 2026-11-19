/**
 * Page copy: the wording for the services, problems, process and audience sections.
 * Nothing personal or time-sensitive lives here; for that, edit `site.ts`.
 */

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
  /** Where to see it done: one of your own public projects. */
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
    proof: { label: 'See FlexiLeave', path: '/projects/flexileave-app' },
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
    proof: { label: 'See FlexiLeave', path: '/projects/flexileave-app' },
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
    proof: { label: 'See FlexiLeave live', path: '/projects/flexileave-app' },
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

/** "Problems I solve": universal business pain, then what I build to fix it. */
export const problems: { title: string; problem: string; solution: string; icon: 'approvals' | 'spreadsheets' | 'paper' | 'visibility' | 'integration' }[] = [
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
    icon: 'paper',
    title: 'Paper forms',
    problem: 'Forms get lost, handwriting gets misread, and someone re-types everything at the end of the day.',
    solution: 'Digital forms that work on any phone, tablet or computer, with photos and sign-offs that land in your system straight away.',
  },
  {
    icon: 'visibility',
    title: 'No visibility for managers',
    problem: "Getting a simple answer like \"what's overdue?\" means asking around or building a report by hand.",
    solution: "Live dashboards and one-click Excel reports showing what's open, overdue and done, by team, location or person.",
  },
  {
    icon: 'integration',
    title: "Systems that don't talk to each other",
    problem: 'The same information gets typed into three different systems, and they still never quite match.',
    solution: "Integrations that move data between your tools automatically, so it's entered once and correct everywhere.",
  },
];
