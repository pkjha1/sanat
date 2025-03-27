import { type NextRequest, NextResponse } from "next/server"
import { getRecordById, updateRecord, deleteRecord } from "@/lib/db-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const book = await getRecordById("books", params.id)

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json(book)
  } catch (error) {
    console.error(`Error fetching book with id ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, author, description, cover_image } = body

    if (!title || !author) {
      return NextResponse.json({ error: "Title and author are required" }, { status: 400 })
    }

    const updatedBook = await updateRecord("books", params.id, {
      title,
      author,
      description,
      cover_image,
    })

    return NextResponse.json(updatedBook)
  } catch (error) {
    console.error(`Error updating book with id ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteRecord("books", params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting book with id ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 })
  }
}

