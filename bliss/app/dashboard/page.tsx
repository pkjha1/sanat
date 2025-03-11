"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import {
  BookOpen,
  Video,
  FileText,
  Bell,
  Calendar,
  Clock,
  Star,
  BookMarked,
  Settings,
  ChevronRight,
  Play,
  Download,
  Heart,
  Share,
  ArrowLeft,
  Shield,
  DollarSign,
  FileCheck,
  Receipt,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock user data
const userData = {
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  avatar: null,
  initials: "RS",
  joinDate: "2023-01-15",
  subscription: {
    plan: "Premium",
    status: "active",
    renewDate: "2023-12-15",
    features: ["Unlimited access to all content", "Ad-free experience", "Offline downloads", "HD video quality"],
  },
  stats: {
    booksRead: 12,
    videosWatched: 47,
    articlesRead: 23,
    hoursSpent: 68,
    streak: 15,
  },
  progress: [
    {
      id: 1,
      title: "The Bhagavad Gita",
      type: "book",
      progress: 45,
      total: 18,
      thumbnail: "/placeholder.svg?height=80&width=60",
    },
    {
      id: 2,
      title: "Meditation Techniques",
      type: "course",
      progress: 70,
      total: 12,
      thumbnail: "/placeholder.svg?height=80&width=60",
    },
    {
      id: 3,
      title: "Understanding Vedic Philosophy",
      type: "book",
      progress: 30,
      total: 8,
      thumbnail: "/placeholder.svg?height=80&width=60",
    },
  ],
  recentActivity: [
    { id: 1, title: "Completed Chapter 5: Karma Yoga", type: "book", date: "2 hours ago" },
    { id: 2, title: 'Watched "The Path to Inner Peace"', type: "video", date: "Yesterday" },
    { id: 3, title: 'Bookmarked "Ancient Wisdom for Modern Times"', type: "article", date: "3 days ago" },
    { id: 4, title: 'Started reading "Sacred Temples of India"', type: "book", date: "1 week ago" },
  ],
  recommendations: [
    {
      id: 1,
      title: "Ayurvedic Principles for Daily Life",
      type: "video",
      duration: "24 min",
      thumbnail: "/placeholder.svg?height=120&width=200",
      description: "Learn how to incorporate ancient Ayurvedic wisdom into your modern lifestyle.",
    },
    {
      id: 2,
      title: "The Essence of Upanishads",
      type: "book",
      chapters: 12,
      thumbnail: "/placeholder.svg?height=120&width=200",
      description: "Explore the profound philosophical insights of the Upanishads.",
    },
    {
      id: 3,
      title: "Guided Meditation for Inner Peace",
      type: "audio",
      duration: "18 min",
      thumbnail: "/placeholder.svg?height=120&width=200",
      description: "A calming meditation session to help you find tranquility within.",
    },
  ],
  bookmarks: [
    {
      id: 1,
      title: "Understanding Dharma",
      type: "article",
      date: "2023-05-10",
      thumbnail: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 2,
      title: "The Science of Yoga",
      type: "video",
      duration: "32 min",
      thumbnail: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 3,
      title: "Temples of South India",
      type: "book",
      chapters: 8,
      thumbnail: "/placeholder.svg?height=80&width=120",
    },
  ],
  upcomingEvents: [
    { id: 1, title: "Live Q&A with Guruji", date: "2023-06-15", time: "10:00 AM", type: "online" },
    { id: 2, title: "Meditation Workshop", date: "2023-06-22", time: "6:00 PM", type: "online" },
    { id: 3, title: "Bhagavad Gita Discussion", date: "2023-07-01", time: "11:00 AM", type: "online" },
  ],
}

