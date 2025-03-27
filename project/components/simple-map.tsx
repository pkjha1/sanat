"use client"

import { MapsProvider } from "@/components/maps/maps-provider"
import { MapComponent } from "@/components/maps/map-component"

type Coordinates = {
  lat: number
  lng: number
}

type Place = {
  id: number
  name: string
  coordinates: Coordinates
  description?: string
}

interface SimpleMapProps {
  places: Place[]
  selectedPlace?: number | null
  height?: string | number
  zoom?: number
}

export function SimpleMap({ places, selectedPlace, height = "400px", zoom = 10 }: SimpleMapProps) {
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
          selectedPlace={selectedPlace}
          height={height}
          zoom={zoom}
          showInfoWindow={false}
        />
      </MapsProvider>
    </div>
  )
}

