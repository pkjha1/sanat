import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./client"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import { MapsProvider } from "@/components/maps/maps-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bliss - Spiritual Teachings and Wisdom",
  description: "Explore spiritual teachings, books, and wisdom from various traditions.",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col">
        <ClientLayout>
          <div className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-screen-2xl">
              <MapsProvider>{children}</MapsProvider>
            </div>
          </div>
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  )
}

