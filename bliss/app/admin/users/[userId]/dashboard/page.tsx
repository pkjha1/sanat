"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// This is a simple redirect page that will take the admin to the user's dashboard
export default function UserDashboardRedirect({ params }: { params: { userId: string } }) {
  const router = useRouter()
  const { userId } = params

  useEffect(() => {
    // Redirect to the dashboard with admin view parameters
    router.push(`/dashboard?admin=true&userId=${userId}`)
  }, [router, userId])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Redirecting to user dashboard...</h2>
        <p className="text-gray-600">You'll be redirected to view the dashboard for user ID: {userId}</p>
      </div>
    </div>
  )
}

