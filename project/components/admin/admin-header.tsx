"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  Bell,
  Search,
  User,
  ChevronDown,
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
  Grid,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AdminHeader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileView, setIsMobileView] = useState(false)
  const pathname = usePathname()

  // Toggle sidebar state in localStorage for persistence
  const toggleSidebar = () => {
    const newState = !isSidebarOpen
    setIsSidebarOpen(newState)
    localStorage.setItem("adminSidebarOpen", String(newState))
    window.dispatchEvent(new CustomEvent("toggle-sidebar", { detail: { isOpen: newState } }))
  }

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024)
      if (window.innerWidth < 1024 && isSidebarOpen) {
        setIsSidebarOpen(false)
        window.dispatchEvent(new CustomEvent("toggle-sidebar", { detail: { isOpen: false } }))
      }
    }

    // Initialize from localStorage
    const savedState = localStorage.getItem("adminSidebarOpen")
    if (savedState !== null) {
      const isOpen = savedState === "true"
      setIsSidebarOpen(isOpen)
      window.dispatchEvent(new CustomEvent("toggle-sidebar", { detail: { isOpen } }))
    }

    checkMobileView()
    window.addEventListener("resize", checkMobileView)
    return () => window.removeEventListener("resize", checkMobileView)
  }, [isSidebarOpen]) // Added isSidebarOpen to dependencies

  // Get page title based on current path
  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard"
    if (pathname.startsWith("/admin/users")) return "Users"
    if (pathname.startsWith("/admin/books")) return "Books"
    if (pathname.startsWith("/admin/teachings")) return "Teachings"
    if (pathname.startsWith("/admin/audiobooks")) return "Audiobooks"
    if (pathname.startsWith("/admin/stories")) return "Stories"
    if (pathname.startsWith("/admin/religious-places")) return "Religious Places"
    if (pathname.startsWith("/admin/donations")) return "Donations"
    if (pathname.startsWith("/admin/settings")) return "Settings"
    if (pathname.startsWith("/admin/cms")) return "CMS"
    return "Admin"
  }

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") {
      return true
    }
    return pathname !== "/admin" && pathname?.startsWith(path)
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

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-30">
      {/* Top bar with logo, search and user menu */}
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <div className="p-4 border-b">
                <Link href="/admin" className="flex items-center">
                  <span className="text-xl font-bold text-amber-600">Bliss Admin</span>
                </Link>
              </div>
              <nav className="p-4 space-y-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 mb-2">Main</p>
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
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 mb-2">Content</p>
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

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 mb-2">Places</p>
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

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 mb-2">Other</p>
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
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>

                <div className="pt-4 border-t">
                  <Link
                    href="/api/auth/signout"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/admin" className="flex items-center">
            <span className="text-xl font-bold text-amber-600">Bliss Admin</span>
          </Link>

          <div className="hidden md:block">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <Button variant="ghost" size="icon" className="text-gray-600">
            <Bell size={20} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <User size={18} className="text-amber-600" />
                </div>
                <span className="hidden md:inline">Admin User</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/admin/settings" className="w-full">
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/admin" className="w-full">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/api/auth/signout" className="w-full">
                  Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Desktop navigation menu */}
      <nav className="border-t hidden lg:block">
        <div className="container mx-auto px-4">
          <ul className="flex">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      isActive(item.href)
                        ? "border-amber-600 text-amber-600"
                        : "border-transparent text-gray-600 hover:text-amber-600 hover:border-amber-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              )
            })}

            {/* Content dropdown */}
            <li className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "content" ? null : "content")}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  contentItems.some((item) => isActive(item.href))
                    ? "border-amber-600 text-amber-600"
                    : "border-transparent text-gray-600 hover:text-amber-600 hover:border-amber-200"
                }`}
              >
                <Grid className="h-4 w-4" />
                Content
                <ChevronDown className="h-3 w-3" />
              </button>
              {activeDropdown === "content" && (
                <div className="absolute left-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-50">
                  {contentItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          isActive(item.href) ? "bg-amber-50 text-amber-600" : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </li>

            {/* Places dropdown */}
            <li className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "places" ? null : "places")}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  placesItems.some((item) => isActive(item.href))
                    ? "border-amber-600 text-amber-600"
                    : "border-transparent text-gray-600 hover:text-amber-600 hover:border-amber-200"
                }`}
              >
                <MapPin className="h-4 w-4" />
                Places
                <ChevronDown className="h-3 w-3" />
              </button>
              {activeDropdown === "places" && (
                <div className="absolute left-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-50">
                  {placesItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          isActive(item.href) ? "bg-amber-50 text-amber-600" : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </li>

            {/* Other items */}
            {otherItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                      isActive(item.href)
                        ? "border-amber-600 text-amber-600"
                        : "border-transparent text-gray-600 hover:text-amber-600 hover:border-amber-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </header>
  )
}

