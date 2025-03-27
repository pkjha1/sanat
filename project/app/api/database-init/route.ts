import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ success: false, error: "Missing Supabase credentials" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check existing tables
    const { data: existingTables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")

    if (tablesError) {
      console.error("Error fetching tables:", tablesError)
      return NextResponse.json({ success: false, error: "Failed to fetch existing tables" }, { status: 500 })
    }

    const tableNames = existingTables.map((t) => t.table_name)

    // Create required tables if they don't exist
    const createdTables = []

    // Books table
    if (!tableNames.includes("books")) {
      const { error: createBooksError } = await supabase.rpc("create_books_table")

      if (createBooksError) {
        console.error("Error creating books table:", createBooksError)
      } else {
        createdTables.push("books")
      }
    }

    // Chapters table
    if (!tableNames.includes("chapters")) {
      const { error: createChaptersError } = await supabase.rpc("create_chapters_table")

      if (createChaptersError) {
        console.error("Error creating chapters table:", createChaptersError)
      } else {
        createdTables.push("chapters")
      }
    }

    // Return the result
    return NextResponse.json({
      success: true,
      existingTables: tableNames,
      createdTables,
    })
  } catch (error) {
    console.error("Database initialization error:", error)
    return NextResponse.json({ success: false, error: "Failed to initialize database" }, { status: 500 })
  }
}

