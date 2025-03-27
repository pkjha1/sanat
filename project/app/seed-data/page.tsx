"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Database, CheckCircle2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function SeedDataPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)

  const seedDatabase = async () => {
    setLoading(true)
    try {
      // Seed books
      const { error: booksError } = await supabase.from("books").insert([
        {
          title: "Bhagavad Gita",
          author: "Vyasa",
          description: "Ancient Indian text that is part of the epic Mahabharata",
          cover_image: "/placeholder.svg?height=400&width=300",
        },
        {
          title: "Ramayana",
          author: "Valmiki",
          description: "One of the two major Sanskrit epics of ancient India",
          cover_image: "/placeholder.svg?height=400&width=300",
        },
        {
          title: "Upanishads",
          author: "Various",
          description: "Late portions of the Vedas containing philosophical concepts",
          cover_image: "/placeholder.svg?height=400&width=300",
        },
      ])

      if (booksError) throw booksError

      // Seed chapters
      const { data: books } = await supabase.from("books").select("id, title")

      if (books && books.length > 0) {
        const chapters = []
        for (const book of books) {
          for (let i = 1; i <= 3; i++) {
            chapters.push({
              book_id: book.id,
              title: `Chapter ${i}: ${book.title}`,
              content: `This is the content for chapter ${i} of ${book.title}.`,
              order_number: i,
            })
          }
        }

        const { error: chaptersError } = await supabase.from("chapters").insert(chapters)
        if (chaptersError) throw chaptersError
      }

      // Seed stories
      const { error: storiesError } = await supabase.from("stories").insert([
        {
          title: "The Story of Krishna",
          description: "The life and teachings of Lord Krishna",
          thumbnail: "/placeholder.svg?height=200&width=300",
          published: true,
        },
        {
          title: "Hanuman's Journey",
          description: "The adventures of Lord Hanuman",
          thumbnail: "/placeholder.svg?height=200&width=300",
          published: true,
        },
        {
          title: "Shiva and the Cosmic Dance",
          description: "The story of Lord Shiva's tandava",
          thumbnail: "/placeholder.svg?height=200&width=300",
          published: true,
        },
      ])

      if (storiesError) throw storiesError

      // Seed teachings
      const { error: teachingsError } = await supabase.from("teachings").insert([
        {
          title: "Understanding Karma",
          content: "A detailed explanation of the concept of karma in Hindu philosophy.",
          author: "Swami Vivekananda",
          thumbnail: "/placeholder.svg?height=200&width=300",
          video_url: "https://example.com/video1.mp4",
        },
        {
          title: "The Path of Bhakti",
          content: "Exploring the devotional path to spiritual enlightenment.",
          author: "Ramakrishna Paramahamsa",
          thumbnail: "/placeholder.svg?height=200&width=300",
          video_url: "https://example.com/video2.mp4",
        },
        {
          title: "Meditation Techniques",
          content: "Various meditation techniques from ancient Hindu traditions.",
          author: "Paramahansa Yogananda",
          thumbnail: "/placeholder.svg?height=200&width=300",
          video_url: "https://example.com/video3.mp4",
        },
      ])

      if (teachingsError) throw teachingsError

      // Seed religious places
      const { error: placesError } = await supabase.from("religious_places").insert([
        {
          name: "Varanasi",
          description:
            "One of the oldest continuously inhabited cities in the world and a major religious hub in India.",
          location: "Uttar Pradesh, India",
          latitude: 25.3176,
          longitude: 82.9739,
          image_url: "/placeholder.svg?height=300&width=400",
        },
        {
          name: "Rishikesh",
          description: "Known as the 'Yoga Capital of the World' and a gateway to the Himalayas.",
          location: "Uttarakhand, India",
          latitude: 30.0869,
          longitude: 78.2676,
          image_url: "/placeholder.svg?height=300&width=400",
        },
        {
          name: "Tirupati",
          description:
            "Home to the Tirumala Venkateswara Temple, one of the most visited religious sites in the world.",
          location: "Andhra Pradesh, India",
          latitude: 13.6288,
          longitude: 79.4192,
          image_url: "/placeholder.svg?height=300&width=400",
        },
      ])

      if (placesError) throw placesError

      toast({
        title: "Database seeded successfully!",
        description: "Sample data has been added to your database.",
        duration: 5000,
      })

      setSeeded(true)
    } catch (error: any) {
      console.error("Error seeding database:", error)
      toast({
        title: "Error seeding database",
        description: error.message || "Could not seed the database. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-md">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-amber-600" />
            <CardTitle className="text-2xl">Seed Database</CardTitle>
          </div>
          <CardDescription>Add sample data to your database to get started quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This will add sample books, stories, teachings, and religious places to your database. Use this to quickly
            populate your application with test data.
          </p>

          {seeded && (
            <div className="bg-green-50 p-4 rounded-md flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="text-green-700 text-sm">Database has been successfully seeded with sample data!</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={seedDatabase}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            disabled={loading || seeded}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Seeding database...
              </>
            ) : seeded ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Database Seeded
              </>
            ) : (
              "Seed Database"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

