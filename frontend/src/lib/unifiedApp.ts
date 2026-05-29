import {
  Activity,
  BarChart3,
  Bell,
  Blocks,
  Bot,
  BriefcaseBusiness,
  CalendarCheck,
  ClipboardList,
  Database,
  FileText,
  Files,
  LayoutDashboard,
  PackageCheck,
  Plug,
  ShieldCheck,
  UserRound,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export type NavItem = { label: string; href: string; icon: LucideIcon };
export type FeatureDefinition = { title: string; href: string; category: string; summary: string; bullets: string[] };
export type PageDefinition = {
  title: string;
  eyebrow: string;
  subtitle: string;
  category: string;
  summary: string;
  bullets: string[];
  metrics: Array<{ label: string; value: string; note: string }>;
};
export type FeatureContext = {
  sourceOwners: string[];
  operatingQueues: string[];
  outputs: string[];
  relatedRoutes: Array<{ label: string; href: string }>;
};

const suiteSourceOwners = ["Agent policies","Tool registry","Approval logs","Evaluation runs"];

const features = [
  {
    slug: "agent-registry",
    title: "Agent Registry",
    href: "/agent-registry",
    category: "Governance",
    icon: Bot,
    summary: "Registered agents, owners, purpose, model stack, environments, and deployment status.",
    bullets: ["Agent Registry queue","AI assisted review","Audit-ready output"],
    metrics: [
      { label: "Agent Registry", value: "24", note: 'Active records' },
      { label: 'Exceptions', value: "2", note: 'Need review' },
      { label: 'Due Soon', value: "4", note: 'Next 14 days' },
    ],
  },
  {
    slug: "permission-policies",
    title: "Permission Policies",
    href: "/permission-policies",
    category: "Governance",
    icon: Workflow,
    summary: "Tool scopes, data access rules, approval thresholds, and policy exceptions.",
    bullets: ["Permission Policies queue","AI assisted review","Audit-ready output"],
    metrics: [
      { label: "Permission Policies", value: "33", note: 'Active records' },
      { label: 'Exceptions', value: "3", note: 'Need review' },
      { label: 'Due Soon', value: "5", note: 'Next 14 days' },
    ],
  },
  {
    slug: "tool-call-audit",
    title: "Tool Call Audit",
    href: "/tool-call-audit",
    category: "Audit",
    icon: Users,
    summary: "Tool calls, inputs, outputs, reviewers, timestamps, and anomaly flags.",
    bullets: ["Tool Call Audit queue","AI assisted review","Audit-ready output"],
    metrics: [
      { label: "Tool Call Audit", value: "42", note: 'Active records' },
      { label: 'Exceptions', value: "4", note: 'Need review' },
      { label: 'Due Soon', value: "6", note: 'Next 14 days' },
    ],
  },
  {
    slug: "human-approval-queue",
    title: "Human Approval Queue",
    href: "/human-approval-queue",
    category: "Controls",
    icon: CalendarCheck,
    summary: "Pending approvals, risk level, business impact, reviewer notes, and SLA status.",
    bullets: ["Human Approval Queue queue","AI assisted review","Audit-ready output"],
    metrics: [
      { label: "Human Approval Queue", value: "51", note: 'Active records' },
      { label: 'Exceptions', value: "5", note: 'Need review' },
      { label: 'Due Soon', value: "7", note: 'Next 14 days' },
    ],
  },
  {
    slug: "rollback-controls",
    title: "Rollback Controls",
    href: "/rollback-controls",
    category: "Controls",
    icon: ClipboardList,
    summary: "Kill switches, rollback plans, disabled tools, incident links, and recovery evidence.",
    bullets: ["Rollback Controls queue","AI assisted review","Audit-ready output"],
    metrics: [
      { label: "Rollback Controls", value: "60", note: 'Active records' },
      { label: 'Exceptions', value: "6", note: 'Need review' },
      { label: 'Due Soon', value: "8", note: 'Next 14 days' },
    ],
  },
  {
    slug: "agent-risk-scoring",
    title: "Agent Risk Scoring",
    href: "/agent-risk-scoring",
    category: "Risk",
    icon: FileText,
    summary: "Autonomy level, data sensitivity, tool exposure, failure history, and risk score.",
    bullets: ["Agent Risk Scoring queue","AI assisted review","Audit-ready output"],
    metrics: [
      { label: "Agent Risk Scoring", value: "69", note: 'Active records' },
      { label: 'Exceptions', value: "2", note: 'Need review' },
      { label: 'Due Soon', value: "9", note: 'Next 14 days' },
    ],
  },
  {
    slug: "eval-gates",
    title: "Eval Gates",
    href: "/eval-gates",
    category: "Quality",
    icon: BarChart3,
    summary: "Pre-release eval results, regression checks, safety thresholds, and launch decisions.",
    bullets: ["Eval Gates queue","AI assisted review","Audit-ready output"],
    metrics: [
      { label: "Eval Gates", value: "78", note: 'Active records' },
      { label: 'Exceptions', value: "3", note: 'Need review' },
      { label: 'Due Soon', value: "4", note: 'Next 14 days' },
    ],
  },
  {
    slug: "incident-review",
    title: "Incident Review",
    href: "/incident-review",
    category: "Risk",
    icon: PackageCheck,
    summary: "Agent incidents, root cause, containment actions, owner follow-up, and audit closeout.",
    bullets: ["Incident Review queue","AI assisted review","Audit-ready output"],
    metrics: [
      { label: "Incident Review", value: "87", note: 'Active records' },
      { label: 'Exceptions', value: "4", note: 'Need review' },
      { label: 'Due Soon', value: "5", note: 'Next 14 days' },
    ],
  },
  {
    slug: "compliance-evidence",
    title: "Compliance Evidence",
    href: "/compliance-evidence",
    category: "Evidence",
    icon: ShieldCheck,
    summary: "Policy mappings, screenshots, approvals, eval artifacts, and audit-ready evidence.",
    bullets: ["Compliance Evidence queue","AI assisted review","Audit-ready output"],
    metrics: [
      { label: "Compliance Evidence", value: "96", note: 'Active records' },
      { label: 'Exceptions', value: "5", note: 'Need review' },
      { label: 'Due Soon', value: "6", note: 'Next 14 days' },
    ],
  },
  {
    slug: "executive-reporting",
    title: "Executive Reporting",
    href: "/executive-reporting",
    category: "Reporting",
    icon: Activity,
    summary: "Board-ready agent risk posture, trends, exceptions, and control coverage.",
    bullets: ["Executive Reporting queue","AI assisted review","Audit-ready output"],
    metrics: [
      { label: "Executive Reporting", value: "105", note: 'Active records' },
      { label: 'Exceptions', value: "6", note: 'Need review' },
      { label: 'Due Soon', value: "7", note: 'Next 14 days' },
    ],
  },
  {
    slug: "documents",
    title: "Documents",
    href: "/documents",
    category: "Core Platform",
    icon: Files,
    summary: "Agent Governance Control Tower documents, evidence, attachments, and exports.",
    bullets: ["Documents","Controls","Audit trail"],
    metrics: [
      { label: "Documents", value: "48", note: 'Tracked' },
      { label: 'Open', value: "7", note: 'Needs review' },
      { label: 'Updated', value: "21", note: 'This week' },
    ],
  },
  {
    slug: "notifications",
    title: "Notifications",
    href: "/notifications",
    category: "Core Platform",
    icon: Bell,
    summary: "Agent Governance Control Tower alerts, reminders, exceptions, and approvals.",
    bullets: ["Notifications","Controls","Audit trail"],
    metrics: [
      { label: "Notifications", value: "65", note: 'Tracked' },
      { label: 'Open', value: "10", note: 'Needs review' },
      { label: 'Updated', value: "29", note: 'This week' },
    ],
  },
  {
    slug: "integrations",
    title: "Integrations",
    href: "/integrations",
    category: "Core Platform",
    icon: Plug,
    summary: "Agent Governance Control Tower connector health, sync status, and integration warnings.",
    bullets: ["Integrations","Controls","Audit trail"],
    metrics: [
      { label: "Integrations", value: "82", note: 'Tracked' },
      { label: 'Open', value: "13", note: 'Needs review' },
      { label: 'Updated', value: "37", note: 'This week' },
    ],
  },
  {
    slug: "profiles",
    title: "Profiles",
    href: "/profiles",
    category: "Core Platform",
    icon: UserRound,
    summary: "Agent Governance Control Tower users, roles, teams, permissions, and ownership settings.",
    bullets: ["Profiles","Controls","Audit trail"],
    metrics: [
      { label: "Profiles", value: "99", note: 'Tracked' },
      { label: 'Open', value: "16", note: 'Needs review' },
      { label: 'Updated', value: "45", note: 'This week' },
    ],
  },
] as const;

const aiFeatures = [
  {
    slug: 'ai-assistant',
    title: 'AI Assistant',
    href: '/features/ai-assistant',
    category: 'Intelligence Layer',
    icon: Bot,
    summary: "Agent Governance Control Tower assistant for triage, drafting, analysis, recommendations, and operational review.",
    bullets: ['Triage support', 'Drafting', 'Review guidance'],
    metrics: [
      { label: 'Sessions', value: '128', note: 'Last 24 hours' },
      { label: 'Drafts', value: '204', note: 'Generated' },
      { label: 'Escalations', value: '14', note: 'Expert review' },
    ],
  },
  {
    slug: 'ai-tools',
    title: 'AI Tools',
    href: '/features/ai-tools',
    category: 'Intelligence Layer',
    icon: Activity,
    summary: "Agent Governance Control Tower AI tools for scoring, generation, extraction, classification, exception review, and reporting.",
    bullets: ['Scoring', 'Classification', 'Exception review'],
    metrics: [
      { label: 'Runs', value: '318', note: 'Last 24 hours' },
      { label: 'Signals', value: '88', note: 'New alerts' },
      { label: 'Accepted', value: '117', note: 'Reviewer accepted' },
    ],
  },
] as const;

const allFeatures = [...features, ...aiFeatures];

export const primaryNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'All Features', href: '/features', icon: Blocks },
  { label: 'Documents', href: '/documents', icon: Files },
  { label: 'Source Tables', href: '/source-tables', icon: Database },
  { label: 'Profiles', href: '/profiles', icon: UserRound },
];

