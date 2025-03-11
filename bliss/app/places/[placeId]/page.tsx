"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Globe, Clock, ChevronLeft, Star, Navigation } from "lucide-react"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { PlaceMap } from "@/components/places/place-map"
import { TempleCard } from "@/components/places/temple-card"
import { NearbyPlaceCard } from "@/components/places/nearby-place-card"

export default function PlacePage({ params }: { params: { placeId: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [place, setPlace] = useState<any>(null)
  const [temples, setTemples] = useState<any[]>([])
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would fetch the place data from your API
    // For this example, we'll use mock data
    setTimeout(() => {
      setPlace({
        id: params.placeId,
        name: "Varanasi",
        description:
          "Varanasi, also known as Benares or Kashi, is a city on the banks of the river Ganges in Uttar Pradesh, India. It is one of the oldest continuously inhabited cities in the world and is regarded as one of Hinduism's seven holy cities.",
        images: [
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ],
        address: "Varanasi, Uttar Pradesh, India",
        coordinates: { lat: 25.3176, lng: 82.9739 },
        phone: "+91 542 222 1711",
        website: "https://varanasi.nic.in",
        openingHours: "Open 24 hours",
        rating: 4.7,
        reviews: 1250,
        significance:
          "Varanasi is considered one of the holiest cities in Hinduism and Jainism. It is believed that dying in Varanasi brings salvation (moksha) to the soul, breaking the cycle of rebirth.",
        history:
          "Varanasi's history dates back to the 11th or 12th century BCE, making it one of the oldest continuously inhabited cities in the world. It has been a cultural and religious center for thousands of years.",
        bestTimeToVisit: "October to March",
        howToReach:
          "Varanasi is well-connected by air, rail, and road. The Lal Bahadur Shastri International Airport is about 26 km from the city center. The Varanasi Junction railway station connects the city to major Indian cities.",
      })

      setTemples([
        {
          id: "1",
          name: "Kashi Vishwanath Temple",
          deity: "Lord Shiva",
          image: "/placeholder.svg?height=200&width=300",
          address: "Lahori Tola, Varanasi, Uttar Pradesh",
          distance: "1.2 km from city center",
          rating: 4.8,
        },
        {
          id: "2",
          name: "Sankat Mochan Hanuman Temple",
          deity: "Lord Hanuman",
          image: "/placeholder.svg?height=200&width=300",
          address: "Sankat Mochan, Varanasi, Uttar Pradesh",
          distance: "3.5 km from city center",
          rating: 4.6,
        },
        {
          id: "3",
          name: "Durga Temple",
          deity: "Goddess Durga",
          image: "/placeholder.svg?height=200&width=300",
          address: "Durga Kund, Varanasi, Uttar Pradesh",
          distance: "2.8 km from city center",
          rating: 4.5,
        },
      ])

      setNearbyPlaces([
        {
          id: "4",
          name: "Sarnath",
          image: "/placeholder.svg?height=200&width=300",
          description: "Buddhist pilgrimage site where Buddha gave his first sermon",
          distance: "10 km from Varanasi",
          rating: 4.6,
        },
        {
          id: "5",
          name: "Ramnagar Fort",
          image: "/placeholder.svg?height=200&width=300",
          description: "18th-century fort and museum with a temple",
          distance: "14 km from Varanasi",
          rating: 4.3,
        },
      ])

      setIsLoading(false)
    }, 1000)
  }, [params.placeId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Link href="/places" className="inline-flex items-center text-amber-600 hover:text-amber-700">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Places
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-80">
              <Image
                src={place.images[0] || "/placeholder.svg"}
                alt={place.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h1 className="text-3xl font-bold text-white">{place.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center text-amber-400">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-white font-medium">{place.rating}</span>
                  </div>
                  <span className="mx-2 text-white">•</span>
                  <span className="text-white">{place.reviews} reviews</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-700">Address</h3>
                    <p>{place.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-700">Phone</h3>
                    <p>{place.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-700">Website</h3>
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:underline"
                    >
                      {place.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-700">Opening Hours</h3>
                    <p>{place.openingHours}</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="visit">Visit Info</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Description</h2>
                      <p>{place.description}</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-2">Religious Significance</h2>
                      <p>{place.significance}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="history" className="pt-4">
                  <div>
                    <h2 className="text-xl font-bold mb-2">History</h2>
                    <p>{place.history}</p>
                  </div>
                </TabsContent>
                <TabsContent value="visit" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Best Time to Visit</h2>
                      <p>{place.bestTimeToVisit}</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-2">How to Reach</h2>
                      <p>{place.howToReach}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="map" className="pt-4">
                  <div className="h-80 rounded-lg overflow-hidden">
                    <PlaceMap coordinates={place.coordinates} name={place.name} />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {place.images.map((image: string, index: number) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${place.name} - Image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Temples in {place.name}</h2>
                <Link href={`/places/${place.id}/temples`}>
                  <Button variant="link" className="text-amber-600 p-0">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {temples.map((temple) => (
                  <TempleCard key={temple.id} temple={temple} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Nearby Places</h2>
                <Link href="/places">
                  <Button variant="link" className="text-amber-600 p-0">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {nearbyPlaces.map((place) => (
                  <NearbyPlaceCard key={place.id} place={place} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Get Directions</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  <span className="font-medium">{place.name}</span>
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
                  <Navigation className="h-4 w-4" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">More Temples You May Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {temples.map((temple) => (
            <Link key={temple.id} href={`/temples/${temple.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={temple.image || "/placeholder.svg"}
                    alt={temple.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{temple.name}</h3>
                  <p className="text-sm text-gray-600">{temple.address}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{temple.rating}</span>
                    </div>
                    <Badge className="ml-2 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
                      {temple.deity}
                    </Badge>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

