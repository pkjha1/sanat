"use client"

import { useState, useEffect, useRef } from "react"
import { Map, AdvancedMarker, InfoWindow, useMap, useMapsLibrary } from "@vis.gl/react-google-maps"

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

interface MapComponentProps {
  places: Place[]
  onMarkerClick?: (placeId: number | string) => void
  selectedPlace?: number | string | null
  center?: Coordinates
  zoom?: number
  height?: string | number
  showInfoWindow?: boolean
}

export function MapComponent({
  places,
  onMarkerClick,
  selectedPlace,
  center,
  zoom = 5,
  height = "100%",
  showInfoWindow = true,
}: MapComponentProps) {
  const [activeMarker, setActiveMarker] = useState<Place | null>(null)
  const [mapError, setMapError] = useState<Error | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [isMapReady, setIsMapReady] = useState(false)

  // Calculate default center if not provided
  const defaultCenter = center || (places.length > 0 ? places[0].coordinates : { lat: 20.5937, lng: 78.9629 }) // Default to center of India

  // Find the selected place
  const selectedPlaceObject = selectedPlace ? places.find((place) => place.id === selectedPlace) : null

  // Use the selected place's coordinates as center if available
  const mapCenter = selectedPlaceObject?.coordinates || defaultCenter

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

  // Custom map container style
  const mapContainerStyle = {
    width: "100%",
    height: typeof height === "number" ? `${height}px` : height,
  }

  // Handle map error
  const handleMapError = (error: Error) => {
    console.error("Map error:", error)
    setMapError(error)
  }

  // Set map ready state
  useEffect(() => {
    setIsMapReady(true)
    return () => {
      setIsMapReady(false)
    }
  }, [])

  if (mapError) {
    return (
      <div style={mapContainerStyle} className="flex items-center justify-center bg-gray-100" ref={mapContainerRef}>
        <div className="text-center p-4">
          <h3 className="text-lg font-medium mb-2">Error Loading Map</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {mapError.message || "There was an error loading the map."}
          </p>
          <button
            onClick={() => setMapError(null)}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!isMapReady) {
    return <div style={mapContainerStyle} ref={mapContainerRef} />
  }

  return (
    <div style={mapContainerStyle} ref={mapContainerRef}>
      <Map
        defaultCenter={mapCenter}
        defaultZoom={zoom}
        mapId="8f112ffd2b5d3ada"
        gestureHandling="cooperative"
        disableDefaultUI={false}
        onError={handleMapError}
      >
        {isMapReady && (
          <MapContent
            key={`map-content-${selectedPlace || "default"}`}
            places={places}
            selectedPlace={selectedPlace}
            activeMarker={activeMarker}
            onMarkerClick={handleMarkerClick}
            onInfoWindowClose={handleInfoWindowClose}
            showInfoWindow={showInfoWindow}
          />
        )}
      </Map>
    </div>
  )
}

// Separate component for map content to use the useMap hook
function MapContent({
  places,
  selectedPlace,
  activeMarker,
  onMarkerClick,
  onInfoWindowClose,
  showInfoWindow,
}: {
  places: Place[]
  selectedPlace?: number | string | null
  activeMarker: Place | null
  onMarkerClick: (place: Place) => void
  onInfoWindowClose: () => void
  showInfoWindow: boolean
}) {
  const map = useMap()
  const mapsLibrary = useMapsLibrary("maps")
  const boundsListenerRef = useRef<google.maps.MapsEventListener | null>(null)

  // Fit bounds to include all markers
  useEffect(() => {
    if (map && mapsLibrary && places.length > 1) {
      try {
        const bounds = new mapsLibrary.LatLngBounds()
        places.forEach((place) => {
          bounds.extend(new mapsLibrary.LatLng(place.coordinates.lat, place.coordinates.lng))
        })
        map.fitBounds(bounds)

        // Don't zoom in too far
        if (boundsListenerRef.current) {
          mapsLibrary.event.removeListener(boundsListenerRef.current)
        }

        boundsListenerRef.current = mapsLibrary.event.addListenerOnce(map, "idle", () => {
          if (map.getZoom() > 12) {
            map.setZoom(12)
          }
        })

        return () => {
          if (boundsListenerRef.current) {
            mapsLibrary.event.removeListener(boundsListenerRef.current)
            boundsListenerRef.current = null
          }
        }
      } catch (error) {
        console.error("Error fitting bounds:", error)
      }
    }
  }, [map, mapsLibrary, places])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (boundsListenerRef.current && mapsLibrary) {
        mapsLibrary.event.removeListener(boundsListenerRef.current)
        boundsListenerRef.current = null
      }
    }
  }, [mapsLibrary])

  return (
    <>
      {places.map((place) => (
        <AdvancedMarker key={`marker-${place.id}`} position={place.coordinates} onClick={() => onMarkerClick(place)}>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ${
              place.id === selectedPlace ? "bg-red-500" : "bg-amber-500"
            }`}
          ></div>
        </AdvancedMarker>
      ))}

      {showInfoWindow && activeMarker && (
        <InfoWindow
          key={`info-${activeMarker.id}`}
          position={activeMarker.coordinates}
          onCloseClick={onInfoWindowClose}
        >
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
    </>
  )
}