export const featureNav: NavItem[] = allFeatures.map((feature) => ({ label: feature.title, href: feature.href, icon: feature.icon }));
export const featureCatalog: FeatureDefinition[] = allFeatures.map((feature) => ({ title: feature.title, href: feature.href, category: feature.category, summary: feature.summary, bullets: [...feature.bullets] }));

export const featureFamilies = [
  {
    "name": "Governance",
    "features": [
      "Agent Registry",
      "Permission Policies"
    ]
  },
  {
    "name": "Audit",
    "features": [
      "Tool Call Audit"
    ]
  },
  {
    "name": "Controls",
    "features": [
      "Human Approval Queue",
      "Rollback Controls"
    ]
  },
  {
    "name": "Risk",
    "features": [
      "Agent Risk Scoring",
      "Incident Review"
    ]
  },
  {
    "name": "Quality",
    "features": [
      "Eval Gates"
    ]
  },
  {
    "name": "Evidence",
    "features": [
      "Compliance Evidence"
    ]
  },
  {
    "name": "Reporting",
    "features": [
      "Executive Reporting"
    ]
  },
  {
    "name": "Core Platform",
    "features": [
      "Documents",
      "Notifications",
      "Integrations",
      "Profiles"
    ]
  },
  {
    "name": "Intelligence Layer",
    "features": [
      "AI Assistant",
      "AI Tools"
    ]
  }
];

