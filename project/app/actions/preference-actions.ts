"use server"

import { auth } from "@/auth"
import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!)

export async function getUserPreferences() {
  try {
    // Get the authenticated user
    const session = await auth()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to view preferences",
        preferences: {},
      }
    }

    const userId = session.user.id

    // Fetch user profile with preferences
    const profiles = await sql`
      SELECT preferences FROM profiles
      WHERE id = ${userId}
    `

    if (!profiles.length) {
      return {
        success: true,
        preferences: {},
      }
    }

    return {
      success: true,
      preferences: profiles[0].preferences || {},
    }
  } catch (error) {
    console.error("Error fetching user preferences:", error)
    return {
      success: false,
      message: "Failed to fetch preferences",
      preferences: {},
    }
  }
}

export async function updateUserPreferences(preferences: any) {
  try {
    // Get the authenticated user
    const session = await auth()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to update preferences",
      }
    }

    const userId = session.user.id
    const now = new Date().toISOString()

    // Update user profile with new preferences
    await sql`
      UPDATE profiles
      SET 
        preferences = ${JSON.stringify(preferences)},
        updated_at = ${now}
      WHERE id = ${userId}
    `

    revalidatePath("/profile")

    return {
      success: true,
      message: "Preferences updated successfully",
    }
  } catch (error) {
    console.error("Error updating user preferences:", error)
    return {
      success: false,
      message: "Failed to update preferences",
    }
  }
}

