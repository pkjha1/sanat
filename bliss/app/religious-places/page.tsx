"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MapIcon, ListIcon, FilterIcon } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the SimpleMap component to avoid SSR issues
const DynamicSimpleMap = dynamic(() => import("@/components/maps/simple-map").then((mod) => mod.SimpleMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-t-transparent"></div>
        <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
})

// Mock data for places
const PLACES_DATA = [
  {
    id: 1,
    name: "Varanasi",
    description: "One of the oldest continuously inhabited cities in the world and a major religious hub in India.",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 25.3176, lng: 82.9739 },
    temples: 23,
    state: "Uttar Pradesh",
    type: "City",
    featured: true,
  },
  {
    id: 2,
    name: "Rishikesh",
    description: "Known as the 'Yoga Capital of the World', located in the foothills of the Himalayas.",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 30.0869, lng: 78.2676 },
    temples: 15,
    state: "Uttarakhand",
    type: "Town",
    featured: true,
  },
  {
    id: 3,
    name: "Tirupati",
    description: "Home to the Tirumala Venkateswara Temple, one of the most visited religious sites in the world.",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 13.6288, lng: 79.4192 },
    temples: 18,
    state: "Andhra Pradesh",
    type: "City",
    featured: true,
  },
  {
    id: 4,
    name: "Haridwar",
    description:
      "An ancient city and important Hindu pilgrimage site where the River Ganges exits the Himalayan foothills.",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 29.9457, lng: 78.1642 },
    temples: 20,
    state: "Uttarakhand",
    type: "City",
    featured: false,
  },
  {
    id: 5,
    name: "Puri",
    description: "One of the four sacred Char Dham pilgrimage sites for Hindus, and home to the Jagannath Temple.",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 19.8133, lng: 85.8314 },
    temples: 12,
    state: "Odisha",
    type: "City",
    featured: false,
  },
  {
    id: 6,
    name: "Madurai",
    description: "Home to the magnificent Meenakshi Amman Temple, a historic city with a rich cultural heritage.",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 9.9252, lng: 78.1198 },
    temples: 17,
    state: "Tamil Nadu",
    type: "City",
    featured: false,
  },
  {
    id: 7,
    name: "Amritsar",
    description: "Home to the Golden Temple, the spiritual and cultural center for the Sikh religion.",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 31.634, lng: 74.8723 },
    temples: 8,
    state: "Punjab",
    type: "City",
    featured: true,
  },
  {
    id: 8,
    name: "Dwarka",
    description: "An ancient city and pilgrimage site, believed to have been the kingdom of Lord Krishna.",
    image: "/placeholder.svg?height=200&width=300",
    coordinates: { lat: 22.2442, lng: 68.9685 },
    temples: 10,
    state: "Gujarat",
    type: "Town",
    featured: false,
  },
]

