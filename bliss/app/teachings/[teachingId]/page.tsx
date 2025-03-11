import Link from "next/link"
import { ArrowLeft, Play, Clock, Eye, Calendar, Share2, Bookmark, Heart } from "lucide-react"

export default function TeachingPage({ params }: { params: { teachingId: string } }) {
  // Mock data for a teaching
  const teaching = {
    id: Number.parseInt(params.teachingId),
    title: "Introduction to Meditation",
    description:
      "Learn the basics of meditation and mindfulness practices. This comprehensive guide will help you understand the principles of meditation and how to incorporate it into your daily life for improved mental well-being and spiritual growth.",
    content:
      "Meditation is a practice where an individual uses a technique – such as mindfulness, or focusing the mind on a particular object, thought, or activity – to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state. Meditation has been practiced since antiquity in numerous religious traditions and beliefs, often as part of the path towards enlightenment and self realization.\n\nThe earliest records of meditation (dhyana) are found in the Upanishads, and meditation plays a salient role in the contemplative repertoire of Buddhism and Hinduism. Since the 19th century, Asian meditative techniques have spread to other cultures where they have also found application in non-spiritual contexts, such as business and health.",
    type: "video",
    duration: "28 min",
    views: 1245,
    date: "2023-05-15",
    thumbnail: "/placeholder.svg?height=480&width=800",
    category: "Meditation",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  }

  return (
    <div className="container py-8 px-4 md:py-12 max-w-5xl">
      <Link
        href="/teachings"
        className="inline-flex items-center text-gray-600 hover:text-amber-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Teachings
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{teaching.title}</h1>

      <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-6">
        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">{teaching.category}</span>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {teaching.duration}
        </div>
        <div className="flex items-center">
          <Eye className="h-4 w-4 mr-1" />
          {teaching.views} views
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(teaching.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
        <div className="aspect-video w-full">
          <iframe
            src={teaching.videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
            <Heart className="h-5 w-5" />
            <span className="hidden sm:inline">Like</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
            <Bookmark className="h-5 w-5" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors">
            <Share2 className="h-5 w-5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-4">{teaching.description}</p>
        {teaching.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Related Teachings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <Link
              href={`/teachings/${id}`}
              key={id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src="/placeholder.svg?height=240&width=400"
                  alt="Teaching thumbnail"
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-10 w-10 bg-amber-600 rounded-full flex items-center justify-center">
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm mb-1 group-hover:text-amber-600 transition-colors">
                  Related Teaching {id}
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  25 min
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

