"use client"

import { useState, useEffect } from "react"

interface Coordinates {
  lat: number
  lng: number
}

interface Place {
  id: number | string
  name: string
  coordinates: Coordinates
  description?: string
}

interface IframeMapProps {
  places: Place[]
  selectedPlace?: number | string | null
  height?: string | number
  zoom?: number
  apiKey?: string
}

export function IframeMap({ places, selectedPlace, height = "400px", zoom = 10, apiKey }: IframeMapProps) {
  const [mapKey, setMapKey] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Use the provided API key or try to get it from env
    const key = apiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
    setMapKey(key)
    setIsLoading(false)
  }, [apiKey])

  // Find the selected place or use the first place as center
  const centerPlace = selectedPlace ? places.find((place) => place.id === selectedPlace) : places[0]

  // If no places, show placeholder
  if (places.length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height: typeof height === "number" ? `${height}px` : height }}
      >
        <div className="text-center p-4">
          <div className="text-lg font-medium mb-2">No Places to Display</div>
          <p className="text-sm text-muted-foreground">Add places to see them on the map.</p>
        </div>
      </div>
    )
  }

  // If loading or no API key, show placeholder
  if (isLoading || !mapKey) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height: typeof height === "number" ? `${height}px` : height }}
      >
        <div className="text-center p-4">
          <div className="text-lg font-medium mb-2">Loading Map...</div>
          <p className="text-sm text-muted-foreground">
            {!mapKey ? "Google Maps API Key required." : "Please wait while we load the map."}
          </p>
        </div>
      </div>
    )
  }

  // For a single place, use place embed
  if (places.length === 1) {
    const place = places[0]
    const src = `https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${place.coordinates.lat},${place.coordinates.lng}&zoom=${zoom}`

    return (
      <div style={{ width: "100%", height: typeof height === "number" ? `${height}px` : height }}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={src}
        ></iframe>
      </div>
    )
  }

  // For multiple places, use a view that shows all places
  // We'll use the first place as the center and add markers for all places
  const center = centerPlace?.coordinates || places[0].coordinates

  // Create a string of markers for all places
  const markers = places
    .map((place) => {
      const isSelected = place.id === selectedPlace
      const color = isSelected ? "red" : "amber"
      return `markers=color:${color}|label:${place.name.charAt(0)}|${place.coordinates.lat},${place.coordinates.lng}`
    })
    .join("&")

  // Create static map URL with all markers
  const src = `https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${center.lat},${center.lng}&zoom=${zoom}&${markers}`

  return (
    <div style={{ width: "100%", height: typeof height === "number" ? `${height}px` : height }}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
      ></iframe>
    </div>
  )
}