// Filter panel component
function FilterPanel({
  onFilterChange,
  states,
  types,
  isMobile = false,
}: {
  onFilterChange: (filters: any) => void
  states: string[]
  types: string[]
  isMobile?: boolean
}) {
  const [nameFilter, setNameFilter] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const applyFilters = () => {
    onFilterChange({
      name: nameFilter,
      state: stateFilter,
      type: typeFilter,
    })
  }

  const resetFilters = () => {
    setNameFilter("")
    setStateFilter("all")
    setTypeFilter("all")
    onFilterChange({})
  }

  return (
    <div className={`space-y-4 ${isMobile ? "p-4" : ""}`}>
      <div className="space-y-2">
        <label htmlFor="name-filter" className="text-sm font-medium">
          Place Name
        </label>
        <Input
          id="name-filter"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="state-filter" className="text-sm font-medium">
          State
        </label>
        <Select value={stateFilter} onValueChange={setStateFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="type-filter" className="text-sm font-medium">
          Place Type
        </label>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={applyFilters} className="flex-1 bg-amber-600 hover:bg-amber-700">
          Apply
        </Button>
        <Button onClick={resetFilters} variant="outline" className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  )
}

// Place card component
function PlaceCard({ place }: { place: (typeof PLACES_DATA)[0] }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img src={place.image || "/placeholder.svg"} alt={place.name} className="w-full h-full object-cover" />
        {place.featured && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">Featured</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{place.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{place.description}</p>
        <div className="flex justify-between items-center mt-3">
          <div className="text-sm text-muted-foreground">
            {place.state} • {place.type}
          </div>
          <div className="text-sm font-medium text-amber-600">{place.temples} Temples</div>
        </div>
        <a
          href={`/religious-places/${place.id}`}
          className="mt-3 block w-full text-center py-2 bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200 transition-colors"
        >
          View Details
        </a>
      </div>
    </div>
  )
}

export default function ReligiousPlacesPage() {
  const [activeTab, setActiveTab] = useState("list")
  const [filters, setFilters] = useState({})
  const [filteredPlaces, setFilteredPlaces] = useState(PLACES_DATA)
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [showMap, setShowMap] = useState(false)

  // Extract unique states and types for filters
  const states = [...new Set(PLACES_DATA.map((place) => place.state))].sort()
  const types = [...new Set(PLACES_DATA.map((place) => place.type))].sort()

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check if mobile on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      checkIfMobile()
      window.addEventListener("resize", checkIfMobile)

      return () => {
        window.removeEventListener("resize", checkIfMobile)
      }
    }
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...PLACES_DATA]

    if (filters.name) {
      result = result.filter((place) => place.name.toLowerCase().includes(filters.name.toLowerCase()))
    }

    if (filters.state && filters.state !== "all") {
      result = result.filter((place) => place.state === filters.state)
    }

    if (filters.type && filters.type !== "all") {
      result = result.filter((place) => place.type === filters.type)
    }

    setFilteredPlaces(result)
  }, [filters])

  // Handle tab change
  useEffect(() => {
    if (activeTab === "map") {
      // Small delay to ensure clean DOM before mounting map
      setTimeout(() => {
        setShowMap(true)
      }, 50)
    } else {
      setShowMap(false)
    }
  }, [activeTab])

  // Handle marker click
  const handleMarkerClick = useCallback(
    (placeId: number | string) => {
      setSelectedPlace(Number(placeId) === selectedPlace ? null : Number(placeId))
    },
    [selectedPlace],
  )

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Religious Places</h1>
          <p className="text-muted-foreground mt-1">Explore sacred places and temples across India</p>
        </div>

        <div className="flex items-center mt-4 md:mt-0 space-x-2">
          {/* View toggle */}
          <div className="bg-muted rounded-lg p-1 flex">
            <Button
              variant={activeTab === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("list")}
              className={activeTab === "list" ? "bg-black text-white hover:bg-black/90" : ""}
            >
              <ListIcon className="h-4 w-4 mr-1" />
              List
            </Button>
            <Button
              variant={activeTab === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("map")}
              className={activeTab === "map" ? "bg-black text-white hover:bg-black/90" : ""}
            >
              <MapIcon className="h-4 w-4 mr-1" />
              Map
            </Button>
          </div>

          {/* Mobile filter button - only show on client */}
          {isClient && isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <FilterIcon className="h-4 w-4 mr-1" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Filter religious places by various criteria</SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <FilterPanel onFilterChange={setFilters} states={states} types={types} isMobile={true} />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Desktop filter panel - only show on client */}
        {isClient && !isMobile && (
          <div className="hidden md:block bg-muted p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <FilterPanel onFilterChange={setFilters} states={states} types={types} />
          </div>
        )}

        {/* Main content */}
        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="hidden">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-0">
              {/* Featured places */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Featured Places</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPlaces
                    .filter((place) => place.featured)
                    .map((place) => (
                      <PlaceCard key={place.id} place={place} />
                    ))}
                </div>
              </div>

              {/* All places */}
              <h2 className="text-xl font-semibold mb-4">All Places</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>

              {filteredPlaces.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No places found matching your filters.</p>
                  <Button variant="link" onClick={() => setFilters({})} className="mt-2 text-amber-600">
                    Clear all filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="map" className="mt-0">
              <div className="bg-muted rounded-lg overflow-hidden h-[70vh]">
                {isClient && activeTab === "map" && showMap && (
                  <DynamicSimpleMap
                    key={`map-${Date.now()}`} // Force new instance on tab change
                    places={filteredPlaces}
                    onMarkerClick={handleMarkerClick}
                    selectedPlace={selectedPlace}
                    height="70vh"
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

