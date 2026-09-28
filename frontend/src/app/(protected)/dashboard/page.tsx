import AuditPanel from '@/components/unified/AuditPanel';
import Link from 'next/link';
import SourceDashboardActions from '@/components/unified/SourceDashboardActions';
import NotificationsPanel from '@/components/unified/NotificationsPanel';
import UnifiedShell from '@/components/unified/UnifiedShell';
import MetricCard from '@/components/unified/MetricCard';
import { featureCatalog, featureFamilies } from '@/lib/unifiedApp';
import { dashboardMetrics, dashboardModules, healthMetrics, sourceSystems, workflowHighlights } from '@/lib/suiteData';

export default function DashboardPage() {
  return (
    <UnifiedShell
      eyebrow="Control Plane"
      title="AI Agent Ops Suite Dashboard"
      subtitle="One merged ai agent ops view for Agents, Prompts, Evals, Traces, Cost Tracking, Latency Monitoring, Failure Analysis, documents, audit, and AI."
    >
      <div className="grid columns-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} note={metric.note} />
        ))}
      </div>

      <div style={{ height: 16 }} />

      <div className="grid columns-4">
        {healthMetrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} note={metric.note} />
        ))}
      </div>

      <div style={{ height: 16 }} />

      <div className="grid columns-2">
        <div className="card stack">
          <h3>Combined Operating View</h3>
          <div className="muted">
            This suite removes project-based navigation and groups shared ai agent ops jobs into one surface. Agents, Prompts, Evals, Traces, Cost Tracking, Latency Monitoring, Failure Analysis, source tables, documents, audit, and AI are presented as platform features.
          </div>
          <div className="button-row">
            <Link className="button primary" href="/features">View All Features</Link>
            <Link className="button" href="/features/ai-tools">Open AI Tools</Link>
            <Link className="button" href="/source-tables">Open Source Tables</Link>
          </div>
        </div>
        <div className="card">
          <h3>Combined Dashboard Modules</h3>
          <ul className="feature-list">
            {dashboardModules.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ height: 16 }} />

      <div className="grid columns-2">
        <div className="card">
          <h3>Feature Families</h3>
          <div className="stack">
            {featureFamilies.map((family) => (
              <div key={family.name}>
                <div className="pill">{family.name}</div>
                <div className="muted" style={{ marginTop: 8 }}>{family.features.join(' · ')}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Workflow Highlights</h3>
          <ul className="feature-list">
            {workflowHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ height: 16 }} />

      <details className="card feature-disclosure">
        <summary>Source system coverage <span>{sourceSystems.length} connected source groups</span></summary>
        <div className="feature-disclosure-body grid columns-3">
          {sourceSystems.map((system) => (
            <div key={system.name}>
              <div className="pill">{system.name}</div>
              <h4 style={{ marginTop: 12 }}>Ownership</h4>
              <div className="muted">{system.ownership}</div>
              <h4 style={{ marginTop: 16 }}>Visible Coverage</h4>
              <ul className="feature-list">{system.coverage.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </details>

      <div style={{ height: 16 }} />

      <details className="card feature-disclosure">
        <summary>Operations, notifications, and audit <span>Open when you need operational detail</span></summary>
        <div className="feature-disclosure-body stack">
          <SourceDashboardActions />
          <div className="grid columns-2"><NotificationsPanel /><AuditPanel /></div>
        </div>
      </details>

      <div style={{ height: 16 }} />

      <div className="card dashboard-feature-link">
        <div><div className="pill">Feature catalog</div><h3>{featureCatalog.length} governed capabilities</h3><p className="muted">Search and filter the catalog instead of scrolling through every feature on this dashboard.</p></div>
        <Link className="button primary" href="/features">Browse Features</Link>
      </div>
    </UnifiedShell>
  );
}
