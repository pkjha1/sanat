"use client"

import { useEffect, useRef, useState } from "react"

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

interface SimpleMapProps {
  places: Place[]
  onMarkerClick?: (placeId: number | string) => void
  selectedPlace?: number | string | null
  height?: string | number
}

export function SimpleMap({ places, onMarkerClick, selectedPlace, height = "100%" }: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance) return

    // Get API key from environment variable
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      setError(new Error("Google Maps API key is missing"))
      return
    }

    // Load Google Maps script
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = initMap
    script.onerror = () => setError(new Error("Failed to load Google Maps script"))

    document.head.appendChild(script)

    return () => {
      // Clean up script if component unmounts before script loads
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [mapInstance])

  // Initialize map
  const initMap = () => {
    if (!mapRef.current || !window.google) return

    try {
      // Create map instance
      const map = new google.maps.Map(mapRef.current, {
        center:
          places.length > 0
            ? { lat: places[0].coordinates.lat, lng: places[0].coordinates.lng }
            : { lat: 20.5937, lng: 78.9629 }, // Default to center of India
        zoom: 5,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      })

      // Create info window
      const info = new google.maps.InfoWindow()

      setMapInstance(map)
      setInfoWindow(info)
      setIsLoaded(true)
    } catch (err) {
      console.error("Error initializing map:", err)
      setError(err instanceof Error ? err : new Error(String(err)))
    }
  }

  // Add markers when map is loaded or places change
  useEffect(() => {
    if (!mapInstance || !isLoaded) return

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))

    // Create bounds to fit all markers
    const bounds = new google.maps.LatLngBounds()

    // Create new markers
    const newMarkers = places.map((place) => {
      const position = {
        lat: place.coordinates.lat,
        lng: place.coordinates.lng,
      }

      // Extend bounds
      bounds.extend(position)

      // Create marker
      const marker = new google.maps.Marker({
        position,
        map: mapInstance,
        title: place.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: place.id === selectedPlace ? "#ef4444" : "#f59e0b",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 8,
        },
      })

      // Add click listener
      marker.addListener("click", () => {
        if (onMarkerClick) {
          onMarkerClick(place.id)
        }

        if (infoWindow) {
          infoWindow.setContent(`
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">${place.name}</h3>
              ${place.state ? `<p style="font-size: 12px; color: #666; margin: 0 0 4px;">${place.state} • ${place.type || "Place"}</p>` : ""}
              ${place.description ? `<p style="font-size: 13px; margin: 4px 0;">${place.description.substring(0, 100)}${place.description.length > 100 ? "..." : ""}</p>` : ""}
              ${place.temples ? `<p style="font-size: 13px; color: #b45309; font-weight: 500; margin: 4px 0;">${place.temples} Temples</p>` : ""}
              <a href="/religious-places/${place.id}" style="display: inline-block; margin-top: 4px; color: #b45309; font-size: 13px; font-weight: 500; text-decoration: none;">View details →</a>
            </div>
          `)
          infoWindow.open(mapInstance, marker)
        }
      })

      return marker
    })

    // Set markers
    setMarkers(newMarkers)

    // Fit map to bounds if there are multiple places
    if (places.length > 1) {
      mapInstance.fitBounds(bounds)

      // Don't zoom in too far
      google.maps.event.addListenerOnce(mapInstance, "idle", () => {
        if (mapInstance.getZoom() > 12) {
          mapInstance.setZoom(12)
        }
      })
    }

    // Center on selected place if available
    if (selectedPlace) {
      const selected = places.find((place) => place.id === selectedPlace)
      if (selected) {
        mapInstance.setCenter({
          lat: selected.coordinates.lat,
          lng: selected.coordinates.lng,
        })
        mapInstance.setZoom(10)
      }
    }

    // Clean up
    return () => {
      newMarkers.forEach((marker) => {
        google.maps.event.clearInstanceListeners(marker)
        marker.setMap(null)
      })
    }
  }, [mapInstance, places, selectedPlace, infoWindow, isLoaded, onMarkerClick, markers])

  // Handle errors
  if (error) {
    return (
      <div
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          width: "100%",
        }}
        className="flex items-center justify-center bg-gray-100 rounded-lg"
      >
        <div className="text-center p-4">
          <h3 className="text-lg font-medium mb-2">Map could not be loaded</h3>
          <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  // Loading state
  if (!isLoaded) {
    return (
      <div
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          width: "100%",
        }}
        className="flex items-center justify-center bg-gray-100 rounded-lg"
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  // Render map
  return (
    <div
      ref={mapRef}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        width: "100%",
      }}
      className="rounded-lg overflow-hidden"
    />
  )
}

