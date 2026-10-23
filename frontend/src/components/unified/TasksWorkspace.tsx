'use client';
import { useEffect, useState } from 'react';
import type { TaskItem } from '@/lib/featurePack';
export default function TasksWorkspace(){
  const [tasks,setTasks]=useState<TaskItem[]>([]); const [q,setQ]=useState(''); const [status,setStatus]=useState(''); const [title,setTitle]=useState(''); const [error,setError]=useState('');
  async function load(){const r=await fetch('/api/tasks?q='+encodeURIComponent(q)+'&status='+encodeURIComponent(status),{cache:'no-store'}); if(r.ok){const j=await r.json(); setTasks(j.tasks||[])}}
  useEffect(()=>{void load()},[q,status]);
  async function create(){if(!title.trim())return; const r=await fetch('/api/tasks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title})}); if(!r.ok){setError('Could not create task');return} setTitle(''); void load()}
  async function cycle(t:TaskItem){const next=t.status==='todo'?'in_progress':t.status==='in_progress'?'done':'todo'; await fetch('/api/tasks/'+t.id,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({status:next})}); void load()}
  return <div className="card"><h3>Tasks</h3><div className="toolbar-row"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search tasks" aria-label="Search tasks"/><select value={status} onChange={e=>setStatus(e.target.value)} aria-label="Filter by status"><option value="">All statuses</option><option value="todo">Todo</option><option value="in_progress">In progress</option><option value="done">Done</option></select></div><div className="toolbar-row"><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New task title" aria-label="New task title"/><button className="button primary" type="button" onClick={create} disabled={!title.trim()}>Create task</button></div>{error?<div style={{color:'#b91c1c'}}>{error}</div>:null}<ul className="feature-list">{tasks.map(t=><li key={t.id}><strong>{t.title}</strong> — {t.status} · {t.owner} <button className="button subtle" type="button" onClick={()=>cycle(t)}>Advance status</button></li>)}</ul>{!tasks.length?<p className="muted">No tasks found.</p>:null}</div>;
}
