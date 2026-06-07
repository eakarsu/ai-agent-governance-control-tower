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

const supplementalFeatures = [
  {
    slug: "agent-policy-registry",
    title: "Agent Policy Registry",
    href: "/agent-policy-registry",
    category: "Governance",
    icon: ShieldCheck,
    summary: "Agent Policy Registry workspace for approval routing, policy controls, ownership, exceptions, audit evidence, and management signoff in AI Agent Governance Control Tower.",
    bullets: ["Agent Policy Registry queue","Subfeature work items","Audit-ready output"],
    metrics: [
      { label: "Agent Policy Registry", value: "90", note: 'Active records' },
      { label: 'Exceptions', value: "3", note: 'Need review' },
      { label: 'Due Soon', value: "5", note: 'Next 14 days' },
    ],
  },
  {
    slug: "deployment-approval-board",
    title: "Deployment Approval Board",
    href: "/deployment-approval-board",
    category: "Governance",
    icon: Workflow,
    summary: "Deployment Approval Board workspace for approval routing, policy controls, ownership, exceptions, audit evidence, and management signoff in AI Agent Governance Control Tower.",
    bullets: ["Deployment Approval Board queue","Subfeature work items","Audit-ready output"],
    metrics: [
      { label: "Deployment Approval Board", value: "99", note: 'Active records' },
      { label: 'Exceptions', value: "4", note: 'Need review' },
      { label: 'Due Soon', value: "6", note: 'Next 14 days' },
    ],
  },
  {
    slug: "tool-risk-matrix",
    title: "Tool Risk Matrix",
    href: "/tool-risk-matrix",
    category: "Risk",
    icon: BarChart3,
    summary: "Tool Risk Matrix workspace for risk scoring, exception review, mitigation tracking, escalation ownership, and trend analytics in AI Agent Governance Control Tower.",
    bullets: ["Tool Risk Matrix queue","Subfeature work items","Audit-ready output"],
    metrics: [
      { label: "Tool Risk Matrix", value: "108", note: 'Active records' },
      { label: 'Exceptions', value: "5", note: 'Need review' },
      { label: 'Due Soon', value: "7", note: 'Next 14 days' },
    ],
  },
  {
    slug: "human-override-console",
    title: "Human Override Console",
    href: "/human-override-console",
    category: "Operations",
    icon: ClipboardList,
    summary: "Human Override Console workspace for intake queues, assignments, SLA tracking, exception handling, stakeholder updates, and closeout evidence in AI Agent Governance Control Tower.",
    bullets: ["Human Override Console queue","Subfeature work items","Audit-ready output"],
    metrics: [
      { label: "Human Override Console", value: "117", note: 'Active records' },
      { label: 'Exceptions', value: "6", note: 'Need review' },
      { label: 'Due Soon', value: "8", note: 'Next 14 days' },
    ],
  },
  {
    slug: "agent-audit-evidence",
    title: "Agent Audit Evidence",
    href: "/agent-audit-evidence",
    category: "Compliance",
    icon: CalendarCheck,
    summary: "Agent Audit Evidence workspace for regulatory obligations, control checks, evidence packets, deadlines, and audit-ready exports in AI Agent Governance Control Tower.",
    bullets: ["Agent Audit Evidence queue","Subfeature work items","Audit-ready output"],
    metrics: [
      { label: "Agent Audit Evidence", value: "126", note: 'Active records' },
      { label: 'Exceptions', value: "7", note: 'Need review' },
      { label: 'Due Soon', value: "9", note: 'Next 14 days' },
    ],
  },
  {
    slug: "exception-waivers",
    title: "Exception Waivers",
    href: "/exception-waivers",
    category: "Governance",
    icon: PackageCheck,
    summary: "Exception Waivers workspace for approval routing, policy controls, ownership, exceptions, audit evidence, and management signoff in AI Agent Governance Control Tower.",
    bullets: ["Exception Waivers queue","Subfeature work items","Audit-ready output"],
    metrics: [
      { label: "Exception Waivers", value: "135", note: 'Active records' },
      { label: 'Exceptions', value: "3", note: 'Need review' },
      { label: 'Due Soon', value: "10", note: 'Next 14 days' },
    ],
  },
  {
    slug: "kill-switch-readiness",
    title: "Kill Switch Readiness",
    href: "/kill-switch-readiness",
    category: "Reliability",
    icon: Activity,
    summary: "Kill Switch Readiness workspace for reliability signals, incident review, root cause, corrective actions, and operational readiness in AI Agent Governance Control Tower.",
    bullets: ["Kill Switch Readiness queue","Subfeature work items","Audit-ready output"],
    metrics: [
      { label: "Kill Switch Readiness", value: "144", note: 'Active records' },
      { label: 'Exceptions', value: "4", note: 'Need review' },
      { label: 'Due Soon', value: "11", note: 'Next 14 days' },
    ],
  }
] as const;

