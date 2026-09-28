'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { FeatureDefinition } from '@/lib/unifiedApp';

export default function CompactFeatureCatalog({ features }: { features: FeatureDefinition[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [featureType, setFeatureType] = useState('All');
  const [limit, setLimit] = useState(12);
  const categories = useMemo(() => ['All', ...Array.from(new Set(features.map((feature) => feature.category))).sort()], [features]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return features.filter((feature) => {
      const searchable = [feature.title, feature.category, feature.summary, ...feature.bullets].join(' ').toLowerCase();
      const type = feature.href.startsWith('/features/') ? 'AI' : 'Operational';
      return (category === 'All' || feature.category === category) &&
        (featureType === 'All' || featureType === type) &&
        (!normalized || searchable.includes(normalized));
    });
  }, [category, featureType, features, query]);
  const visible = filtered.slice(0, limit);

  return (
    <div className="stack">
      <div className="card compact-catalog-toolbar">
        <input value={query} onChange={(event) => { setQuery(event.target.value); setLimit(12); }} placeholder="Search features" />
        <select value={category} onChange={(event) => { setCategory(event.target.value); setLimit(12); }}>
          {categories.map((value) => <option key={value}>{value}</option>)}
        </select>
        <select value={featureType} onChange={(event) => { setFeatureType(event.target.value); setLimit(12); }} aria-label="Feature type">
          <option value="All">All feature types</option>
          <option value="AI">AI features</option>
          <option value="Operational">Non-AI features</option>
        </select>
        <span className="muted">{filtered.length} matching features</span>
      </div>
      <div className="grid columns-3 compact-feature-grid">
        {visible.map((feature) => (
          <article className="card compact-feature-card" key={feature.title}>
            <div className="inline-links">
              <div className="pill">{feature.category}</div>
              <div className="pill">{feature.href.startsWith('/features/') ? 'AI feature' : 'Non-AI feature'}</div>
            </div>
            <h3>{feature.title}</h3>
            <p className="muted">{feature.summary}</p>
            <Link className="button" href={feature.href}>Open Feature</Link>
          </article>
        ))}
      </div>
      {visible.length < filtered.length ? (
        <button className="button subtle compact-show-more" type="button" onClick={() => setLimit((current) => current + 12)}>
          Show 12 more
        </button>
      ) : null}
    </div>
  );
}
