"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Sample story data
const stories = [
  {
    id: "story1",
    title: "The Divine Lotus: Symbol of Purity",
    excerpt:
      "Discover the spiritual significance of the lotus flower in Hindu mythology and its representation of spiritual awakening.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Mythology",
    readTime: "5 min read",
  },
  {
    id: "story2",
    title: "The Wisdom of Lord Ganesha",
    excerpt: "Explore the profound lessons from Lord Ganesha's stories and how they apply to modern life challenges.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Deities",
    readTime: "7 min read",
  },
  {
    id: "story3",
    title: "Sacred Rivers of India",
    excerpt: "Learn about the seven sacred rivers of India and their spiritual significance in Hindu tradition.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Sacred Geography",
    readTime: "6 min read",
  },
  {
    id: "story4",
    title: "The Symbolism of Om",
    excerpt: "Understand the profound meaning behind the sacred sound Om and its role in meditation practices.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Spirituality",
    readTime: "4 min read",
  },
  {
    id: "story5",
    title: "Lessons from the Ramayana",
    excerpt: "Explore timeless wisdom from the epic Ramayana and its relevance to modern family values and ethics.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Epics",
    readTime: "8 min read",
  },
]

export function FeaturedStories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const storiesPerPage = 3
  const totalPages = Math.ceil(stories.length / storiesPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }

  const currentStories = stories.slice(currentIndex * storiesPerPage, (currentIndex + 1) * storiesPerPage)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Featured Stories</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={prevSlide}
            aria-label="Previous stories"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" onClick={nextSlide} aria-label="Next stories">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={currentIndex}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {currentStories.map((story) => (
          <motion.div key={story.id} variants={itemVariants}>
            <Link href={`/story/${story.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                    {story.category}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{story.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{story.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{story.readTime}</span>
                    <span className="text-amber-600 text-sm font-medium hover:underline">Read More</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-center mt-8">
        <Link href="/story">
          <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
            View All Stories
          </Button>
        </Link>
      </div>
    </div>
  )
}

