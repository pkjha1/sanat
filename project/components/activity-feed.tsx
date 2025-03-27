"use client"

import { useEffect, useState } from "react"
import { getUserActivities } from "@/lib/activity-logger"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, BookOpen, Video, Headphones, MapPin, Bookmark, Eye } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function ActivityFeed() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true)
        const result = await getUserActivities(20)

        if (result.success) {
          setActivities(result.activities)
        } else {
          setError(result.message)
        }
      } catch (err) {
        setError("Failed to load activities")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No recent activity found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

function ActivityItem({ activity }) {
  const getActivityIcon = () => {
    const iconProps = { className: "h-5 w-5 mr-2" }

    switch (activity.content_type) {
      case "book":
        return <BookOpen {...iconProps} />
      case "teaching":
        return <Video {...iconProps} />
      case "audiobook":
        return <Headphones {...iconProps} />
      case "place":
        return <MapPin {...iconProps} />
      default:
        return null
    }
  }

  const getActionIcon = () => {
    const iconProps = { className: "h-5 w-5 mr-2" }

    if (activity.action.includes("bookmark")) {
      return <Bookmark {...iconProps} />
    } else if (activity.action.includes("viewed")) {
      return <Eye {...iconProps} />
    }

    return null
  }

  const getActivityText = () => {
    const contentType = activity.content_type
      ? activity.content_type.charAt(0).toUpperCase() + activity.content_type.slice(1)
      : ""

    switch (activity.action) {
      case "bookmark_added":
        return `Bookmarked a ${contentType}`
      case "bookmark_removed":
        return `Removed ${contentType} bookmark`
      case "content_viewed":
        return `Viewed a ${contentType}`
      default:
        return activity.action.replace(/_/g, " ")
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="flex items-center text-amber-600">{getActionIcon()}</div>
          <div className="ml-2 flex-1">
            <p className="text-sm font-medium">{getActivityText()}</p>
            <div className="flex items-center mt-1">
              {getActivityIcon()}
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

