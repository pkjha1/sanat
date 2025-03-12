"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { usePathname } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient"
import type { User } from "@supabase/supabase-js"
import { useToast } from "@/components/ui/use-toast"

// Supabase authentication hook
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.error("Supabase is not properly configured. Check your environment variables.")
      toast({
        title: "Configuration Error",
        description: "Authentication service is not properly configured.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setIsLoggedIn(!!session)
        setUser(session?.user || null)
      } catch (error) {
        console.error("Error getting session:", error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsLoggedIn(!!session)
        setUser(session?.user || null)
        setLoading(false)
      })

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error("Error setting up auth listener:", error)
      setLoading(false)
    }
  }, [toast])

  return {
    isLoggedIn,
    user,
    loading,
    userDetails: user
      ? {
          initials: user.email ? user.email.substring(0, 2).toUpperCase() : "U",
          image: user.user_metadata?.avatar_url || null,
        }
      : null,
  }
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, userDetails, loading } = useAuth()
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
        userInitials={userDetails?.initials}
        userImage={userDetails?.image}
        notificationCount={isLoggedIn ? 3 : 0}
      />
      <main className="min-h-screen pt-20">{children}</main>
      <MobileNavigation isLoggedIn={isLoggedIn} userInitials={userDetails?.initials} userImage={userDetails?.image} />
      <Toaster />
    </>
  )
}

