import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { MobileNavigation } from "@/components/mobile-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bliss - Spiritual Wisdom",
  description: "Your gateway to spiritual wisdom and knowledge",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader isLoggedIn={false} userInitials="U" userImage={null} notificationCount={0} />
        {children}
        <MobileNavigation />
      </body>
    </html>
  )
}



import './globals.css'