import { ensureListSeed, hasSeedMigration, listPgPayloads, markSeedMigration, replacePgPayloads, upsertPgPayload } from '@/lib/postgres';
export type DocumentRecord = { id: string; name: string; type: string; owner: string; status: string; updatedAt: string; fileName?: string; storagePath?: string; sizeBytes?: number };
const DOCUMENT_NAMES = [
  'Agent inventory evidence packet',
  'Permission policy review bundle',
  'Model risk assessment',
  'Human approval procedure',
  'Rollback and kill-switch test',
  'Evaluation gate results',
  'Incident response closeout',
  'Regulatory obligation mapping',
  'Tool access certification',
  'Data lineage evidence set',
  'Red-team findings report',
  'Monitoring threshold approval',
  'Vendor model due diligence',
  'Executive risk summary',
  'Quarterly control attestation',
];
const seed: DocumentRecord[] = DOCUMENT_NAMES.map((name, index) => ({
  id: 'governance-doc-' + (index + 1),
  name,
  type: ['Evidence', 'Policy', 'Assessment', 'Approval'][index % 4],
  owner: ['Governance Lead', 'Compliance Analyst', 'Risk Manager', 'Control Owner'][index % 4],
  status: ['In review', 'Approval pending', 'Ready', 'Draft'][index % 4],
  updatedAt: '2026-08-' + String(10 + index).padStart(2, '0') + ' 10:00',
}));
async function ensureStore() {
  await ensureListSeed('documents', seed, 'documents.json');
  const migrationId = 'governance-documents-15-v1';
  if (await hasSeedMigration(migrationId)) return;
  const existing = await listPgPayloads<DocumentRecord>('documents');
  const existingIds = new Set(existing.map((item) => item.id));
  for (const item of seed) {
    if (!existingIds.has(item.id)) await upsertPgPayload('documents', item);
  }
  await markSeedMigration(migrationId);
}
export async function getDocuments(): Promise<DocumentRecord[]> { await ensureStore(); return listPgPayloads<DocumentRecord>('documents') }
export async function saveDocuments(items: DocumentRecord[]) { await ensureStore(); await replacePgPayloads('documents', items) }
