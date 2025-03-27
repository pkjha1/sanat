"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, BookOpen, Video, Headphones, MapPin } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { getUserBookmarks } from "@/app/actions/bookmark-actions"
import { logUserActivity } from "@/lib/activity-logger"

export default function BookmarksPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [bookmarks, setBookmarks] = useState({
    books: [],
    teachings: [],
    audiobooks: [],
    places: [],
  })

  useEffect(() => {
    async function getBookmarks() {
      try {
        setLoading(true)

        // Get user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        setUser(user)

        // Fetch bookmarks
        const result = await getUserBookmarks()

        if (result.success) {
          // Group bookmarks by content type
          const groupedBookmarks = {
            books: [],
            teachings: [],
            audiobooks: [],
            places: [],
          }

          // Process bookmarks and fetch content details
          for (const bookmark of result.bookmarks) {
            if (bookmark.content_type in groupedBookmarks) {
              // Fetch content details based on content type and ID
              const { data, error } = await supabase
                .from(bookmark.content_type + "s") // Assuming table names are plural
                .select("*")
                .eq("id", bookmark.content_id)
                .single()

              if (!error && data) {
                groupedBookmarks[bookmark.content_type].push({
                  ...data,
                  bookmarkId: bookmark.id,
                  bookmarkedAt: bookmark.created_at,
                })
              }
            }
          }

          setBookmarks(groupedBookmarks)
        } else {
          // If API call fails, use mock data for demonstration
          setBookmarks({
            books: [
              { id: 1, title: "Bhagavad Gita", author: "Vyasa", coverImage: "/placeholder.svg?height=120&width=80" },
              { id: 2, title: "Upanishads", author: "Various", coverImage: "/placeholder.svg?height=120&width=80" },
            ],
            teachings: [
              {
                id: 1,
                title: "Introduction to Meditation",
                author: "Swami Vivekananda",
                thumbnailUrl: "/placeholder.svg?height=120&width=200",
              },
              {
                id: 2,
                title: "Understanding Karma",
                author: "Sadhguru",
                thumbnailUrl: "/placeholder.svg?height=120&width=200",
              },
            ],
            audiobooks: [
              { id: 1, title: "Ramayana", author: "Valmiki", coverImage: "/placeholder.svg?height=120&width=80" },
            ],
            places: [
              {
                id: 1,
                name: "Varanasi",
                location: "Uttar Pradesh, India",
                imageUrl: "/placeholder.svg?height=120&width=200",
              },
            ],
          })
        }

        // Log bookmarks viewed activity
        await logUserActivity("bookmarks_viewed")
      } catch (error) {
        console.error("Error in getBookmarks:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    getBookmarks()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    )
  }

  return (
    <div className="container py-10 mt-16">
      <h1 className="text-3xl font-bold mb-6">Your Bookmarks</h1>

      <Tabs defaultValue="books">
        <TabsList className="mb-4">
          <TabsTrigger value="books" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Books
          </TabsTrigger>
          <TabsTrigger value="teachings" className="flex items-center">
            <Video className="mr-2 h-4 w-4" />
            Teachings
          </TabsTrigger>
          <TabsTrigger value="audiobooks" className="flex items-center">
            <Headphones className="mr-2 h-4 w-4" />
            Audiobooks
          </TabsTrigger>
          <TabsTrigger value="places" className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            Places
          </TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Books</CardTitle>
              <CardDescription>Books you've saved for later reading.</CardDescription>
            </CardHeader>
            <CardContent>
              {bookmarks.books.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookmarks.books.map((book) => (
                    <div key={book.id} className="flex border rounded-lg overflow-hidden">
                      <div className="w-20 h-32 bg-gray-100 flex-shrink-0">
                        <img
                          src={book.coverImage || book.cover_image || "/placeholder.svg?height=120&width=80"}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium">{book.title}</h3>
                          <p className="text-sm text-gray-500">{book.author}</p>
                        </div>
                        <Button variant="link" className="p-0 h-auto justify-start" asChild>
                          <a href={`/books/${book.id}`}>View Book</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">You haven't bookmarked any books yet.</p>
                  <Button variant="link" asChild className="mt-2">
                    <a href="/books">Browse Books</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachings">
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Teachings</CardTitle>
              <CardDescription>Teachings you've saved for later viewing.</CardDescription>
            </CardHeader>
            <CardContent>
              {bookmarks.teachings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookmarks.teachings.map((teaching) => (
                    <div key={teaching.id} className="border rounded-lg overflow-hidden">
                      <div className="h-40 bg-gray-100">
                        <img
                          src={teaching.thumbnailUrl || "/placeholder.svg"}
                          alt={teaching.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{teaching.title}</h3>
                        <p className="text-sm text-gray-500">{teaching.author}</p>
                        <Button variant="link" className="p-0 h-auto mt-2" asChild>
                          <a href={`/teachings/${teaching.id}`}>Watch Teaching</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">You haven't bookmarked any teachings yet.</p>
                  <Button variant="link" asChild className="mt-2">
                    <a href="/teachings">Browse Teachings</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audiobooks">
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Audiobooks</CardTitle>
              <CardDescription>Audiobooks you've saved for later listening.</CardDescription>
            </CardHeader>
            <CardContent>
              {bookmarks.audiobooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookmarks.audiobooks.map((audiobook) => (
                    <div key={audiobook.id} className="flex border rounded-lg overflow-hidden">
                      <div className="w-20 h-32 bg-gray-100 flex-shrink-0">
                        <img
                          src={audiobook.coverImage || "/placeholder.svg"}
                          alt={audiobook.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium">{audiobook.title}</h3>
                          <p className="text-sm text-gray-500">{audiobook.author}</p>
                        </div>
                        <Button variant="link" className="p-0 h-auto justify-start" asChild>
                          <a href={`/audiobooks/${audiobook.id}`}>Listen Now</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">You haven't bookmarked any audiobooks yet.</p>
                  <Button variant="link" asChild className="mt-2">
                    <a href="/audiobooks">Browse Audiobooks</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="places">
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Places</CardTitle>
              <CardDescription>Religious places you've saved for later reference.</CardDescription>
            </CardHeader>
            <CardContent>
              {bookmarks.places.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookmarks.places.map((place) => (
                    <div key={place.id} className="border rounded-lg overflow-hidden">
                      <div className="h-40 bg-gray-100">
                        <img
                          src={place.imageUrl || "/placeholder.svg"}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{place.name}</h3>
                        <p className="text-sm text-gray-500">{place.location}</p>
                        <Button variant="link" className="p-0 h-auto mt-2" asChild>
                          <a href={`/religious-places/${place.id}`}>View Details</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">You haven't bookmarked any places yet.</p>
                  <Button variant="link" asChild className="mt-2">
                    <a href="/religious-places">Browse Places</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

