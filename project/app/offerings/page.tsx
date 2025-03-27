"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { BookOpen, Headphones, Video, MapPin, Calendar, Sparkles, ChevronRight, Search } from "lucide-react"

export default function OfferingsPage() {
  const [searchQuery, setSearchQuery] = useState("")

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

  const categories = [
    {
      id: "books",
      name: "Books & Scriptures",
      icon: BookOpen,
      description: "Explore sacred texts and spiritual literature from Sanatan Dharma.",
      items: [
        {
          title: "Bhagavad Gita with Commentary",
          image: "/placeholder.svg?height=200&width=300",
          link: "/books/bhagavad-gita",
        },
        { title: "Upanishads Collection", image: "/placeholder.svg?height=200&width=300", link: "/books/upanishads" },
        {
          title: "Ramayana: The Divine Journey",
          image: "/placeholder.svg?height=200&width=300",
          link: "/books/ramayana",
        },
        {
          title: "Vedic Wisdom for Modern Life",
          image: "/placeholder.svg?height=200&width=300",
          link: "/books/vedic-wisdom",
        },
      ],
    },
    {
      id: "audiobooks",
      name: "Audiobooks",
      icon: Headphones,
      description: "Listen to spiritual teachings narrated by Sadguru Riteshwarji Maharaj.",
      items: [
        {
          title: "Meditation Techniques",
          image: "/placeholder.svg?height=200&width=300",
          link: "/audiobooks/meditation-techniques",
        },
        {
          title: "The Art of Mindful Living",
          image: "/placeholder.svg?height=200&width=300",
          link: "/audiobooks/mindful-living",
        },
        { title: "Understanding Karma", image: "/placeholder.svg?height=200&width=300", link: "/audiobooks/karma" },
        {
          title: "Path to Inner Peace",
          image: "/placeholder.svg?height=200&width=300",
          link: "/audiobooks/inner-peace",
        },
      ],
    },
    {
      id: "teachings",
      name: "Video Teachings",
      icon: Video,
      description: "Watch enlightening discourses and spiritual guidance videos.",
      items: [
        {
          title: "Introduction to Meditation",
          image: "/placeholder.svg?height=200&width=300",
          link: "/teachings/intro-meditation",
        },
        { title: "Understanding Dharma", image: "/placeholder.svg?height=200&width=300", link: "/teachings/dharma" },
        { title: "The Science of Yoga", image: "/placeholder.svg?height=200&width=300", link: "/teachings/yoga" },
        {
          title: "Bhagavad Gita Discourse",
          image: "/placeholder.svg?height=200&width=300",
          link: "/teachings/bhagavad-gita",
        },
      ],
    },
    {
      id: "places",
      name: "Sacred Places",
      icon: MapPin,
      description: "Discover holy sites and temples with their spiritual significance.",
      items: [
        {
          title: "Varanasi: The Holy City",
          image: "/placeholder.svg?height=200&width=300",
          link: "/religious-places/varanasi",
        },
        {
          title: "Temples of South India",
          image: "/placeholder.svg?height=200&width=300",
          link: "/religious-places/south-india",
        },
        {
          title: "Himalayan Spiritual Sites",
          image: "/placeholder.svg?height=200&width=300",
          link: "/religious-places/himalayas",
        },
        {
          title: "Sacred Rivers of India",
          image: "/placeholder.svg?height=200&width=300",
          link: "/religious-places/rivers",
        },
      ],
    },
    {
      id: "calendar",
      name: "Hindu Calendar",
      icon: Calendar,
      description: "Stay updated with important festivals, rituals, and auspicious dates.",
      items: [
        {
          title: "Annual Festival Calendar",
          image: "/placeholder.svg?height=200&width=300",
          link: "/calendar/festivals",
        },
        {
          title: "Auspicious Dates",
          image: "/placeholder.svg?height=200&width=300",
          link: "/calendar/auspicious-dates",
        },
        { title: "Ekadashi Calendar", image: "/placeholder.svg?height=200&width=300", link: "/calendar/ekadashi" },
        { title: "Planetary Movements", image: "/placeholder.svg?height=200&width=300", link: "/calendar/planetary" },
      ],
    },
    {
      id: "events",
      name: "Spiritual Events",
      icon: Sparkles,
      description: "Join retreats, workshops, and community gatherings for spiritual growth.",
      items: [
        {
          title: "Meditation Retreats",
          image: "/placeholder.svg?height=200&width=300",
          link: "/events/meditation-retreats",
        },
        { title: "Yoga Workshops", image: "/placeholder.svg?height=200&width=300", link: "/events/yoga-workshops" },
        { title: "Satsang Schedule", image: "/placeholder.svg?height=200&width=300", link: "/events/satsang" },
        {
          title: "Community Celebrations",
          image: "/placeholder.svg?height=200&width=300",
          link: "/events/celebrations",
        },
      ],
    },
  ]

  // Filter categories based on search query
  const filteredCategories = searchQuery
    ? categories
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())),
        }))
        .filter((category) => category.items.length > 0)
    : categories

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-24 pb-16">
      <div className="container px-4 md:px-6">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-5xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Our Offerings</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of spiritual resources designed to guide you on your journey to inner
              peace and enlightenment.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search offerings..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
          </motion.div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <motion.div key={category.id} variants={itemVariants} className="mb-12">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                        <category.icon className="h-5 w-5 text-amber-600" />
                      </div>
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                    </div>
                    <p className="text-gray-600 mb-6">{category.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {category.items.map((item, index) => (
                        <Link key={index} href={item.link}>
                          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                            <div className="aspect-video w-full overflow-hidden">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium">{item.title}</h3>
                              <div className="mt-2 flex items-center text-amber-600 text-sm">
                                <span>Explore</span>
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No offerings found matching "{searchQuery}"</p>
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              )}
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <motion.div variants={itemVariants}>
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                      <category.icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                  </div>
                  <p className="text-gray-600 mb-6">{category.description}</p>

                  {category.items.filter(
                    (item) => !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()),
                  ).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {category.items
                        .filter((item) => !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((item, index) => (
                          <Link key={index} href={item.link}>
                            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                              <div className="aspect-video w-full overflow-hidden">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.title}
                                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                />
                              </div>
                              <CardContent className="p-4">
                                <h3 className="font-medium">{item.title}</h3>
                                <div className="mt-2 flex items-center text-amber-600 text-sm">
                                  <span>Explore</span>
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No offerings found matching "{searchQuery}"</p>
                      <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                        Clear Search
                      </Button>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <motion.div
            variants={itemVariants}
            className="bg-amber-50 rounded-xl p-6 border border-amber-100 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our collection is constantly growing. If you have specific spiritual resources you'd like to see, please
              let us know.
            </p>
            <Link href="/contact">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">Contact Us</Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

