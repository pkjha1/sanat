"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Headphones } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface AudiobookCardProps {
  audiobook: {
    id: number
    title: string
    narrator: string
    category: string
    description: string
    duration: string
    chapters: number
    listeners: number
    rating: number
    lastUpdated: string
    cover: string
  }
  variant?: "grid" | "list"
}

export function AudiobookCard({ audiobook, variant = "grid" }: AudiobookCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  if (variant === "list") {
    return (
      <Link
        href={`/audiobooks/${audiobook.id}`}
        className="group flex flex-col sm:flex-row overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      >
        <div className="relative w-full sm:w-48 aspect-[3/4] sm:aspect-[2/3] overflow-hidden bg-muted">
          <div className={`absolute inset-0 bg-gray-200 animate-pulse ${isImageLoaded ? "hidden" : "block"}`}></div>
          <img
            src={audiobook.cover || "/placeholder.svg"}
            alt={audiobook.title}
            className={`object-cover w-full h-full transition-transform group-hover:scale-105 ${isImageLoaded ? "block" : "invisible"}`}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="flex flex-col justify-between p-4 flex-1">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">
                {audiobook.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {audiobook.duration}
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-1">{audiobook.title}</h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{audiobook.description}</p>
            <p className="text-sm">Narrator: {audiobook.narrator}</p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-amber-500">★</span>
                <span className="ml-1">{audiobook.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">{audiobook.listeners.toLocaleString()} listeners</span>
            </div>
            <Button variant="secondary" size="sm" className="gap-1">
              <Headphones className="h-4 w-4" />
              <span className="hidden sm:inline">Listen Now</span>
            </Button>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/audiobooks/${audiobook.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${isImageLoaded ? "hidden" : "block"}`}></div>
        <img
          src={audiobook.cover || "/placeholder.svg"}
          alt={audiobook.title}
          className={`object-cover w-full h-full transition-transform group-hover:scale-105 ${isImageLoaded ? "block" : "invisible"}`}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
          <Button variant="secondary" size="sm" className="gap-1">
            <Headphones className="h-4 w-4" />
            Listen Now
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 p-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">
            {audiobook.category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {audiobook.duration}
          </div>
        </div>
        <h3 className="font-semibold leading-tight line-clamp-1 mt-2">{audiobook.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{audiobook.description}</p>
        <div className="flex items-center justify-between mt-2 pt-2 border-t text-sm">
          <span>Narrator: {audiobook.narrator}</span>
          <div className="flex items-center">
            <span className="text-amber-500">★</span>
            <span className="ml-1">{audiobook.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

