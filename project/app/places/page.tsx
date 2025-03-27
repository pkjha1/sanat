import Link from "next/link"

// Mock data for places
const places = [
  {
    id: 1,
    name: "Varanasi",
    location: "Uttar Pradesh, India",
    description:
      "Varanasi, also known as Kashi, is one of the oldest continuously inhabited cities in the world and a major religious hub in India.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Temple City",
  },
  {
    id: 2,
    name: "Tirupati",
    location: "Andhra Pradesh, India",
    description:
      "Tirupati is home to the Sri Venkateswara Temple, one of the most visited religious sites in the world.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Temple",
  },
  {
    id: 3,
    name: "Rishikesh",
    location: "Uttarakhand, India",
    description:
      "Rishikesh, often referred to as the 'Yoga Capital of the World', is a spiritual town situated on the banks of the Ganges River.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Spiritual Town",
  },
]

export default function PlacesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Sacred Places</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <Link href={`/places/${place.id}`} key={place.id}>
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img src={place.image || "/placeholder.svg"} alt={place.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {place.category}
                </span>
                <h2 className="text-xl font-bold mt-2">{place.name}</h2>
                <p className="text-sm text-gray-500">{place.location}</p>
                <p className="mt-2 text-gray-600 line-clamp-3">{place.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

