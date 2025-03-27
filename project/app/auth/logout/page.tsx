"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Show a toast message
    toast({
      title: "Authentication disabled",
      description: "Logout functionality is currently disabled in this preview.",
    })
  }, [])

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign Out</h1>
        <p className="text-center text-gray-600">Are you sure you want to sign out?</p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={handleGoHome}>
            Cancel
          </Button>
          <Button onClick={handleGoHome}>Sign Out</Button>
        </div>
      </div>
    </div>
  )
}

