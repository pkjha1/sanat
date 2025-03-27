"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { getUserPreferences, updateUserPreferences } from "@/app/actions/preference-actions"

export function PreferencesForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    darkMode: false,
    contentLanguage: "english",
    contentCategories: ["all"],
  })

  useEffect(() => {
    async function loadPreferences() {
      try {
        setLoading(true)
        const result = await getUserPreferences()

        if (result.success && result.preferences) {
          setPreferences({
            emailNotifications: result.preferences.emailNotifications ?? true,
            darkMode: result.preferences.darkMode ?? false,
            contentLanguage: result.preferences.contentLanguage ?? "english",
            contentCategories: result.preferences.contentCategories ?? ["all"],
          })
        }
      } catch (error) {
        console.error("Error loading preferences:", error)
        toast({
          title: "Error",
          description: "Failed to load preferences. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadPreferences()
  }, [])

  const handleSavePreferences = async () => {
    try {
      setSaving(true)
      const result = await updateUserPreferences(preferences)

      if (result.success) {
        toast({
          title: "Preferences saved",
          description: "Your preferences have been updated successfully.",
        })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error saving preferences:", error)
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Preferences</CardTitle>
        <CardDescription>Customize your experience on the platform.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notifications</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive email updates about new content and activities.</p>
            </div>
            <Switch
              id="email-notifications"
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-gray-500">Use dark theme for the website.</p>
            </div>
            <Switch
              id="dark-mode"
              checked={preferences.darkMode}
              onCheckedChange={(checked) => setPreferences({ ...preferences, darkMode: checked })}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Content</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content-language">Preferred Language</Label>
              <Select
                value={preferences.contentLanguage}
                onValueChange={(value) => setPreferences({ ...preferences, contentLanguage: value })}
              >
                <SelectTrigger id="content-language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="sanskrit">Sanskrit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSavePreferences} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

