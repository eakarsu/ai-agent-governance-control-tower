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
  return {
    workItems: [
      { id: slug + '-surface-1', item: title + ' intake queue', status: 'Open', owner, nextStep: 'Validate source data, owner, deadline, and business impact', priority: 'Critical', due: '2026-08-15', approval: 'Pending', evidenceSource: title + ' source record', evidenceVerified: true, escalated: false, impact: 30 },
      { id: slug + '-surface-2', item: title + ' evidence and policy review', status: 'Review', owner: 'Specialist Reviewer', nextStep: 'Confirm documents, rules, approvals, and exception rationale', priority: 'High', due: '2026-08-16', approval: 'Pending', evidenceSource: title + ' source record', evidenceVerified: false, escalated: false, impact: 26 },
      { id: slug + '-surface-3', item: title + ' connector follow-up', status: 'Needs attention', owner: 'Integration Lead', nextStep: 'Check source connector, payload quality, and sync status', priority: 'High', due: '2026-08-17', approval: 'Pending', evidenceSource: title + ' source record', evidenceVerified: true, escalated: false, impact: 22 },
      { id: slug + '-surface-4', item: title + ' SLA escalation', status: 'Urgent', owner: 'Operations Manager', nextStep: 'Escalate delayed, high-value, or customer-impacting work', priority: 'Critical', due: '2026-08-15', approval: 'Pending', evidenceSource: title + ' source record', evidenceVerified: false, escalated: true, impact: 18 },
      { id: slug + '-surface-5', item: title + ' audit closeout', status: 'In progress', owner: 'Team Lead', nextStep: 'Capture decision, evidence, approval trail, and export packet', priority: 'Medium', due: '2026-08-18', approval: 'Approved', evidenceSource: title + ' source record', evidenceVerified: true, escalated: false, impact: 14 },
    ],
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
