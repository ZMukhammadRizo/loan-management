import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Temporarily allow all routes for frontend development
  // TODO: Re-enable authentication when Supabase is configured
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/broker/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
