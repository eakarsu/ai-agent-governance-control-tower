import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE, canApprove, canManageDocuments, type SessionUser } from '@/lib/auth';
import { getSessionUser } from '@/lib/serverAuth';

export async function getRequestUser(request: NextRequest): Promise<SessionUser | null> {
  return getSessionUser(request.cookies.get(AUTH_COOKIE)?.value);
}

export async function requireSession(request: NextRequest): Promise<SessionUser | NextResponse> {
  const user = await getRequestUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return user;
}

export async function requireDocumentManager(request: NextRequest): Promise<SessionUser | NextResponse> {
  const user = await getRequestUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!canManageDocuments(user)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return user;
}

export async function requireApprover(request: NextRequest): Promise<SessionUser | NextResponse> {
  const user = await getRequestUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!canApprove(user)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return user;
}
