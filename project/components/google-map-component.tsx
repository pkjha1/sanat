"use client"

import { useEffect, useRef } from "react"

interface GoogleMapComponentProps {
  latitude: number
  longitude: number
  zoom?: number
  markerTitle?: string
}

// Add Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any
        Marker: new (options: any) => any
      }
    }
  }
}

export default function GoogleMapComponent({
  latitude,
  longitude,
  zoom = 15,
  markerTitle = "Location",
}: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    // Check if Google Maps API is available
    if (!window.google || !apiKey) {
      console.error("Google Maps API not loaded or API key not provided")
      return
    }

    try {
      // Create map instance
      const map = new window.google.maps.Map(mapRef.current!, {
        center: { lat: latitude, lng: longitude },
        zoom: zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      })

      // Add marker
      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: markerTitle,
      })
    } catch (error) {
      console.error("Error initializing Google Map:", error)
    }
  }, [latitude, longitude, zoom, markerTitle, apiKey])

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      {apiKey ? (
        <div ref={mapRef} className="w-full h-full" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">Google Maps API key not provided</p>
        </div>
      )}
    </div>
  )
}

