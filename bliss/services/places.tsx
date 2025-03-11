import type { Place } from "@/types/place"

// Mock data for places - in a real app, this would fetch from an API
const PLACES_DATA = {
  "1": {
    id: "1",
    name: "Varanasi",
    description:
      "Varanasi, also known as Benares or Kashi, is a city on the banks of the river Ganges in Uttar Pradesh, India. It is one of the oldest continuously inhabited cities in the world and is regarded as one of Hinduism's seven holy cities.",
    image: "/placeholder.svg?height=400&width=600",
    coordinates: { lat: 25.3176, lng: 82.9739 },
    phone: "+91 542 222 1711",
    website: "https://varanasi.nic.in",
    openingHours: "Open 24 hours",
    rating: 4.7,
    reviews: 1250,
    fullDescription:
      "Varanasi, also known as Benares or Kashi, is a city on the banks of the river Ganges in Uttar Pradesh, India. It is one of the oldest continuously inhabited cities in the world and is regarded as one of Hinduism's seven holy cities.  It's a significant pilgrimage site for Hindus and Jains.",
    religiousSignificance:
      "Varanasi is considered one of the holiest cities in Hinduism and Jainism. It is believed that dying in Varanasi brings salvation (moksha) to the soul, breaking the cycle of rebirth.",
    history:
      "Varanasi's history dates back to the 11th or 12th century BCE, making it one of the oldest continuously inhabited cities in the world. It has been a cultural and religious center for thousands of years.",
    bestTimeToVisit: "October to March",
    howToReach:
      "Varanasi is well-connected by air, rail, and road. The Lal Bahadur Shastri International Airport is about 26 km from the city center. The Varanasi Junction railway station connects the city to major Indian cities.",
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    temples: [
      {
        id: "1-1",
        name: "Kashi Vishwanath Temple",
        mainDeity: "Lord Shiva",
        description:
          "Kashi Vishwanath Temple is one of the most famous Hindu temples dedicated to Lord Shiva. It is located in Vishwanath Gali of Varanasi, Uttar Pradesh, India. The temple stands on the western bank of the holy river Ganga, and is one of the twelve Jyotirlingas, the holiest of Shiva temples.",
        image: "/placeholder.svg?height=200&width=300",
        address: "Lahori Tola, Varanasi, Uttar Pradesh 221001, India",
        coordinates: { lat: 25.3109, lng: 83.0107 },
        phone: "+91 542 239 2629",
        website: "https://shrikashivishwanath.org",
        openingHours: "3:00 AM - 11:00 PM",
        rating: 4.8,
        reviews: 2500,
      },
    ],
    nearbyPlaces: [
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
    ],
  },
}

export async function fetchPlaceData(placeId: string): Promise<Place | null> {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return PLACES_DATA[placeId] || null
}

