"use server"

import { revalidatePath } from "next/cache"
import { executeQuery } from "@/lib/db"
import { auth } from "@/auth"
import { v4 as uuidv4 } from "uuid"
import { logUserActivity } from "@/lib/activity-logger"

export async function getBooks(page = 1, limit = 10, search = "") {
  try {
    const offset = (page - 1) * limit

    let query = `
      SELECT b.*, u.name as author_name
      FROM books b
      LEFT JOIN users u ON b.author_id = u.id
      WHERE 1=1
    `

    const params = []

    if (search) {
      query += ` AND (b.title ILIKE $1 OR b.description ILIKE $1)`
      params.push(`%${search}%`)
    }

    query += ` ORDER BY b.created_at DESC LIMIT ${limit} OFFSET ${offset}`

    const { success, data, error } = await executeQuery(query, params)

    if (!success) {
      throw error
    }

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM books b
      WHERE 1=1
      ${search ? `AND (b.title ILIKE $1 OR b.description ILIKE $1)` : ""}
    `

    const { data: countData } = await executeQuery(countQuery, search ? [`%${search}%`] : [])
    const total = Number.parseInt(countData[0].total)

    return {
      success: true,
      books: data,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    }
  } catch (error) {
    console.error("Error fetching books:", error)
    return {
      success: false,
      message: "Failed to fetch books",
      books: [],
      pagination: {
        total: 0,
        pages: 0,
        page,
        limit,
      },
    }
  }
}

export async function getBookById(id: string) {
  try {
    const { data, success, error } = await executeQuery(
      `
      SELECT b.*, u.name as author_name
      FROM books b
      LEFT JOIN users u ON b.author_id = u.id
      WHERE b.id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    if (!data.length) {
      return {
        success: false,
        message: "Book not found",
        book: null,
      }
    }

    // Log activity
    const session = await auth()
    if (session?.user) {
      await logUserActivity("book_viewed", "book", id)
    }

    return {
      success: true,
      book: data[0],
    }
  } catch (error) {
    console.error("Error fetching book:", error)
    return {
      success: false,
      message: "Failed to fetch book",
      book: null,
    }
  }
}

export async function createBook(formData: FormData) {
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
    const publishedYear = formData.get("publishedYear") as string
    const language = formData.get("language") as string

    if (!title) {
      return {
        success: false,
        message: "Title is required",
      }
    }

    const { success, error } = await executeQuery(
      `
      INSERT INTO books (
        id, title, description, cover_image, category, 
        published_year, language, author_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
      [
        id,
        title,
        description || null,
        coverImage || null,
        category || null,
        publishedYear || null,
        language || null,
        session.user.id,
      ],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("book_created", "book", id)

    revalidatePath("/admin/books")
    revalidatePath("/books")

    return {
      success: true,
      message: "Book created successfully",
      bookId: id,
    }
  } catch (error) {
    console.error("Error creating book:", error)
    return {
      success: false,
      message: "Failed to create book",
    }
  }
}

export async function updateBook(id: string, formData: FormData) {
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
    const publishedYear = formData.get("publishedYear") as string
    const language = formData.get("language") as string

    if (!title) {
      return {
        success: false,
        message: "Title is required",
      }
    }

    const { success, error } = await executeQuery(
      `
      UPDATE books
      SET 
        title = $1,
        description = $2,
        cover_image = $3,
        category = $4,
        published_year = $5,
        language = $6,
        updated_at = NOW()
      WHERE id = $7
    `,
      [title, description || null, coverImage || null, category || null, publishedYear || null, language || null, id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("book_updated", "book", id)

    revalidatePath(`/admin/books/${id}`)
    revalidatePath(`/books/${id}`)
    revalidatePath("/admin/books")
    revalidatePath("/books")

    return {
      success: true,
      message: "Book updated successfully",
    }
  } catch (error) {
    console.error("Error updating book:", error)
    return {
      success: false,
      message: "Failed to update book",
    }
  }
}

export async function deleteBook(id: string) {
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
      DELETE FROM book_chapters
      WHERE book_id = $1
    `,
      [id],
    )

    // Then delete the book
    const { success, error } = await executeQuery(
      `
      DELETE FROM books
      WHERE id = $1
    `,
      [id],
    )

    if (!success) {
      throw error
    }

    // Log activity
    await logUserActivity("book_deleted", "book", id)

    revalidatePath("/admin/books")
    revalidatePath("/books")

    return {
      success: true,
      message: "Book deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting book:", error)
    return {
      success: false,
      message: "Failed to delete book",
    }
  }
}

