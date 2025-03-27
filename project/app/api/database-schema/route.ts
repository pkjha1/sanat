import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    // Get all tables in the public schema
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")

    if (tablesError) {
      throw tablesError
    }

    // Filter out Supabase system tables
    const publicTables = tables.map((t) => t.table_name).filter((name) => !name.startsWith("_"))

    // Get schema details for each table
    const schema = await Promise.all(
      publicTables.map(async (tableName) => {
        const { data: columns, error: columnsError } = await supabase
          .from("information_schema.columns")
          .select("column_name, data_type, is_nullable, column_default")
          .eq("table_schema", "public")
          .eq("table_name", tableName)

        if (columnsError) {
          throw columnsError
        }

        return {
          table: tableName,
          columns,
        }
      }),
    )

    return NextResponse.json({
      success: true,
      schema,
    })
  } catch (error: any) {
    console.error("Error fetching database schema:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch database schema",
      },
      { status: 500 },
    )
  }
}

