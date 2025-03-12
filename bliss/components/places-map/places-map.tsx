"use client"

import { useState, useEffect, useRef } from "react"
import { MapComponent } from "@/components/maps/map-component"
import { MapFallback } from "@/components/maps/map-fallback"

interface Place {
  id: number | string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  description?: string
  image?: string
  state?: string
  type?: string
  temples?: number
}

// Update the PlacesMapProps interface to match what we're using
// The current interface is:
// Let's update it to include the markers prop as an alternative to places:
interface PlacesMapProps {
  places?: Place[]
  markers?: {
    id: number | string
    name: string
    position: {
      lat: number
      lng: number
    }
    type?: string
  }[]
  onMarkerClick?: (placeId: number | string) => void
  selectedPlace?: number | string | null
  height?: string | number
  center?: { lat: number; lng: number }
  zoom?: number
  showInfoWindow?: boolean
}

export function PlacesMap({ places, onMarkerClick, selectedPlace, height = "100%" }: PlacesMapProps) {
  const [hasError, setHasError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  // Handle mounting state
  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  if (hasError) {
    return <MapFallback height={height} onRetry={() => setHasError(false)} />
  }

  if (!mounted) {
    return <div style={{ height: typeof height === "number" ? `${height}px` : height }} ref={mapRef} />
  }

  try {
    return (
      <div ref={mapRef}>
        <MapComponent
          key={`map-${selectedPlace || "default"}`}
          places={places}
          onMarkerClick={onMarkerClick}
          selectedPlace={selectedPlace}
          height={height}
          zoom={5}
          showInfoWindow={true}
        />
      </div>
    )
  } catch (error) {
    console.error("Error rendering map:", error)
    setHasError(true)
    return <MapFallback height={height} onRetry={() => setHasError(false)} />
  }
}

