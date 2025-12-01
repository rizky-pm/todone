import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Signed out', status: 200 });

  const isProd = process.env.NODE_ENV === 'production';
  res.headers.set(
    'Set-Cookie',
    `token=deleted; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; Secure=${isProd}`
  );

  return res;
}
