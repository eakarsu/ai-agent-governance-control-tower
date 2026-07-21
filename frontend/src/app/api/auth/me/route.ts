import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE } from '@/lib/auth';
import { getSessionUser } from '@/lib/serverAuth';

export async function GET(request: NextRequest) {
  const user = await getSessionUser(request.cookies.get(AUTH_COOKIE)?.value);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
