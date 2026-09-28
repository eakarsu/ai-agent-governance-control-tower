'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import type { FeatureSurface, FeatureSurfaceRow } from '@/lib/featureSurfaces';

type Props = {
  pageTitle: string;
  surface: FeatureSurface;
  setSurface: Dispatch<SetStateAction<FeatureSurface>>;
  onActivity: (message: string) => void;
};

const PRIORITIES = ['Critical', 'High', 'Medium', 'Low'];
const APPROVALS = ['Not required', 'Pending', 'Approved', 'Rejected'];

function csvCell(value: unknown) {
  return '"' + String(value ?? '').replaceAll('"', '""') + '"';
}

export default function DecisionEnhancements({ pageTitle, surface, setSurface, onActivity }: Props) {
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('All');
  const [confidence, setConfidence] = useState(72);
  const [selectedDecision, setSelectedDecision] = useState<FeatureSurfaceRow | null>(null);
  const [decisionDraft, setDecisionDraft] = useState<FeatureSurfaceRow | null>(null);
  const [editingDecision, setEditingDecision] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const isOverdue = (row: FeatureSurfaceRow) => row.status !== 'Completed' && row.due < today;

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return surface.workItems.filter((row) => {
      const text = [row.item, row.owner, row.nextStep, row.evidenceSource].join(' ').toLowerCase();
      return (!normalized || text.includes(normalized)) && (priority === 'All' || row.priority === priority);
    });
  }, [priority, query, surface.workItems]);

  const metrics = useMemo(() => {
    const open = surface.workItems.filter((row) => row.status !== 'Completed').length;
    const urgent = surface.workItems.filter((row) => ['Critical', 'High'].includes(row.priority) && row.status !== 'Completed').length;
    const overdue = surface.workItems.filter(isOverdue).length;
    const evidence = surface.workItems.length
      ? Math.round(surface.workItems.filter((row) => row.evidenceVerified).length / surface.workItems.length * 100)
      : 0;
    const pending = surface.workItems.filter((row) => row.approval === 'Pending').length;
    const impact = Math.round(surface.workItems.reduce((sum, row) => sum + Number(row.impact || 0), 0) * confidence / 100);
    const invalid = surface.workItems.filter((row) => !row.owner?.trim() || !row.due || !row.evidenceSource?.trim()).length;
    return { open, urgent, overdue, evidence, pending, impact, invalid };
  }, [confidence, surface.workItems]);

  function updateRow(id: string, changes: Partial<FeatureSurfaceRow>, message: string) {
    setSurface((current) => ({
      ...current,
      workItems: current.workItems.map((row) => row.id === id ? { ...row, ...changes } : row),
    }));
    onActivity(message);
  }

  function openDecision(row: FeatureSurfaceRow) {
    setSelectedDecision(row);
    setDecisionDraft({ ...row });
    setEditingDecision(false);
  }

  function saveDecision() {
    if (!decisionDraft) return;
    updateRow(decisionDraft.id, decisionDraft, 'Decision controls updated for ' + decisionDraft.item);
    setSelectedDecision({ ...decisionDraft });
    setEditingDecision(false);
  }

  function deleteDecision() {
    if (!selectedDecision) return;
    setSurface((current) => ({
      ...current,
      workItems: current.workItems.filter((row) => row.id !== selectedDecision.id),
    }));
    onActivity('Deleted decision work item: ' + selectedDecision.item);
    setSelectedDecision(null);
    setDecisionDraft(null);
    setEditingDecision(false);
  }

  function exportCsv() {
    const fields: Array<keyof FeatureSurfaceRow> = ['id', 'item', 'owner', 'priority', 'status', 'due', 'approval', 'evidenceSource', 'evidenceVerified', 'escalated', 'impact', 'nextStep'];
    const csv = [fields.join(','), ...surface.workItems.map((row) => fields.map((field) => csvCell(row[field])).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-decision-work.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  const alerts = surface.workItems.filter((row) => isOverdue(row) || row.escalated || row.priority === 'Critical');

  return (
    <div className="stack">
      <div className="grid columns-3">
        {[
          ['Open work', metrics.open, 'Items requiring action'],
          ['High-risk queue', metrics.urgent, 'Critical and high priority'],
          ['Overdue SLAs', metrics.overdue, 'Exceptions requiring escalation'],
          ['Evidence coverage', metrics.evidence + '%', 'Source evidence verified'],
          ['Pending approvals', metrics.pending, 'Human decisions required'],
          ['Scenario impact', metrics.impact, 'Value units at ' + confidence + '% confidence'],
        ].map(([label, value, note]) => (
          <div className="card" key={label}>
            <div className="muted" style={{ fontSize: 12, textTransform: 'uppercase', fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, margin: '6px 0' }}>{value}</div>
            <div className="muted" style={{ fontSize: 12 }}>{note}</div>
          </div>
        ))}
      </div>

      <div className="grid columns-2">
        <div className="card">
          <h3>Scenario Simulation</h3>
          <label>
            Planning confidence: {confidence}%
            <input type="range" min="10" max="100" value={confidence} onChange={(event) => setConfidence(Number(event.target.value))} style={{ width: '100%', marginTop: 10 }} />
          </label>
          <p className="muted">Forecasts support planning only. They never bypass approval, policy, or domain review.</p>
        </div>
        <div className="card">
          <h3>SLA and Validation Alerts</h3>
          <strong>{alerts.length} active exception{alerts.length === 1 ? '' : 's'}</strong>
          <p className="muted">{metrics.invalid} item{metrics.invalid === 1 ? '' : 's'} missing owner, deadline, or evidence source.</p>
          <div>{alerts.slice(0, 3).map((row) => <div key={row.id}>{row.item}</div>)}</div>
        </div>
      </div>

      <div className="card">
        <div className="toolbar-row">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search decisions, owners, sources, or next steps" />
          <select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="All">All priorities</option>
            {PRIORITIES.map((value) => <option key={value}>{value}</option>)}
          </select>
          <button className="button subtle" type="button" onClick={exportCsv}>Export CSV</button>
          <button className="button subtle" type="button" onClick={() => window.print()}>Print / PDF</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Work item</th><th>Priority</th><th>SLA</th><th>Approval</th><th>Evidence lineage</th><th>Controls</th></tr></thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  className="clickable-data-row"
                  tabIndex={0}
                  onClick={() => openDecision(row)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openDecision(row);
                    }
                  }}
                >
                  <td><strong>{row.item}</strong><div className="muted">{row.owner}</div></td>
                  <td>{row.priority}</td>
                  <td>{row.due || 'Not set'}<div className="muted">{isOverdue(row) ? 'Overdue' : 'Within SLA'}</div></td>
                  <td>{row.approval}</td>
                  <td>{row.evidenceSource || 'Not set'}</td>
                  <td>{row.evidenceVerified ? 'Evidence verified' : 'Evidence pending'}{row.escalated ? <div className="muted">Escalated</div> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDecision && decisionDraft ? (
        <div className="record-modal-backdrop" role="presentation" onClick={() => setSelectedDecision(null)}>
          <div className="record-modal" role="dialog" aria-modal="true" aria-label={'Decision controls: ' + selectedDecision.item} onClick={(event) => event.stopPropagation()}>
            <button className="record-modal-close" type="button" aria-label="Close decision dialog" onClick={() => setSelectedDecision(null)}><X size={18} aria-hidden="true" /></button>
            <div className="record-modal-header">
              <div>
                <span className="eyebrow">{editingDecision ? 'Edit Decision Controls' : 'Decision Details'}</span>
                <h2>{selectedDecision.item}</h2>
                <p>Review the SLA, approval, evidence lineage, and escalation state.</p>
              </div>
            </div>
            <div className="record-form-grid">
              <label className="record-form-field span-2"><span>Work Item</span><input value={decisionDraft.item} disabled={!editingDecision} onChange={(event) => setDecisionDraft((current) => current ? { ...current, item: event.target.value } : current)} /></label>
              <label className="record-form-field"><span>Priority</span><select value={decisionDraft.priority} disabled={!editingDecision} onChange={(event) => setDecisionDraft((current) => current ? { ...current, priority: event.target.value as FeatureSurfaceRow['priority'] } : current)}>{PRIORITIES.map((value) => <option key={value}>{value}</option>)}</select></label>
              <label className="record-form-field"><span>SLA Due Date</span><input type="date" value={decisionDraft.due} disabled={!editingDecision} onChange={(event) => setDecisionDraft((current) => current ? { ...current, due: event.target.value } : current)} /></label>
              <label className="record-form-field"><span>Approval</span><select value={decisionDraft.approval} disabled={!editingDecision} onChange={(event) => setDecisionDraft((current) => current ? { ...current, approval: event.target.value as FeatureSurfaceRow['approval'] } : current)}>{APPROVALS.map((value) => <option key={value}>{value}</option>)}</select></label>
              <label className="record-form-field"><span>Owner</span><input value={decisionDraft.owner} disabled={!editingDecision} onChange={(event) => setDecisionDraft((current) => current ? { ...current, owner: event.target.value } : current)} /></label>
              <label className="record-form-field span-2"><span>Evidence Source</span><input value={decisionDraft.evidenceSource} disabled={!editingDecision} onChange={(event) => setDecisionDraft((current) => current ? { ...current, evidenceSource: event.target.value } : current)} /></label>
              <label className="check-row"><input type="checkbox" checked={decisionDraft.evidenceVerified} disabled={!editingDecision} onChange={(event) => setDecisionDraft((current) => current ? { ...current, evidenceVerified: event.target.checked } : current)} /> Evidence verified</label>
              <label className="check-row"><input type="checkbox" checked={decisionDraft.escalated} disabled={!editingDecision} onChange={(event) => setDecisionDraft((current) => current ? { ...current, escalated: event.target.checked } : current)} /> Escalated</label>
            </div>
            <div className="record-modal-actions">
              <button className="button primary" type="button" onClick={() => editingDecision ? saveDecision() : setEditingDecision(true)}>{editingDecision ? 'Save changes' : 'Edit'}</button>
              <button className="button danger" type="button" onClick={deleteDecision}>Delete</button>
              <button className="button secondary" type="button" onClick={() => setSelectedDecision(null)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
