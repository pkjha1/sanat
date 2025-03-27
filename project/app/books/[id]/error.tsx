"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        We encountered an error while trying to display this book. Please try again or return to the books page.
      </p>
      <div className="flex gap-4">
        <button onClick={reset} className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
          Try again
        </button>
        <Link href="/books" className="px-4 py-2 border border-amber-600 text-amber-600 rounded-md hover:bg-amber-50">
          Back to Books
        </Link>
      </div>
    </div>
  )
}