const productionPlatformFeatures = [
  {
    slug: "enterprise-identity-access",
    title: "Enterprise Identity & Access",
    href: "/enterprise-identity-access",
    category: "Production Platform",
    icon: ShieldCheck,
    summary: "Enterprise Identity & Access workspace for domain workflows, approvals, evidence, and reporting in AI Agent Governance Control Tower.",
    bullets: ["Production controls","Evidence tracking","Launch readiness"],
    metrics: [
      { label: "Enterprise Identity & Access", value: "90", note: 'Active records' },
      { label: 'Exceptions', value: "3", note: 'Need review' },
      { label: 'Due Soon', value: "5", note: 'Next 14 days' },
    ],
  },
  {
    slug: "connector-operations-center",
    title: "Connector Operations Center",
    href: "/connector-operations-center",
    category: "Production Platform",
    icon: Workflow,
    summary: "Connector Operations Center workspace for domain workflows, approvals, evidence, and reporting in AI Agent Governance Control Tower.",
    bullets: ["Production controls","Evidence tracking","Launch readiness"],
    metrics: [
      { label: "Connector Operations Center", value: "99", note: 'Active records' },
      { label: 'Exceptions', value: "4", note: 'Need review' },
      { label: 'Due Soon', value: "6", note: 'Next 14 days' },
    ],
  },
  {
    slug: "audit-export-center",
    title: "Audit Export Center",
    href: "/audit-export-center",
    category: "Production Platform",
    icon: BarChart3,
    summary: "Audit Export Center workspace for domain workflows, approvals, evidence, and reporting in AI Agent Governance Control Tower.",
    bullets: ["Production controls","Evidence tracking","Launch readiness"],
    metrics: [
      { label: "Audit Export Center", value: "108", note: 'Active records' },
      { label: 'Exceptions', value: "5", note: 'Need review' },
      { label: 'Due Soon', value: "7", note: 'Next 14 days' },
    ],
  },
  {
    slug: "notification-delivery-ledger",
    title: "Notification Delivery Ledger",
    href: "/notification-delivery-ledger",
    category: "Production Platform",
    icon: ClipboardList,
    summary: "Notification Delivery Ledger workspace for domain workflows, approvals, evidence, and reporting in AI Agent Governance Control Tower.",
    bullets: ["Production controls","Evidence tracking","Launch readiness"],
    metrics: [
      { label: "Notification Delivery Ledger", value: "117", note: 'Active records' },
      { label: 'Exceptions', value: "6", note: 'Need review' },
      { label: 'Due Soon', value: "8", note: 'Next 14 days' },
    ],
  },
  {
    slug: "observability-runbooks",
    title: "Observability & Runbooks",
    href: "/observability-runbooks",
    category: "Production Platform",
    icon: CalendarCheck,
    summary: "Observability & Runbooks workspace for domain workflows, approvals, evidence, and reporting in AI Agent Governance Control Tower.",
    bullets: ["Production controls","Evidence tracking","Launch readiness"],
    metrics: [
      { label: "Observability & Runbooks", value: "126", note: 'Active records' },
      { label: 'Exceptions', value: "7", note: 'Need review' },
      { label: 'Due Soon', value: "9", note: 'Next 14 days' },
    ],
  },
  {
    slug: "release-test-harness",
    title: "Release Test Harness",
    href: "/release-test-harness",
    category: "Production Platform",
    icon: PackageCheck,
    summary: "Release Test Harness workspace for domain workflows, approvals, evidence, and reporting in AI Agent Governance Control Tower.",
    bullets: ["Production controls","Evidence tracking","Launch readiness"],
    metrics: [
      { label: "Release Test Harness", value: "135", note: 'Active records' },
      { label: 'Exceptions', value: "3", note: 'Need review' },
      { label: 'Due Soon', value: "10", note: 'Next 14 days' },
    ],
  },
  {
    slug: "production-gap-workspace",
    title: "Production Gap Workspace",
    href: "/production-gap-workspace",
    category: "Production Platform",
    icon: Activity,
    summary: "Production Gap Workspace workspace for domain workflows, approvals, evidence, and reporting in AI Agent Governance Control Tower.",
    bullets: ["Production controls","Evidence tracking","Launch readiness"],
    metrics: [
      { label: "Production Gap Workspace", value: "144", note: 'Active records' },
      { label: 'Exceptions', value: "4", note: 'Need review' },
      { label: 'Due Soon', value: "11", note: 'Next 14 days' },
    ],
  }
] as const;

const allFeatures = [...features, ...supplementalFeatures, ...productionPlatformFeatures, ...aiFeatures];

export const primaryNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'All Features', href: '/features', icon: Blocks },
  { label: 'Production Readiness', href: '/production-readiness', icon: ShieldCheck },
  { label: 'Documents', href: '/documents', icon: Files },
  { label: 'Source Tables', href: '/source-tables', icon: Database },
  { label: 'Profiles', href: '/profiles', icon: UserRound },
];

export const featureNav: NavItem[] = allFeatures.map((feature) => ({ label: feature.title, href: feature.href, icon: feature.icon }));
export const featureCatalog: FeatureDefinition[] = allFeatures.map((feature) => ({ title: feature.title, href: feature.href, category: feature.category, summary: feature.summary, bullets: [...feature.bullets] }));

export const featureFamilies = [
  { name: 'Production Platform Controls', features: ['Enterprise Identity & Access', 'Connector Operations Center', 'Audit Export Center', 'Notification Delivery Ledger', 'Observability & Runbooks', 'Release Test Harness', 'Production Gap Workspace'] },
  { name: "Agent Governance Controls", features: ["Agent Policy Registry","Deployment Approval Board","Tool Risk Matrix","Human Override Console","Agent Audit Evidence","Exception Waivers","Kill Switch Readiness"] },
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

export const pageRegistry: Record<string, PageDefinition> = Object.fromEntries([...features, ...supplementalFeatures, ...productionPlatformFeatures].map((feature) => [feature.slug, toPage(feature)]));
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
