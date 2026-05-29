export type EntityRecord = { id: string; name: string; status: string; owner: string; amount?: string; dueDate?: string; priority?: string };
export type FeatureEntitySet = { title: string; columns: string[]; rows: EntityRecord[] };
const COLUMNS = ['Name', 'Status', 'Owner', 'Amount', 'Due Date', 'Priority'];
const entitySeeds = [
  [
    "agent-registry",
    "Agent Registry Records",
    "Agent Registry priority queue",
    "Open",
    "Agent Registry exception list",
    "Governance Lead",
    "$0"
  ],
  [
    "permission-policies",
    "Permission Policies Records",
    "Permission Policies priority queue",
    "Review",
    "Permission Policies exception list",
    "Governance Lead",
    "$0"
  ],
  [
    "tool-call-audit",
    "Tool Call Audit Records",
    "Tool Call Audit priority queue",
    "Action needed",
    "Tool Call Audit exception list",
    "Audit Lead",
    "$0"
  ],
  [
    "human-approval-queue",
    "Human Approval Queue Records",
    "Human Approval Queue priority queue",
    "Open",
    "Human Approval Queue exception list",
    "Controls Lead",
    "$0"
  ],
  [
    "rollback-controls",
    "Rollback Controls Records",
    "Rollback Controls priority queue",
    "Review",
    "Rollback Controls exception list",
    "Controls Lead",
    "$0"
  ],
  [
    "agent-risk-scoring",
    "Agent Risk Scoring Records",
    "Agent Risk Scoring priority queue",
    "Action needed",
    "Agent Risk Scoring exception list",
    "Risk Lead",
    "$0"
  ],
  [
    "eval-gates",
    "Eval Gates Records",
    "Eval Gates priority queue",
    "Open",
    "Eval Gates exception list",
    "Quality Lead",
    "$0"
  ],
  [
    "incident-review",
    "Incident Review Records",
    "Incident Review priority queue",
    "Review",
    "Incident Review exception list",
    "Risk Lead",
    "$0"
  ],
  [
    "compliance-evidence",
    "Compliance Evidence Records",
    "Compliance Evidence priority queue",
    "Action needed",
    "Compliance Evidence exception list",
    "Evidence Lead",
    "$0"
  ],
  [
    "executive-reporting",
    "Executive Reporting Records",
    "Executive Reporting priority queue",
    "Open",
    "Executive Reporting exception list",
    "Reporting Lead",
    "$0"
  ],
  [
    "documents",
    "Documents Records",
    "Documents priority queue",
    "Review",
    "Documents exception list",
    "Core Platform Lead",
    "$0"
  ],
  [
    "notifications",
    "Notifications Records",
    "Notifications priority queue",
    "Action needed",
    "Notifications exception list",
    "Core Platform Lead",
    "$0"
  ],
  [
    "integrations",
    "Integrations Records",
    "Integrations priority queue",
    "Open",
    "Integrations exception list",
    "Core Platform Lead",
    "$0"
  ],
  [
    "profiles",
    "Profiles Records",
    "Profiles priority queue",
    "Review",
    "Profiles exception list",
    "Core Platform Lead",
    "$0"
  ],
  [
    "ai-assistant",
    "AI Assistant Records",
    "AI Assistant priority queue",
    "Action needed",
    "AI Assistant exception list",
    "Intelligence Layer Lead",
    "$0"
  ],
  [
    "ai-tools",
    "AI Tools Records",
    "AI Tools priority queue",
    "Open",
    "AI Tools exception list",
    "Intelligence Layer Lead",
    "$0"
  ]
] as const;

function buildSet(slug: string, title: string, firstName: string, firstStatus: string, secondName: string, owner: string, amount: string): FeatureEntitySet {
  return {
    title,
    columns: COLUMNS,
    rows: [
      { id: `${slug}-1`, name: firstName, status: firstStatus, owner, amount, dueDate: '2026-06-03', priority: 'High' },
      { id: `${slug}-2`, name: secondName, status: 'Review', owner: 'Operations', amount, dueDate: '2026-06-06', priority: 'Medium' },
      { id: `${slug}-3`, name: `${title.replace(' Records', '')} audit queue`, status: 'Queued', owner: 'Team Lead', amount: '$0', dueDate: '2026-06-10', priority: 'Medium' },
    ],
  };
}

export const featureEntitiesBySlug: Record<string, FeatureEntitySet> = Object.fromEntries(entitySeeds.map(([slug, title, firstName, firstStatus, secondName, owner, amount]) => [slug, buildSet(slug, title, firstName, firstStatus, secondName, owner, amount)]));
