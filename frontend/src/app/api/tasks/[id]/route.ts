import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/requestAuth';
import { listTasks, saveTasks } from '@/lib/taskStore';
export async function PATCH(request:NextRequest,{params}:{params:{id:string}}){
  const s=await requireSession(request); if(s instanceof NextResponse) return s;
  const b=await request.json().catch(()=>null) as any; if(!b) return NextResponse.json({error:'Invalid payload'},{status:400});
  const all=await listTasks(); const i=all.findIndex(t=>t.id===params.id); if(i<0) return NextResponse.json({error:'Not found'},{status:404});
  const next={...all[i],title:b.title!==undefined?String(b.title).trim():all[i].title,description:b.description!==undefined?String(b.description):all[i].description,status:['todo','in_progress','done'].includes(b.status)?b.status:all[i].status,priority:b.priority!==undefined?String(b.priority):all[i].priority,owner:b.owner!==undefined?String(b.owner):all[i].owner,dueDate:b.dueDate!==undefined?String(b.dueDate):all[i].dueDate,entitySlug:b.entitySlug!==undefined?String(b.entitySlug):all[i].entitySlug,updatedAt:new Date().toISOString()};
  if(!next.title) return NextResponse.json({error:'title required'},{status:400});
  all[i]=next; await saveTasks(all); return NextResponse.json({task:next});
}
export async function GET(request:NextRequest,{params}:{params:{id:string}}){
  const s=await requireSession(request); if(s instanceof NextResponse) return s;
  const t=(await listTasks()).find(x=>x.id===params.id); if(!t) return NextResponse.json({error:'Not found'},{status:404});
  return NextResponse.json({task:t});
}
