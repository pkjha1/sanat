import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname: string, clientPayload: any, multipart: boolean) => {
        // Check file type
        const fileType = clientPayload?.contentType || ""
        if (!fileType.startsWith("image/")) {
          throw new Error("Only image files are allowed")
        }

        // Check file size (5MB max for thumbnails)
        const maxSize = 5 * 1024 * 1024
        if (clientPayload?.size && clientPayload.size > maxSize) {
          throw new Error(`File size exceeds the maximum allowed (5MB)`)
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
          maximumSizeInBytes: 5 * 1024 * 1024, // 5MB
          tokenPayload: JSON.stringify({
            userId: "user_123",
            uploadType: "thumbnail",
          }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Parse the token payload
        const payload = tokenPayload ? JSON.parse(tokenPayload) : {}

        // Store metadata in your database
        console.log("Upload completed", {
          blobUrl: blob.url,
          userId: payload.userId,
          uploadType: payload.uploadType,
        })
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}

