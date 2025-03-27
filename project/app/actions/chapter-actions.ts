"use server"

import { revalidatePath } from "next/cache"
import { executeQuery } from "@/lib/db"
import { auth } from "@/auth"
import { v4 as uuidv4 } from "uuid"
import { logUserActivity } from "@/lib/activity-logger"

export async function getChapters(bookId: string) {
  try {
    const { data, success, error } = await executeQuery(
      `
      SELECT *
      FROM book_chapters
      WHERE book_id = $1
      ORDER BY chapter_number ASC
    `,
      [bookId],
    )

    if (!success) {
      throw error
    }

    return {
      success: true,
      chapters: data,
    }
  } catch (error) {
    console.error("Error fetching chapters:", error)
    return {
      success: false,
      message: "Failed to fetch chapters",
      chapters: [],
    }
  }
}

export async function getChapterById(id: string) {
  try {
    const { data, success, error } = await executeQuery(
      `
      SELECT c.*, b.title as book_title
      FROM book_chapters c
      JOIN books b ON c.book_id = b.id
      WHERE c.id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    if (!data.length) {
      return {
        success: false,
        message: "Chapter not found",
        chapter: null,
      }
    }

    // Log activity
    const session = await auth()
    if (session?.user) {
      await logUserActivity("chapter_viewed", "chapter", id)
    }

    return {
      success: true,
      chapter: data[0],
    }
  } catch (error) {
    console.error("Error fetching chapter:", error)
    return {
      success: false,
      message: "Failed to fetch chapter",
      chapter: null,
    }
  }
}

export async function createChapter(bookId: string, formData: FormData) {
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
    const chapterNumber = Number.parseInt(formData.get("chapterNumber") as string) || 1

    if (!title) {
      return {
        success: false,
        message: "Title is required",
      }
    }

    // Check if book exists
    const { data: bookData } = await executeQuery(
      `
      SELECT id FROM books WHERE id = $1
    `,
      [bookId],
    )

    if (!bookData.length) {
      return {
        success: false,
        message: "Book not found",
      }
    }

    const { success, error } = await executeQuery(
      `
      INSERT INTO book_chapters (
        id, book_id, title, content, chapter_number
      )
      VALUES ($1, $2, $3, $4, $5)
    `,
      [id, bookId, title, content || null, chapterNumber],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("chapter_created", "chapter", id)

    revalidatePath(`/admin/books/${bookId}/chapters`)
    revalidatePath(`/books/${bookId}`)

    return {
      success: true,
      message: "Chapter created successfully",
      chapterId: id,
    }
  } catch (error) {
    console.error("Error creating chapter:", error)
    return {
      success: false,
      message: "Failed to create chapter",
    }
  }
}

export async function updateChapter(id: string, formData: FormData) {
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
    const chapterNumber = Number.parseInt(formData.get("chapterNumber") as string) || 1

    if (!title) {
      return {
        success: false,
        message: "Title is required",
      }
    }

    // Get book ID for revalidation
    const { data: chapterData } = await executeQuery(
      `
      SELECT book_id FROM book_chapters WHERE id = $1
    `,
      [id],
    )

    if (!chapterData.length) {
      return {
        success: false,
        message: "Chapter not found",
      }
    }

    const bookId = chapterData[0].book_id

    const { success, error } = await executeQuery(
      `
      UPDATE book_chapters
      SET 
        title = $1,
        content = $2,
        chapter_number = $3,
        updated_at = NOW()
      WHERE id = $4
    `,
      [title, content || null, chapterNumber, id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("chapter_updated", "chapter", id)

    revalidatePath(`/admin/books/${bookId}/chapters/${id}`)
    revalidatePath(`/books/${bookId}/chapters/${id}`)
    revalidatePath(`/admin/books/${bookId}/chapters`)
    revalidatePath(`/books/${bookId}`)

    return {
      success: true,
      message: "Chapter updated successfully",
    }
  } catch (error) {
    console.error("Error updating chapter:", error)
    return {
      success: false,
      message: "Failed to update chapter",
    }
  }
}

export async function deleteChapter(id: string) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      }
    }

    // Get book ID for revalidation
    const { data: chapterData } = await executeQuery(
      `
      SELECT book_id FROM book_chapters WHERE id = $1
    `,
      [id],
    )

    if (!chapterData.length) {
      return {
        success: false,
        message: "Chapter not found",
      }
    }

    const bookId = chapterData[0].book_id

    const { success, error } = await executeQuery(
      `
      DELETE FROM book_chapters
      WHERE id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("chapter_deleted", "chapter", id)

    revalidatePath(`/admin/books/${bookId}/chapters`)
    revalidatePath(`/books/${bookId}`)

    return {
      success: true,
      message: "Chapter deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting chapter:", error)
    return {
      success: false,
      message: "Failed to delete chapter",
    }
  }
}

