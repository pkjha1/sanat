"use client"

import { MapsProvider } from "@/components/maps/maps-provider"
import { MapComponent } from "@/components/maps/map-component"

interface Place {
  id: number
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

interface PlacesMapFixedProps {
  places: Place[]
  onMarkerClick?: (placeId: number) => void
  selectedPlace?: number | null
  apiKey?: string
}

export function PlacesMapFixed({ places, onMarkerClick, selectedPlace, apiKey }: PlacesMapFixedProps) {
  // If no places, show a message
  if (!places || places.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100 w-full h-full min-h-[200px]">
        <div className="text-center p-4">
          <div className="text-lg font-medium mb-2">No Places to Display</div>
          <p className="text-sm text-muted-foreground">Add places to see them on the map.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <MapsProvider>
        <MapComponent
          places={places}
          onMarkerClick={onMarkerClick}
          selectedPlace={selectedPlace}
          showInfoWindow={true}
        />
      </MapsProvider>
    </div>
  )
}

