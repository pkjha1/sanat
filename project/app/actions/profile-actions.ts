"use server"

import { auth } from "@/auth"
import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!)

export async function getProfile() {
  try {
    // Get the authenticated user
    const session = await auth()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to view your profile",
        profile: null,
      }
    }

    const userId = session.user.id

    // Fetch profile
    const profiles = await sql`
      SELECT * FROM profiles
      WHERE id = ${userId}
    `

    if (!profiles.length) {
      // Create profile if it doesn't exist
      const now = new Date().toISOString()

      await sql`
        INSERT INTO profiles (id, full_name, created_at, updated_at)
        VALUES (${userId}, ${session.user.name || null}, ${now}, ${now})
      `

      return {
        success: true,
        profile: {
          id: userId,
          full_name: session.user.name,
          phone: null,
          avatar_url: session.user.image,
          preferences: {},
          created_at: now,
          updated_at: now,
        },
      }
    }

    return {
      success: true,
      profile: profiles[0],
    }
  } catch (error) {
    console.error("Error fetching profile:", error)
    return {
      success: false,
      message: "Failed to fetch profile",
      profile: null,
    }
  }
}

export async function updateProfile(data: {
  full_name?: string
  phone?: string
  avatar_url?: string
}) {
  try {
    // Get the authenticated user
    const session = await auth()

    if (!session?.user) {
      return {
        success: false,
        message: "You must be logged in to update your profile",
      }
    }

    const userId = session.user.id
    const now = new Date().toISOString()

    // Update profile
    await sql`
      UPDATE profiles
      SET 
        full_name = ${data.full_name || null},
        phone = ${data.phone || null},
        avatar_url = ${data.avatar_url || null},
        updated_at = ${now}
      WHERE id = ${userId}
    `

    revalidatePath("/profile")

    return {
      success: true,
      message: "Profile updated successfully",
    }
  } catch (error) {
    console.error("Error updating profile:", error)
    return {
      success: false,
      message: "Failed to update profile",
    }
  }
}

