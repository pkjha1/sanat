"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

// Define Google Maps types to avoid type errors
declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

interface Place {
  id: number
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  image?: string
  description?: string
  state?: string
  type?: string
  temples?: number
}

interface PlacesMapProps {
  places: Place[]
  onMarkerClick?: (placeId: number) => void
  selectedPlace?: number | null
}

export function PlacesMap({ places, onMarkerClick, selectedPlace }: PlacesMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [mapsLoaded, setMapsLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [infoWindow, setInfoWindow] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize map when script is loaded
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return

    try {
      // Create map instance
      const mapOptions = {
        center: { lat: 20.5937, lng: 78.9629 }, // Center on India
        zoom: 5,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      }

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
      setMapInstance(newMap)

      // Create info window
      const newInfoWindow = new window.google.maps.InfoWindow({
        maxWidth: 300,
      })
      setInfoWindow(newInfoWindow)

      setMapsLoaded(true)
    } catch (err) {
      console.error("Error initializing map:", err)
      setError("Failed to initialize Google Maps")
    }
  }

  // Handle script load
  const handleScriptLoad = () => {
    window.initMap = initializeMap

    // If Google Maps is already loaded, initialize map
    if (window.google && window.google.maps) {
      initializeMap()
    }
  }

  // Add markers when places or map changes
  useEffect(() => {
    if (!isClient || !mapsLoaded || !mapInstance || !infoWindow) return

    try {
      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null))

      // Create bounds to fit all markers
      const bounds = new window.google.maps.LatLngBounds()

      // Create new markers
      const newMarkers = places.map((place) => {
        const position = {
          lat: place.coordinates.lat,
          lng: place.coordinates.lng,
        }

        // Add position to bounds
        bounds.extend(position)

        // Create marker
        const marker = new window.google.maps.Marker({
          position,
          map: mapInstance,
          title: place.name,
          animation: window.google.maps.Animation.DROP,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#f59e0b", // amber-500
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
        })

        return marker
      })

      // Set markers
      setMarkers(newMarkers)

      // Fit map to bounds if we have places
      if (places.length > 0) {
        mapInstance.fitBounds(bounds)

        // Don't zoom in too far
        const listener = window.google.maps.event.addListener(mapInstance, "idle", () => {
          if (mapInstance.getZoom() > 12) {
            mapInstance.setZoom(12)
          }
          window.google.maps.event.removeListener(listener)
        })
      }
    } catch (err) {
      console.error("Error adding markers:", err)
      setError("Failed to add map markers")
    }
  }, [isClient, mapsLoaded, mapInstance, infoWindow, places, onMarkerClick, markers])

  // Show info window for selected place
  useEffect(() => {
    if (!isClient || !mapsLoaded || !mapInstance || !infoWindow || !markers.length) return

    try {
      // Close any open info window
      infoWindow.close()

      // If we have a selected place, show its info window
      if (selectedPlace !== null && selectedPlace !== undefined) {
        const place = places.find((p) => p.id === selectedPlace)
        const markerIndex = places.findIndex((p) => p.id === selectedPlace)

        if (place && markerIndex !== -1 && markers[markerIndex]) {
          const marker = markers[markerIndex]

          // Create info window content
          const content = `
            <div class="p-2">
              ${
                place.image
                  ? `
                <div class="mb-2">
                  <img src="${place.image}" alt="${place.name}" class="w-full h-32 object-cover rounded-md" />
                </div>
              `
                  : ""
              }
              <h3 class="font-semibold text-lg mb-1">${place.name}</h3>
              ${place.state ? `<p class="text-sm text-gray-500">${place.state} • ${place.type || "Place"}</p>` : ""}
              ${place.description ? `<p class="text-sm my-2">${place.description}</p>` : ""}
              ${place.temples ? `<p class="text-sm text-amber-600 font-medium">${place.temples} Temples</p>` : ""}
              <a href="/religious-places/${place.id}" class="mt-2 inline-block text-sm text-amber-600 hover:text-amber-800 font-medium">
                View details →
              </a>
            </div>
          `

          infoWindow.setContent(content)
          infoWindow.open(mapInstance, marker)

          // Pan to marker
          mapInstance.panTo(marker.getPosition())
        }
      }
    } catch (err) {
      console.error("Error showing info window:", err)
    }
  }, [isClient, mapsLoaded, mapInstance, infoWindow, markers, selectedPlace, places])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (markers.length) {
        markers.forEach((marker) => {
          if (marker && marker.setMap) {
            marker.setMap(null)
          }
        })
      }
    }
  }, [markers])

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center p-4">
          <div className="text-lg font-medium mb-2">Map Loading</div>
          <p className="text-sm text-muted-foreground">The map will appear once the page loads...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      {/* Google Maps Script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`}
        onLoad={handleScriptLoad}
        strategy="lazyOnload"
      />

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden">
        {/* Error State */}
        {error && (
          <div className="w-full h-full flex items-center justify-center bg-red-50 rounded-lg">
            <div className="text-center p-4">
              <div className="text-lg font-medium mb-2 text-red-600">Error Loading Map</div>
              <p className="text-sm text-red-500">{error}</p>
              <p className="text-sm text-muted-foreground mt-2">Please check your Google Maps API key and try again.</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {!error && !mapsLoaded && (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center p-4">
              <div className="text-lg font-medium mb-2">Loading Map</div>
              <p className="text-sm text-muted-foreground">Please wait while we load the interactive map...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