// Mock payment data
const paymentData = {
  donations: [
    {
      id: "DON-1234",
      amount: "₹5,000",
      date: "2023-05-15",
      cause: "Temple Restoration",
      status: "Completed",
      receipt: true,
    },
    {
      id: "DON-1235",
      amount: "₹2,500",
      date: "2023-04-10",
      cause: "Vedic Education",
      status: "Completed",
      receipt: true,
    },
    {
      id: "DON-1236",
      amount: "₹10,000",
      date: "2023-03-22",
      cause: "Manuscript Preservation",
      status: "Completed",
      receipt: true,
    },
    {
      id: "DON-1237",
      amount: "₹1,000",
      date: "2023-02-18",
      cause: "Community Support",
      status: "Completed",
      receipt: true,
    },
  ],
  subscriptionPayments: [
    {
      id: "SUB-5678",
      amount: "₹499",
      date: "2023-05-01",
      description: "Premium Plan - Monthly",
      status: "Paid",
      invoice: true,
    },
    {
      id: "SUB-5677",
      amount: "₹499",
      date: "2023-04-01",
      description: "Premium Plan - Monthly",
      status: "Paid",
      invoice: true,
    },
    {
      id: "SUB-5676",
      amount: "₹499",
      date: "2023-03-01",
      description: "Premium Plan - Monthly",
      status: "Paid",
      invoice: true,
    },
  ],
  otherPayments: [
    {
      id: "PAY-9012",
      amount: "₹1,200",
      date: "2023-04-25",
      description: "Special Event Registration",
      status: "Paid",
      invoice: true,
    },
    {
      id: "PAY-9011",
      amount: "₹800",
      date: "2023-03-12",
      description: "Workshop Access",
      status: "Paid",
      invoice: true,
    },
  ],
}

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
  const [activeTab, setActiveTab] = useState("overview")
  const searchParams = useSearchParams()

  // Check if this is an admin viewing a user dashboard
  const isAdminView = searchParams.get("admin") === "true"
  const userId = searchParams.get("userId")

  // In a real app, you would fetch the specific user data based on userId
  // For now, we'll use our mock data

  return (
    <div className="container py-8 px-4 md:py-12">
      {/* Admin View Banner */}
      {isAdminView && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">Admin View: Viewing {userData.name}'s Dashboard</span>
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-amber-200">
            <AvatarImage src={userData.avatar} />
            <AvatarFallback className="bg-amber-100 text-amber-800 text-xl">{userData.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome, {userData.name.split(" ")[0]}</h1>
            <p className="text-gray-600">
              Member since {new Date(userData.joinDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/settings">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Link href="/notifications">
            <Button variant="outline" size="sm" className="flex items-center gap-1 relative">
              <Bell className="h-4 w-4" />
              Notifications
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-amber-600 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Subscription Status Card */}
      <Card className="mb-8 border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Badge className="bg-amber-600 mb-2">{userData.subscription.plan} Subscription</Badge>
              <h3 className="text-lg font-semibold mb-1">Your subscription is active</h3>
              <p className="text-gray-600 text-sm">
                Renews on{" "}
                {new Date(userData.subscription.renewDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/subscription">
                <Button size="sm" variant="outline">
                  Manage Subscription
                </Button>
              </Link>
              <Link href="/subscription/upgrade">
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:grid-cols-6 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">My Content</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="analytics" className="hidden md:block">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="payments" className="hidden md:block">
            Payments
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <BookOpen className="h-8 w-8 text-amber-600 mb-2" />
                <p className="text-sm text-gray-600">Books Read</p>
                <h3 className="text-2xl font-bold">{userData.stats.booksRead}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Video className="h-8 w-8 text-amber-600 mb-2" />
                <p className="text-sm text-gray-600">Videos Watched</p>
                <h3 className="text-2xl font-bold">{userData.stats.videosWatched}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <FileText className="h-8 w-8 text-amber-600 mb-2" />
                <p className="text-sm text-gray-600">Articles Read</p>
                <h3 className="text-2xl font-bold">{userData.stats.articlesRead}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Clock className="h-8 w-8 text-amber-600 mb-2" />
                <p className="text-sm text-gray-600">Hours Spent</p>
                <h3 className="text-2xl font-bold">{userData.stats.hoursSpent}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Star className="h-8 w-8 text-amber-600 mb-2" />
                <p className="text-sm text-gray-600">Day Streak</p>
                <h3 className="text-2xl font-bold">{userData.stats.streak}</h3>
              </CardContent>
            </Card>
          </div>

          {/* Continue Learning */}
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.progress.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeBgColor(item.type)}`}>
                          {item.type}
                        </span>
                      </div>
                      <div className="mb-2">
                        <Progress value={item.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>{item.progress}% complete</span>
                        <span>
                          {item.type === "book"
                            ? `${Math.round((item.progress * item.total) / 100)}/${item.total} chapters`
                            : item.type === "course"
                              ? `${Math.round((item.progress * item.total) / 100)}/${item.total} lessons`
                              : ""}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      Continue
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/my-learning"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
              >
                View all your learning <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>

          {/* Recommended for You */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Based on your interests and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userData.recommendations.map((item) => (
                  <div key={item.id} className="group">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getTypeBgColor(item.type)}`}
                        >
                          {getTypeIcon(item.type)}
                          {item.type}
                        </span>
                      </div>
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-amber-600 rounded-full p-3">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <h4 className="font-medium mb-1 group-hover:text-amber-600 transition-colors">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                    <div className="text-xs text-gray-500">
                      {item.type === "video" || item.type === "audio"
                        ? `${item.duration} duration`
                        : item.type === "book"
                          ? `${item.chapters} chapters`
                          : ""}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/recommendations"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
              >
                View all recommendations <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${getTypeBgColor(activity.type)}`}>
                      {getTypeIcon(activity.type)}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/activity"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
              >
                View all activity <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* My Content Tab */}
        <TabsContent value="content" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>My Library</CardTitle>
              <CardDescription>All your books, videos, and courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="books">Books</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...userData.progress, ...userData.recommendations].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow"
                      >
                        <div className="relative">
                          <img
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getTypeBgColor(item.type)}`}
                            >
                              {getTypeIcon(item.type)}
                              {item.type}
                            </span>
                          </div>
                          {"progress" in item && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                              <div className="h-full bg-amber-600" style={{ width: `${item.progress}%` }}></div>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium mb-1">{item.title}</h4>
                          {"description" in item && (
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                          )}
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-500">
                              {item.type === "video" || item.type === "audio"
                                ? `${item.duration} duration`
                                : item.type === "book" || item.type === "course"
                                  ? `${item.total} ${item.type === "book" ? "chapters" : "lessons"}`
                                  : ""}
                            </div>
                            <div className="flex gap-2">
                              {"progress" in item ? (
                                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                                  Continue
                                </Button>
                              ) : (
                                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                                  Start
                                </Button>
                              )}
                              {item.type === "video" || item.type === "audio" ? (
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4" />
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="books">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...userData.progress, ...userData.recommendations]
                      .filter((item) => item.type === "book")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow"
                        >
                          <div className="relative">
                            <img
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full aspect-video object-cover"
                            />
                            {"progress" in item && (
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                                <div className="h-full bg-amber-600" style={{ width: `${item.progress}%` }}></div>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-1">{item.title}</h4>
                            {"description" in item && (
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                            )}
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-500">{`${item.total} chapters`}</div>
                              <div className="flex gap-2">
                                {"progress" in item ? (
                                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                                    Continue
                                  </Button>
                                ) : (
                                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                                    Start
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="videos">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...userData.recommendations]
                      .filter((item) => item.type === "video")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow"
                        >
                          <div className="relative">
                            <img
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full aspect-video object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                              <div className="bg-amber-600 rounded-full p-3">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-500">{item.duration}</div>
                              <div className="flex gap-2">
                                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                                  Watch
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="courses">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...userData.progress]
                      .filter((item) => item.type === "course")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow"
                        >
                          <div className="relative">
                            <img
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.title}
                              className="w-full aspect-video object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                              <div className="h-full bg-amber-600" style={{ width: `${item.progress}%` }}></div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-1">{item.title}</h4>
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-500">
                                {`${Math.round((item.progress * item.total) / 100)}/${item.total} lessons completed`}
                              </div>
                              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                                Continue
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Link
                href="/library"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
              >
                Manage your library <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Bookmarks Tab */}
        <TabsContent value="bookmarks" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Bookmarks</CardTitle>
              <CardDescription>Content you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.bookmarks.map((bookmark, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={bookmark.thumbnail || "/placeholder.svg"}
                      alt={bookmark.title}
                      className="w-24 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">{bookmark.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeBgColor(bookmark.type)}`}>
                          {bookmark.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {bookmark.type === "video"
                          ? `Duration: ${bookmark.duration}`
                          : bookmark.type === "book"
                            ? `${bookmark.chapters} chapters`
                            : `Saved on: ${new Date(bookmark.date).toLocaleDateString()}`}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                          {bookmark.type === "video" ? "Watch" : bookmark.type === "book" ? "Read" : "View"}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/bookmarks"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
              >
                View all bookmarks <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Live sessions and workshops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.upcomingEvents.map((event, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:border-amber-200 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.time}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                        Register
                      </Button>
                      <Button size="sm" variant="outline">
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/events"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
              >
                View all events <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Analytics</CardTitle>
              <CardDescription>Track your progress and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Weekly Activity</h4>
                  <div className="h-48 bg-gray-100 rounded-lg flex items-end justify-between p-4">
                    {[40, 65, 35, 50, 80, 60, 30].map((height, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-8 bg-amber-600 rounded-t-sm" style={{ height: `${height}%` }}></div>
                        <span className="text-xs mt-2">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Content Consumption</h4>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-300 rounded-full h-4">
                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="ml-2 text-sm">Books (45%)</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-300 rounded-full h-4">
                        <div className="bg-purple-600 h-4 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                      <span className="ml-2 text-sm">Videos (30%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-300 rounded-full h-4">
                        <div className="bg-green-600 h-4 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                      <span className="ml-2 text-sm">Articles (25%)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Learning Streak</h4>
                  <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Current Streak</p>
                      <p className="text-2xl font-bold">{userData.stats.streak} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Longest Streak</p>
                      <p className="text-2xl font-bold">21 days</p>
                    </div>
                    <div>
                      <Button className="bg-amber-600 hover:bg-amber-700">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/analytics"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
              >
                View detailed analytics <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Donation History</CardTitle>
              <CardDescription>Track your contributions and download receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Cause</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData.donations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">{donation.id}</TableCell>
                        <TableCell>{donation.date}</TableCell>
                        <TableCell>{donation.cause}</TableCell>
                        <TableCell>{donation.amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {donation.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {donation.receipt && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Download receipt</span>
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Payments</CardTitle>
              <CardDescription>Your subscription billing history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Invoice</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData.subscriptionPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.description}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {payment.invoice && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Download invoice</span>
                              <FileText className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Other Payments</CardTitle>
              <CardDescription>Events, workshops, and other purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Invoice</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData.otherPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.description}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {payment.invoice && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Download invoice</span>
                              <FileText className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/payment-history"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
              >
                View complete payment history <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>

          {/* Payment Methods Card */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">HDFC Bank Credit Card</p>
                      <p className="text-sm text-gray-500">Ending in 4242 • Expires 05/25</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">SBI Debit Card</p>
                      <p className="text-sm text-gray-500">Ending in 8888 • Expires 12/24</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Set as Default
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <DollarSign className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">UPI</p>
                      <p className="text-sm text-gray-500">user@okicici</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Set as Default
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-1">
                <CreditCard className="h-4 w-4" />
                Add Payment Method
              </Button>
              <Link
                href="/payment-methods"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
              >
                Manage payment methods <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>

          {/* Donation Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Donation Summary</CardTitle>
              <CardDescription>Your impact through donations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="h-5 w-5 text-amber-600" />
                    <h4 className="font-medium">Total Donations</h4>
                  </div>
                  <p className="text-2xl font-bold">₹18,500</p>
                  <p className="text-sm text-gray-600">Across 4 donations</p>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Receipt className="h-5 w-5 text-amber-600" />
                    <h4 className="font-medium">Tax Benefits</h4>
                  </div>
                  <p className="text-2xl font-bold">₹5,550</p>
                  <p className="text-sm text-gray-600">30% tax exemption</p>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-amber-600" />
                    <h4 className="font-medium">First Donation</h4>
                  </div>
                  <p className="text-2xl font-bold">Feb 18, 2023</p>
                  <p className="text-sm text-gray-600">Supporting since 3 months</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Donation Distribution</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Temple Restoration</span>
                      <span>₹5,000 (27%)</span>
                    </div>
                    <Progress value={27} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Vedic Education</span>
                      <span>₹2,500 (14%)</span>
                    </div>
                    <Progress value={14} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Manuscript Preservation</span>
                      <span>₹10,000 (54%)</span>
                    </div>
                    <Progress value={54} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Community Support</span>
                      <span>₹1,000 (5%)</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/donate"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
              >
                Make a new donation <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
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

