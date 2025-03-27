"use server"

import { revalidatePath } from "next/cache"
import { executeQuery } from "@/lib/db"
import { auth } from "@/auth"
import { v4 as uuidv4 } from "uuid"
import { logUserActivity } from "@/lib/activity-logger"

export async function getStories(page = 1, limit = 10, search = "") {
  try {
    const offset = (page - 1) * limit

    let query = `
      SELECT s.*, u.name as author_name
      FROM stories s
      LEFT JOIN users u ON s.author_id = u.id
      WHERE 1=1
    `

    const params = []

    if (search) {
      query += ` AND (s.title ILIKE $1 OR s.content ILIKE $1)`
      params.push(`%${search}%`)
    }

    query += ` ORDER BY s.created_at DESC LIMIT ${limit} OFFSET ${offset}`

    const { success, data, error } = await executeQuery(query, params)

    if (!success) {
      throw error
    }

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM stories s
      WHERE 1=1
      ${search ? `AND (s.title ILIKE $1 OR s.content ILIKE $1)` : ""}
    `

    const { data: countData } = await executeQuery(countQuery, search ? [`%${search}%`] : [])
    const total = Number.parseInt(countData[0].total)

    return {
      success: true,
      stories: data,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    }
  } catch (error) {
    console.error("Error fetching stories:", error)
    return {
      success: false,
      message: "Failed to fetch stories",
      stories: [],
      pagination: {
        total: 0,
        pages: 0,
        page,
        limit,
      },
    }
  }
}

export async function getStoryById(id: string) {
  try {
    const { data, success, error } = await executeQuery(
      `
      SELECT s.*, u.name as author_name
      FROM stories s
      LEFT JOIN users u ON s.author_id = u.id
      WHERE s.id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    if (!data.length) {
      return {
        success: false,
        message: "Story not found",
        story: null,
      }
    }

    // Log activity
    const session = await auth()
    if (session?.user) {
      await logUserActivity("story_viewed", "story", id)
    }

    return {
      success: true,
      story: data[0],
    }
  } catch (error) {
    console.error("Error fetching story:", error)
    return {
      success: false,
      message: "Failed to fetch story",
      story: null,
    }
  }
}

export async function createStory(formData: FormData) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    const id = uuidv4()
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const featuredImage = formData.get("featuredImage") as string
    const source = formData.get("source") as string

    if (!title) {
      return {
        success: false,
        message: "Title is required",
      }
    }

    const { success, error } = await executeQuery(
      `
      INSERT INTO stories (
        id, title, content, category, featured_image, 
        source, author_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [id, title, content || null, category || null, featuredImage || null, source || null, session.user.id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("story_created", "story", id)

    revalidatePath("/admin/stories")
    revalidatePath("/stories")

    return {
      success: true,
      message: "Story created successfully",
      storyId: id,
    }
  } catch (error) {
    console.error("Error creating story:", error)
    return {
      success: false,
      message: "Failed to create story",
    }
  }
}

export async function updateStory(id: string, formData: FormData) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const featuredImage = formData.get("featuredImage") as string
    const source = formData.get("source") as string

    if (!title) {
      return {
        success: false,
        message: "Title is required",
      }
    }

    const { success, error } = await executeQuery(
      `
      UPDATE stories
      SET 
        title = $1,
        content = $2,
        category = $3,
        featured_image = $4,
        source = $5,
        updated_at = NOW()
      WHERE id = $6
    `,
      [title, content || null, category || null, featuredImage || null, source || null, id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("story_updated", "story", id)

    revalidatePath(`/admin/stories/${id}`)
    revalidatePath(`/stories/${id}`)
    revalidatePath("/admin/stories")
    revalidatePath("/stories")

    return {
      success: true,
      message: "Story updated successfully",
    }
  } catch (error) {
    console.error("Error updating story:", error)
    return {
      success: false,
      message: "Failed to update story",
    }
  }
}

export async function deleteStory(id: string) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    const { success, error } = await executeQuery(
      `
      DELETE FROM stories
      WHERE id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("story_deleted", "story", id)

    revalidatePath("/admin/stories")
    revalidatePath("/stories")

    return {
      success: true,
      message: "Story deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting story:", error)
    return {
      success: false,
      message: "Failed to delete story",
    }
  }
}

