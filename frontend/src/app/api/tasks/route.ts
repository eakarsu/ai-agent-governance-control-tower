import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/requestAuth';
import { listTasks, saveTasks } from '@/lib/taskStore';
import crypto from 'node:crypto';
export async function GET(request:NextRequest){
  const s=await requireSession(request); if(s instanceof NextResponse) return s;
  const u=request.nextUrl.searchParams; const q=(u.get('q')||'').toLowerCase(), status=u.get('status')||'', priority=u.get('priority')||'';
  const all=await listTasks();
  const tasks=all.filter(t=>(!status||t.status===status)&&(!priority||t.priority===priority)&&(!q||[t.title,t.description,t.owner].join(' ').toLowerCase().includes(q)));
  return NextResponse.json({tasks,total:tasks.length});
}
export async function POST(request:NextRequest){
  const s=await requireSession(request); if(s instanceof NextResponse) return s;
  const b=await request.json().catch(()=>null) as any;
  if(!b?.title?.trim()) return NextResponse.json({error:'title required'},{status:400});
  const now=new Date().toISOString();
  const task={id:crypto.randomUUID(),title:String(b.title).trim(),description:String(b.description||''),status:['todo','in_progress','done'].includes(b.status)?b.status:'todo',priority:String(b.priority||'Medium'),owner:String(b.owner||'Unassigned'),dueDate:String(b.dueDate||''),entitySlug:String(b.entitySlug||''),createdAt:now,updatedAt:now};
  const all=await listTasks(); all.unshift(task as any); await saveTasks(all);
  return NextResponse.json({task},{status:201});
}
