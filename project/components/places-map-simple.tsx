"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface Place {
  id: number
  name: string
  description?: string
  image?: string
  coordinates: {
    lat: number
    lng: number
  }
  state?: string
  type?: string
  temples?: number
}

interface PlacesMapProps {
  places: Place[]
  onMarkerClick?: (placeId: number) => void
  selectedPlace?: number | null
  apiKey?: string
}

export function PlacesMap({ places, onMarkerClick, selectedPlace }: PlacesMapProps) {
  const [error, setError] = useState<string | null>(null)

  // Handle place selection
  const handlePlaceClick = (placeId: number) => {
    if (onMarkerClick) {
      onMarkerClick(placeId)
    }
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50 rounded-lg p-4">
        <div className="text-center">
          <div className="text-lg font-medium mb-2 text-red-600">Error Loading Map</div>
          <p className="text-sm text-red-500">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => setError(null)}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-auto p-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Map View</h3>
        <p className="text-sm text-muted-foreground">Showing {places.length} places across India</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {places.map((place) => (
          <Card
            key={place.id}
            className={`overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
              selectedPlace === place.id ? "ring-2 ring-amber-500 shadow-md" : ""
            }`}
            onClick={() => handlePlaceClick(place.id)}
          >
            <div className="flex h-full">
              <div className="w-1/3">
                <img src={place.image || "/placeholder.svg"} alt={place.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="w-2/3 p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{place.name}</h3>
                  {place.state && (
                    <Badge variant="outline" className="text-xs">
                      {place.state}
                    </Badge>
                  )}
                </div>

                {place.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 my-2">{place.description}</p>
                )}

                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {place.coordinates.lat.toFixed(2)}, {place.coordinates.lng.toFixed(2)}
                  </span>
                </div>

                {place.temples && (
                  <div className="text-sm font-medium text-amber-600 mt-1">{place.temples} Temples</div>
                )}

                <a
                  href={`/religious-places/${place.id}`}
                  className="mt-2 inline-block text-sm text-amber-600 hover:text-amber-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  View details →
                </a>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {places.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No places found matching your filters.</p>
        </div>
      )}
    </div>
  )
}

