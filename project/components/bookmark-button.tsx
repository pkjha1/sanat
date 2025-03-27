"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface BookmarkButtonProps {
  itemId: string
  itemType: "book" | "audiobook" | "place" | "temple"
  isBookmarked?: boolean
}

export default function BookmarkButton({ itemId, itemType, isBookmarked = false }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [isLoading, setIsLoading] = useState(false)

  const toggleBookmark = async () => {
    setIsLoading(true)
    try {
      // Mock implementation without Supabase
      // In a real app, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate network delay
      setBookmarked(!bookmarked)
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleBookmark}
      disabled={isLoading}
      aria-label={bookmarked ? `Remove from bookmarks` : `Add to bookmarks`}
    >
      {bookmarked ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
          Bookmarked
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
          Bookmark
        </>
      )}
    </Button>
  )
}

