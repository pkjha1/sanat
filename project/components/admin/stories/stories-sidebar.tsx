"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  FileText,
  FolderOpen,
  Folder,
  MoreHorizontal,
  Home,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type WorkspaceItem = {
  id: string
  name: string
  type: "folder" | "page"
  children?: WorkspaceItem[]
  expanded?: boolean
}

export function StoriesSidebar() {
  const pathname = usePathname()
  const [sidebarWidth, setSidebarWidth] = useState(280)
  const [isResizing, setIsResizing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)
  const [isStoriesSidebarOpen, setIsStoriesSidebarOpen] = useState(true)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Sample workspace data - this would come from your database
  const [workspace, setWorkspace] = useState<WorkspaceItem[]>([
    {
      id: "1",
      name: "Fantasy Stories",
      type: "folder",
      expanded: true,
      children: [
        { id: "1-1", name: "The Dragon's Quest", type: "page" },
        { id: "1-2", name: "Enchanted Forest", type: "page" },
        {
          id: "1-3",
          name: "Character Profiles",
          type: "folder",
          expanded: false,
          children: [
            { id: "1-3-1", name: "Heroes", type: "page" },
            { id: "1-3-2", name: "Villains", type: "page" },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Science Fiction",
      type: "folder",
      expanded: false,
      children: [
        { id: "2-1", name: "Space Odyssey", type: "page" },
        { id: "2-2", name: "Time Travelers", type: "page" },
      ],
    },
    { id: "3", name: "Story Ideas", type: "page" },
    { id: "4", name: "Writing Tips", type: "page" },
  ])

  const toggleExpand = (itemId: string) => {
    setWorkspace((prevWorkspace) => {
      const updateItem = (items: WorkspaceItem[]): WorkspaceItem[] => {
        return items.map((item) => {
          if (item.id === itemId) {
            return { ...item, expanded: !item.expanded }
          }
          if (item.children) {
            return { ...item, children: updateItem(item.children) }
          }
          return item
        })
      }
      return updateItem(prevWorkspace)
    })
  }

  const startResizing = () => {
    setIsResizing(true)

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = e.clientX
      if (newWidth > 180 && newWidth < 480) {
        setSidebarWidth(newWidth)
      }
    }

    const onMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  // Check for mobile view and handle sidebar state
  useEffect(() => {
    const checkMobileView = () => {
      const isMobile = window.innerWidth < 768
      setIsMobileView(isMobile)
      if (isMobile && isStoriesSidebarOpen) {
        setIsStoriesSidebarOpen(false)
      }
    }

    // Initialize from localStorage
    const savedState = localStorage.getItem("storiesSidebarOpen")
    if (savedState !== null) {
      setIsStoriesSidebarOpen(savedState === "true")
    }

    checkMobileView()
    window.addEventListener("resize", checkMobileView)
    return () => {
      window.removeEventListener("resize", checkMobileView)
      document.removeEventListener("mousemove", () => {})
      document.removeEventListener("mouseup", () => {})
    }
  }, [isStoriesSidebarOpen])

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem("storiesSidebarOpen", String(isStoriesSidebarOpen))
  }, [isStoriesSidebarOpen])

  // Handle clicks outside the sidebar to close it on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileView &&
        isStoriesSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsStoriesSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileView, isStoriesSidebarOpen])

  const toggleStoriesSidebar = () => {
    setIsStoriesSidebarOpen((prev) => !prev)
  }

  const renderWorkspaceItems = (items: WorkspaceItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        <div
          className={cn(
            "flex items-center group py-1 px-2 rounded-md hover:bg-gray-100 text-gray-700",
            pathname === `/admin/stories/${item.id}` && "bg-gray-100 text-gray-900",
          )}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
        >
          <button
            className={cn("w-5 h-5 flex items-center justify-center mr-1", item.type !== "folder" && "invisible")}
            onClick={() => item.type === "folder" && toggleExpand(item.id)}
          >
            {item.type === "folder" &&
              (item.expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />)}
          </button>

          <div className="mr-2">
            {item.type === "folder" ? (
              item.expanded ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Folder className="h-4 w-4" />
              )
            ) : (
              <FileText className="h-4 w-4" />
            )}
          </div>

          <Link href={`/admin/stories/${item.id}`} className="flex-1 truncate text-sm py-1">
            {item.name}
          </Link>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                {item.type === "folder" && <DropdownMenuItem>Add page inside</DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {item.type === "folder" && item.expanded && item.children && (
          <div>{renderWorkspaceItems(item.children, level + 1)}</div>
        )}
      </div>
    ))
  }

  return (
    <>
      {/* Mobile toggle button - only visible on mobile */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleStoriesSidebar}
        className="fixed bottom-4 right-4 z-50 rounded-full h-10 w-10 p-0 shadow-md md:hidden flex items-center justify-center"
      >
        {isStoriesSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Stories Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "md:relative fixed top-16 bottom-0 z-20 bg-white border-r transition-all duration-300",
          isStoriesSidebarOpen ? "left-0" : "-left-full md:left-0",
          isMobileView ? "w-3/4 max-w-xs" : `w-${sidebarWidth}px`,
        )}
        style={!isMobileView ? { width: `${sidebarWidth}px` } : {}}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin/stories" className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            <span className="font-semibold">Story Workspace</span>
          </Link>
        </div>

        <div className="flex-1 overflow-auto h-[calc(100%-3.5rem)]">
          <div className="p-2">
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 h-9 bg-gray-50 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-1">{renderWorkspaceItems(workspace)}</div>
          </div>
        </div>

        <div className="border-t p-2 absolute bottom-0 left-0 right-0 bg-white">
          <Button variant="outline" size="sm" className="w-full justify-start text-gray-600 gap-2">
            <Plus className="h-4 w-4" />
            New Page
          </Button>
        </div>
      </div>

      {/* Resizer - only visible on desktop */}
      {!isMobileView && (
        <div
          className="fixed md:relative left-0 top-16 z-30 h-screen cursor-ew-resize hidden md:block"
          style={{
            left: `${sidebarWidth}px`,
            width: "4px",
            transform: "translateX(-50%)",
          }}
          onMouseDown={startResizing}
        />
      )}

      {/* Mobile overlay when sidebar is open */}
      {isMobileView && isStoriesSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsStoriesSidebarOpen(false)} />
      )}
    </>
  )
}

