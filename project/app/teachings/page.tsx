import Link from "next/link"

// Mock data for teachings
const teachings = [
  {
    id: 1,
    title: "The Path of Karma Yoga",
    teacher: "Swami Vivekananda",
    description: "An exploration of selfless action as a spiritual path, based on the teachings of the Bhagavad Gita.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Philosophy",
    duration: "45 minutes",
  },
  {
    id: 2,
    title: "Understanding Meditation",
    teacher: "Paramahansa Yogananda",
    description: "A comprehensive guide to meditation techniques and their benefits for spiritual growth.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Meditation",
    duration: "30 minutes",
  },
  {
    id: 3,
    title: "The Essence of Vedanta",
    teacher: "Swami Chinmayananda",
    description: "An introduction to the core principles of Vedanta philosophy and its relevance in modern life.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Philosophy",
    duration: "60 minutes",
  },
]

export default function TeachingsPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Spiritual Teachings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachings.map((teaching) => (
          <Link href={`/teachings/${teaching.id}`} key={teaching.id}>
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={teaching.image || "/placeholder.svg"}
                  alt={teaching.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {teaching.duration}
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {teaching.category}
                </span>
                <h2 className="text-xl font-bold mt-2">{teaching.title}</h2>
                <p className="text-sm text-gray-500">by {teaching.teacher}</p>
                <p className="mt-2 text-gray-600 line-clamp-3">{teaching.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

