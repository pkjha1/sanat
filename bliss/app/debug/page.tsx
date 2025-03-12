"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function DebugPage() {
  const [supabaseUrl, setSupabaseUrl] = useState<string | null>(null)
  const [supabaseKey, setSupabaseKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    // Check environment variables
    setSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || null)

    // Only show first few characters of the key for security
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    setSupabaseKey(key ? `${key.substring(0, 5)}...` : null)

    // Test Supabase connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select("count").limit(1)
        if (error) throw error

        // Check session
        const { data: sessionData } = await supabase.auth.getSession()
        setSession(sessionData.session)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      }
    }

    testConnection()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Supabase Configuration Debug</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-medium">NEXT_PUBLIC_SUPABASE_URL:</p>
            <p className="text-sm bg-gray-100 p-2 rounded">{supabaseUrl || "Not set"}</p>
          </div>
          <div>
            <p className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY:</p>
            <p className="text-sm bg-gray-100 p-2 rounded">{supabaseKey || "Not set"}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Connection Test</h2>
        <div className="mb-6">
          <p className="font-medium">Status:</p>
          <p className={`text-sm p-2 rounded ${error ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
            {error ? `Error: ${error}` : "Connection successful"}
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Authentication</h2>
        <div>
          <p className="font-medium">Session:</p>
          <p className="text-sm bg-gray-100 p-2 rounded">{session ? "Authenticated" : "Not authenticated"}</p>
          {session && (
            <div className="mt-2">
              <p className="font-medium">User:</p>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(session.user, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Verify that your <code>.env.local</code> file contains the correct Supabase URL and anon key
          </li>
          <li>Make sure you've restarted your development server after adding environment variables</li>
          <li>Check that your Supabase project is active and the API is available</li>
          <li>Verify that your database has the required tables set up</li>
          <li>Check browser console for any additional errors</li>
        </ol>
      </div>
    </div>
  )
}

