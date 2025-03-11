import Link from "next/link"
import { Play, Headphones, FileText, Clock, Eye, Calendar } from "lucide-react"

// Mock data for teachings
const teachings = [
  {
    id: 1,
    title: "Introduction to Meditation",
    description: "Learn the basics of meditation and mindfulness practices.",
    type: "video",
    duration: "28 min",
    views: 1245,
    date: "2023-05-15",
    thumbnail: "/placeholder.svg?height=240&width=400",
    category: "Meditation",
  },
  {
    id: 2,
    title: "Understanding Sacred Texts",
    description: "A deep dive into the interpretation of ancient spiritual writings.",
    type: "audio",
    duration: "45 min",
    views: 892,
    date: "2023-06-02",
    thumbnail: "/placeholder.svg?height=240&width=400",
    category: "Scripture",
  },
  {
    id: 3,
    title: "The Path to Inner Peace",
    description: "Discover techniques for finding tranquility in a chaotic world.",
    type: "text",
    duration: "15 min read",
    views: 2103,
    date: "2023-04-28",
    thumbnail: "/placeholder.svg?height=240&width=400",
    category: "Wellness",
  },
  {
    id: 4,
    title: "Spiritual Practices for Daily Life",
    description: "Incorporate spirituality into your everyday routine.",
    type: "video",
    duration: "32 min",
    views: 1567,
    date: "2023-05-22",
    thumbnail: "/placeholder.svg?height=240&width=400",
    category: "Lifestyle",
  },
  {
    id: 5,
    title: "Ancient Wisdom for Modern Times",
    description: "How traditional teachings remain relevant in today's world.",
    type: "audio",
    duration: "52 min",
    views: 743,
    date: "2023-06-10",
    thumbnail: "/placeholder.svg?height=240&width=400",
    category: "Philosophy",
  },
  {
    id: 6,
    title: "The Science of Mindfulness",
    description: "Research-backed benefits of mindfulness practices.",
    type: "text",
    duration: "20 min read",
    views: 1876,
    date: "2023-05-05",
    thumbnail: "/placeholder.svg?height=240&width=400",
    category: "Science",
  },
]

// Helper function to get icon based on teaching type
function getTypeIcon(type: string) {
  switch (type) {
    case "video":
      return <Play className="h-4 w-4" />
    case "audio":
      return <Headphones className="h-4 w-4" />
    case "text":
      return <FileText className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

// Helper function to get background color based on teaching type
function getTypeBgColor(type: string) {
  switch (type) {
    case "video":
      return "bg-blue-100 text-blue-800"
    case "audio":
      return "bg-purple-100 text-purple-800"
    case "text":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function TeachingsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Teachings</h1>
      <p className="text-gray-600 mb-8">Explore our collection of spiritual teachings and wisdom</p>

      <div className="flex flex-wrap gap-2 mb-8">
        <button className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm font-medium">All</button>
        <button className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">
          Videos
        </button>
        <button className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">
          Audio
        </button>
        <button className="px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors">
          Articles
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachings.map((teaching) => (
          <Link
            href={`/teachings/${teaching.id}`}
            key={teaching.id}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={teaching.thumbnail || "/placeholder.svg"}
                alt={teaching.title}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {teaching.type === "video" && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-12 w-12 bg-amber-600 rounded-full flex items-center justify-center">
                    <Play className="h-6 w-6 text-white ml-0.5" />
                  </div>
                </div>
              )}
              <div className="absolute top-2 left-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTypeBgColor(teaching.type)}`}
                >
                  {getTypeIcon(teaching.type)}
                  {teaching.type.charAt(0).toUpperCase() + teaching.type.slice(1)}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 group-hover:text-amber-600 transition-colors">{teaching.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{teaching.description}</p>
              <div className="flex flex-wrap items-center text-xs text-gray-500 gap-3">
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full">{teaching.category}</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {teaching.duration}
                </div>
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {teaching.views} views
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(teaching.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

