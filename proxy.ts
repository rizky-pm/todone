import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './app/lib/auth';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  const isAuthRoute = pathname === '/sign-in' || pathname === '/sign-up';
  const isApiRoute = pathname.startsWith('/api');

  // Allow auth endpoints unprotected
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const user = verifyToken(token);

  // If token exists but is invalid/expired -> clear cookie + force sign-in
  if (token && !user) {
    const res = NextResponse.redirect(new URL('/sign-in', req.url));
    res.cookies.delete('token');
    return res;
  }

  // If NOT logged in
  if (!user) {
    // allow visiting /sign-in and /sign-up without redirect loop
    if (isAuthRoute) return NextResponse.next();

    const res = NextResponse.redirect(new URL('/sign-in', req.url));
    res.cookies.delete('token');
    return res;
  }

  // If logged in but tries to access /sign-in or /sign-up -> redirect to dashboard
  if (isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 6) If route is an API path -> attach userId to request
  if (isApiRoute) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', user.id);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 7) All other authenticated pages -> allow
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*', '/sign-in', '/sign-up'],
};
