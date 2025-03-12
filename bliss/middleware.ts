import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard", "/settings", "/admin"]

// Define admin-only routes
const adminRoutes = ["/admin"]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname

  try {
    // Create Supabase client with cookies
    const supabase = createMiddlewareClient({ req, res })

    // Refresh session if expired
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Check if route requires authentication
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
    const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

    // If route is protected and user is not authenticated, redirect to login
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL("/auth/login", req.url)
      redirectUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If route is admin-only, check if user has admin role
    if (isAdminRoute && session) {
      // Get user profile to check role
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

      // If user is not an admin, redirect to dashboard
      if (!profile || profile.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    return res
  } catch (error) {
    console.error("Middleware error:", error)

    // If there's an error, still allow access to public routes
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
    if (isProtectedRoute) {
      const redirectUrl = new URL("/auth/login", req.url)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  }
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

