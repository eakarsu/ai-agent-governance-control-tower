export type SourceAIToolField = {
  name: string;
  label: string;
  type: string;
  defaultValue: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  source: string;
};

export const sourceAIToolFieldsByToolId: Record<string, SourceAIToolField[]> = {
  "agent-registry-copilot": [
    {
      "name": "objective",
      "label": "Objective",
      "type": "textarea",
      "defaultValue": "Improve Agent Registry and produce an audit-ready action plan.",
      "placeholder": "Describe the decision or workflow goal",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "source_context",
      "label": "Source Context",
      "type": "textarea",
      "defaultValue": "Paste records, notes, documents, metrics, or evidence for Agent Registry.",
      "placeholder": "Paste source context",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "output_format",
      "label": "Output Format",
      "type": "select",
      "defaultValue": "Action plan",
      "placeholder": "Select output format",
      "options": [
        "Action plan",
        "Executive summary",
        "Evidence table",
        "Checklist"
      ],
      "required": true,
      "source": "Agent Governance Control Tower"
    }
  ],
  "permission-policies-copilot": [
    {
      "name": "objective",
      "label": "Objective",
      "type": "textarea",
      "defaultValue": "Improve Permission Policies and produce an audit-ready action plan.",
      "placeholder": "Describe the decision or workflow goal",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "source_context",
      "label": "Source Context",
      "type": "textarea",
      "defaultValue": "Paste records, notes, documents, metrics, or evidence for Permission Policies.",
      "placeholder": "Paste source context",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "output_format",
      "label": "Output Format",
      "type": "select",
      "defaultValue": "Action plan",
      "placeholder": "Select output format",
      "options": [
        "Action plan",
        "Executive summary",
        "Evidence table",
        "Checklist"
      ],
      "required": true,
      "source": "Agent Governance Control Tower"
    }
  ],
  "tool-call-audit-copilot": [
    {
      "name": "objective",
      "label": "Objective",
      "type": "textarea",
      "defaultValue": "Improve Tool Call Audit and produce an audit-ready action plan.",
      "placeholder": "Describe the decision or workflow goal",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "source_context",
      "label": "Source Context",
      "type": "textarea",
      "defaultValue": "Paste records, notes, documents, metrics, or evidence for Tool Call Audit.",
      "placeholder": "Paste source context",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "output_format",
      "label": "Output Format",
      "type": "select",
      "defaultValue": "Action plan",
      "placeholder": "Select output format",
      "options": [
        "Action plan",
        "Executive summary",
        "Evidence table",
        "Checklist"
      ],
      "required": true,
      "source": "Agent Governance Control Tower"
    }
  ],
  "human-approval-queue-copilot": [
    {
      "name": "objective",
      "label": "Objective",
      "type": "textarea",
      "defaultValue": "Improve Human Approval Queue and produce an audit-ready action plan.",
      "placeholder": "Describe the decision or workflow goal",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "source_context",
      "label": "Source Context",
      "type": "textarea",
      "defaultValue": "Paste records, notes, documents, metrics, or evidence for Human Approval Queue.",
      "placeholder": "Paste source context",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "output_format",
      "label": "Output Format",
      "type": "select",
      "defaultValue": "Action plan",
      "placeholder": "Select output format",
      "options": [
        "Action plan",
        "Executive summary",
        "Evidence table",
        "Checklist"
      ],
      "required": true,
      "source": "Agent Governance Control Tower"
    }
  ],
  "rollback-controls-copilot": [
    {
      "name": "objective",
      "label": "Objective",
      "type": "textarea",
      "defaultValue": "Improve Rollback Controls and produce an audit-ready action plan.",
      "placeholder": "Describe the decision or workflow goal",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "source_context",
      "label": "Source Context",
      "type": "textarea",
      "defaultValue": "Paste records, notes, documents, metrics, or evidence for Rollback Controls.",
      "placeholder": "Paste source context",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "output_format",
      "label": "Output Format",
      "type": "select",
      "defaultValue": "Action plan",
      "placeholder": "Select output format",
      "options": [
        "Action plan",
        "Executive summary",
        "Evidence table",
        "Checklist"
      ],
      "required": true,
      "source": "Agent Governance Control Tower"
    }
  ],
  "agent-risk-scoring-copilot": [
    {
      "name": "objective",
      "label": "Objective",
      "type": "textarea",
      "defaultValue": "Improve Agent Risk Scoring and produce an audit-ready action plan.",
      "placeholder": "Describe the decision or workflow goal",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "source_context",
      "label": "Source Context",
      "type": "textarea",
      "defaultValue": "Paste records, notes, documents, metrics, or evidence for Agent Risk Scoring.",
      "placeholder": "Paste source context",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "output_format",
      "label": "Output Format",
      "type": "select",
      "defaultValue": "Action plan",
      "placeholder": "Select output format",
      "options": [
        "Action plan",
        "Executive summary",
        "Evidence table",
        "Checklist"
      ],
      "required": true,
      "source": "Agent Governance Control Tower"
    }
  ],
  "eval-gates-copilot": [
    {
      "name": "objective",
      "label": "Objective",
      "type": "textarea",
      "defaultValue": "Improve Eval Gates and produce an audit-ready action plan.",
      "placeholder": "Describe the decision or workflow goal",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "source_context",
      "label": "Source Context",
      "type": "textarea",
      "defaultValue": "Paste records, notes, documents, metrics, or evidence for Eval Gates.",
      "placeholder": "Paste source context",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "output_format",
      "label": "Output Format",
      "type": "select",
      "defaultValue": "Action plan",
      "placeholder": "Select output format",
      "options": [
        "Action plan",
        "Executive summary",
        "Evidence table",
        "Checklist"
      ],
      "required": true,
      "source": "Agent Governance Control Tower"
    }
  ],
  "incident-review-copilot": [
    {
      "name": "objective",
      "label": "Objective",
      "type": "textarea",
      "defaultValue": "Improve Incident Review and produce an audit-ready action plan.",
      "placeholder": "Describe the decision or workflow goal",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "source_context",
      "label": "Source Context",
      "type": "textarea",
      "defaultValue": "Paste records, notes, documents, metrics, or evidence for Incident Review.",
      "placeholder": "Paste source context",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "output_format",
      "label": "Output Format",
      "type": "select",
      "defaultValue": "Action plan",
      "placeholder": "Select output format",
      "options": [
        "Action plan",
        "Executive summary",
        "Evidence table",
        "Checklist"
      ],
      "required": true,
      "source": "Agent Governance Control Tower"
    }
  ],
  "compliance-evidence-copilot": [
    {
      "name": "objective",
      "label": "Objective",
      "type": "textarea",
      "defaultValue": "Improve Compliance Evidence and produce an audit-ready action plan.",
      "placeholder": "Describe the decision or workflow goal",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "source_context",
      "label": "Source Context",
      "type": "textarea",
      "defaultValue": "Paste records, notes, documents, metrics, or evidence for Compliance Evidence.",
      "placeholder": "Paste source context",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "output_format",
      "label": "Output Format",
      "type": "select",
      "defaultValue": "Action plan",
      "placeholder": "Select output format",
      "options": [
        "Action plan",
        "Executive summary",
        "Evidence table",
        "Checklist"
      ],
      "required": true,
      "source": "Agent Governance Control Tower"
    }
  ],
  "executive-reporting-copilot": [
    {
      "name": "objective",
      "label": "Objective",
      "type": "textarea",
      "defaultValue": "Improve Executive Reporting and produce an audit-ready action plan.",
      "placeholder": "Describe the decision or workflow goal",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "source_context",
      "label": "Source Context",
      "type": "textarea",
      "defaultValue": "Paste records, notes, documents, metrics, or evidence for Executive Reporting.",
      "placeholder": "Paste source context",
      "options": [],
      "required": true,
      "source": "Agent Governance Control Tower"
    },
    {
      "name": "output_format",
      "label": "Output Format",
      "type": "select",
      "defaultValue": "Action plan",
      "placeholder": "Select output format",
      "options": [
        "Action plan",
        "Executive summary",
        "Evidence table",
        "Checklist"
      ],
      "required": true,
      "source": "Agent Governance Control Tower"
    }
  ]
};
