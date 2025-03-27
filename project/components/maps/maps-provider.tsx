"use client"

import { type ReactNode, useEffect, useState, useRef } from "react"
import { APIProvider } from "@vis.gl/react-google-maps"

interface MapsProviderProps {
  children: ReactNode
}

export function MapsProvider({ children }: MapsProviderProps) {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return

    hasInitialized.current = true

    async function getApiKey() {
      try {
        const response = await fetch("/api/maps-key")

        if (!response.ok) {
          throw new Error(`Failed to fetch API key: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        // The API returns the key as "key", not "apiKey"
        if (!data.key) {
          throw new Error("No API key returned from server")
        }

        setApiKey(data.key)
      } catch (err) {
        console.error("Error fetching Google Maps API key:", err)
        setError(err instanceof Error ? err : new Error(String(err)))
      }
    }

    getApiKey()

    return () => {
      hasInitialized.current = false
    }
  }, [])

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Maps</h3>
        <p className="text-sm text-red-600">{error.message}</p>
        <button
          onClick={() => {
            setError(null)
            hasInitialized.current = false
          }}
          className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <APIProvider apiKey={apiKey} libraries={["maps", "places"]}>
      {children}
    </APIProvider>
  )
}

