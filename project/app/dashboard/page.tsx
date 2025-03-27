"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { BookOpen, Video, FileText, AlertCircle, User, MapPin, Shield, ArrowLeft, Play, BookMarked } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// Mock data
const mockUser = {
  id: "user-123",
  email: "user@example.com",
  profile: {
    full_name: "John Doe",
    avatar_url: "/placeholder.svg?height=64&width=64",
    role: "user",
  },
}

const mockBooks = [
  { id: 1, title: "The Bhagavad Gita", author: "Vyasa" },
  { id: 2, title: "Yoga Sutras", author: "Patanjali" },
  { id: 3, title: "Upanishads", author: "Various Authors" },
]

const mockStories = [
  { id: 1, title: "The Story of Rama", published: true },
  { id: 2, title: "Krishna's Childhood", published: true },
  { id: 3, title: "The Wisdom of Hanuman", published: false },
]

const mockTeachings = [
  { id: 1, title: "Introduction to Meditation", author: "Swami Vivekananda" },
  { id: 2, title: "Understanding Karma", author: "Sadhguru" },
  { id: 3, title: "The Path to Enlightenment", author: "Dalai Lama" },
]

// Helper function to get icon based on content type
function getTypeIcon(type: string) {
  switch (type) {
    case "book":
      return <BookOpen className="h-4 w-4" />
    case "video":
      return <Video className="h-4 w-4" />
    case "article":
      return <FileText className="h-4 w-4" />
    case "audio":
      return <Play className="h-4 w-4" />
    case "course":
      return <BookMarked className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

// Helper function to get background color based on content type
function getTypeBgColor(type: string) {
  switch (type) {
    case "book":
      return "bg-blue-100 text-blue-800"
    case "video":
      return "bg-purple-100 text-purple-800"
    case "article":
      return "bg-green-100 text-green-800"
    case "audio":
      return "bg-amber-100 text-amber-800"
    case "course":
      return "bg-indigo-100 text-indigo-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function DashboardContent() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [books, setBooks] = useState<any[]>([])
  const [stories, setStories] = useState<any[]>([])
  const [teachings, setTeachings] = useState<any[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState("books")
  const searchParams = useSearchParams()

  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Set mock data
        setUser(mockUser)
        setProfile(mockUser.profile)
        setIsAdmin(mockUser.profile.role === "admin")
        setBooks(mockBooks)
        setStories(mockStories)
        setTeachings(mockTeachings)
      } catch (error: any) {
        console.error("Error loading dashboard data:", error)
        toast({
          title: "Error loading data",
          description: error.message || "Could not load dashboard data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [toast])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading your spiritual journey...</p>
        </div>
      </div>
    )
  }

  // Check if this is an admin viewing a user dashboard
  const isAdminView = searchParams.get("admin") === "true"
  const userId = searchParams.get("userId")

  return (
    <div className="container py-8 px-4 md:py-12">
      {/* Admin View Banner */}
      {isAdminView && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">
              Admin View: Viewing {profile?.full_name || "User"}'s Dashboard
            </span>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/users/${userId || "1"}/edit`}>
              <Button size="sm" variant="outline">
                Edit User
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to Users
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="grid gap-6">
        {/* User Profile Section */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={profile?.avatar_url || "/placeholder.svg?height=64&width=64"}
                alt={profile?.full_name || "User"}
              />
              <AvatarFallback>{profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{profile?.full_name || "Welcome"}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={isAdmin ? "default" : "outline"}>{profile?.role || "user"}</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Database Connection Status */}
        {/* <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <CardTitle className="text-lg text-green-700">Database Connection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">Successfully connected to Supabase database</p>
          </CardContent>
        </Card> */}

        {/* Dashboard Tabs */}
        <Tabs defaultValue="books" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="teachings">Teachings</TabsTrigger>
          </TabsList>

          <TabsContent value="books">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Recent Books
                </CardTitle>
                <CardDescription>Books from our spiritual collection</CardDescription>
              </CardHeader>
              <CardContent>
                {books.length > 0 ? (
                  <div className="space-y-4">
                    {books.map((book) => (
                      <div key={book.id} className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded bg-amber-100 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No books found in the database</p>
                    {isAdmin && (
                      <Button variant="outline" className="mt-4">
                        Add First Book
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Stories
                </CardTitle>
                <CardDescription>Spiritual stories from our collection</CardDescription>
              </CardHeader>
              <CardContent>
                {stories.length > 0 ? (
                  <div className="space-y-4">
                    {stories.map((story) => (
                      <div key={story.id} className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded bg-amber-100 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{story.title}</h3>
                          <p className="text-sm text-muted-foreground">{story.published ? "Published" : "Draft"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No stories found in the database</p>
                    {isAdmin && (
                      <Button variant="outline" className="mt-4">
                        Add First Story
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Recent Teachings
                </CardTitle>
                <CardDescription>Spiritual teachings and videos</CardDescription>
              </CardHeader>
              <CardContent>
                {teachings.length > 0 ? (
                  <div className="space-y-4">
                    {teachings.map((teaching) => (
                      <div key={teaching.id} className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded bg-amber-100 flex items-center justify-center">
                          <Video className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{teaching.title}</h3>
                          <p className="text-sm text-muted-foreground">{teaching.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertCircle className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No teachings found in the database</p>
                    {isAdmin && (
                      <Button variant="outline" className="mt-4">
                        Add First Teaching
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Admin Section */}
        {isAdmin && (
          <>
            <Separator className="my-4" />
            <Card className="bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-800">Admin Controls</CardTitle>
                <CardDescription className="text-amber-700">You have admin privileges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="bg-white">
                    <User className="mr-2 h-4 w-4" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="bg-white">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Manage Content
                  </Button>
                  <Button variant="outline" className="bg-white">
                    <MapPin className="mr-2 h-4 w-4" />
                    Manage Places
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}

