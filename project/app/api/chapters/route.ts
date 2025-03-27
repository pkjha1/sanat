import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const bookId = searchParams.get("bookId")

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Missing Supabase credentials" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Build query
    let query = supabase.from("chapters").select("*")

    // Filter by book_id if provided
    if (bookId) {
      query = query.eq("book_id", bookId)
    }

    // Order by chapter_number
    query = query.order("chapter_number", { ascending: true })

    // Execute query
    const { data, error } = await query

    if (error) {
      console.error("Error fetching chapters:", error)
      return NextResponse.json({ error: "Failed to fetch chapters" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body
    if (!body.title || !body.book_id) {
      return NextResponse.json({ error: "Title and book_id are required" }, { status: 400 })
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Missing Supabase credentials" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get the highest chapter number for this book
    const { data: chapters, error: chaptersError } = await supabase
      .from("chapters")
      .select("chapter_number")
      .eq("book_id", body.book_id)
      .order("chapter_number", { ascending: false })
      .limit(1)

    if (chaptersError) {
      console.error("Error getting chapter number:", chaptersError)
      return NextResponse.json({ error: "Failed to determine chapter number" }, { status: 500 })
    }

    const nextChapterNumber = chapters && chapters.length > 0 ? chapters[0].chapter_number + 1 : 1

    // Insert the new chapter
    const { data, error } = await supabase
      .from("chapters")
      .insert({
        title: body.title,
        content: body.content || "",
        book_id: body.book_id,
        chapter_number: nextChapterNumber,
        status: "draft",
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating chapter:", error)
      return NextResponse.json({ error: "Failed to create chapter" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

