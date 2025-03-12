"use client"

import { PlacesMap } from "@/components/places-map"

interface TempleMapProps {
  markers: {
    id: string | number
    name: string
    position: {
      lat: number
      lng: number
    }
    type: string
  }[]
  center: {
    lat: number
    lng: number
  }
  zoom: number
  showInfoWindow?: boolean
  height?: number | string
}

export function TempleMap({ markers, center, zoom, showInfoWindow, height }: TempleMapProps) {
  // Convert markers to places format expected by PlacesMap
  const places = markers.map((marker) => ({
    id: marker.id,
    name: marker.name,
    coordinates: marker.position,
    type: marker.type,
  }))

  return <PlacesMap places={places} selectedPlace={markers[0]?.id} height={height} />
}

