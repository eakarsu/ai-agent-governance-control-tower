import { NextRequest, NextResponse } from 'next/server';
import { getEntitySet, resetEntitySet, saveEntitySet } from '@/lib/entityStore';
import { requireDocumentManager, requireSession } from '@/lib/requestAuth';
import { filterRecords } from '@/lib/featurePack';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const session = await requireSession(request);
  if (session instanceof NextResponse) return session;
  const set = await getEntitySet(params.slug);
  if (!set) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const u = request.nextUrl.searchParams;
  const q = u.get('q') || '', status = u.get('status') || '', owner = u.get('owner') || '', priority = u.get('priority') || '';
  if (!q && !status && !owner && !priority) return NextResponse.json(set);
  const rows = filterRecords(set.rows as unknown as Array<Record<string, unknown>>, { q, status, owner, priority }) as unknown as typeof set.rows;
  return NextResponse.json({ ...set, rows, total: set.rows.length, filteredCount: rows.length });
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  const session = await requireDocumentManager(request);
  if (session instanceof NextResponse) return session;
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  await saveEntitySet(params.slug, body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: { slug: string } }) {
  const session = await requireDocumentManager(_);
  if (session instanceof NextResponse) return session;
  const reset = await resetEntitySet(params.slug);
  if (!reset) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(reset);
}
