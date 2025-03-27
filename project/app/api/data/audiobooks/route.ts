import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const result = await sql`SELECT * FROM audiobooks ORDER BY created_at DESC;`
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching audiobooks:", error)
    return NextResponse.json({ error: "Failed to fetch audiobooks" }, { status: 500 })
  }
}

