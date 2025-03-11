import type { ReactNode } from "react"
import { StoriesSidebar } from "@/components/admin/stories/stories-sidebar"

export default function StoriesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full">
      {/* Stories Sidebar */}
      <StoriesSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}

