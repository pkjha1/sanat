"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { usePathname } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"

// Mock authentication - in a real app, this would come from your auth provider
const useAuth = () => {
  // This is a mock - replace with your actual auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // For demo purposes, toggle auth state with a button in development
  useEffect(() => {
    // Only add this in development
    if (process.env.NODE_ENV === "development") {
      // Add a hidden button to toggle auth state for testing
      const toggleButton = document.createElement("button")
      toggleButton.textContent = "Toggle Auth (DEV)"
      toggleButton.style.position = "fixed"
      toggleButton.style.bottom = "80px"
      toggleButton.style.right = "10px"
      toggleButton.style.zIndex = "9999"
      toggleButton.style.padding = "8px"
      toggleButton.style.background = "#f0f0f0"
      toggleButton.style.border = "1px solid #ccc"
      toggleButton.style.borderRadius = "4px"
      toggleButton.style.fontSize = "12px"
      toggleButton.style.opacity = "0.7"

      toggleButton.addEventListener("click", () => {
        setIsLoggedIn((prev) => !prev)
      })

      document.body.appendChild(toggleButton)

      return () => {
        document.body.removeChild(toggleButton)
      }
    }
  }, [])

  return { isLoggedIn, user: isLoggedIn ? { initials: "JD", image: null } : null }
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user } = useAuth()
  const pathname = usePathname()

  // Check if current page is admin
  const isAdminPage = pathname?.startsWith("/admin")

  // Don't show header/footer on admin pages
  if (isAdminPage) {
    return (
      <>
        {children}
        <Toaster />
      </>
    )
  }

  return (
    <>
      <SiteHeader
        isLoggedIn={isLoggedIn}
        userInitials={user?.initials}
        userImage={user?.image}
        notificationCount={isLoggedIn ? 3 : 0}
      />
      <main className="min-h-screen pt-20">{children}</main>
      <MobileNavigation isLoggedIn={isLoggedIn} userInitials={user?.initials} userImage={user?.image} />
      <Toaster />
    </>
  )
}

