import { NextRequest, NextResponse } from 'next/server';
import { getEntitySet } from '@/lib/entityStore';
import { requireSession } from '@/lib/requestAuth';
import { recordsToCsv } from '@/lib/featurePack';
export async function GET(request:NextRequest,{params}:{params:{slug:string}}){
  const s=await requireSession(request); if(s instanceof NextResponse) return s;
  const set=await getEntitySet(params.slug); if(!set) return NextResponse.json({error:'Not found'},{status:404});
  const u=request.nextUrl.searchParams; const q=(u.get('q')||'').toLowerCase(), status=u.get('status')||'', owner=u.get('owner')||'';
  const rows=set.rows.filter(r=>(!status||r.status===status)&&(!owner||r.owner===owner)&&(!q||[r.name,r.owner,r.status].join(' ').toLowerCase().includes(q)));
  const fmt=(u.get('format')||'json').toLowerCase();
  if(fmt==='csv'){return new NextResponse(recordsToCsv(rows as any),{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="'+params.slug+'.csv"'}})}
  return NextResponse.json({slug:params.slug,title:set.title,columns:set.columns,rows,exportedCount:rows.length},{headers:{'Content-Disposition':'attachment; filename="'+params.slug+'.json"'}});
}
