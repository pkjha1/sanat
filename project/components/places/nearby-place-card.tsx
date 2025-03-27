import Link from "next/link"
import { Star } from "lucide-react"
import Image from "next/image"

interface NearbyPlaceCardProps {
  place: {
    id: string
    name: string
    image: string
    description: string
    distance: string
    rating: number
  }
}

export function NearbyPlaceCard({ place }: NearbyPlaceCardProps) {
  return (
    <Link href={`/places/${place.id}`}>
      <div className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
        <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
          <Image src={place.image || "/placeholder.svg"} alt={place.name} fill className="object-cover" sizes="64px" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{place.name}</h3>
          <p className="text-sm text-gray-600 truncate">{place.description}</p>
          <div className="flex items-center mt-1">
            <div className="flex items-center text-amber-500">
              <Star className="h-3 w-3 fill-current" />
              <span className="ml-1 text-xs font-medium">{place.rating}</span>
            </div>
            <span className="ml-2 text-xs text-gray-500">{place.distance}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

