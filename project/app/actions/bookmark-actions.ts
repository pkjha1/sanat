"use server"

import { auth } from "@/auth"
import { neon } from "@neondatabase/serverless"
import { v4 as uuidv4 } from "uuid"
import { revalidatePath } from "next/cache"

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!)

export async function toggleBookmark(contentType: string, contentId: string) {
  try {
    // Get the authenticated user
    const session = await auth()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to bookmark content",
      }
    }

    const userId = session.user.id

    // Check if bookmark already exists
    const existingBookmark = await sql`
      SELECT id FROM bookmarks 
      WHERE user_id = ${userId} 
      AND content_type = ${contentType} 
      AND content_id = ${contentId}
    `

    // If bookmark exists, delete it
    if (existingBookmark.length > 0) {
      await sql`
        DELETE FROM bookmarks 
        WHERE id = ${existingBookmark[0].id}
      `

      // Log activity
      await logActivity(userId, "bookmark_removed", contentType, contentId)

      revalidatePath("/bookmarks")

      return {
        success: true,
        message: "Bookmark removed successfully",
        isBookmarked: false,
      }
    }

    // If bookmark doesn't exist, create it
    const bookmarkId = uuidv4()

    await sql`
      INSERT INTO bookmarks (id, user_id, content_type, content_id)
      VALUES (${bookmarkId}, ${userId}, ${contentType}, ${contentId})
    `

    // Log activity
    await logActivity(userId, "bookmark_added", contentType, contentId)

    revalidatePath("/bookmarks")

    return {
      success: true,
      message: "Bookmark added successfully",
      isBookmarked: true,
    }
  } catch (error) {
    console.error("Error in toggleBookmark:", error)
    return {
      success: false,
      message: "Failed to update bookmark",
    }
  }
}

export async function getBookmarkStatus(contentType: string, contentId: string) {
  try {
    // Get the authenticated user
    const session = await auth()

    if (!session?.user) {
      return {
        success: false,
        isBookmarked: false,
      }
    }

    const userId = session.user.id

    // Check if bookmark exists
    const bookmarks = await sql`
      SELECT id FROM bookmarks 
      WHERE user_id = ${userId} 
      AND content_type = ${contentType} 
      AND content_id = ${contentId}
    `

    return {
      success: true,
      isBookmarked: bookmarks.length > 0,
    }
  } catch (error) {
    console.error("Error in getBookmarkStatus:", error)
    return {
      success: false,
      isBookmarked: false,
    }
  }
}

export async function getUserBookmarks(contentType?: string) {
  try {
    // Get the authenticated user
    const session = await auth()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to view bookmarks",
        bookmarks: [],
      }
    }

    const userId = session.user.id

    // Build query
    let query = `
      SELECT id, content_type, content_id, created_at 
      FROM bookmarks 
      WHERE user_id = '${userId}' 
    `

    // Filter by content type if provided
    if (contentType) {
      query += `AND content_type = '${contentType}' `
    }

    query += `ORDER BY created_at DESC`

    const bookmarks = await sql.raw(query)

    return {
      success: true,
      bookmarks: bookmarks || [],
    }
  } catch (error) {
    console.error("Error in getUserBookmarks:", error)
    return {
      success: false,
      message: "Failed to fetch bookmarks",
      bookmarks: [],
    }
  }
}

// Helper function to log user activity
async function logActivity(userId: string, action: string, contentType: string, contentId: string) {
  try {
    const activityId = uuidv4()

    await sql`
      INSERT INTO user_activities (id, user_id, action, content_type, content_id)
      VALUES (${activityId}, ${userId}, ${action}, ${contentType}, ${contentId})
    `
  } catch (error) {
    console.error("Error logging activity:", error)
    // Don't throw error to prevent disrupting the main function
  }
}

