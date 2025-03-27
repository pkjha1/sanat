"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let errorMessage = "An unknown error occurred during authentication."

  if (error === "Verification") {
    errorMessage = "The verification link has expired or has already been used."
  } else if (error === "AccessDenied") {
    errorMessage = "You do not have permission to access this resource."
  } else if (error === "Configuration") {
    errorMessage = "There is a problem with the server configuration."
  } else if (error === "OAuthSignin" || error === "OAuthCallback" || error === "OAuthCreateAccount") {
    errorMessage = "There was a problem with the OAuth authentication."
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-red-600">Authentication Error</h1>
        <p className="text-center text-gray-600">{errorMessage}</p>
        <div className="flex justify-center mt-6">
          <Button asChild>
            <Link href="/auth/login">Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

