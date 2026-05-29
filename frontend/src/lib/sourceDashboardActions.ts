export type SourceDashboardAction = {
  id: string;
  label: string;
  description: string;
  href: string;
  sourceProjects: string[];
  examples: string[];
  count: number;
};

export const sourceDashboardActions: SourceDashboardAction[] = [
  {
    "id": "agent-registry",
    "label": "Agent Registry",
    "description": "Agent Registry action group for Agent Governance Control Tower.",
    "href": "/agent-registry",
    "sourceProjects": [
      "Agent policies",
      "Tool registry"
    ],
    "examples": [
      "Open Agent Registry",
      "Review Governance",
      "Run Agent Registry AI check"
    ],
    "count": 3
  },
  {
    "id": "permission-policies",
    "label": "Permission Policies",
    "description": "Permission Policies action group for Agent Governance Control Tower.",
    "href": "/permission-policies",
    "sourceProjects": [
      "Tool registry",
      "Approval logs"
    ],
    "examples": [
      "Open Permission Policies",
      "Review Governance",
      "Run Permission Policies AI check"
    ],
    "count": 3
  },
  {
    "id": "tool-call-audit",
    "label": "Tool Call Audit",
    "description": "Tool Call Audit action group for Agent Governance Control Tower.",
    "href": "/tool-call-audit",
    "sourceProjects": [
      "Approval logs",
      "Evaluation runs"
    ],
    "examples": [
      "Open Tool Call Audit",
      "Review Audit",
      "Run Tool Call Audit AI check"
    ],
    "count": 3
  },
  {
    "id": "human-approval-queue",
    "label": "Human Approval Queue",
    "description": "Human Approval Queue action group for Agent Governance Control Tower.",
    "href": "/human-approval-queue",
    "sourceProjects": [
      "Evaluation runs"
    ],
    "examples": [
      "Open Human Approval Queue",
      "Review Controls",
      "Run Human Approval Queue AI check"
    ],
    "count": 3
  },
  {
    "id": "rollback-controls",
    "label": "Rollback Controls",
    "description": "Rollback Controls action group for Agent Governance Control Tower.",
    "href": "/rollback-controls",
    "sourceProjects": [
      "Agent policies",
      "Tool registry"
    ],
    "examples": [
      "Open Rollback Controls",
      "Review Controls",
      "Run Rollback Controls AI check"
    ],
    "count": 3
  },
  {
    "id": "agent-risk-scoring",
    "label": "Agent Risk Scoring",
    "description": "Agent Risk Scoring action group for Agent Governance Control Tower.",
    "href": "/agent-risk-scoring",
    "sourceProjects": [
      "Tool registry",
      "Approval logs"
    ],
    "examples": [
      "Open Agent Risk Scoring",
      "Review Risk",
      "Run Agent Risk Scoring AI check"
    ],
    "count": 3
  },
  {
    "id": "eval-gates",
    "label": "Eval Gates",
    "description": "Eval Gates action group for Agent Governance Control Tower.",
    "href": "/eval-gates",
    "sourceProjects": [
      "Approval logs",
      "Evaluation runs"
    ],
    "examples": [
      "Open Eval Gates",
      "Review Quality",
      "Run Eval Gates AI check"
    ],
    "count": 3
  },
  {
    "id": "incident-review",
    "label": "Incident Review",
    "description": "Incident Review action group for Agent Governance Control Tower.",
    "href": "/incident-review",
    "sourceProjects": [
      "Evaluation runs"
    ],
    "examples": [
      "Open Incident Review",
      "Review Risk",
      "Run Incident Review AI check"
    ],
    "count": 3
  },
  {
    "id": "compliance-evidence",
    "label": "Compliance Evidence",
    "description": "Compliance Evidence action group for Agent Governance Control Tower.",
    "href": "/compliance-evidence",
    "sourceProjects": [
      "Agent policies",
      "Tool registry"
    ],
    "examples": [
      "Open Compliance Evidence",
      "Review Evidence",
      "Run Compliance Evidence AI check"
    ],
    "count": 3
  },
  {
    "id": "executive-reporting",
    "label": "Executive Reporting",
    "description": "Executive Reporting action group for Agent Governance Control Tower.",
    "href": "/executive-reporting",
    "sourceProjects": [
      "Tool registry",
      "Approval logs"
    ],
    "examples": [
      "Open Executive Reporting",
      "Review Reporting",
      "Run Executive Reporting AI check"
    ],
    "count": 3
  }
];
