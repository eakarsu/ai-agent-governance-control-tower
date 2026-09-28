import { featureCatalog } from '@/lib/unifiedApp';

export type FeatureSurfaceRow = { id: string; item: string; status: string; owner: string; nextStep: string; priority: 'Critical' | 'High' | 'Medium' | 'Low'; due: string; approval: 'Not required' | 'Pending' | 'Approved' | 'Rejected'; evidenceSource: string; evidenceVerified: boolean; escalated: boolean; impact: number };
export type FeatureSurface = { workItems: FeatureSurfaceRow[]; quickActions: string[]; controlChecks: Array<{ id: string; label: string; done: boolean }>; activityLog: Array<{ id: string; message: string; at: string }> };
function slugFromHref(href: string) { return href.split('/').filter(Boolean).pop() ?? href.replace(/^\//, ''); }
function ownerFor(category: string) {
  const lower = category.toLowerCase();
  if (lower.includes('compliance') || lower.includes('legal')) return 'Compliance Lead';
  if (lower.includes('governance') || lower.includes('risk')) return 'Governance Lead';
  if (lower.includes('finance')) return 'Finance Lead';
  if (lower.includes('quality') || lower.includes('reliability')) return 'Quality Lead';
  if (lower.includes('safety')) return 'Safety Lead';
  if (lower.includes('platform')) return 'Platform Lead';
  return 'Operations Lead';
}
function buildSurface(slug: string, title: string, category: string): FeatureSurface {
  const owner = ownerFor(category);
  const templates: Array<Pick<FeatureSurfaceRow, 'item' | 'status' | 'owner' | 'nextStep' | 'priority' | 'approval' | 'evidenceVerified' | 'escalated' | 'impact'>> = [
    { item: 'intake queue', status: 'Open', owner, nextStep: 'Validate source data, owner, deadline, and business impact', priority: 'Critical', approval: 'Pending', evidenceVerified: true, escalated: false, impact: 30 },
    { item: 'evidence and policy review', status: 'Review', owner: 'Specialist Reviewer', nextStep: 'Confirm documents, rules, approvals, and exception rationale', priority: 'High', approval: 'Pending', evidenceVerified: false, escalated: false, impact: 26 },
    { item: 'connector follow-up', status: 'Needs attention', owner: 'Integration Lead', nextStep: 'Check source connector, payload quality, and sync status', priority: 'High', approval: 'Pending', evidenceVerified: true, escalated: false, impact: 22 },
    { item: 'SLA escalation', status: 'Urgent', owner: 'Operations Manager', nextStep: 'Escalate delayed, high-value, or customer-impacting work', priority: 'Critical', approval: 'Pending', evidenceVerified: false, escalated: true, impact: 18 },
    { item: 'audit closeout', status: 'In progress', owner: 'Team Lead', nextStep: 'Capture decision, evidence, approval trail, and export packet', priority: 'Medium', approval: 'Approved', evidenceVerified: true, escalated: false, impact: 14 },
    { item: 'ownership confirmation', status: 'Open', owner: 'Governance Analyst', nextStep: 'Confirm accountable owner and backup reviewer', priority: 'Medium', approval: 'Not required', evidenceVerified: true, escalated: false, impact: 12 },
    { item: 'risk exception assessment', status: 'Review', owner: 'Risk Manager', nextStep: 'Document exception scope, compensating controls, and expiry', priority: 'High', approval: 'Pending', evidenceVerified: false, escalated: true, impact: 25 },
    { item: 'control mapping review', status: 'Queued', owner: 'Control Owner', nextStep: 'Map controls to policy obligations and evidence', priority: 'Medium', approval: 'Pending', evidenceVerified: true, escalated: false, impact: 16 },
    { item: 'stakeholder response', status: 'In progress', owner: 'Program Manager', nextStep: 'Collect stakeholder feedback and record disposition', priority: 'Low', approval: 'Not required', evidenceVerified: false, escalated: false, impact: 9 },
    { item: 'data quality validation', status: 'Review', owner: 'Data Steward', nextStep: 'Resolve incomplete fields and verify source freshness', priority: 'High', approval: 'Pending', evidenceVerified: false, escalated: false, impact: 21 },
    { item: 'approval package', status: 'Approval pending', owner: 'Approval Coordinator', nextStep: 'Route the complete evidence package for signoff', priority: 'High', approval: 'Pending', evidenceVerified: true, escalated: false, impact: 24 },
    { item: 'monitoring checkpoint', status: 'Ready', owner: 'Monitoring Lead', nextStep: 'Validate thresholds, alerts, and review cadence', priority: 'Medium', approval: 'Not required', evidenceVerified: true, escalated: false, impact: 13 },
    { item: 'remediation follow-up', status: 'Needs attention', owner: 'Remediation Owner', nextStep: 'Confirm corrective action evidence and target date', priority: 'High', approval: 'Pending', evidenceVerified: false, escalated: true, impact: 23 },
    { item: 'management signoff', status: 'Approval pending', owner: 'Governance Lead', nextStep: 'Review residual risk and record final decision', priority: 'Critical', approval: 'Pending', evidenceVerified: true, escalated: false, impact: 28 },
    { item: 'completed control sample', status: 'Completed', owner: 'Quality Reviewer', nextStep: 'Retain as an approved reference case', priority: 'Low', approval: 'Approved', evidenceVerified: true, escalated: false, impact: 8 },
  ];
  return {
    workItems: templates.map((template, index) => ({
      ...template,
      id: slug + '-surface-' + (index + 1),
      item: title + ' ' + template.item,
      due: '2026-09-' + String(2 + index).padStart(2, '0'),
      evidenceSource: title + ' source record ' + String(index + 1),
    })),
    quickActions: ['Create ' + title + ' record', 'Export ' + title + ' list', 'Review ' + title + ' exceptions', 'Assign ' + title + ' owner'],
    controlChecks: [
      { id: slug + '-check-1', label: title + ' owner assigned', done: true },
      { id: slug + '-check-2', label: title + ' evidence and source data reviewed', done: false },
      { id: slug + '-check-3', label: title + ' audit trail current', done: true },
      { id: slug + '-check-4', label: title + ' approval or escalation logged', done: false },
    ],
    activityLog: [
      { id: slug + '-log-1', message: title + ' queue refreshed', at: '2026-06-06 09:00' },
      { id: slug + '-log-2', message: title + ' exception assigned', at: '2026-06-06 11:30' },
      { id: slug + '-log-3', message: title + ' controls reviewed', at: '2026-06-06 14:15' },
    ],
  };
}
export const featureSurfaceBySlug: Record<string, FeatureSurface> = Object.fromEntries(featureCatalog.map((feature) => {
  const slug = slugFromHref(feature.href); return [slug, buildSurface(slug, feature.title, feature.category)];
}));
export const featureSurfaces: Record<string, FeatureSurface> = Object.fromEntries(featureCatalog.map((feature) => [feature.title, featureSurfaceBySlug[slugFromHref(feature.href)]]));
