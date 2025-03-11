import { NextResponse } from "next/server"

export async function GET() {
  // Only return the API key if it exists
  if (process.env.GOOGLE_MAPS_API_KEY) {
    return NextResponse.json({
      key: process.env.GOOGLE_MAPS_API_KEY,
    })
  }

  // Return an error if the API key is not set
  return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 })
}

