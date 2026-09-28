import CompactFeatureCatalog from '@/components/unified/CompactFeatureCatalog';
import UnifiedShell from '@/components/unified/UnifiedShell';
import { featureCatalog, featureFamilies } from '@/lib/unifiedApp';
import { sourceCustomFeatureCatalog, sourceCustomFeatureFamilies } from '@/lib/sourceCustomFeatures';

export default function FeaturesPage() {
  const mergedFamilies = [...featureFamilies, ...sourceCustomFeatureFamilies];
  const mergedCatalog = [...featureCatalog, ...sourceCustomFeatureCatalog];

  return (
    <UnifiedShell
      eyebrow="Feature Map"
      title="All AI Agent Ops Features"
      subtitle="Feature-first navigation collected from source applications and normalized into one suite."
    >
      <details className="card feature-disclosure" style={{ marginBottom: 16 }}>
        <summary>Feature families <span>{mergedFamilies.length} groups</span></summary>
        <div className="feature-disclosure-body grid columns-3">
          {mergedFamilies.map((family) => <div key={family.name}><div className="pill">{family.name}</div><div className="muted" style={{ marginTop: 8 }}>{family.features.join(' · ')}</div></div>)}
        </div>
      </details>

      <CompactFeatureCatalog features={mergedCatalog} />
    </UnifiedShell>
  );
}
