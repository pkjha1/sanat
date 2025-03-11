"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle")

  const handleSaveChanges = () => {
    setSaveStatus("saving")
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("success")
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      })
      // Reset after showing success state
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container py-8 px-4 md:py-12 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        </div>
        <Button
          className="bg-amber-600 hover:bg-amber-700"
          onClick={handleSaveChanges}
          disabled={saveStatus === "saving"}
        >
          {saveStatus === "saving" ? (
            "Saving..."
          ) : saveStatus === "success" ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Saved
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24 border-2 border-amber-200">
                    <AvatarImage src={profileImage || undefined} />
                    <AvatarFallback className="bg-amber-100 text-amber-800 text-2xl">RS</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center">
                    <Label
                      htmlFor="profile-image"
                      className="cursor-pointer text-sm font-medium text-amber-600 hover:text-amber-700"
                    >
                      Change photo
                    </Label>
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="Rahul" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Sharma" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" defaultValue="Rahul Sharma" />
                    <p className="text-sm text-muted-foreground">
                      This is the name that will be displayed to other users.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us a little about yourself"
                      defaultValue="Spiritual seeker on a journey to inner peace. Passionate about Hindu philosophy and meditation."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Profiles</CardTitle>
              <CardDescription>Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" placeholder="https://facebook.com/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" placeholder="https://instagram.com/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" placeholder="https://twitter.com/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="rahul.sharma@example.com" />
                <p className="text-sm text-muted-foreground">
                  This email will be used for account-related notifications.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Change Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor" className="block">
                    Enable Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive a verification code via SMS when signing in.</p>
                </div>
                <Switch id="two-factor" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <h3 className="text-lg font-medium text-red-800">Delete Account</h3>
                <p className="mt-1 text-sm text-red-700">
                  Once you delete your account, there is no going back. All your data will be permanently removed.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-red-300 text-red-600 hover:bg-red-100 hover:text-red-700"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Manage the emails you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-updates" className="block">
                    Platform Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive emails about new features and improvements.</p>
                </div>
                <Switch id="email-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-content" className="block">
                    New Content
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive emails about new books, videos, and courses.</p>
                </div>
                <Switch id="email-content" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-events" className="block">
                    Events and Webinars
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive emails about upcoming events and webinars.</p>
                </div>
                <Switch id="email-events" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-marketing" className="block">
                    Marketing and Promotions
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive emails about special offers and promotions.</p>
                </div>
                <Switch id="email-marketing" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Manage notifications on your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-comments" className="block">
                    Comments and Replies
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when someone replies to your comments.
                  </p>
                </div>
                <Switch id="push-comments" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-reminders" className="block">
                    Learning Reminders
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive daily reminders to continue your learning.</p>
                </div>
                <Switch id="push-reminders" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-events" className="block">
                    Upcoming Events
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about events you've registered for.
                  </p>
                </div>
                <Switch id="push-events" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Settings */}
        <TabsContent value="subscription" className="space-y-4 pt-4">
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You are currently on the Premium plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-white p-4 border border-amber-100">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Premium Plan</h3>
                    <p className="text-sm text-muted-foreground">Billed annually</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      ₹4,999<span className="text-sm font-normal">/year</span>
                    </p>
                    <p className="text-sm text-muted-foreground">Next billing: Dec 15, 2023</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">Unlimited access to all content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">Ad-free experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">Offline downloads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    <span className="text-sm">HD video quality</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-amber-600 hover:bg-amber-700 w-full sm:w-auto">Upgrade to Premium Plus</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Change Billing Cycle
              </Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto">
                Cancel Subscription
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="4" fill="#eeeeee" />
                      <path d="M7 15H17V9H7V15Z" fill="#888888" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
              <Button variant="outline">Add Payment Method</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Premium Plan - Annual</p>
                    <p className="text-sm text-muted-foreground">Dec 15, 2022</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-medium">₹4,999</p>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Premium Plan - Annual</p>
                    <p className="text-sm text-muted-foreground">Dec 15, 2021</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-medium">₹4,999</p>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Download All Invoices</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

