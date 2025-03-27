import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For now, we'll just pass through all requests
  // When auth is properly configured, we can add protection logic here
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Add protected routes here when auth is working
    // '/dashboard/:path*',
    // '/admin/:path*',
  ],
}

