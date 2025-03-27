import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"
import fs from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const { script } = await request.json()

    if (!script) {
      return NextResponse.json({ success: false, error: "Script name is required" }, { status: 400 })
    }

    // Get the SQL script content
    const scriptPath = path.join(process.cwd(), "app", "api", "sql", `${script}.sql`)

    if (!fs.existsSync(scriptPath)) {
      return NextResponse.json({ success: false, error: `Script ${script} not found` }, { status: 404 })
    }

    const sqlContent = fs.readFileSync(scriptPath, "utf8")

    // Execute the SQL script
    const supabase = createClient()
    const { data, error } = await supabase.rpc(script)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: `Script ${script} executed successfully`,
      data,
    })
  } catch (error: any) {
    console.error("Error executing SQL script:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

