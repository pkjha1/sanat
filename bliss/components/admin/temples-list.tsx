import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Edit, MapPin, MoreHorizontal, Eye, Star } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TemplesListProps {
  placeId: string
}

export function TemplesList({ placeId }: TemplesListProps) {
  const temples = [
    {
      id: 1,
      name: "Kashi Vishwanath Temple",
      deity: "Lord Shiva",
      type: "Mandir",
      significance:
        "One of the most famous Hindu temples dedicated to Lord Shiva and is one of the twelve Jyotirlingas.",
      yearBuilt: "1780 (rebuilt)",
      rating: 4.8,
      reviews: 12500,
      coordinates: "25.3109° N, 83.0107° E",
      image: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 2,
      name: "Sankat Mochan Hanuman Temple",
      deity: "Lord Hanuman",
      type: "Mandir",
      significance: "Founded by the great saint Tulsidas who wrote the Ramcharitmanas.",
      yearBuilt: "16th century",
      rating: 4.7,
      reviews: 8750,
      coordinates: "25.2853° N, 82.9994° E",
      image: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 3,
      name: "Durga Kund Temple",
      deity: "Goddess Durga",
      type: "Mandir",
      significance: "Named after a pond adjacent to the temple which was built in the 18th century.",
      yearBuilt: "18th century",
      rating: 4.6,
      reviews: 6200,
      coordinates: "25.2838° N, 82.9995° E",
      image: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 4,
      name: "Tulsi Manas Temple",
      deity: "Lord Rama",
      type: "Mandir",
      significance: "Built in 1964 at the place where Tulsidas wrote the Ramcharitmanas.",
      yearBuilt: "1964",
      rating: 4.5,
      reviews: 5800,
      coordinates: "25.2836° N, 82.9879° E",
      image: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 5,
      name: "New Vishwanath Temple",
      deity: "Lord Shiva",
      type: "Mandir",
      significance: "Located in the BHU campus and is also known as Birla Temple.",
      yearBuilt: "1966",
      rating: 4.7,
      reviews: 7300,
      coordinates: "25.2677° N, 82.9913° E",
      image: "/placeholder.svg?height=60&width=100",
    },
  ]

  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Deity</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Year Built</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rating</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Coordinates</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {temples.map((temple) => (
            <tr key={temple.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td className="p-4 align-middle">
                <div className="flex items-center gap-3">
                  {temple.image && (
                    <img
                      src={temple.image || "/placeholder.svg"}
                      alt={temple.name}
                      className="h-12 w-20 object-cover rounded border"
                    />
                  )}
                  <span className="font-medium">{temple.name}</span>
                </div>
              </td>
              <td className="p-4 align-middle">{temple.deity}</td>
              <td className="p-4 align-middle">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
                  {temple.type}
                </Badge>
              </td>
              <td className="p-4 align-middle">{temple.yearBuilt}</td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span>{temple.rating}</span>
                  <span className="text-xs text-muted-foreground">({temple.reviews.toLocaleString()})</span>
                </div>
              </td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <span className="text-xs font-mono">{temple.coordinates}</span>
                </div>
              </td>
              <td className="p-4 align-middle">
                <div className="flex gap-2">
                  <Link href={`/admin/religious-places/${placeId}/temples/${temple.id}/preview`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Preview</span>
                    </Button>
                  </Link>
                  <Link href={`/admin/religious-places/${placeId}/temples/${temple.id}/edit`}>
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
                      <DropdownMenuItem>Update from Google Maps</DropdownMenuItem>
                      <DropdownMenuItem>Add to Featured</DropdownMenuItem>
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
          Showing <strong>5</strong> of <strong>156</strong> temples
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

