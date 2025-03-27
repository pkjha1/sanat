"use client"

import { useState, useCallback } from "react"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"
import { google } from "google-maps"

// Default map container style
const containerStyle = {
  width: "100%",
  height: "100%",
}

// Default center (India)
const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
}

interface Coordinates {
  lat: number
  lng: number
}

interface Place {
  id: number | string
  name: string
  coordinates: Coordinates
  description?: string
  image?: string
  state?: string
  type?: string
  temples?: number
}

interface GoogleMapComponentProps {
  places: Place[]
  onMarkerClick?: (placeId: number | string) => void
  selectedPlace?: number | string | null
  center?: Coordinates
  zoom?: number
  height?: string | number
  showInfoWindow?: boolean
}

export function GoogleMapComponent({
  places,
  onMarkerClick,
  selectedPlace,
  center = defaultCenter,
  zoom = 5,
  height = "100%",
  showInfoWindow = true,
}: GoogleMapComponentProps) {
  const [activeMarker, setActiveMarker] = useState<Place | null>(null)

  // Load the Google Maps JavaScript API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  // Handle marker click
  const handleMarkerClick = (place: Place) => {
    setActiveMarker(place)
    if (onMarkerClick) {
      onMarkerClick(place.id)
    }
  }

  // Close info window
  const handleInfoWindowClose = () => {
    setActiveMarker(null)
  }

  // Map load handler
  const onLoad = useCallback(
    (map: google.maps.Map) => {
      if (places.length > 1) {
        const bounds = new google.maps.LatLngBounds()
        places.forEach((place) => {
          bounds.extend(place.coordinates)
        })
        map.fitBounds(bounds)

        // Don't zoom in too far
        const listener = google.maps.event.addListener(map, "idle", () => {
          if (map.getZoom() && map.getZoom() > 12) {
            map.setZoom(12)
          }
          google.maps.event.removeListener(listener)
        })
      }
    },
    [places],
  )

  // Custom container style with height
  const customContainerStyle = {
    ...containerStyle,
    height: typeof height === "number" ? `${height}px` : height,
  }

  // If there's an error loading the map, display an error message
  if (loadError) {
    return (
      <div className="flex items-center justify-center bg-red-50 w-full h-full min-h-[200px] rounded-lg p-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-red-600 mb-2">Error Loading Google Maps</h3>
          <p className="text-sm text-red-500">Please check your Google Maps API key and try again.</p>
        </div>
      </div>
    )
  }

  // If the map is not loaded yet, display a loading message
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center bg-gray-100 w-full h-full min-h-[200px] rounded-lg">
        <div className="text-center p-4">
          <div className="text-lg font-medium mb-2">Loading Map...</div>
          <p className="text-sm text-muted-foreground">Please wait while we load the map.</p>
        </div>
      </div>
    )
  }

  // Find the selected place
  const selectedPlaceObject = selectedPlace ? places.find((place) => place.id === selectedPlace) : null

  return (
    <GoogleMap
      mapContainerStyle={customContainerStyle}
      center={selectedPlaceObject?.coordinates || center}
      zoom={zoom}
      onLoad={onLoad}
      options={{
        fullscreenControl: true,
        streetViewControl: false,
        mapTypeControl: true,
        zoomControl: true,
      }}
    >
      {places.map((place) => (
        <Marker
          key={place.id}
          position={place.coordinates}
          onClick={() => handleMarkerClick(place)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: place.id === selectedPlace ? "#ef4444" : "#f59e0b",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 8,
          }}
        />
      ))}

      {showInfoWindow && activeMarker && (
        <InfoWindow position={activeMarker.coordinates} onCloseClick={handleInfoWindowClose}>
          <div className="p-2 max-w-xs">
            <h3 className="font-semibold text-lg mb-1">{activeMarker.name}</h3>
            {activeMarker.state && (
              <p className="text-sm text-gray-500">
                {activeMarker.state} • {activeMarker.type || "Place"}
              </p>
            )}
            {activeMarker.description && <p className="text-sm my-2">{activeMarker.description}</p>}
            {activeMarker.temples && (
              <p className="text-sm text-amber-600 font-medium">{activeMarker.temples} Temples</p>
            )}
            <a
              href={`/religious-places/${activeMarker.id}`}
              className="mt-2 inline-block text-sm text-amber-600 hover:text-amber-800 font-medium"
            >
              View details →
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

