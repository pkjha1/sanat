"use server"

import { revalidatePath } from "next/cache"
import { executeQuery } from "@/lib/db"
import { auth } from "@/auth"
import { v4 as uuidv4 } from "uuid"
import { logUserActivity } from "@/lib/activity-logger"

export async function getAudiobooks(page = 1, limit = 10, search = "") {
  try {
    const offset = (page - 1) * limit

    let query = `
      SELECT a.*, u.name as narrator_name
      FROM audiobooks a
      LEFT JOIN users u ON a.narrator_id = u.id
      WHERE 1=1
    `

    const params = []

    if (search) {
      query += ` AND (a.title ILIKE $1 OR a.description ILIKE $1)`
      params.push(`%${search}%`)
    }

    query += ` ORDER BY a.created_at DESC LIMIT ${limit} OFFSET ${offset}`

    const { success, data, error } = await executeQuery(query, params)

    if (!success) {
      throw error
    }

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM audiobooks a
      WHERE 1=1
      ${search ? `AND (a.title ILIKE $1 OR a.description ILIKE $1)` : ""}
    `

    const { data: countData } = await executeQuery(countQuery, search ? [`%${search}%`] : [])
    const total = Number.parseInt(countData[0].total)

    return {
      success: true,
      audiobooks: data,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    }
  } catch (error) {
    console.error("Error fetching audiobooks:", error)
    return {
      success: false,
      message: "Failed to fetch audiobooks",
      audiobooks: [],
      pagination: {
        total: 0,
        pages: 0,
        page,
        limit,
      },
    }
  }
}

export async function getAudiobookById(id: string) {
  try {
    const { data, success, error } = await executeQuery(
      `
      SELECT a.*, u.name as narrator_name
      FROM audiobooks a
      LEFT JOIN users u ON a.narrator_id = u.id
      WHERE a.id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    if (!data.length) {
      return {
        success: false,
        message: "Audiobook not found",
        audiobook: null,
      }
    }

    // Get chapters
    const { data: chapters } = await executeQuery(
      `
      SELECT *
      FROM audiobook_chapters
      WHERE audiobook_id = $1
      ORDER BY chapter_number ASC
    `,
      [id],
    )

    // Log activity
    const session = await auth()
    if (session?.user) {
      await logUserActivity("audiobook_viewed", "audiobook", id)
    }

    return {
      success: true,
      audiobook: {
        ...data[0],
        chapters: chapters || [],
      },
    }
  } catch (error) {
    console.error("Error fetching audiobook:", error)
    return {
      success: false,
      message: "Failed to fetch audiobook",
      audiobook: null,
    }
  }
}

export async function createAudiobook(formData: FormData) {
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
    const description = formData.get("description") as string
    const coverImage = formData.get("coverImage") as string
    const category = formData.get("category") as string
    const language = formData.get("language") as string
    const duration = formData.get("duration") as string

    if (!title) {
      return {
        success: false,
        message: "Title is required",
      }
    }

    const { success, error } = await executeQuery(
      `
      INSERT INTO audiobooks (
        id, title, description, cover_image, category, 
        language, duration, narrator_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
      [
        id,
        title,
        description || null,
        coverImage || null,
        category || null,
        language || null,
        duration || null,
        session.user.id,
      ],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("audiobook_created", "audiobook", id)

    revalidatePath("/admin/audiobooks")
    revalidatePath("/audiobooks")

    return {
      success: true,
      message: "Audiobook created successfully",
      audiobookId: id,
    }
  } catch (error) {
    console.error("Error creating audiobook:", error)
    return {
      success: false,
      message: "Failed to create audiobook",
    }
  }
}

export async function updateAudiobook(id: string, formData: FormData) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const coverImage = formData.get("coverImage") as string
    const category = formData.get("category") as string
    const language = formData.get("language") as string
    const duration = formData.get("duration") as string

    if (!title) {
      return {
        success: false,
        message: "Title is required",
      }
    }

    const { success, error } = await executeQuery(
      `
      UPDATE audiobooks
      SET 
        title = $1,
        description = $2,
        cover_image = $3,
        category = $4,
        language = $5,
        duration = $6,
        updated_at = NOW()
      WHERE id = $7
    `,
      [title, description || null, coverImage || null, category || null, language || null, duration || null, id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("audiobook_updated", "audiobook", id)

    revalidatePath(`/admin/audiobooks/${id}`)
    revalidatePath(`/audiobooks/${id}`)
    revalidatePath("/admin/audiobooks")
    revalidatePath("/audiobooks")

    return {
      success: true,
      message: "Audiobook updated successfully",
    }
  } catch (error) {
    console.error("Error updating audiobook:", error)
    return {
      success: false,
      message: "Failed to update audiobook",
    }
  }
}

export async function deleteAudiobook(id: string) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    // First delete all chapters
    await executeQuery(
      `
      DELETE FROM audiobook_chapters
      WHERE audiobook_id = $1
    `,
      [id],
    )

    // Then delete the audiobook
    const { success, error } = await executeQuery(
      `
      DELETE FROM audiobooks
      WHERE id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("audiobook_deleted", "audiobook", id)

    revalidatePath("/admin/audiobooks")
    revalidatePath("/audiobooks")

    return {
      success: true,
      message: "Audiobook deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting audiobook:", error)
    return {
      success: false,
      message: "Failed to delete audiobook",
    }
  }
}

export async function createAudiobookChapter(audiobookId: string, formData: FormData) {
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
    const audioUrl = formData.get("audioUrl") as string
    const chapterNumber = Number.parseInt(formData.get("chapterNumber") as string) || 1
    const duration = formData.get("duration") as string

    if (!title || !audioUrl) {
      return {
        success: false,
        message: "Title and audio URL are required",
      }
    }

    // Check if audiobook exists
    const { data: audiobookData } = await executeQuery(
      `
      SELECT id FROM audiobooks WHERE id = $1
    `,
      [audiobookId],
    )

    if (!audiobookData.length) {
      return {
        success: false,
        message: "Audiobook not found",
      }
    }

    const { success, error } = await executeQuery(
      `
      INSERT INTO audiobook_chapters (
        id, audiobook_id, title, audio_url, chapter_number, duration
      )
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
      [id, audiobookId, title, audioUrl, chapterNumber, duration || null],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("audiobook_chapter_created", "audiobook_chapter", id)

    revalidatePath(`/admin/audiobooks/${audiobookId}/chapters`)
    revalidatePath(`/audiobooks/${audiobookId}`)

    return {
      success: true,
      message: "Chapter created successfully",
      chapterId: id,
    }
  } catch (error) {
    console.error("Error creating audiobook chapter:", error)
    return {
      success: false,
      message: "Failed to create chapter",
    }
  }
}

export async function deleteAudiobookChapter(id: string) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    // Get audiobook ID for revalidation
    const { data: chapterData } = await executeQuery(
      `
      SELECT audiobook_id FROM audiobook_chapters WHERE id = $1
    `,
      [id],
    )

    if (!chapterData.length) {
      return {
        success: false,
        message: "Chapter not found",
      }
    }

    const audiobookId = chapterData[0].audiobook_id

    const { success, error } = await executeQuery(
      `
      DELETE FROM audiobook_chapters
      WHERE id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("audiobook_chapter_deleted", "audiobook_chapter", id)

    revalidatePath(`/admin/audiobooks/${audiobookId}/chapters`)
    revalidatePath(`/audiobooks/${audiobookId}`)

    return {
      success: true,
      message: "Chapter deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting audiobook chapter:", error)
    return {
      success: false,
      message: "Failed to delete chapter",
    }
  }
}

