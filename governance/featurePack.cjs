'use strict';
// Wave 10B feature pack: pure, deterministic logic shared by tests and (mirrored) frontend lib.
const TASK_STATUSES=new Set(['todo','in_progress','done']);
function clean(v){return String(v??'').trim()}
function validateTask(input={}){const errors=[];if(!clean(input.title))errors.push('title required');const status=input.status||'todo';if(!TASK_STATUSES.has(status))errors.push('status invalid');return errors}
function createTask(input={},now=new Date(),id){const errors=validateTask(input);if(errors.length)return{errors,task:null};return{errors,task:{id:String(id||('task-'+now.getTime())),title:clean(input.title),description:clean(input.description),status:input.status||'todo',priority:clean(input.priority)||'Medium',owner:clean(input.owner)||'Unassigned',dueDate:clean(input.dueDate),entitySlug:clean(input.entitySlug),createdAt:now.toISOString(),updatedAt:now.toISOString()}}}
function updateTask(task,input={},now=new Date()){if(!task)return{errors:['task not found'],task:null};const next={...task,...input,id:task.id,createdAt:task.createdAt,updatedAt:now.toISOString()};if(input.title!==undefined)next.title=clean(input.title);const errors=validateTask(next);if(errors.length)return{errors,task:null};return{errors,task:next}}
function filterTasks(tasks=[],{q='',status='',priority=''}={}){const needle=clean(q).toLowerCase();return tasks.filter(t=>(!status||t.status===status)&&(!priority||t.priority===priority)&&(!needle||[t.title,t.description,t.owner,t.status,t.priority].join(' ').toLowerCase().includes(needle)))}
function filterRecords(rows=[],{q='',status='',owner='',priority=''}={}){const needle=clean(q).toLowerCase();return rows.filter(r=>(!status||r.status===status)&&(!owner||r.owner===owner)&&(!priority||(r.priority||'')===priority)&&(!needle||[r.name,r.owner,r.status,r.priority,r.id].join(' ').toLowerCase().includes(needle)))}
function csvCell(v){const s=v===null||v===undefined?'':String(v);return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s}
function recordsToCsv(rows=[],columns=['id','name','status','owner','amount','dueDate','priority']){return [columns.join(','),...rows.map(r=>columns.map(c=>csvCell(r[c])).join(','))].join('\n')+'\n'}
function recordsToJson(slug,set){return JSON.stringify({slug,title:set?.title||'',columns:set?.columns||[],rows:set?.rows||[],exportedCount:(set?.rows||[]).length},null,2)}
function parseAmount(v){const n=Number(String(v??'').replace(/[^0-9.-]/g,''));return Number.isFinite(n)?n:0}
function summarize(rows=[],now=new Date()){
  const byStatus={};let urgentCount=0,overdueCount=0,unassignedCount=0,undatedCount=0,exceptionCount=0,totalAmount=0;
  for(const r of rows){byStatus[r.status]=(byStatus[r.status]||0)+1;const p=String(r.priority||'').toLowerCase();if(p==='urgent'||p==='high'||String(r.status||'').toLowerCase()==='urgent')urgentCount++;if(!r.owner||r.owner==='Unassigned')unassignedCount++;if(!r.dueDate)undatedCount++;else if(Date.parse(r.dueDate)<now.getTime()&&r.status!=='Completed'&&r.status!=='done')overdueCount++;if(String(r.status||'').toLowerCase().includes('exception'))exceptionCount++;totalAmount+=parseAmount(r.amount)}
  return {totalRecords:rows.length,byStatus,urgentCount,overdueCount,unassignedCount,undatedCount,exceptionCount,totalAmount,hasUrgent:urgentCount>0,hasOverdue:overdueCount>0,ready:exceptionCount===0&&unassignedCount===0}
}
const FEATURES=[{"id": "agent-risk-triage", "title": "Agent Risk Triage", "description": "Ranks registered agents/records by urgency, overdue status and exception status."}, {"id": "approval-bottleneck-review", "title": "Approval Bottleneck Review", "description": "Finds approval-pending and in-review records grouped by owner."}, {"id": "evidence-gap-check", "title": "Evidence Gap Check", "description": "Flags unassigned, undated and exception records that lack evidence readiness."}];
function runFallback(featureId,rows=[],now=new Date()){
  const feature=FEATURES.find(f=>f.id===featureId)||FEATURES[0];const s=summarize(rows,now);
  const attention=rows.filter(r=>String(r.priority||'').toLowerCase()==='urgent'||String(r.status||'').toLowerCase().includes('exception')||(r.dueDate&&Date.parse(r.dueDate)<now.getTime()&&r.status!=='Completed')).slice(0,10).map(r=>({id:r.id,name:r.name,status:r.status,owner:r.owner||'Unassigned',dueDate:r.dueDate||'',priority:r.priority||''}));
  let focus='overview';
  if(feature.id.includes('bottleneck')||feature.id.includes('decision'))focus='approvals';else if(feature.id.includes('gap')||feature.id.includes('readiness'))focus='gaps';else if(feature.id.includes('exposure')||feature.id.includes('capacity'))focus='exposure';
  return {aiGenerated:false,provider:'deterministic-fallback',featureId:feature.id,featureTitle:feature.title,focus,summary:s,attentionItems:attention,emptyAttention:attention.length===0,nextActions:attention.length?attention.map(r=>'Follow up '+r.name+' with '+(r.owner||'Unassigned')):['No urgent items — keep monitoring'],note:'Deterministic fallback — not AI-generated. Configure OPENROUTER_API_KEY or OPENAI_API_KEY for provider output.'};
}
function hasProviderConfig(env=process.env){return Boolean(env.OPENROUTER_API_KEY||env.OPENAI_API_KEY)}
module.exports={TASK_STATUSES,validateTask,createTask,updateTask,filterTasks,filterRecords,recordsToCsv,recordsToJson,summarize,FEATURES,runFallback,hasProviderConfig};
