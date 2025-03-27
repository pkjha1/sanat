"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter } from "lucide-react"
import { motion } from "framer-motion"

const stories = [
  {
    id: "story1",
    title: "The Divine Lotus: Symbol of Purity",
    excerpt:
      "Discover the spiritual significance of the lotus flower in Hindu mythology and its representation of spiritual awakening.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Mythology",
    readTime: "5 min read",
    date: "May 15, 2023",
  },
  {
    id: "story2",
    title: "The Wisdom of Lord Ganesha",
    excerpt: "Explore the profound lessons from Lord Ganesha's stories and how they apply to modern life challenges.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Deities",
    readTime: "7 min read",
    date: "June 3, 2023",
  },
  {
    id: "story3",
    title: "Sacred Rivers of India",
    excerpt: "Learn about the seven sacred rivers of India and their spiritual significance in Hindu tradition.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Sacred Geography",
    readTime: "6 min read",
    date: "April 22, 2023",
  },
  {
    id: "story4",
    title: "The Symbolism of Om",
    excerpt: "Understand the profound meaning behind the sacred sound Om and its role in meditation practices.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Spirituality",
    readTime: "4 min read",
    date: "July 8, 2023",
  },
  {
    id: "story5",
    title: "Lessons from the Ramayana",
    excerpt: "Explore timeless wisdom from the epic Ramayana and its relevance to modern family values and ethics.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Epics",
    readTime: "8 min read",
    date: "March 17, 2023",
  },
  {
    id: "story6",
    title: "Understanding Karma: Cause and Effect",
    excerpt: "Delve into the concept of karma and how our actions shape our destiny according to Hindu philosophy.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Philosophy",
    readTime: "6 min read",
    date: "August 5, 2023",
  },
  {
    id: "story7",
    title: "The Four Stages of Life (Ashramas)",
    excerpt: "Explore the traditional Hindu concept of the four stages of life and their relevance in modern times.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Lifestyle",
    readTime: "7 min read",
    date: "February 12, 2023",
  },
  {
    id: "story8",
    title: "The Significance of Mantras",
    excerpt: "Learn about the power of sacred sounds and how mantras can transform consciousness.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Spirituality",
    readTime: "5 min read",
    date: "September 20, 2023",
  },
]

const categories = [
  "All",
  "Mythology",
  "Deities",
  "Sacred Geography",
  "Spirituality",
  "Epics",
  "Philosophy",
  "Lifestyle",
]

export default function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Filter stories based on search term and category
  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || story.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Sacred Stories</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore ancient wisdom, spiritual insights, and timeless tales from Sanatan Dharma that illuminate the path to
          inner peace and self-realization.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search stories..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <span className="text-sm text-gray-500">Filter:</span>
          <Tabs defaultValue="All" className="w-full md:w-auto">
            <TabsList className="bg-muted/50">
              {categories.slice(0, 4).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs md:text-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
              <TabsTrigger value="more" className="text-xs md:text-sm relative group">
                More
                <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md p-2 hidden group-hover:block z-10 w-40">
                  {categories.slice(4).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredStories.map((story) => (
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
                      <span className="text-xs text-gray-500">
                        {story.readTime} • {story.date}
                      </span>
                      <span className="text-amber-600 text-sm font-medium hover:underline">Read More</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No stories found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("All")
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}

