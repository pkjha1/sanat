"use client"

export function FeaturedStories() {
  const stories = [
    {
      id: 1,
      title: "The Divine Journey",
      excerpt: "Exploring the spiritual path through ancient wisdom and modern practice.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Spirituality",
    },
    {
      id: 2,
      title: "Sacred Rituals",
      excerpt: "Understanding the significance of traditional practices in modern times.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Traditions",
    },
    {
      id: 3,
      title: "Mindful Living",
      excerpt: "Incorporating spiritual awareness into everyday activities.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Lifestyle",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
      {stories.map((story) => (
        <div key={story.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <img src={story.image || "/placeholder.svg"} alt={story.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              {story.category}
            </span>
            <h3 className="text-lg font-bold mt-2 mb-1">{story.title}</h3>
            <p className="text-gray-600 text-sm">{story.excerpt}</p>
            <a
              href={`/stories/${story.id}`}
              className="mt-3 inline-block text-amber-600 hover:underline text-sm font-medium"
            >
              Read more
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

