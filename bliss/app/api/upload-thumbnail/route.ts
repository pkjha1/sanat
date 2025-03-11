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

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
          maximumSizeInBytes: 5 * 1024 * 1024, // 5MB
          tokenPayload: {
            userId: "admin",
          },
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("Thumbnail upload completed:", blob)

        // Example: Store in database
        // await db.insert({ thumbnailUrl: blob.url, userId: tokenPayload.userId })
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}

