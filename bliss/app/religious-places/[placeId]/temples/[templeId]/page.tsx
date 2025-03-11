"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Globe, Clock, Building, ChevronLeft, Star, Navigation, Calendar } from "lucide-react"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { PlacesMap } from "@/components/places-map"

export default function TemplePage({ params }: { params: { placeId: string; templeId: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [temple, setTemple] = useState<any>(null)
  const [relatedTemples, setRelatedTemples] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would fetch the temple data from your API
    // For this example, we'll use mock data
    setTimeout(() => {
      setTemple({
        id: params.templeId,
        name: "Kashi Vishwanath Temple",
        deity: "Lord Shiva",
        description:
          "Kashi Vishwanath Temple is one of the most famous Hindu temples dedicated to Lord Shiva. It is located in Vishwanath Gali of Varanasi, Uttar Pradesh, India. The temple stands on the western bank of the holy river Ganga, and is one of the twelve Jyotirlingas, the holiest of Shiva temples.",
        images: [
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
          "/placeholder.svg?height=400&width=600",
        ],
        address: "Lahori Tola, Varanasi, Uttar Pradesh 221001, India",
        coordinates: { lat: 25.3109, lng: 83.0107 },
        phone: "+91 542 239 2629",
        website: "https://shrikashivishwanath.org",
        openingHours: "3:00 AM - 11:00 PM",
        rating: 4.8,
        reviews: 2500,
        placeId: params.placeId,
        placeName: "Varanasi",
        significance:
          "The Kashi Vishwanath Temple is one of the most significant shrines of Lord Shiva. It houses one of the twelve Jyotirlingas, making it one of the holiest pilgrimage sites for Hindus. The temple has been destroyed and rebuilt several times throughout history, with the current structure dating back to the 18th century.",
        history:
          "The temple has been mentioned in ancient Hindu scriptures and is believed to have been in existence for over 3,500 years. It was destroyed and rebuilt multiple times during the medieval period. The current structure was built in 1780 by Maharani Ahilyabai Holkar of Indore.",
        architecture:
          "The main temple is built in the Nagara style of architecture. The temple complex consists of several smaller shrines and is characterized by a gold-plated spire. The sanctum sanctorum houses the Jyotirlinga of Lord Shiva.",
        rituals:
          "The temple conducts five aartis daily: Mangala Aarti (3:00 AM), Bhog Aarti (11:15 AM), Sandhya Aarti (7:00 PM), Shringaar Aarti (9:00 PM), and Shayana Aarti (10:30 PM). The Shravan month (July-August) is considered especially auspicious for worship.",
        festivals: [
          {
            name: "Maha Shivaratri",
            description: "The most important festival celebrated with great devotion and fervor",
            month: "February-March",
          },
          {
            name: "Shravan Month",
            description: "The entire month is considered auspicious for worship of Lord Shiva",
            month: "July-August",
          },
        ],
        bestTimeToVisit:
          "October to March, though the temple is visited throughout the year. Early morning is the best time to avoid crowds.",
        howToReach:
          "The temple is located in the heart of Varanasi. It can be reached by auto-rickshaw or cycle-rickshaw from any part of the city. The nearest airport is Lal Bahadur Shastri International Airport, about 26 km away.",
      })

      setRelatedTemples([
        {
          id: "2",
          name: "Sankat Mochan Hanuman Temple",
          deity: "Lord Hanuman",
          image: "/placeholder.svg?height=200&width=300",
          address: "Sankat Mochan, Varanasi, Uttar Pradesh",
          distance: "3.5 km from Kashi Vishwanath",
          rating: 4.6,
        },
        {
          id: "3",
          name: "Durga Temple",
          deity: "Goddess Durga",
          image: "/placeholder.svg?height=200&width=300",
          address: "Durga Kund, Varanasi, Uttar Pradesh",
          distance: "2.8 km from Kashi Vishwanath",
          rating: 4.5,
        },
        {
          id: "4",
          name: "Tulsi Manas Temple",
          deity: "Lord Rama",
          image: "/placeholder.svg?height=200&width=300",
          address: "Tulsi Manas Mandir Road, Varanasi, Uttar Pradesh",
          distance: "4.2 km from Kashi Vishwanath",
          rating: 4.7,
        },
        {
          id: "5",
          name: "New Vishwanath Temple",
          deity: "Lord Shiva",
          image: "/placeholder.svg?height=200&width=300",
          address: "BHU Campus, Varanasi, Uttar Pradesh",
          distance: "5.8 km from Kashi Vishwanath",
          rating: 4.8,
        },
      ])

      setIsLoading(false)
    }, 1000)
  }, [params.templeId, params.placeId])

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
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/religious-places" className="inline-flex items-center text-amber-600 hover:text-amber-700">
            <ChevronLeft className="h-4 w-4 mr-1" />
            All Places
          </Link>
          <span className="text-gray-400">•</span>
          <Link href={`/religious-places/${temple.placeId}`} className="text-amber-600 hover:text-amber-700">
            {temple.placeName}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-80">
              <Image
                src={temple.images[0] || "/placeholder.svg?height=400&width=600"}
                alt={temple.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-white">{temple.name}</h1>
                  <Badge className="bg-amber-500 text-white border-amber-600">{temple.deity}</Badge>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex items-center text-amber-400">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-white font-medium">{temple.rating}</span>
                  </div>
                  <span className="mx-2 text-white">•</span>
                  <span className="text-white">{temple.reviews} reviews</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-700">Address</h3>
                    <p>{temple.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-700">Phone</h3>
                    <p>{temple.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-700">Website</h3>
                    <a
                      href={temple.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:underline"
                    >
                      {temple.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-700">Opening Hours</h3>
                    <p>{temple.openingHours}</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="significance">Significance</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="rituals">Rituals</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Description</h2>
                      <p>{temple.description}</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-2">Architecture</h2>
                      <p>{temple.architecture}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="significance" className="pt-4">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Religious Significance</h2>
                    <p>{temple.significance}</p>
                  </div>
                </TabsContent>
                <TabsContent value="history" className="pt-4">
                  <div>
                    <h2 className="text-xl font-bold mb-2">History</h2>
                    <p>{temple.history}</p>
                  </div>
                </TabsContent>
                <TabsContent value="rituals" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Rituals & Worship</h2>
                      <p>{temple.rituals}</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-2">Festivals</h2>
                      <div className="space-y-3 mt-3">
                        {temple.festivals.map((festival: any, index: number) => (
                          <div key={index} className="flex items-start gap-3 bg-amber-50 p-3 rounded-md">
                            <Calendar className="h-5 w-5 text-amber-600 mt-0.5" />
                            <div>
                              <h3 className="font-medium">{festival.name}</h3>
                              <p className="text-sm text-gray-600">{festival.description}</p>
                              <p className="text-xs text-gray-500 mt-1">{festival.month}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="map" className="pt-4">
                  <div className="h-80 rounded-lg overflow-hidden">
                    <PlacesMap
                      markers={[
                        {
                          id: temple.id,
                          name: temple.name,
                          position: temple.coordinates,
                          type: "temple",
                        },
                      ]}
                      center={temple.coordinates}
                      zoom={15}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {temple.images.map((image: string, index: number) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg?height=200&width=300"}
                        alt={`${temple.name} - Image ${index + 1}`}
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
                <h2 className="text-xl font-bold">Visit Information</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-700">Best Time to Visit</h3>
                    <p>{temple.bestTimeToVisit}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Navigation className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-700">How to Reach</h3>
                    <p>{temple.howToReach}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Located in</h2>
              </div>
              <Link href={`/religious-places/${temple.placeId}`}>
                <div className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
                  <Building className="h-5 w-5 text-amber-600" />
                  <div>
                    <h3 className="font-medium">{temple.placeName}</h3>
                    <p className="text-sm text-gray-600">View all temples in this location</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Get Directions</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  <span className="font-medium">{temple.name}</span>
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
        <h2 className="text-2xl font-bold mb-6">Related Temples</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedTemples.map((relatedTemple) => (
            <Link key={relatedTemple.id} href={`/religious-places/${temple.placeId}/temples/${relatedTemple.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={relatedTemple.image || "/placeholder.svg?height=200&width=300"}
                    alt={relatedTemple.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{relatedTemple.name}</h3>
                  <p className="text-sm text-gray-600">{relatedTemple.address}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{relatedTemple.rating}</span>
                    </div>
                    <Badge className="ml-2 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
                      {relatedTemple.deity}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{relatedTemple.distance}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

