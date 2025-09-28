import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for the whop page
  if (request.nextUrl.pathname.startsWith('/whop')) {
    const response = NextResponse.next()
    
    // Set headers to allow iframe embedding from Whop
    response.headers.set('X-Frame-Options', 'ALLOWALL')
    response.headers.set('Content-Security-Policy', "frame-ancestors 'self' https://*.whop.com https://*.whop.io")
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/whop/:path*',
}
