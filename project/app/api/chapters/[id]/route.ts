import { type NextRequest, NextResponse } from "next/server"
import { getRecordById, updateRecord, deleteRecord } from "@/lib/db-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const chapter = await getRecordById("chapters", params.id)

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 })
    }

    return NextResponse.json(chapter)
  } catch (error) {
    console.error(`Error fetching chapter with id ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch chapter" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { book_id, title, content, order_number } = body

    if (!book_id || !title) {
      return NextResponse.json({ error: "Book ID and title are required" }, { status: 400 })
    }

    const updatedChapter = await updateRecord("chapters", params.id, {
      book_id,
      title,
      content,
      order_number,
    })

    return NextResponse.json(updatedChapter)
  } catch (error) {
    console.error(`Error updating chapter with id ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update chapter" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteRecord("chapters", params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting chapter with id ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete chapter" }, { status: 500 })
  }
}

