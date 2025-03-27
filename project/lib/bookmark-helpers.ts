import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

/**
 * Checks if a specific content is bookmarked by the current user
 */
export async function isContentBookmarked(contentType: string, contentId: string): Promise<boolean> {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  // Check if the content is bookmarked
  const { data, error } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("content_type", contentType)
    .eq("content_id", contentId)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error("Error checking bookmark status:", error)
  }

  return !!data
}

