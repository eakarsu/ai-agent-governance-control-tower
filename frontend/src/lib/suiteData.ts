export type Metric = { label: string; value: string; note: string };
export const sourceSystems = [
  {
    "name": "Agent policies",
    "ownership": "Agent policies contributes operating evidence, workflows, control signals, and reporting inputs to Agent Governance Control Tower.",
    "coverage": [
      "Agent Registry",
      "Permission Policies",
      "AI tools",
      "Audit evidence"
    ]
  },
  {
    "name": "Tool registry",
    "ownership": "Tool registry contributes operating evidence, workflows, control signals, and reporting inputs to Agent Governance Control Tower.",
    "coverage": [
      "Permission Policies",
      "Tool Call Audit",
      "AI tools",
      "Audit evidence"
    ]
  },
  {
    "name": "Approval logs",
    "ownership": "Approval logs contributes operating evidence, workflows, control signals, and reporting inputs to Agent Governance Control Tower.",
    "coverage": [
      "Tool Call Audit",
      "Human Approval Queue",
      "AI tools",
      "Audit evidence"
    ]
  },
  {
    "name": "Evaluation runs",
    "ownership": "Evaluation runs contributes operating evidence, workflows, control signals, and reporting inputs to Agent Governance Control Tower.",
    "coverage": [
      "Human Approval Queue",
      "Rollback Controls",
      "AI tools",
      "Audit evidence"
    ]
  }
];

export const dashboardMetrics: Metric[] = [
  { label: 'Workflow Areas', value: '10', note: 'Dedicated modules' },
  { label: 'Evidence Sources', value: '4', note: 'Mapped sources' },
  { label: 'AI Tools', value: '13', note: 'Suite copilots' },
  { label: 'Open Work', value: '64', note: 'Across workflows' },
];

export const healthMetrics: Metric[] = [
  { label: 'Connector Health', value: '96%', note: 'Pilot baseline' },
  { label: 'Audit Coverage', value: '100%', note: 'All workflows logged' },
  { label: 'Review Queue', value: '22', note: 'Needs owner action' },
  { label: 'Automation Runs', value: '340', note: 'Last 24 hours' },
];

export const dashboardModules = [
  "Agent Registry operating view",
  "Permission Policies operating view",
  "Tool Call Audit operating view",
  "Human Approval Queue operating view",
  "Rollback Controls operating view",
  "Agent Risk Scoring operating view",
  "Eval Gates operating view",
  "Incident Review operating view"
];
export const workflowHighlights = [
  "Agent Registry workflow with records, AI assist, approvals, audit, and reporting",
  "Permission Policies workflow with records, AI assist, approvals, audit, and reporting",
  "Tool Call Audit workflow with records, AI assist, approvals, audit, and reporting",
  "Human Approval Queue workflow with records, AI assist, approvals, audit, and reporting",
  "Rollback Controls workflow with records, AI assist, approvals, audit, and reporting",
  "Agent Risk Scoring workflow with records, AI assist, approvals, audit, and reporting"
];
