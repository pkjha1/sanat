import Link from "next/link"

// Mock data for places
const places = [
  {
    id: 1,
    name: "Varanasi",
    location: "Uttar Pradesh, India",
    description:
      "Varanasi, also known as Kashi, is one of the oldest continuously inhabited cities in the world and a major religious hub in India. Situated on the banks of the sacred Ganges River, it's a place of immense spiritual significance for Hindus. The city is known for its ghats (riverfront steps), where pilgrims perform ritual ablutions and cremations take place. The Kashi Vishwanath Temple, dedicated to Lord Shiva, is one of the most famous temples in Varanasi.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Temple City",
    bestTimeToVisit: "October to March",
    significance:
      "Considered one of the seven sacred cities in Hinduism, Varanasi is believed to be the abode of Lord Shiva. It's said that dying in Varanasi brings salvation (moksha).",
    famousTemples: ["Kashi Vishwanath Temple", "Sankat Mochan Hanuman Temple", "Durga Temple"],
    nearbyPlaces: ["Sarnath", "Ramnagar Fort", "Chunar Fort"],
  },
  {
    id: 2,
    name: "Tirupati",
    location: "Andhra Pradesh, India",
    description:
      "Tirupati is home to the Sri Venkateswara Temple, one of the most visited religious sites in the world. Located on the seventh peak of Tirumala Hills, the temple is dedicated to Lord Venkateswara, an incarnation of Vishnu. The temple attracts millions of devotees each year and is known for its rich architecture, religious significance, and charitable activities.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Temple",
    bestTimeToVisit: "September to March",
    significance:
      "The temple is believed to be self-manifested and is mentioned in several ancient texts. It's one of the richest temples in the world due to devotee donations.",
    famousTemples: ["Sri Venkateswara Temple", "Govindaraja Temple", "Kapila Theertham"],
    nearbyPlaces: ["Chandragiri Fort", "Sri Kalahasti", "Srikalahasti Temple"],
  },
  {
    id: 3,
    name: "Rishikesh",
    location: "Uttarakhand, India",
    description:
      "Rishikesh, often referred to as the 'Yoga Capital of the World', is a spiritual town situated on the banks of the Ganges River. It's known for its numerous ashrams, yoga centers, and as a gateway to the Himalayas. The town gained international fame when The Beatles visited Maharishi Mahesh Yogi's ashram in 1968. Today, it attracts spiritual seekers, adventure enthusiasts, and tourists from around the world.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Spiritual Town",
    bestTimeToVisit: "February to April and September to November",
    significance:
      "Rishikesh is considered a sacred place where sages and saints have meditated since ancient times. It's believed that meditation in Rishikesh leads to salvation.",
    famousTemples: ["Triveni Ghat", "Neelkanth Mahadev Temple", "Bharat Mandir"],
    nearbyPlaces: ["Haridwar", "Dehradun", "Mussoorie"],
  },
]

export default function PlaceDetailPage({ params }: { params: { id: string } }) {
  const placeId = Number.parseInt(params.id)
  const place = places.find((p) => p.id === placeId)

  if (!place) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Place not found</h1>
        <p className="mb-8">The place you're looking for doesn't exist or has been removed.</p>
        <Link href="/places" className="text-green-600 hover:underline">
          ← Back to all places
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <Link href="/places" className="text-green-600 hover:underline mb-8 inline-block">
        ← Back to all places
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={place.image || "/placeholder.svg"}
            alt={place.name}
            className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
          />

          <h1 className="text-3xl font-bold mb-2">{place.name}</h1>
          <div className="flex items-center mb-6">
            <span className="text-gray-600 mr-2">{place.location}</span>
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {place.category}
            </span>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="mb-6">{place.description}</p>

            <h2 className="text-xl font-semibold mb-4">Spiritual Significance</h2>
            <p className="mb-6">{place.significance}</p>

            <h2 className="text-xl font-semibold mb-4">Famous Temples and Sites</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              {place.famousTemples.map((temple, index) => (
                <li key={index}>{temple}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mb-4">Nearby Places of Interest</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              {place.nearbyPlaces.map((nearbyPlace, index) => (
                <li key={index}>{nearbyPlace}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="font-semibold text-lg mb-4">Visitor Information</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">Best Time to Visit</h4>
                <p className="text-gray-600">{place.bestTimeToVisit}</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">How to Reach</h4>
                <p className="text-gray-600">
                  {place.name} is well-connected by air, rail, and road. The nearest airport is approximately 15-20 km
                  away, and regular buses and taxis are available from major cities.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Accommodation</h4>
                <p className="text-gray-600">
                  Various options ranging from budget guesthouses to luxury hotels are available. Many ashrams also
                  offer accommodation for spiritual seekers.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Local Customs</h4>
                <p className="text-gray-600">
                  Visitors are advised to dress modestly, especially when visiting temples. Remove footwear before
                  entering temples and respect local traditions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Plan Your Visit</h3>

            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors mb-3">
              Save to Wishlist
            </button>

            <button className="w-full border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 transition-colors">
              Download Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

