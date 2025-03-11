"use client"
import type { ReactNode } from "react"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin content wrapper */}
      <div className="flex flex-col min-h-screen w-full">
        {/* Admin Header - Fixed at top */}
        <AdminHeader />

        {/* Main content area */}
        <div className="flex flex-1 pt-[104px] lg:pt-[112px]">
          {" "}
          {/* Adjusted for the new header height */}
          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full">{children}</main>
        </div>
      </div>
    </div>
  )
}