function toPage(feature: (typeof allFeatures)[number]): PageDefinition {
  return {
    title: feature.title,
    eyebrow: feature.category,
    subtitle: feature.summary,
    category: feature.category,
    summary: feature.title + ' is implemented as a dedicated Agent Governance Control Tower workflow with records, AI assistance, approvals, audit, and reporting.',
    bullets: [...feature.bullets],
    metrics: [...feature.metrics],
  };
}

export const pageRegistry: Record<string, PageDefinition> = Object.fromEntries(features.map((feature) => [feature.slug, toPage(feature)]));
export const aiFeatureRegistry: Record<string, PageDefinition> = Object.fromEntries(aiFeatures.map((feature) => [feature.slug, toPage(feature)]));
export const featureContexts: Record<string, FeatureContext> = Object.fromEntries(
  allFeatures.map((feature) => [
    feature.title,
    {
      sourceOwners: suiteSourceOwners,
      operatingQueues: [feature.title + ' records', feature.title + ' approvals', feature.title + ' exceptions'],
      outputs: [feature.title + ' dashboard', feature.title + ' export', feature.title + ' audit trail'],
      relatedRoutes: [{ label: 'Dashboard', href: '/dashboard' }, { label: 'All Features', href: '/features' }, { label: 'AI Tools', href: '/features/ai-tools' }],
    },
  ]),
);
