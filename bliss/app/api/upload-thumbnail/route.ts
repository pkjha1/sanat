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
        if (!fileType.startsWith("image/")) {
          return {
            rejectUpload: true,
            error: "Only image files are allowed",
          }
        }

        // Check file size (5MB max)
        const maxSize = 5 * 1024 * 1024
        if (clientPayload?.size && clientPayload.size > maxSize) {
          return {
            rejectUpload: true,
            error: `File size exceeds the maximum allowed (5MB)`,
          }
        }

        return {
          tokenPayload: {
            // Optional: Add additional data to the token payload
            userId: "user_123",
            uploadType: "thumbnail",
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

