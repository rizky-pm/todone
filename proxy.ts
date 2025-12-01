import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './app/lib/auth';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;

  if (!token) {
    if (pathname === '/sign-in' || pathname === '/sign-up') {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const user = verifyToken(token);

  if (!user) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (pathname === '/sign-in' || pathname === '/sign-up') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*', '/sign-in', '/sign-up'],
};
