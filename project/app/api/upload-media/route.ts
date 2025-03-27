import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname: string, clientPayload?: string) => {
        // Parse the client payload if it exists
        const payload = clientPayload ? JSON.parse(clientPayload) : {}

        // Check file type
        const fileType = payload?.contentType || ""
        if (!fileType.startsWith("audio/") && !fileType.startsWith("video/")) {
          throw new Error("Only audio and video files are allowed")
        }

        // Check file size (100MB for audio, 500MB for video)
        const maxSize = fileType.startsWith("audio/") ? 100 * 1024 * 1024 : 500 * 1024 * 1024
        if (payload?.size && payload.size > maxSize) {
          throw new Error(`File size exceeds the maximum allowed (${maxSize / (1024 * 1024)}MB)`)
        }

        return {
          allowedContentTypes: ["audio/mpeg", "audio/wav", "audio/mp4", "video/mp4", "video/webm", "video/quicktime"],
          maximumSizeInBytes: 500 * 1024 * 1024, // 500MB
          tokenPayload: JSON.stringify({
            userId: "user_123",
            uploadType: "media",
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

