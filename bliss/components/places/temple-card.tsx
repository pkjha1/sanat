import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface TempleCardProps {
  temple: {
    id: string
    name: string
    deity: string
    image: string
    address: string
    distance?: string
    rating: number
  }
}

export function TempleCard({ temple }: TempleCardProps) {
  return (
    <Link href={`/temples/${temple.id}`}>
      <div className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
        <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
          <Image
            src={temple.image || "/placeholder.svg"}
            alt={temple.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{temple.name}</h3>
          <p className="text-sm text-gray-600 truncate">{temple.address}</p>
          <div className="flex items-center mt-1">
            <div className="flex items-center text-amber-500">
              <Star className="h-3 w-3 fill-current" />
              <span className="ml-1 text-xs font-medium">{temple.rating}</span>
            </div>
            <Badge className="ml-2 text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
              {temple.deity}
            </Badge>
            {temple.distance && <span className="ml-2 text-xs text-gray-500">{temple.distance}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}

