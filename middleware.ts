import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /client, /login)
  const pathname = request.nextUrl.pathname;

  // If the user is accessing the login page, allow it
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // For all other routes, let the client-side auth handle redirects
  // This middleware is mainly for future server-side auth if needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
