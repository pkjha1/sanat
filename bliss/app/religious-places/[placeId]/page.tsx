"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Globe, Clock, Calendar, Info, MapIcon, ChurchIcon as Temple } from "lucide-react"
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

// Mock data for a single place
const getPlaceData = (id: string) => ({
  id: Number.parseInt(id),
  name: "Varanasi",
  description:
    "One of the oldest continuously inhabited cities in the world and a major religious hub in India. Situated on the banks of the sacred Ganges River, Varanasi is a pilgrimage site for Hindus who come to bathe in the holy waters and perform funeral rites.",
  fullDescription: `
    Varanasi, also known as Kashi or Banaras, is one of the oldest living cities in the world. For thousands of years, it has been a center of learning, culture, and spirituality. The city is mentioned in ancient texts like the Rigveda, dating back to 1500 BCE.
    
    Situated on the banks of the sacred Ganges River, Varanasi is considered one of the holiest cities in Hinduism. Pilgrims from all over India and beyond come to bathe in the holy waters of the Ganges, believing it will cleanse them of their sins and help achieve moksha (liberation from the cycle of rebirth).
    
    The city is also known for its numerous ghats (steps leading down to the river), with Dashashwamedh Ghat and Manikarnika Ghat being the most famous. The latter is primarily used as a cremation site, as many Hindus believe that being cremated in Varanasi brings salvation.
    
    Beyond its religious significance, Varanasi is a cultural hub known for its silk weaving, classical music, and the Banaras Hindu University, one of the oldest and most prestigious universities in India.
  `,
  image: "/placeholder.svg?height=400&width=800",
  gallery: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  coordinates: { lat: 25.3176, lng: 82.9739 },
  address: "Varanasi, Uttar Pradesh, India",
  phone: "+91 542 222 1711",
  website: "https://varanasi.nic.in",
  openingHours: "Open 24 hours",
  bestTimeToVisit: "October to March",
  state: "Uttar Pradesh",
  type: "City",
  temples: 23,
  nearbyPlaces: [
    {
      id: 2,
      name: "Sarnath",
      description: "The place where Buddha gave his first sermon after attaining enlightenment.",
      image: "/placeholder.svg?height=200&width=300",
      coordinates: { lat: 25.3715, lng: 83.0235 },
      distance: "10 km",
    },
    {
      id: 3,
      name: "Ramnagar",
      description: "Home to the Ramnagar Fort and other historical sites.",
      image: "/placeholder.svg?height=200&width=300",
      coordinates: { lat: 25.2815, lng: 83.024 },
      distance: "14 km",
    },
  ],
  temples: [
    {
      id: 101,
      name: "Kashi Vishwanath Temple",
      description: "One of the most famous Hindu temples dedicated to Lord Shiva.",
      image: "/placeholder.svg?height=200&width=300",
      coordinates: { lat: 25.3109, lng: 83.0107 },
      mainDeity: "Lord Shiva",
    },
    {
      id: 102,
      name: "Sankat Mochan Hanuman Temple",
      description: "A famous temple dedicated to Lord Hanuman.",
      image: "/placeholder.svg?height=200&width=300",
      coordinates: { lat: 25.2841, lng: 82.9995 },
      mainDeity: "Lord Hanuman",
    },
    {
      id: 103,
      name: "Durga Temple",
      description: "Also known as the Monkey Temple, dedicated to Goddess Durga.",
      image: "/placeholder.svg?height=200&width=300",
      coordinates: { lat: 25.283, lng: 83.0062 },
      mainDeity: "Goddess Durga",
    },
    {
      id: 104,
      name: "Tulsi Manas Temple",
      description: "Built in the 1960s, dedicated to Lord Rama.",
      image: "/placeholder.svg?height=200&width=300",
      coordinates: { lat: 25.3023, lng: 83.0063 },
      mainDeity: "Lord Rama",
    },
  ],
  history: `
    Varanasi's history dates back to at least the 11th or 12th century BCE, making it one of the oldest continuously inhabited cities in the world. The city was a major religious and cultural center during the time of Buddha (6th century BCE) and has been a pilgrimage site for Hindus for thousands of years.
    
    Throughout its long history, Varanasi has been known by various names, including Kashi and Banaras. It has been mentioned in ancient texts like the Rigveda, Puranas, and Buddhist scriptures.
    
    During the Mauryan Empire (322-185 BCE), Varanasi was an important center of trade and commerce. It continued to flourish under various dynasties, including the Guptas (4th-6th century CE), who patronized art, culture, and education in the city.
    
    In the medieval period, Varanasi faced several invasions and destructions, particularly during the Muslim conquests. Many of its ancient temples were destroyed and rebuilt multiple times. The current Kashi Vishwanath Temple, for instance, was rebuilt in the 18th century after being demolished by Mughal Emperor Aurangzeb.
    
    During the British colonial period, Varanasi became part of the Benares State, a princely state. After India's independence in 1947, it was integrated into the state of Uttar Pradesh.
    
    Today, Varanasi continues to be a major cultural and religious center, attracting millions of pilgrims and tourists from around the world.
  `,
  religiousSignificance: `
    Varanasi holds immense religious significance in Hinduism. It is considered one of the seven sacred cities (Sapta Puri) where Hindus believe that attaining moksha (liberation from the cycle of rebirth) is possible.
    
    The city is associated with Lord Shiva, one of the principal deities of Hinduism. According to Hindu mythology, Varanasi is the abode of Lord Shiva and his consort Parvati. The Kashi Vishwanath Temple, dedicated to Lord Shiva, is one of the twelve Jyotirlingas (special shrines of Shiva) and is a major pilgrimage site.
    
    The Ganges River, which flows through Varanasi, is considered sacred in Hinduism. Hindus believe that bathing in the Ganges can cleanse one of all sins. Many pilgrims come to Varanasi to perform the ritual bath (snan) in the river.
    
    Varanasi is also significant for death rituals in Hinduism. Many Hindus believe that being cremated at the Manikarnika Ghat or Harishchandra Ghat in Varanasi ensures salvation (moksha). As a result, many elderly and terminally ill Hindus come to Varanasi to spend their last days.
    
    Beyond Hinduism, Varanasi has significance in other religions as well. It is near Sarnath, where Buddha gave his first sermon after attaining enlightenment. The city has also been a center of learning and culture, with the Banaras Hindu University being one of the oldest and most prestigious universities in India.
    
    The Ganga Aarti, a ritual performed every evening at the Dashashwamedh Ghat, is a spectacular ceremony that attracts thousands of visitors. Priests perform the aarti (offering of light) to the Ganges River, accompanied by chants, bells, and incense.
  `,
})

