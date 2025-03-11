import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

// Keep the imports and function signature the same

// Update the middleware function to explicitly allow public pages
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Public pages that should always be accessible
  const publicPages = ["/", "/about", "/contact"]
  if (publicPages.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // If no token or user is not an admin, redirect to login
    if (!token || token.role !== "admin") {
      const url = new URL("/auth/login", request.url)
      url.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  // Check if the path is for authenticated users only
  if (
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/settings") ||
    request.nextUrl.pathname.startsWith("/bookmarks")
  ) {
    if (!token) {
      const url = new URL("/auth/login", request.url)
      url.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  // Redirect authenticated users from auth pages
  if (
    token &&
    (request.nextUrl.pathname.startsWith("/auth/login") || request.nextUrl.pathname.startsWith("/auth/signup"))
  ) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Update the matcher to include all paths except for the explicitly defined public ones
export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/bookmarks/:path*",
    "/auth/login",
    "/auth/signup",
    "/((?!api|_next/static|_next/image|favicon.ico|about|contact).*)",
  ],
}

