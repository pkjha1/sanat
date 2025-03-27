"use server"

import { executeQuery } from "@/lib/db"
import { auth } from "@/auth"
import { v4 as uuidv4 } from "uuid"

type ActivityType =
  | "book_viewed"
  | "book_created"
  | "book_updated"
  | "book_deleted"
  | "chapter_viewed"
  | "chapter_created"
  | "chapter_updated"
  | "chapter_deleted"
  | "teaching_viewed"
  | "teaching_created"
  | "teaching_updated"
  | "teaching_deleted"
  | "audiobook_viewed"
  | "audiobook_created"
  | "audiobook_updated"
  | "audiobook_deleted"
  | "audiobook_chapter_created"
  | "audiobook_chapter_deleted"
  | "place_viewed"
  | "place_created"
  | "place_updated"
  | "place_deleted"
  | "place_image_added"
  | "place_image_deleted"
  | "story_viewed"
  | "story_created"
  | "story_updated"
  | "story_deleted"
  | "user_login"
  | "user_logout"
  | "user_profile_updated"

type EntityType =
  | "book"
  | "chapter"
  | "teaching"
  | "audiobook"
  | "audiobook_chapter"
  | "place"
  | "place_image"
  | "story"
  | "user"
  | "profile"

// Mock activity logger that doesn't actually use Supabase

export async function logActivity(userId, action, itemId, itemType) {
  // Mock implementation that doesn't actually use Supabase
  console.log(`Logging activity: ${userId} ${action} ${itemType} ${itemId}`)
  return { success: true }
}

export async function getUserActivity(userId, limit = 10) {
  // Mock implementation that returns an empty array
  return []
}

export async function logUserActivity(
  activityType: ActivityType,
  entityType: EntityType,
  entityId: string,
  details: Record<string, any> = {},
) {
  try {
    const session = await auth()
    if (!session?.user) return

    const id = uuidv4()
    const userId = session.user.id

    await executeQuery(
      `
      INSERT INTO user_activities (
        id, user_id, activity_type, entity_type, entity_id, details
      )
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
      [id, userId, activityType, entityType, entityId, JSON.stringify(details)],
    )

    return true
  } catch (error) {
    console.error("Error logging user activity:", error)
    return false
  }
}

export async function getUserActivities(userId: string, limit = 50) {
  try {
    const { data, success, error } = await executeQuery(
      `
      SELECT *
      FROM user_activities
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2
    `,
      [userId, limit],
    )

    if (!success) {
      throw error
    }

    return {
      success: true,
      activities: data,
    }
  } catch (error) {
    console.error("Error fetching user activities:", error)
    return {
      success: false,
      message: "Failed to fetch user activities",
      activities: [],
    }
  }
}

