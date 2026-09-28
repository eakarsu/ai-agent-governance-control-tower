import { appendAuditEntry } from '@/lib/auditStore';
import { featureEntitiesBySlug, type FeatureEntitySet } from '@/lib/featureEntities';
import { sourceCustomFeatureEntitiesBySlug } from '@/lib/sourceCustomFeatures';
import { ensureKeyValueSeed, getPgKeyValue, hasSeedMigration, markSeedMigration, setPgKeyValue } from '@/lib/postgres';

type EntityStateMap = Record<string, FeatureEntitySet>;

function cloneSet(set: FeatureEntitySet): FeatureEntitySet {
  return {
    title: set.title,
    columns: [...set.columns],
    rows: set.rows.map((row) => ({ ...row })),
  };
}

function getSeedEntities(): EntityStateMap {
  return Object.fromEntries(
    Object.entries({ ...featureEntitiesBySlug, ...sourceCustomFeatureEntitiesBySlug }).map(([slug, set]) => [slug, cloneSet(set)]),
  );
}

async function ensureStore() {
  await ensureKeyValueSeed('entities', getSeedEntities(), 'entities.json');
  const migrationId = 'feature-entities-15-v1';
  if (await hasSeedMigration(migrationId)) return;
  for (const [slug, seed] of Object.entries(getSeedEntities())) {
    const existing = await getPgKeyValue<FeatureEntitySet>('entities', slug);
    if (!existing) {
      await setPgKeyValue('entities', slug, seed);
      continue;
    }
    if (existing.rows.length < seed.rows.length) {
      const existingIds = new Set(existing.rows.map((row) => row.id));
      await setPgKeyValue('entities', slug, {
        ...existing,
        rows: [...existing.rows, ...seed.rows.filter((row) => !existingIds.has(row.id))].slice(0, seed.rows.length),
      });
    }
  }
  await markSeedMigration(migrationId);
}

export async function getEntitySet(slug: string): Promise<FeatureEntitySet | null> {
  await ensureStore();
  const existing = await getPgKeyValue<FeatureEntitySet>('entities', slug);
  if (existing) return existing;
  const seed = featureEntitiesBySlug[slug] ?? sourceCustomFeatureEntitiesBySlug[slug];
  if (!seed) return null;
  const seeded = cloneSet(seed);
  await setPgKeyValue('entities', slug, seeded);
  return seeded;
}

export async function saveEntitySet(slug: string, set: FeatureEntitySet) {
  await ensureStore();
  await setPgKeyValue('entities', slug, set);
  await appendAuditEntry(slug, 'Entity records updated');
}

export async function resetEntitySet(slug: string): Promise<FeatureEntitySet | null> {
  const seed = featureEntitiesBySlug[slug] ?? sourceCustomFeatureEntitiesBySlug[slug];
  if (!seed) return null;
  await ensureStore();
  const reset = cloneSet(seed);
  await setPgKeyValue('entities', slug, reset);
  await appendAuditEntry(slug, 'Entity records reset');
  return reset;
}
