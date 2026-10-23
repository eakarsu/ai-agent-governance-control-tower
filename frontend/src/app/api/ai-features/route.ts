import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/requestAuth';
import { getEntitySet } from '@/lib/entityStore';
import { AI_FEATURES, runFallback, runProvider, hasProviderConfig } from '@/lib/featurePack';
export async function GET(request:NextRequest){const s=await requireSession(request); if(s instanceof NextResponse) return s; return NextResponse.json({features:AI_FEATURES,providerConfigured:hasProviderConfig()})}
export async function POST(request:NextRequest){
  const s=await requireSession(request); if(s instanceof NextResponse) return s;
  const b=await request.json().catch(()=>null) as any;
  const feature=AI_FEATURES.find(f=>f.id===b?.featureId)||AI_FEATURES[0];
  const slug=String(b?.slug||''); const set=slug?await getEntitySet(slug):null;
  const rows=(set?.rows||[]) as unknown as Array<Record<string,unknown>>;
  if(hasProviderConfig()){
    try{const out=await runProvider(feature,rows,request.signal); if(out) return NextResponse.json({...out,feature,slug});}catch{return NextResponse.json({error:'Provider request failed'},{status:502})}
  }
  return NextResponse.json({...runFallback(feature.id,rows),feature,slug});
}
