import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Check file type
        const fileType = clientPayload?.contentType || ""
        if (!fileType.startsWith("audio/") && !fileType.startsWith("video/")) {
          return {
            rejectUpload: true,
            error: "Only audio and video files are allowed",
          }
        }

        // Check file size (100MB for audio, 500MB for video)
        const maxSize = fileType.startsWith("audio/") ? 100 * 1024 * 1024 : 500 * 1024 * 1024
        if (clientPayload?.size && clientPayload.size > maxSize) {
          return {
            rejectUpload: true,
            error: `File size exceeds the maximum allowed (${maxSize / (1024 * 1024)}MB)`,
          }
        }

        return {
          tokenPayload: {
            // Optional: Add additional data to the token payload
            userId: "user_123",
            uploadType: "media",
          },
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Store metadata in your database
        console.log("Upload completed", {
          blobUrl: blob.url,
          userId: tokenPayload?.userId,
          uploadType: tokenPayload?.uploadType,
        })
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}

