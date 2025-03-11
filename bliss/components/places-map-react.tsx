"use client"

import { useState, useCallback, useRef } from "react"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "500px",
}

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629, // Center of India
}

type Place = {
  id: string
  name: string
  location: {
    lat: number
    lng: number
  }
  description: string
  image: string
}

interface PlacesMapProps {
  places: Place[]
  onPlaceSelect?: (place: Place) => void
  initialCenter?: { lat: number; lng: number }
  zoom?: number
}

export default function PlacesMapReact({
  places = [],
  onPlaceSelect,
  initialCenter = defaultCenter,
  zoom = 5,
}: PlacesMapProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null)
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map())

  // Load the Google Maps JavaScript API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    // You can add libraries here if needed
    // libraries: ['places']
  })

  // Store map reference when the map is loaded
  const onLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map)
  }, [])

  // Clear map reference when the map is unmounted
  const onUnmount = useCallback(() => {
    setMapRef(null)
  }, [])

  // Handle marker click
  const handleMarkerClick = (place: Place) => {
    setSelectedPlace(place)
    if (onPlaceSelect) {
      onPlaceSelect(place)
    }
  }

  // Close info window
  const handleInfoWindowClose = () => {
    setSelectedPlace(null)
  }

  // If there's an error loading the map, display an error message
  if (loadError) {
    return <div className="p-4 text-red-500">Error loading maps</div>
  }

  // If the map is not loaded yet, display a loading message
  if (!isLoaded) {
    return <div className="p-4">Loading maps...</div>
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
        }}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            position={place.location}
            onClick={() => handleMarkerClick(place)}
            icon={{
              url: "/marker-icon.png",
              scaledSize: new google.maps.Size(30, 30),
            }}
          />
        ))}

        {selectedPlace && (
          <InfoWindow position={selectedPlace.location} onCloseClick={handleInfoWindowClose}>
            <div className="max-w-xs">
              <h3 className="font-semibold text-lg mb-1">{selectedPlace.name}</h3>
              {selectedPlace.image && (
                <img
                  src={selectedPlace.image || "/placeholder.svg"}
                  alt={selectedPlace.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
              )}
              <p className="text-sm text-gray-600">{selectedPlace.description}</p>
              <button
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                onClick={() => {
                  if (onPlaceSelect) onPlaceSelect(selectedPlace)
                }}
              >
                View Details
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}

