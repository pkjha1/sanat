"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ListFilter, Map, Search, List } from "lucide-react"
import PlacesMapReact from "@/components/places-map-react"
import Link from "next/link"

// Mock data for religious places
const places = [
  {
    id: "1",
    name: "Varanasi",
    location: { lat: 25.3176, lng: 82.9739 },
    description: "One of the oldest continuously inhabited cities in the world and a major religious hub in India.",
    image: "/placeholder.svg?height=200&width=300",
    type: "City",
    temples: 23,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Rishikesh",
    location: { lat: 30.0869, lng: 78.2676 },
    description: 'Known as the "Yoga Capital of the World" and a gateway to the Himalayas.',
    image: "/placeholder.svg?height=200&width=300",
    type: "City",
    temples: 15,
    rating: 4.7,
  },
  {
    id: "3",
    name: "Tirupati",
    location: { lat: 13.6288, lng: 79.4192 },
    description: "Home to the Tirumala Venkateswara Temple, one of the most visited religious sites in the world.",
    image: "/placeholder.svg?height=200&width=300",
    type: "City",
    temples: 12,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Amritsar",
    location: { lat: 31.634, lng: 74.8723 },
    description: "Home to the Golden Temple, the spiritual and cultural center for the Sikh religion.",
    image: "/placeholder.svg?height=200&width=300",
    type: "City",
    temples: 8,
    rating: 4.8,
  },
  {
    id: "5",
    name: "Haridwar",
    location: { lat: 29.9457, lng: 78.1642 },
    description:
      "An ancient city and important Hindu pilgrimage site where the River Ganges exits the Himalayan foothills.",
    image: "/placeholder.svg?height=200&width=300",
    type: "City",
    temples: 20,
    rating: 4.6,
  },
  {
    id: "6",
    name: "Mathura",
    location: { lat: 27.4924, lng: 77.6737 },
    description: "The birthplace of Lord Krishna and a sacred city for Hindus.",
    image: "/placeholder.svg?height=200&width=300",
    type: "City",
    temples: 17,
    rating: 4.5,
  },
]

export default function ReligiousPlacesPage() {
  const [activeTab, setActiveTab] = useState("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedPlace, setSelectedPlace] = useState<(typeof places)[0] | null>(null)

  // Filter places based on search query and selected type
  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "All" || place.type === selectedType
    return matchesSearch && matchesType
  })

  const placeTypes = ["All", ...Array.from(new Set(places.map((place) => place.type)))]

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Religious Places</h1>

        <div className="flex items-center mt-4 md:mt-0 space-x-2">
          {/* View toggle */}
          <div className="bg-muted rounded-lg p-1 flex">
            <Button
              variant={activeTab === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("list")}
              className={activeTab === "list" ? "bg-black text-white hover:bg-black/90" : ""}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
            <Button
              variant={activeTab === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("map")}
              className={activeTab === "map" ? "bg-black text-white hover:bg-black/90" : ""}
            >
              <Map className="h-4 w-4 mr-2" />
              Map
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search places..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <ListFilter className="h-4 w-4 mr-2" />
              Filter by Type
            </h3>
            <div className="space-y-2">
              {placeTypes.map((type) => (
                <Button
                  key={type}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start ${selectedType === type ? "bg-muted font-medium" : ""}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="list" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPlaces.map((place) => (
                  <Link href={`/religious-places/${place.id}`} key={place.id}>
                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={place.image || "/placeholder.svg"}
                          alt={place.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{place.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{place.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm">{place.temples} Temples</span>
                          <span className="text-sm font-medium flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-yellow-500 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {place.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredPlaces.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No places found matching your criteria.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="map" className="m-0">
              <div className="border rounded-lg overflow-hidden h-[600px]">
                <PlacesMapReact places={filteredPlaces} onPlaceSelect={(place) => setSelectedPlace(place)} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

