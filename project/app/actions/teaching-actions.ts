"use server"

import { revalidatePath } from "next/cache"
import { executeQuery } from "@/lib/db"
import { auth } from "@/auth"
import { v4 as uuidv4 } from "uuid"
import { logUserActivity } from "@/lib/activity-logger"

export async function getTeachings(page = 1, limit = 10, search = "") {
  try {
    const offset = (page - 1) * limit

    let query = `
      SELECT t.*, u.name as author_name
      FROM teachings t
      LEFT JOIN users u ON t.author_id = u.id
      WHERE 1=1
    `

    const params = []

    if (search) {
      query += ` AND (t.title ILIKE $1 OR t.content ILIKE $1)`
      params.push(`%${search}%`)
    }

    query += ` ORDER BY t.created_at DESC LIMIT ${limit} OFFSET ${offset}`

    const { success, data, error } = await executeQuery(query, params)

    if (!success) {
      throw error
    }

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM teachings t
      WHERE 1=1
      ${search ? `AND (t.title ILIKE $1 OR t.content ILIKE $1)` : ""}
    `

    const { data: countData } = await executeQuery(countQuery, search ? [`%${search}%`] : [])
    const total = Number.parseInt(countData[0].total)

    return {
      success: true,
      teachings: data,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    }
  } catch (error) {
    console.error("Error fetching teachings:", error)
    return {
      success: false,
      message: "Failed to fetch teachings",
      teachings: [],
      pagination: {
        total: 0,
        pages: 0,
        page,
        limit,
      },
    }
  }
}

export async function getTeachingById(id: string) {
  try {
    const { data, success, error } = await executeQuery(
      `
      SELECT t.*, u.name as author_name
      FROM teachings t
      LEFT JOIN users u ON t.author_id = u.id
      WHERE t.id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    if (!data.length) {
      return {
        success: false,
        message: "Teaching not found",
        teaching: null,
      }
    }

    // Log activity
    const session = await auth()
    if (session?.user) {
      await logUserActivity("teaching_viewed", "teaching", id)
    }

    return {
      success: true,
      teaching: data[0],
    }
  } catch (error) {
    console.error("Error fetching teaching:", error)
    return {
      success: false,
      message: "Failed to fetch teaching",
      teaching: null,
    }
  }
}

export async function createTeaching(formData: FormData) {
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
      INSERT INTO teachings (
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
    await logUserActivity("teaching_created", "teaching", id)

    revalidatePath("/admin/teachings")
    revalidatePath("/teachings")

    return {
      success: true,
      message: "Teaching created successfully",
      teachingId: id,
    }
  } catch (error) {
    console.error("Error creating teaching:", error)
    return {
      success: false,
      message: "Failed to create teaching",
    }
  }
}

export async function updateTeaching(id: string, formData: FormData) {
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
      UPDATE teachings
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
    await logUserActivity("teaching_updated", "teaching", id)

    revalidatePath(`/admin/teachings/${id}`)
    revalidatePath(`/teachings/${id}`)
    revalidatePath("/admin/teachings")
    revalidatePath("/teachings")

    return {
      success: true,
      message: "Teaching updated successfully",
    }
  } catch (error) {
    console.error("Error updating teaching:", error)
    return {
      success: false,
      message: "Failed to update teaching",
    }
  }
}

export async function deleteTeaching(id: string) {
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
      DELETE FROM teachings
      WHERE id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("teaching_deleted", "teaching", id)

    revalidatePath("/admin/teachings")
    revalidatePath("/teachings")

    return {
      success: true,
      message: "Teaching deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting teaching:", error)
    return {
      success: false,
      message: "Failed to delete teaching",
    }
  }
}

