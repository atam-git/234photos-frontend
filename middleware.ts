import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Auth middleware logic would go here
  // Check for authentication token, redirect if needed
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/upload/:path*',
    '/boards/:path*',
    '/team/:path*',
    '/admin/:path*',
  ],
};
