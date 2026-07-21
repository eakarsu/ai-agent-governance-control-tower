import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE } from '@/lib/auth';
import { destroySession } from '@/lib/serverAuth';

export async function POST(request: NextRequest) {
  await destroySession(request.cookies.get(AUTH_COOKIE)?.value);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    path: '/',
    maxAge: 0,
  });
  return response;
}
