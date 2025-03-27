"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumb() {
  const pathname = usePathname()

  if (!pathname || pathname === "/") return null

  const pathSegments = pathname.split("/").filter(Boolean)

  // Don't show breadcrumbs on the main admin page
  if (pathSegments.length === 1 && pathSegments[0] === "admin") return null

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`

    // Format the segment name (capitalize, replace hyphens with spaces)
    let name = segment.charAt(0).toUpperCase() + segment.slice(1)
    name = name.replace(/-/g, " ")

    // If it's an ID (like [bookId]), show a generic name
    if (name.match(/^\[.*\]$/)) {
      const entityType = pathSegments[index - 1]
      if (entityType) {
        // Remove trailing 's' if it exists (e.g., "books" -> "book")
        const singularType = entityType.endsWith("s") ? entityType.slice(0, -1) : entityType
        name = `${singularType.charAt(0).toUpperCase() + singularType.slice(1)} Details`
      } else {
        name = "Details"
      }
    }

    return { href, name }
  })

  return (
    <nav className="flex items-center text-sm text-gray-500 mb-4">
      <Link href="/admin" className="flex items-center hover:text-amber-600">
        <Home size={16} />
        <span className="sr-only">Home</span>
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          <ChevronRight size={16} className="mx-2" />
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-gray-900">{breadcrumb.name}</span>
          ) : (
            <Link href={breadcrumb.href} className="hover:text-amber-600">
              {breadcrumb.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

