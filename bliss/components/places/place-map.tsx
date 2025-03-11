"use client"

import { MapsProvider } from "@/components/maps/maps-provider"
import { MapComponent } from "@/components/maps/map-component"

interface PlaceMapProps {
  coordinates: {
    lat: number
    lng: number
  }
  name: string
}

export function PlaceMap({ coordinates, name }: PlaceMapProps) {
  const place = {
    id: 1,
    name: name,
    coordinates: coordinates,
  }

  return (
    <div className="w-full h-full">
      <MapsProvider>
        <MapComponent places={[place]} center={coordinates} zoom={14} showInfoWindow={false} />
      </MapsProvider>
    </div>
  )
}

