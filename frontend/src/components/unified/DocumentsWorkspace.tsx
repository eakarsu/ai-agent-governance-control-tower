'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { DocumentRecord } from '@/lib/documentStore';
import { useAuth } from '@/components/providers/AuthProvider';
import { rolePermissions } from '@/lib/auth';

export default function DocumentsWorkspace() {
  const { user } = useAuth();
  const canManage = rolePermissions[user?.role || 'analyst'].canManageDocuments;
  const [items, setItems] = useState<DocumentRecord[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', type: '', owner: '' });
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentRecord | null>(null);
  const [documentDraft, setDocumentDraft] = useState<DocumentRecord | null>(null);
  const [editingDocument, setEditingDocument] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    void fetch('/api/documents', { cache: 'no-store' })
      .then((response) => response.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  useEffect(() => {
    if (!items.length) return;
    if (!canManage) {
      setSaving(false);
      return;
    }
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    setSaving(true);
    saveTimeout.current = setTimeout(async () => {
      const response = await fetch('/api/documents', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
      if (!response.ok) {
        setError('Unable to save document changes for this role.');
      } else {
        setError('');
      }
      setSaving(false);
    }, 350);
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [canManage, items]);

  const addDocument = () => {
    if (!canManage) return;
    if (!form.name.trim()) return;
    setItems((current) => [
      {
        id: `doc-${Date.now()}`,
        name: form.name.trim(),
        type: form.type.trim() || 'Healthcare Document',
        owner: form.owner.trim() || 'Unassigned',
        status: 'Draft',
        updatedAt: new Date().toLocaleString(),
      },
      ...current,
    ]);
    setForm({ name: '', type: '', owner: '' });
  };

  const removeItem = (id: string) => {
    if (!canManage) return;
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const openDocument = (item: DocumentRecord) => {
    setSelectedDocument(item);
    setDocumentDraft({ ...item });
    setEditingDocument(false);
  };

  const saveDocument = () => {
    if (!canManage || !documentDraft) return;
    const updated = { ...documentDraft, updatedAt: new Date().toLocaleString() };
    setItems((current) => current.map((item) => item.id === updated.id ? updated : item));
    setSelectedDocument(updated);
    setDocumentDraft(updated);
    setEditingDocument(false);
  };

  const deleteSelectedDocument = () => {
    if (!canManage || !selectedDocument) return;
    removeItem(selectedDocument.id);
    setSelectedDocument(null);
    setDocumentDraft(null);
    setEditingDocument(false);
  };

  const uploadDocument = async () => {
    if (!selectedFile || !canManage) return;
    const payload = new FormData();
    payload.append('file', selectedFile);
    payload.append('owner', form.owner || user?.firstName || 'Unassigned');
    payload.append('type', form.type || 'Healthcare Document');
    setUploading(true);
    const response = await fetch('/api/documents/upload', { method: 'POST', body: payload });
    setUploading(false);
    if (!response.ok) {
      setError('Upload failed for this role.');
      return;
    }
    const record = (await response.json()) as DocumentRecord;
    setItems((current) => [record, ...current]);
    setSelectedFile(null);
    setError('');
  };

  return (
    <div className="card">
      <div className="section-head">
        <h3>Documents Workspace</h3>
        <span className="save-indicator">{saving ? 'Saving...' : 'Saved'}</span>
      </div>
      <div className="muted" style={{ marginBottom: 12 }}>{canManage ? 'Edit mode' : 'Read-only mode'}</div>
      {error ? <div style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</div> : null}
      <div className="work-item-form">
        <input value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} placeholder="Document name" disabled={!canManage} />
        <input value={form.type} onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))} placeholder="Document type" disabled={!canManage} />
        <input value={form.owner} onChange={(e) => setForm((s) => ({ ...s, owner: e.target.value }))} placeholder="Owner" disabled={!canManage} />
        <button className="button primary" type="button" onClick={addDocument} disabled={!canManage}>Add document</button>
      </div>
      <div className="work-item-form">
        <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} disabled={!canManage} />
        <div className="muted">{selectedFile ? selectedFile.name : 'No file selected'}</div>
        <div />
        <button className="button" type="button" onClick={uploadDocument} disabled={!selectedFile || !canManage}>
          {uploading ? 'Uploading...' : 'Upload file'}
        </button>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Updated</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="clickable-data-row"
                tabIndex={0}
                onClick={() => openDocument(item)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openDocument(item);
                  }
                }}
              >
                <td><strong>{item.name}</strong></td>
                <td>{item.type}</td>
                <td>{item.owner}</td>
                <td><span className="status-chip">{item.status}</span></td>
                <td>{item.updatedAt}</td>
                <td>
                  {item.storagePath ? (
                    <Link className="button subtle" href={`/api/documents/${item.id}/download`} onClick={(event) => event.stopPropagation()}>
                      Download
                    </Link>
                  ) : (
                    <span className="muted">No file</span>
                  )}
                </td>
                <td><button className="button subtle" type="button" onClick={(event) => { event.stopPropagation(); openDocument(item); }}>Open</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDocument && documentDraft ? (
        <div className="record-modal-backdrop" role="presentation" onClick={() => setSelectedDocument(null)}>
          <div className="record-modal" role="dialog" aria-modal="true" aria-label={'Document: ' + selectedDocument.name} onClick={(event) => event.stopPropagation()}>
            <button className="record-modal-close" type="button" aria-label="Close document dialog" onClick={() => setSelectedDocument(null)}>
              <X size={18} aria-hidden="true" />
            </button>
            <div className="record-modal-header">
              <div>
                <span className="eyebrow">{editingDocument ? 'Edit Document' : 'Document Details'}</span>
                <h2>{selectedDocument.name}</h2>
                <p>Database-backed document metadata and governed file access.</p>
              </div>
            </div>
            <div className="record-form-grid">
              <label className="record-form-field span-2">
                <span>Name</span>
                <input value={documentDraft.name} disabled={!editingDocument} onChange={(event) => setDocumentDraft((current) => current ? { ...current, name: event.target.value } : current)} />
              </label>
              <label className="record-form-field">
                <span>Type</span>
                <input value={documentDraft.type} disabled={!editingDocument} onChange={(event) => setDocumentDraft((current) => current ? { ...current, type: event.target.value } : current)} />
              </label>
              <label className="record-form-field">
                <span>Owner</span>
                <input value={documentDraft.owner} disabled={!editingDocument} onChange={(event) => setDocumentDraft((current) => current ? { ...current, owner: event.target.value } : current)} />
              </label>
              <label className="record-form-field span-2">
                <span>Status</span>
                <select value={documentDraft.status} disabled={!editingDocument} onChange={(event) => setDocumentDraft((current) => current ? { ...current, status: event.target.value } : current)}>
                  {['Draft', 'In review', 'Approval pending', 'Ready', 'Archived'].map((status) => <option key={status}>{status}</option>)}
                </select>
              </label>
            </div>
            <div className="record-modal-actions">
              <button className="button primary" type="button" disabled={!canManage} onClick={() => editingDocument ? saveDocument() : setEditingDocument(true)}>{editingDocument ? 'Save changes' : 'Edit'}</button>
              <button className="button danger" type="button" disabled={!canManage} onClick={deleteSelectedDocument}>Delete</button>
              <button className="button secondary" type="button" onClick={() => setSelectedDocument(null)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
