"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Settings,
  DollarSign,
  LogOut,
  Headphones,
  MapPin,
  BookText,
  ChevronRight,
  ChevronDown,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    content: false,
    places: false,
  })

  // Listen for sidebar toggle events from header
  useEffect(() => {
    const handleToggle = (e: CustomEvent) => {
      setIsOpen(e.detail.isOpen)
    }

    // Initialize from localStorage
    const savedState = localStorage.getItem("adminSidebarOpen")
    if (savedState !== null) {
      setIsOpen(savedState === "true")
    }

    // Initialize expanded groups from localStorage
    const savedGroups = localStorage.getItem("adminExpandedGroups")
    if (savedGroups) {
      setExpandedGroups(JSON.parse(savedGroups))
    }

    window.addEventListener("toggle-sidebar" as any, handleToggle as EventListener)
    return () => window.removeEventListener("toggle-sidebar" as any, handleToggle as EventListener)
  }, [])

  // Save expanded groups to localStorage
  useEffect(() => {
    localStorage.setItem("adminExpandedGroups", JSON.stringify(expandedGroups))
  }, [expandedGroups])

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") {
      return true
    }
    return pathname !== "/admin" && pathname?.startsWith(path)
  }

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  // Main navigation items
  const mainNavItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
  ]

  // Content management group
  const contentItems = [
    { name: "Books", href: "/admin/books", icon: BookOpen },
    { name: "Teachings", href: "/admin/teachings", icon: FileText },
    { name: "Audiobooks", href: "/admin/audiobooks", icon: Headphones },
    { name: "Stories", href: "/admin/stories", icon: BookText },
  ]

  // Places management group
  const placesItems = [{ name: "Religious Places", href: "/admin/religious-places", icon: MapPin }]

  // Other items
  const otherItems = [
    { name: "Donations", href: "/admin/donations", icon: DollarSign },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  // Initialize expanded groups based on current path
  useEffect(() => {
    const shouldExpandContent = contentItems.some((item) => pathname !== "/admin" && pathname?.startsWith(item.href))

    const shouldExpandPlaces = placesItems.some((item) => pathname !== "/admin" && pathname?.startsWith(item.href))

    // Only update if the expansion state needs to change
    if (shouldExpandContent !== expandedGroups.content || shouldExpandPlaces !== expandedGroups.places) {
      setExpandedGroups((prev) => ({
        ...prev,
        content: shouldExpandContent,
        places: shouldExpandPlaces,
      }))
    }
  }, [pathname, expandedGroups.content, expandedGroups.places, contentItems, placesItems])

  return (
    <aside
      className={`fixed lg:relative top-16 bottom-0 left-0 z-20 
                 ${isOpen ? "w-64" : "w-0 lg:w-20"} 
                 bg-white border-r transition-all duration-300 overflow-hidden`}
    >
      {/* Navigation */}
      <nav className={`flex flex-col h-full ${isOpen ? "p-4" : "p-0 lg:p-4"} space-y-1 overflow-y-auto`}>
        {/* Main Items */}
        {mainNavItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href) ? "bg-amber-50 text-amber-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>{item.name}</span>}
            </Link>
          )
        })}

        {/* Content Management Group */}
        <div className="pt-2">
          <button
            onClick={() => toggleGroup("content")}
            className={`w-full flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100`}
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>Content</span>}
            </div>
            {isOpen &&
              (expandedGroups.content ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
          </button>

          {isOpen && expandedGroups.content && (
            <div className="ml-4 mt-1 space-y-1 border-l pl-3">
              {contentItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href) ? "bg-amber-50 text-amber-600" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Places Management Group */}
        <div className="pt-2">
          <button
            onClick={() => toggleGroup("places")}
            className={`w-full flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100`}
          >
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>Places</span>}
            </div>
            {isOpen &&
              (expandedGroups.places ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
          </button>

          {isOpen && expandedGroups.places && (
            <div className="ml-4 mt-1 space-y-1 border-l pl-3">
              {placesItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href) ? "bg-amber-50 text-amber-600" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Other Items */}
        <div className="pt-2">
          {otherItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href) ? "bg-amber-50 text-amber-600" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span>{item.name}</span>}
              </Link>
            )
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto pt-4 border-t">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span>Sign Out</span>}
          </Link>
        </div>
      </nav>

      {/* Mobile overlay when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden ${isOpen ? "block" : "hidden"}`}
        onClick={() => {
          setIsOpen(false)
          window.dispatchEvent(new CustomEvent("toggle-sidebar", { detail: { isOpen: false } }))
        }}
      />
    </aside>
  )
}

