import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const result = await sql`SELECT * FROM religious_places ORDER BY created_at DESC;`
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching religious places:", error)
    return NextResponse.json({ error: "Failed to fetch religious places" }, { status: 500 })
  }
}

