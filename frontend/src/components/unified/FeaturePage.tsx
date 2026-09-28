'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import AIWorkbench from '@/components/unified/AIWorkbench';
import DocumentsWorkspace from '@/components/unified/DocumentsWorkspace';
import DecisionEnhancements from '@/components/unified/DecisionEnhancements';
import EntityWorkspace from '@/components/unified/EntityWorkspace';
import MetricCard from '@/components/unified/MetricCard';
import UnifiedShell from '@/components/unified/UnifiedShell';
import { featureContexts, type PageDefinition } from '@/lib/unifiedApp';
import { sourceCustomFeatureContexts, sourceCustomFeatureEntitiesBySlug, sourceCustomFeatureSurfaceBySlug } from '@/lib/sourceCustomFeatures';
import { featureSurfaceBySlug, type FeatureSurface, type FeatureSurfaceRow } from '@/lib/featureSurfaces';
import { featureEntitiesBySlug } from '@/lib/featureEntities';

const STATUS_OPTIONS = ['Draft', 'Open', 'Queued', 'Review', 'Ready', 'In progress', 'Needs attention', 'Urgent', 'Exception', 'Completed'];

const emptyFeatureSurface: FeatureSurface = {
  workItems: [],
  quickActions: [],
  controlChecks: [],
  activityLog: [],
};

const emptyWorkItem = { item: '', status: 'Open', owner: '', nextStep: '', priority: 'Medium' as const, due: '', approval: 'Pending' as const, evidenceSource: '', evidenceVerified: false, escalated: false, impact: 5 };

type FeaturePageProps = {
  slug: string;
  page: PageDefinition;
};

function cloneSurface(surface: FeatureSurface): FeatureSurface {
  return {
    workItems: surface.workItems.map((item) => ({ ...item })),
    quickActions: [...surface.quickActions],
    controlChecks: surface.controlChecks.map((item) => ({ ...item })),
    activityLog: surface.activityLog.map((item) => ({ ...item })),
  };
}

