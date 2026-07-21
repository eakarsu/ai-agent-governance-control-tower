import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE } from '@/lib/auth';
import { authenticateUser, createSession } from '@/lib/serverAuth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = body?.email ?? '';
  const password = body?.password ?? '';

  const user = await authenticateUser(email, password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ user });
  response.cookies.set(AUTH_COOKIE, await createSession(user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}
