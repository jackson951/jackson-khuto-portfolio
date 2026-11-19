/**
 * Case studies shown on the homepage.
 *
 * To add one, append an object to `caseStudies`. Write `problem`, `built` and `outcome`
 * in business language; keep the tech for `stack`.
 *
 * Placeholders: anything in [square brackets] is a placeholder. In development it shows
 * as a highlighted "fill me in" box; in production builds an outcome that still contains
 * a placeholder is hidden, so unfinished text never goes live.
 */

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
  status?: string;
  problem: string;
  built: string[];
  outcome: string;
  /** Screenshot or short demo video. Until one is added, `steps` is shown instead. */
  media?: CaseStudyMedia;
  /** The process the software runs, in plain words. Used as the visual when there is no media. */
  steps: string[];
  stack: string[];
  note?: string;
  link?: { label: string; href: string; external?: boolean };
}

export const isPlaceholder = (text: string) => /\[[^\]]+\]/.test(text);

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
      'Admins manage users and pull reports without touching a spreadsheet',
      'Secure login with roles, so people only see what they should',
    ],
    // TODO(Jackson): replace with a real result, even a rough one.
    outcome: '[Outcome, e.g. "leave approvals went from 3 days to same-day"]',
    // TODO(Jackson): add a screenshot, e.g. { kind: 'image', src: '/case-studies/flexileave.webp', alt: '...' }
    steps: ['Employee requests leave', 'Manager approves', 'Balance updates', 'Reports ready'],
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT'],
    link: { label: 'Read the full case study', href: '/projects/flexileave-app' },
  },
  {
    id: 'approval-platform',
    title: 'Enterprise approval workflow platform',
    category: 'Requests & approvals',
    status: 'Work project',
    problem:
      "In a large organisation, requests that need sign-off bounce between inboxes. Approvers chase each other, requesters can't see progress, and there's no clean record of who approved what.",
    built: [
      'Request forms that capture the right information the first time',
      'Multi-step approval routing with live status for everyone involved',
      'Company single sign-on (Microsoft Entra ID) and role-based permissions',
      'Dashboards, Excel exports and an audit log for managers',
    ],
    // TODO(Jackson): replace with a real result.
    outcome: '[Outcome, e.g. "requests approved in X hours instead of Y days"]',
    steps: ['Request submitted', 'Routed for approval', 'Approved & logged', 'Visible on dashboard'],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Microsoft Entra ID', 'REST APIs'],
    note: 'Described in general terms to respect confidentiality.',
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
    link: { label: 'Read the full case study', href: '/projects/flowforge' },
  },
];
