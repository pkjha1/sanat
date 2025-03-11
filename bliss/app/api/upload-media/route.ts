import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname: string, clientPayload) => {
        // Check user authentication and authorization here
        // For example, verify the user is logged in and has permission to upload

        // This is where you can validate file types, sizes, etc.
        return {
          allowedContentTypes: ["audio/mpeg", "audio/wav", "audio/mp4", "video/mp4", "video/webm", "video/quicktime"],
          maximumSizeInBytes: 500 * 1024 * 1024, // 500MB
          tokenPayload: {
            // Optional: Add additional payload to the token
            userId: "admin", // In a real app, this would be the authenticated user's ID
          },
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // This is called after the upload is complete
        // Here you can store the blob URL in your database
        console.log("Upload completed:", blob)

        // Example: Store in database
        // await db.insert({ url: blob.url, userId: tokenPayload.userId })
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}

