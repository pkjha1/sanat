"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Loader2, User, BookOpen, Settings, LogOut } from "lucide-react"
import { ActivityFeed } from "@/components/activity-feed"
import { PreferencesForm } from "@/components/preferences-form"
import { logUserActivity } from "@/lib/activity-logger"
import { updateProfile, getProfile } from "@/app/actions/profile-actions"

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
  })
  const [avatarUrl, setAvatarUrl] = useState("")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true)

        if (status === "unauthenticated") {
          router.push("/auth/login")
          return
        }

        if (status === "authenticated" && session.user) {
          // Get profile
          const { success, profile } = await getProfile()

          if (success && profile) {
            setProfile(profile)
            setFormData({
              full_name: profile.full_name || session.user.name || "",
              phone: profile.phone || "",
            })
            setAvatarUrl(profile.avatar_url || session.user.image || "")
          }

          // Log profile view activity
          await logUserActivity("profile_viewed")
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (status !== "loading") {
      loadProfile()
    }
  }, [session, status, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const { success, message } = await updateProfile({
        full_name: formData.full_name,
        phone: formData.phone,
      })

      if (success) {
        toast({
          title: "Profile updated",
          description: message,
        })

        // Log profile update activity
        await logUserActivity("profile_updated")
      } else {
        throw new Error(message)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = async (e) => {
    try {
      setUploading(true)

      if (!e.target.files || e.target.files.length === 0) {
        return
      }

      // For now, we'll just show a toast since we need to implement file storage
      toast({
        title: "Feature not available",
        description: "Avatar upload is not implemented yet.",
      })

      // In a real implementation, you would:
      // 1. Upload the file to a storage service
      // 2. Get the URL of the uploaded file
      // 3. Update the profile with the new avatar URL
    } catch (error) {
      console.error("Error uploading avatar:", error)
      toast({
        title: "Error",
        description: "Failed to upload avatar. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again later.",
        variant: "destructive",
      })
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    )
  }

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="container py-10 mt-16">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-amber-100">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="text-lg bg-amber-100 text-amber-800">
                      {getInitials(formData.full_name || session?.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                  >
                    {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="text-xs">Change</span>}
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    disabled={uploading}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-medium">{formData.full_name || session?.user?.name || "User"}</h3>
                  <p className="text-sm text-gray-500">{session?.user?.email}</p>
                  {session?.user?.role === "admin" && (
                    <span className="inline-block mt-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <Separator />
                <nav className="w-full">
                  <ul className="space-y-2">
                    <li>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <a href="#profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </a>
                      </Button>
                    </li>
                    <li>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <a href="/bookmarks" className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Bookmarks
                        </a>
                      </Button>
                    </li>
                    <li>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <a href="/settings" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </a>
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <Tabs defaultValue="profile">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and contact details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={session?.user?.email || ""}
                        disabled
                        placeholder="Your email address"
                      />
                      <p className="text-xs text-gray-500">
                        Email cannot be changed. Contact support if you need to update your email.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                      />
                    </div>
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions and activities on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActivityFeed />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <PreferencesForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

