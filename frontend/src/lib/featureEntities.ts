import { featureCatalog } from '@/lib/unifiedApp';

export type EntityRecord = { id: string; name: string; status: string; owner: string; amount?: string; dueDate?: string; priority?: string };
export type FeatureEntitySet = { title: string; columns: string[]; rows: EntityRecord[] };

const COLUMNS = ['Name', 'Status', 'Owner', 'Amount', 'Due Date', 'Priority'];
const STATUSES = ['Open', 'Review', 'Queued', 'In review', 'Approval pending', 'Urgent', 'Exception', 'Completed'];
const PRIORITIES = ['High', 'Medium', 'Low', 'Urgent', 'Medium'];

function slugFromHref(href: string) { return href.split('/').filter(Boolean).pop() ?? href.replace(/^\//, ''); }
function ownerFor(category: string) {
  const lower = category.toLowerCase();
  if (lower.includes('clinical')) return 'Clinical Review Lead';
  if (lower.includes('compliance') || lower.includes('legal')) return 'Compliance Lead';
  if (lower.includes('governance') || lower.includes('risk')) return 'Governance Lead';
  if (lower.includes('finance')) return 'Finance Lead';
  if (lower.includes('quality') || lower.includes('reliability')) return 'Quality Lead';
  if (lower.includes('safety')) return 'Safety Lead';
  if (lower.includes('platform')) return 'Platform Lead';
  return 'Operations Lead';
}
function namesFor(title: string) {
  return ['intake review','policy validation','evidence check','missing documentation request','approval routing','connector follow-up','SLA escalation','risk exception review','stakeholder update task','readiness check','credential or source blocker','audit evidence packet','financial impact review','manager signoff','completed sample'].map((name) => title + ' ' + name);
}
function buildSet(slug: string, title: string, category: string): FeatureEntitySet {
  return { title: title + ' Records', columns: COLUMNS, rows: namesFor(title).map((name, index) => ({
    id: slug + '-' + (index + 1), name, status: STATUSES[index % STATUSES.length],
    owner: index % 5 === 0 ? ownerFor(category) : index % 3 === 0 ? 'Specialist Reviewer' : 'Operations Analyst',
    amount: index % 4 === 0 ? '$' + (2400 + index * 725).toLocaleString('en-US') : '$0',
    dueDate: '2026-06-' + String(7 + index).padStart(2, '0'), priority: PRIORITIES[index % PRIORITIES.length],
  })) };
}
export const featureEntitiesBySlug: Record<string, FeatureEntitySet> = Object.fromEntries(featureCatalog.map((feature) => {
  const slug = slugFromHref(feature.href); return [slug, buildSet(slug, feature.title, feature.category)];
}));
