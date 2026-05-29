export const sourceProjectTools = [
  {
    "id": "agent-registry-copilot",
    "title": "Agent Registry Copilot",
    "category": "Governance",
    "description": "Registered agents, owners, purpose, model stack, environments, and deployment status.",
    "defaultPrompt": "Analyze Agent Registry for Agent Governance Control Tower. Return summary, risks, missing evidence, next actions, and owner follow-up.",
    "inputLabel": "Agent Registry context",
    "outputLabel": "Agent Registry AI response",
    "signals": [
      "Agent Registry",
      "Governance",
      "Agent Governance Control Tower"
    ]
  },
  {
    "id": "permission-policies-copilot",
    "title": "Permission Policies Copilot",
    "category": "Governance",
    "description": "Tool scopes, data access rules, approval thresholds, and policy exceptions.",
    "defaultPrompt": "Analyze Permission Policies for Agent Governance Control Tower. Return summary, risks, missing evidence, next actions, and owner follow-up.",
    "inputLabel": "Permission Policies context",
    "outputLabel": "Permission Policies AI response",
    "signals": [
      "Permission Policies",
      "Governance",
      "Agent Governance Control Tower"
    ]
  },
  {
    "id": "tool-call-audit-copilot",
    "title": "Tool Call Audit Copilot",
    "category": "Audit",
    "description": "Tool calls, inputs, outputs, reviewers, timestamps, and anomaly flags.",
    "defaultPrompt": "Analyze Tool Call Audit for Agent Governance Control Tower. Return summary, risks, missing evidence, next actions, and owner follow-up.",
    "inputLabel": "Tool Call Audit context",
    "outputLabel": "Tool Call Audit AI response",
    "signals": [
      "Tool Call Audit",
      "Audit",
      "Agent Governance Control Tower"
    ]
  },
  {
    "id": "human-approval-queue-copilot",
    "title": "Human Approval Queue Copilot",
    "category": "Controls",
    "description": "Pending approvals, risk level, business impact, reviewer notes, and SLA status.",
    "defaultPrompt": "Analyze Human Approval Queue for Agent Governance Control Tower. Return summary, risks, missing evidence, next actions, and owner follow-up.",
    "inputLabel": "Human Approval Queue context",
    "outputLabel": "Human Approval Queue AI response",
    "signals": [
      "Human Approval Queue",
      "Controls",
      "Agent Governance Control Tower"
    ]
  },
  {
    "id": "rollback-controls-copilot",
    "title": "Rollback Controls Copilot",
    "category": "Controls",
    "description": "Kill switches, rollback plans, disabled tools, incident links, and recovery evidence.",
    "defaultPrompt": "Analyze Rollback Controls for Agent Governance Control Tower. Return summary, risks, missing evidence, next actions, and owner follow-up.",
    "inputLabel": "Rollback Controls context",
    "outputLabel": "Rollback Controls AI response",
    "signals": [
      "Rollback Controls",
      "Controls",
      "Agent Governance Control Tower"
    ]
  },
  {
    "id": "agent-risk-scoring-copilot",
    "title": "Agent Risk Scoring Copilot",
    "category": "Risk",
    "description": "Autonomy level, data sensitivity, tool exposure, failure history, and risk score.",
    "defaultPrompt": "Analyze Agent Risk Scoring for Agent Governance Control Tower. Return summary, risks, missing evidence, next actions, and owner follow-up.",
    "inputLabel": "Agent Risk Scoring context",
    "outputLabel": "Agent Risk Scoring AI response",
    "signals": [
      "Agent Risk Scoring",
      "Risk",
      "Agent Governance Control Tower"
    ]
  },
  {
    "id": "eval-gates-copilot",
    "title": "Eval Gates Copilot",
    "category": "Quality",
    "description": "Pre-release eval results, regression checks, safety thresholds, and launch decisions.",
    "defaultPrompt": "Analyze Eval Gates for Agent Governance Control Tower. Return summary, risks, missing evidence, next actions, and owner follow-up.",
    "inputLabel": "Eval Gates context",
    "outputLabel": "Eval Gates AI response",
    "signals": [
      "Eval Gates",
      "Quality",
      "Agent Governance Control Tower"
    ]
  },
  {
    "id": "incident-review-copilot",
    "title": "Incident Review Copilot",
    "category": "Risk",
    "description": "Agent incidents, root cause, containment actions, owner follow-up, and audit closeout.",
    "defaultPrompt": "Analyze Incident Review for Agent Governance Control Tower. Return summary, risks, missing evidence, next actions, and owner follow-up.",
    "inputLabel": "Incident Review context",
    "outputLabel": "Incident Review AI response",
    "signals": [
      "Incident Review",
      "Risk",
      "Agent Governance Control Tower"
    ]
  },
  {
    "id": "compliance-evidence-copilot",
    "title": "Compliance Evidence Copilot",
    "category": "Evidence",
    "description": "Policy mappings, screenshots, approvals, eval artifacts, and audit-ready evidence.",
    "defaultPrompt": "Analyze Compliance Evidence for Agent Governance Control Tower. Return summary, risks, missing evidence, next actions, and owner follow-up.",
    "inputLabel": "Compliance Evidence context",
    "outputLabel": "Compliance Evidence AI response",
    "signals": [
      "Compliance Evidence",
      "Evidence",
      "Agent Governance Control Tower"
    ]
  },
  {
    "id": "executive-reporting-copilot",
    "title": "Executive Reporting Copilot",
    "category": "Reporting",
    "description": "Board-ready agent risk posture, trends, exceptions, and control coverage.",
    "defaultPrompt": "Analyze Executive Reporting for Agent Governance Control Tower. Return summary, risks, missing evidence, next actions, and owner follow-up.",
    "inputLabel": "Executive Reporting context",
    "outputLabel": "Executive Reporting AI response",
    "signals": [
      "Executive Reporting",
      "Reporting",
      "Agent Governance Control Tower"
    ]
  }
];