export default function FeaturePage({ slug, page }: FeaturePageProps) {
  const context = featureContexts[page.title] ?? sourceCustomFeatureContexts[page.title];
  const seedSurface = useMemo(() => cloneSurface(featureSurfaceBySlug[slug] ?? sourceCustomFeatureSurfaceBySlug[slug] ?? emptyFeatureSurface), [slug]);
  const entitySeed = featureEntitiesBySlug[slug] ?? sourceCustomFeatureEntitiesBySlug[slug] ?? null;
  const [surface, setSurface] = useState<FeatureSurface>(seedSurface);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState(emptyWorkItem);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FeatureSurfaceRow | null>(null);
  const [itemDraft, setItemDraft] = useState<FeatureSurfaceRow | null>(null);
  const [editingItem, setEditingItem] = useState(false);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const showAIWorkbench = slug === 'ai-tools' || slug === 'ai-assistant' || page.category.toLowerCase().includes('ai');
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let active = true;

    async function loadSurface() {
      try {
        const response = await fetch(`/api/feature-state/${slug}`, { cache: 'no-store' });
        if (!response.ok) {
          if (active) {
            setSurface(seedSurface);
            setReady(true);
          }
          return;
        }

        const payload = (await response.json()) as FeatureSurface;
        if (active) {
          setSurface(payload);
          setReady(true);
        }
      } catch {
        if (active) {
          setSurface(seedSurface);
          setReady(true);
        }
      }
    }

    void loadSurface();
    return () => {
      active = false;
    };
  }, [seedSurface, slug]);

  useEffect(() => {
    if (!ready) return;

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    setSaving(true);
    saveTimeout.current = setTimeout(async () => {
      await fetch(`/api/feature-state/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surface),
      });
      setSaving(false);
    }, 350);

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [ready, slug, surface]);

  const filteredItems = surface.workItems.filter((row) => {
    const matchesQuery =
      !query ||
      row.item.toLowerCase().includes(query.toLowerCase()) ||
      row.owner.toLowerCase().includes(query.toLowerCase()) ||
      row.nextStep.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const pushActivity = (message: string) => {
    setSurface((current) => ({
      ...current,
      activityLog: [
        {
          id: `log-${Date.now()}`,
          message,
          at: new Date().toLocaleString(),
        },
        ...current.activityLog,
      ],
    }));
  };

  const toggleCheck = (id: string) => {
    let label = '';
    setSurface((current) => ({
      ...current,
      controlChecks: current.controlChecks.map((check) => {
        if (check.id !== id) return check;
        label = check.label;
        return { ...check, done: !check.done };
      }),
    }));
    if (label) {
      pushActivity(`Control check updated: ${label}`);
    }
  };

  const addWorkItem = () => {
    if (!newItem.item.trim()) return;
    const row = {
      id: `item-${Date.now()}`,
      item: newItem.item.trim(),
      owner: newItem.owner.trim() || 'Unassigned',
      nextStep: newItem.nextStep.trim() || 'Review and assign next action',
      status: newItem.status || 'Open',
      priority: newItem.priority,
      due: newItem.due,
      approval: newItem.approval,
      evidenceSource: newItem.evidenceSource,
      evidenceVerified: newItem.evidenceVerified,
      escalated: newItem.escalated,
      impact: newItem.impact,
    };
    setSurface((current) => ({
      ...current,
      workItems: [row, ...current.workItems],
    }));
    pushActivity(`Added work item: ${row.item}`);
    setNewItem(emptyWorkItem);
    setShowAddItemModal(false);
  };

  const removeWorkItem = (id: string) => {
    const target = surface.workItems.find((row) => row.id === id);
    setSurface((current) => ({
      ...current,
      workItems: current.workItems.filter((row) => row.id !== id),
    }));
    if (target) {
      pushActivity(`Removed work item: ${target.item}`);
    }
  };

  const openWorkItem = (row: FeatureSurfaceRow) => {
    setSelectedItem(row);
    setItemDraft({ ...row });
    setEditingItem(false);
  };

  const saveWorkItem = () => {
    if (!itemDraft) return;
    setSurface((current) => ({
      ...current,
      workItems: current.workItems.map((row) => row.id === itemDraft.id ? { ...itemDraft } : row),
    }));
    pushActivity(`Updated work item: ${itemDraft.item}`);
    setSelectedItem({ ...itemDraft });
    setEditingItem(false);
  };

  const deleteSelectedWorkItem = () => {
    if (!selectedItem) return;
    removeWorkItem(selectedItem.id);
    setSelectedItem(null);
    setItemDraft(null);
    setEditingItem(false);
  };

  const runQuickAction = (action: string) => {
    pushActivity(`Quick action executed: ${action}`);
  };

  const resetSurface = async () => {
    const response = await fetch(`/api/feature-state/${slug}`, { method: 'DELETE' });
    if (!response.ok) return;
    const payload = (await response.json()) as FeatureSurface;
    setSurface(payload);
    pushActivity('Feature surface reset to suite defaults');
  };

  return (
    <UnifiedShell title={page.title} subtitle={page.subtitle} eyebrow={page.eyebrow}>
      <div className="grid columns-3">
        {page.metrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} note={metric.note} />
        ))}
      </div>

      <div style={{ height: 16 }} />

      <div className="grid columns-2">
        <div className="card stack">
          <div className="inline-links">
            <div className="pill">{page.category}</div>
            <div className="pill">{showAIWorkbench ? 'AI feature' : 'Non-AI feature'}</div>
            <div className="pill">PostgreSQL backed</div>
          </div>
          <h3>Feature Role</h3>
          <div className="muted">{page.summary}</div>
        </div>

        <div className="card">
          <h3>Core Workloads</h3>
          <ul className="feature-list">
            {page.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>

      {context ? (
        <div className="feature-section-gap">
          <details className="card feature-disclosure">
            <summary>Operating context <span>Ownership, queues, outputs, and related routes</span></summary>
            <div className="feature-disclosure-body grid columns-2">
              <div>
                <h3>Source Ownership</h3>
                <ul className="feature-list">{context.sourceOwners.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3>Operating Queues</h3>
                <ul className="feature-list">{context.operatingQueues.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3>Primary Outputs</h3>
                <ul className="feature-list">{context.outputs.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3>Related Operations</h3>
                <div className="inline-links">{context.relatedRoutes.map((item) => <Link key={item.href} href={item.href} className="tag-link">{item.label}</Link>)}</div>
              </div>
            </div>
          </details>
        </div>
      ) : null}

      {showAIWorkbench ? (
        <div className="feature-section-gap">
          <details className="card feature-disclosure" open={slug === 'ai-tools' || slug === 'ai-assistant'}>
            <summary>AI workbench <span>Prompts, presets, inputs, and generated reports</span></summary>
            <div className="feature-disclosure-body"><AIWorkbench mode={slug === 'ai-assistant' ? 'assistant' : 'tools'} /></div>
          </details>
        </div>
      ) : null}

      {surface ? (
        <>
          <div style={{ height: 16 }} />

          <details className="card feature-disclosure">
            <summary>Advanced decision controls <span>Scenario metrics, approvals, SLA checks, and evidence lineage</span></summary>
            <div className="feature-disclosure-body"><DecisionEnhancements pageTitle={page.title} surface={surface} setSurface={setSurface} onActivity={pushActivity} /></div>
          </details>

          <div style={{ height: 16 }} />

          <div className="card">
            <h3>Active Work Items</h3>
            <div className="toolbar-row">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search items, owner, or next step"
              />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All statuses</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button className="button subtle" type="button" onClick={resetSurface}>Reset feature</button>
              <span className="save-indicator">{saving ? 'Saving...' : ready ? 'Saved' : 'Loading...'}</span>
              <button
                className="button primary"
                type="button"
                onClick={() => {
                  setNewItem(emptyWorkItem);
                  setShowAddItemModal(true);
                }}
              >
                Add item
              </button>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Priority</th>
                    <th>Due</th>
                    <th>Next Step</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((row) => (
                    <tr
                      key={row.id}
                      className="clickable-data-row"
                      tabIndex={0}
                      onClick={() => openWorkItem(row)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          openWorkItem(row);
                        }
                      }}
                    >
                      <td><strong>{row.item}</strong></td>
                      <td><span className="status-chip">{row.status}</span></td>
                      <td>{row.owner}</td>
                      <td>{row.priority}</td>
                      <td>{row.due || 'Not set'}</td>
                      <td>{row.nextStep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {showAddItemModal ? (
              <div className="record-modal-backdrop" role="presentation" onClick={() => setShowAddItemModal(false)}>
                <div className="record-modal" role="dialog" aria-modal="true" aria-label="Add work item" onClick={(event) => event.stopPropagation()}>
                  <button className="record-modal-close" type="button" aria-label="Close add work item dialog" onClick={() => setShowAddItemModal(false)}>
                    <X size={18} aria-hidden="true" />
                  </button>
                  <div className="record-modal-header">
                    <div>
                      <span className="eyebrow">Add Work Item</span>
                      <h2>{page.title}</h2>
                      <p>Create a work item with status, owner, and next step before it enters the active queue.</p>
                    </div>
                  </div>
                  <div className="record-form-grid">
                    <label className="record-form-field span-2">
                      <span>Item</span>
                      <input
                        value={newItem.item}
                        onChange={(e) => setNewItem((current) => ({ ...current, item: e.target.value }))}
                        placeholder="New work item"
                        autoFocus
                      />
                    </label>
                    <label className="record-form-field">
                      <span>Status</span>
                      <select value={newItem.status} onChange={(e) => setNewItem((current) => ({ ...current, status: e.target.value }))}>
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </label>
                    <label className="record-form-field">
                      <span>Owner</span>
                      <input
                        value={newItem.owner}
                        onChange={(e) => setNewItem((current) => ({ ...current, owner: e.target.value }))}
                        placeholder="Owner"
                      />
                    </label>
                    <label className="record-form-field">
                      <span>Priority</span>
                      <select value={newItem.priority} onChange={(e) => setNewItem((current) => ({ ...current, priority: e.target.value as typeof current.priority }))}>
                        {['Critical', 'High', 'Medium', 'Low'].map((value) => <option key={value}>{value}</option>)}
                      </select>
                    </label>
                    <label className="record-form-field">
                      <span>SLA Due Date</span>
                      <input type="date" value={newItem.due} onChange={(e) => setNewItem((current) => ({ ...current, due: e.target.value }))} />
                    </label>
                    <label className="record-form-field span-2">
                      <span>Evidence Source</span>
                      <input value={newItem.evidenceSource} onChange={(e) => setNewItem((current) => ({ ...current, evidenceSource: e.target.value }))} placeholder="Source system or evidence reference" />
                    </label>
                    <label className="record-form-field span-2">
                      <span>Next Step</span>
                      <input
                        value={newItem.nextStep}
                        onChange={(e) => setNewItem((current) => ({ ...current, nextStep: e.target.value }))}
                        placeholder="Next step"
                      />
                    </label>
                  </div>
                  <div className="record-modal-actions">
                    <button className="button secondary" type="button" onClick={() => setShowAddItemModal(false)}>Cancel</button>
                    <button className="button primary" onClick={addWorkItem} type="button" disabled={!newItem.item.trim() || !newItem.owner.trim() || !newItem.due || !newItem.evidenceSource.trim()}>Save item</button>
                  </div>
                </div>
              </div>
            ) : null}

            {selectedItem && itemDraft ? (
              <div className="record-modal-backdrop" role="presentation" onClick={() => setSelectedItem(null)}>
                <div className="record-modal" role="dialog" aria-modal="true" aria-label={'Work item: ' + selectedItem.item} onClick={(event) => event.stopPropagation()}>
                  <button className="record-modal-close" type="button" aria-label="Close work item dialog" onClick={() => setSelectedItem(null)}>
                    <X size={18} aria-hidden="true" />
                  </button>
                  <div className="record-modal-header">
                    <div>
                      <span className="eyebrow">{editingItem ? 'Edit Work Item' : 'Work Item Details'}</span>
                      <h2>{selectedItem.item}</h2>
                      <p>PostgreSQL-backed operational record with approval, evidence, and SLA controls.</p>
                    </div>
                  </div>
                  <div className="record-form-grid">
                    <label className="record-form-field span-2">
                      <span>Item</span>
                      <input value={itemDraft.item} disabled={!editingItem} onChange={(event) => setItemDraft((current) => current ? { ...current, item: event.target.value } : current)} />
                    </label>
                    <label className="record-form-field">
                      <span>Status</span>
                      <select value={itemDraft.status} disabled={!editingItem} onChange={(event) => setItemDraft((current) => current ? { ...current, status: event.target.value } : current)}>
                        {STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}
                      </select>
                    </label>
                    <label className="record-form-field">
                      <span>Owner</span>
                      <input value={itemDraft.owner} disabled={!editingItem} onChange={(event) => setItemDraft((current) => current ? { ...current, owner: event.target.value } : current)} />
                    </label>
                    <label className="record-form-field">
                      <span>Priority</span>
                      <select value={itemDraft.priority} disabled={!editingItem} onChange={(event) => setItemDraft((current) => current ? { ...current, priority: event.target.value as FeatureSurfaceRow['priority'] } : current)}>
                        {['Critical', 'High', 'Medium', 'Low'].map((value) => <option key={value}>{value}</option>)}
                      </select>
                    </label>
                    <label className="record-form-field">
                      <span>SLA Due Date</span>
                      <input type="date" value={itemDraft.due} disabled={!editingItem} onChange={(event) => setItemDraft((current) => current ? { ...current, due: event.target.value } : current)} />
                    </label>
                    <label className="record-form-field">
                      <span>Approval</span>
                      <select value={itemDraft.approval} disabled={!editingItem} onChange={(event) => setItemDraft((current) => current ? { ...current, approval: event.target.value as FeatureSurfaceRow['approval'] } : current)}>
                        {['Not required', 'Pending', 'Approved', 'Rejected'].map((value) => <option key={value}>{value}</option>)}
                      </select>
                    </label>
                    <label className="record-form-field">
                      <span>Impact</span>
                      <input type="number" min="0" value={itemDraft.impact} disabled={!editingItem} onChange={(event) => setItemDraft((current) => current ? { ...current, impact: Number(event.target.value) } : current)} />
                    </label>
                    <label className="record-form-field span-2">
                      <span>Evidence Source</span>
                      <input value={itemDraft.evidenceSource} disabled={!editingItem} onChange={(event) => setItemDraft((current) => current ? { ...current, evidenceSource: event.target.value } : current)} />
                    </label>
                    <label className="record-form-field span-2">
                      <span>Next Step</span>
                      <input value={itemDraft.nextStep} disabled={!editingItem} onChange={(event) => setItemDraft((current) => current ? { ...current, nextStep: event.target.value } : current)} />
                    </label>
                    <label className="check-row"><input type="checkbox" checked={itemDraft.evidenceVerified} disabled={!editingItem} onChange={(event) => setItemDraft((current) => current ? { ...current, evidenceVerified: event.target.checked } : current)} /> Evidence verified</label>
                    <label className="check-row"><input type="checkbox" checked={itemDraft.escalated} disabled={!editingItem} onChange={(event) => setItemDraft((current) => current ? { ...current, escalated: event.target.checked } : current)} /> Escalated</label>
                  </div>
                  <div className="record-modal-actions">
                    <button className="button primary" type="button" onClick={() => editingItem ? saveWorkItem() : setEditingItem(true)}>{editingItem ? 'Save changes' : 'Edit'}</button>
                    <button className="button danger" type="button" onClick={deleteSelectedWorkItem}>Delete</button>
                    <button className="button secondary" type="button" onClick={() => setSelectedItem(null)}>Cancel</button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="feature-section-gap">
            <details className="card feature-disclosure">
              <summary>Supporting controls and activity <span>Quick actions, control checks, and audit history</span></summary>
              <div className="feature-disclosure-body stack">
                <div className="grid columns-2">
                  <div>
                    <h3>Quick Actions</h3>
                    <div className="inline-links">
                      {surface.quickActions.map((item) => <button key={item} className="tag-link" type="button" onClick={() => runQuickAction(item)}>{item}</button>)}
                    </div>
                  </div>
                  <div>
                    <h3>Control Checks</h3>
                    <ul className="feature-list">
                      {surface.controlChecks.map((item) => <li key={item.id}><label className="check-row"><input type="checkbox" checked={item.done} onChange={() => toggleCheck(item.id)} /><span>{item.label}</span></label></li>)}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3>Recent Activity</h3>
                  <div className="activity-log">
                    {surface.activityLog.map((item) => <div key={item.id} className="activity-row"><div className="muted" style={{ fontSize: 12 }}>{item.at}</div><div>{item.message}</div></div>)}
                  </div>
                </div>
              </div>
            </details>
          </div>

          {entitySeed ? (
            <div className="feature-section-gap">
              <details className="card feature-disclosure">
                <summary>Records workspace <span>Browse, add, edit, and approve feature records</span></summary>
                <div className="feature-disclosure-body"><EntityWorkspace slug={slug} seed={entitySeed} /></div>
              </details>
            </div>
          ) : null}

          {slug === 'documents' ? (
            <div className="feature-section-gap">
              <details className="card feature-disclosure">
                <summary>Document workspace <span>Upload, inspect, and govern documents</span></summary>
                <div className="feature-disclosure-body"><DocumentsWorkspace /></div>
              </details>
            </div>
          ) : null}
        </>
      ) : null}
    </UnifiedShell>
  );
}
