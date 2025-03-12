import { type NextRequest, NextResponse } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  try {
    // Create a Supabase client configured to use cookies
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })

    // Refresh session if expired - required for Server Components
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Public pages that should always be accessible
    const publicPages = ["/", "/about", "/contact"]
    if (publicPages.includes(request.nextUrl.pathname)) {
      return res
    }

    // Check if the path starts with /admin
    if (request.nextUrl.pathname.startsWith("/admin")) {
      // If no session or user is not an admin, redirect to login
      if (!session || session.user.user_metadata.role !== "admin") {
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
      if (!session) {
        const url = new URL("/auth/login", request.url)
        url.searchParams.set("callbackUrl", request.nextUrl.pathname)
        return NextResponse.redirect(url)
      }
    }

    // Redirect authenticated users from auth pages
    if (
      session &&
      (request.nextUrl.pathname.startsWith("/auth/login") || request.nextUrl.pathname.startsWith("/auth/signup"))
    ) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return res
  } catch (error) {
    console.error("Middleware error:", error)

    // If there's an error with Supabase, still allow access to public pages
    if (
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/about" ||
      request.nextUrl.pathname === "/contact"
    ) {
      return NextResponse.next()
    }

    // For other pages, redirect to login if there's an auth error
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
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