export default function PlacePage() {
  const params = useParams()
  const placeId = params.placeId as string
  const [place, setPlace] = useState<ReturnType<typeof getPlaceData> | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTemple, setSelectedTemple] = useState<number | null>(null)
  const [showMap, setShowMap] = useState(false)

  // Fetch place data
  useEffect(() => {
    if (placeId) {
      // In a real app, this would be an API call
      setPlace(getPlaceData(placeId))
    }
  }, [placeId])

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

  if (!place) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
        <img src={place.image || "/placeholder.svg"} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="bg-amber-500">{place.type}</Badge>
            <Badge variant="outline" className="bg-white/20 text-white border-white/40">
              {place.state}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{place.name}</h1>
          <p className="text-white/80 max-w-3xl">{place.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="religious">Religious Significance</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
              <TabsTrigger value="temples">Temples</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">About {place.name}</h2>
                <div className="whitespace-pre-line">{place.fullDescription}</div>

                {/* Photo Gallery */}
                <h3 className="text-xl font-bold mt-8 mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {place.gallery.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden h-40">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${place.name} - Photo ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="religious" className="mt-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">Religious Significance</h2>
                <div className="whitespace-pre-line">{place.religiousSignificance}</div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">History of {place.name}</h2>
                <div className="whitespace-pre-line">{place.history}</div>
              </div>
            </TabsContent>

            <TabsContent value="map" className="mt-6">
              <div className="h-[500px] rounded-lg overflow-hidden">
                {activeTab === "map" && showMap && (
                  <DynamicSimpleMap
                    key={`map-${Date.now()}`}
                    places={[
                      {
                        id: place.id,
                        name: place.name,
                        coordinates: place.coordinates,
                        description: place.description,
                        image: place.image,
                        state: place.state,
                        type: place.type,
                      },
                    ]}
                    height={500}
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent value="temples" className="mt-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Temples in {place.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {place.temples.map((temple) => (
                    <Card key={temple.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex h-full">
                        <div className="w-1/3">
                          <img
                            src={temple.image || "/placeholder.svg"}
                            alt={temple.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="w-2/3 p-4">
                          <h3 className="font-bold text-lg mb-1">{temple.name}</h3>
                          <p className="text-sm text-amber-600 mb-2">{temple.mainDeity}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{temple.description}</p>
                          <a
                            href={`/religious-places/${place.id}/temples/${temple.id}`}
                            className="text-sm text-amber-600 hover:text-amber-800"
                          >
                            View details →
                          </a>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Nearby Places */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Nearby Places</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {place.nearbyPlaces.map((nearbyPlace) => (
                <Card key={nearbyPlace.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex h-full">
                    <div className="w-1/3">
                      <img
                        src={nearbyPlace.image || "/placeholder.svg"}
                        alt={nearbyPlace.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="w-2/3 p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-lg">{nearbyPlace.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {nearbyPlace.distance}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{nearbyPlace.description}</p>
                      <a
                        href={`/religious-places/${nearbyPlace.id}`}
                        className="text-sm text-amber-600 hover:text-amber-800"
                      >
                        View details →
                      </a>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Information Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-amber-600" />
                Visitor Information
              </h3>

              <div className="space-y-4">
                <div className="flex">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">{place.address}</div>
                  </div>
                </div>

                <div className="flex">
                  <Phone className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">{place.phone}</div>
                  </div>
                </div>

                <div className="flex">
                  <Globe className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium">Website</div>
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-amber-600 hover:text-amber-800"
                    >
                      {place.website.replace("https://", "")}
                    </a>
                  </div>
                </div>

                <div className="flex">
                  <Clock className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium">Opening Hours</div>
                    <div className="text-sm text-muted-foreground">{place.openingHours}</div>
                  </div>
                </div>

                <div className="flex">
                  <Temple className="h-5 w-5 mr-3 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium">Number of Temples</div>
                    <div className="text-sm text-muted-foreground">{place.temples.length} major temples</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  <MapIcon className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Best Time to Visit */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-amber-600" />
                Best Time to Visit
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                The ideal time to visit {place.name} is during {place.bestTimeToVisit} when the weather is pleasant and
                comfortable for sightseeing.
              </p>
              <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
                <h4 className="font-medium text-amber-800 mb-1">Local Tip</h4>
                <p className="text-sm text-amber-700">
                  Visit early in the morning to experience the spiritual atmosphere and avoid crowds, especially at
                  popular temples.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card>
            <CardContent className="p-0 overflow-hidden rounded-lg">
              <div className="h-48">
                <DynamicSimpleMap
                  key={`mini-map-${Date.now()}`}
                  places={[
                    {
                      id: place.id,
                      name: place.name,
                      coordinates: place.coordinates,
                    },
                  ]}
                  height={192} // 48 * 4 = 192px
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">Location</h3>
                <p className="text-sm text-muted-foreground mb-3">{place.address}</p>
                <Button
                  variant="outline"
                  className="w-full text-amber-600 border-amber-200 hover:bg-amber-50"
                  onClick={() => setActiveTab("map")}
                >
                  View Full Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

