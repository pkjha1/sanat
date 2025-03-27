import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Edit, MapPin, Building, MoreHorizontal, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function PlacesList() {
  const places = [
    {
      id: 1,
      name: "Varanasi",
      state: "Uttar Pradesh",
      type: "City",
      temples: 156,
      mainDeity: "Lord Shiva",
      significance: "One of the oldest continuously inhabited cities in the world and a major religious hub.",
      coordinates: "25.3176° N, 82.9739° E",
      image: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 2,
      name: "Tirupati",
      state: "Andhra Pradesh",
      type: "City",
      temples: 42,
      mainDeity: "Lord Venkateswara",
      significance: "Home to the Tirumala Venkateswara Temple, one of the most visited religious sites in the world.",
      coordinates: "13.6288° N, 79.4192° E",
      image: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 3,
      name: "Mathura",
      state: "Uttar Pradesh",
      type: "City",
      temples: 78,
      mainDeity: "Lord Krishna",
      significance: "Birthplace of Lord Krishna and a major pilgrimage site.",
      coordinates: "27.4924° N, 77.6737° E",
      image: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 4,
      name: "Puri",
      state: "Odisha",
      type: "City",
      temples: 35,
      mainDeity: "Lord Jagannath",
      significance: "Famous for the Jagannath Temple and the annual Rath Yatra festival.",
      coordinates: "19.8133° N, 85.8314° E",
      image: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 5,
      name: "Amritsar",
      state: "Punjab",
      type: "City",
      temples: 28,
      mainDeity: "None (Sikh)",
      significance: "Home to the Golden Temple, the holiest gurdwara of Sikhism.",
      coordinates: "31.6340° N, 74.8723° E",
      image: "/placeholder.svg?height=60&width=100",
    },
  ]

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">State</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Temples</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Main Deity</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Coordinates</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {places.map((place) => (
            <tr key={place.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td className="p-4 align-middle">
                <div className="flex items-center gap-3">
                  {place.image && (
                    <img
                      src={place.image || "/placeholder.svg"}
                      alt={place.name}
                      className="h-12 w-20 object-cover rounded border"
                    />
                  )}
                  <span className="font-medium">{place.name}</span>
                </div>
              </td>
              <td className="p-4 align-middle">{place.state}</td>
              <td className="p-4 align-middle">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
                  {place.type}
                </Badge>
              </td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-1">
                  <Building className="h-3 w-3 text-gray-500" />
                  <span>{place.temples}</span>
                </div>
              </td>
              <td className="p-4 align-middle">{place.mainDeity}</td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <span className="text-xs font-mono">{place.coordinates}</span>
                </div>
              </td>
              <td className="p-4 align-middle">
                <div className="flex gap-2">
                  <Link href={`/admin/religious-places/${place.id}/temples`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Building className="h-4 w-4" />
                      <span className="sr-only">View Temples</span>
                    </Button>
                  </Link>
                  <Link href={`/admin/religious-places/${place.id}/preview`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Preview</span>
                    </Button>
                  </Link>
                  <Link href={`/admin/religious-places/${place.id}/edit`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View on Map</DropdownMenuItem>
                      <DropdownMenuItem>Import Temples</DropdownMenuItem>
                      <DropdownMenuItem>Refresh Data</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>5</strong> of <strong>248</strong> places
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

