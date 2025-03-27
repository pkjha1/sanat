"use client"

import type React from "react"

import { useState } from "react"
import { Filter, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AudiobookCard } from "@/components/audiobook-card"

export default function AudiobooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  // This would typically come from an API or database
  const audiobooks = [
    {
      id: 1,
      title: "The Bhagavad Gita: A New Translation",
      narrator: "Rajesh Kumar",
      category: "Sacred Texts",
      description:
        "A modern translation of the ancient Hindu scripture, exploring the dialogue between Arjuna and Krishna.",
      duration: "6h 45m",
      chapters: 18,
      listeners: 1245,
      rating: 4.8,
      lastUpdated: "2023-01-15",
      cover: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 2,
      title: "Meditation Techniques for Modern Life",
      narrator: "Priya Sharma",
      category: "Meditation",
      description: "Learn practical meditation techniques that can be integrated into your busy modern lifestyle.",
      duration: "4h 20m",
      chapters: 12,
      listeners: 876,
      rating: 4.6,
      lastUpdated: "2022-11-20",
      cover: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 3,
      title: "Understanding Vedic Philosophy",
      narrator: "Dr. Amit Sharma",
      category: "Philosophy",
      description: "An in-depth exploration of Vedic philosophy and its relevance in contemporary society.",
      duration: "8h 15m",
      chapters: 8,
      listeners: 532,
      rating: 4.9,
      lastUpdated: "2023-03-05",
      cover: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 4,
      title: "The Art of Mindful Living",
      narrator: "Ananya Patel",
      category: "Lifestyle",
      description: "Discover how mindfulness can transform your daily life and bring greater peace and fulfillment.",
      duration: "5h 30m",
      chapters: 15,
      listeners: 543,
      rating: 4.5,
      lastUpdated: "2023-02-10",
      cover: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 5,
      title: "Sacred Temples of India",
      narrator: "Dr. Vikram Mehta",
      category: "Travel",
      description: "A spiritual journey through India's most sacred and historically significant temples.",
      duration: "9h 10m",
      chapters: 24,
      listeners: 321,
      rating: 4.7,
      lastUpdated: "2022-12-05",
      cover: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 6,
      title: "Yoga Sutras of Patanjali",
      narrator: "Sunita Desai",
      category: "Yoga",
      description: "A comprehensive guide to the foundational text of yoga philosophy with practical applications.",
      duration: "7h 25m",
      chapters: 16,
      listeners: 689,
      rating: 4.9,
      lastUpdated: "2023-04-12",
      cover: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 7,
      title: "Hindu Mythology: Stories of Gods and Goddesses",
      narrator: "Vikram Singh",
      category: "Mythology",
      description: "Explore the rich tapestry of Hindu mythology through captivating stories of deities and legends.",
      duration: "10h 15m",
      chapters: 22,
      listeners: 912,
      rating: 4.8,
      lastUpdated: "2023-02-28",
      cover: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 8,
      title: "Ayurveda: The Science of Self-Healing",
      narrator: "Dr. Meena Gupta",
      category: "Health",
      description:
        "Learn about the ancient Indian system of medicine and how to apply its principles for holistic health.",
      duration: "6h 50m",
      chapters: 14,
      listeners: 754,
      rating: 4.7,
      lastUpdated: "2023-01-30",
      cover: "/placeholder.svg?height=400&width=300",
    },
  ]

  const categories = [
    "All Categories",
    "Sacred Texts",
    "Meditation",
    "Philosophy",
    "Lifestyle",
    "Travel",
    "Yoga",
    "Mythology",
    "Health",
  ]

  // Filter audiobooks based on search query and category
  const filteredAudiobooks = audiobooks.filter((audiobook) => {
    const matchesSearch =
      searchQuery === "" ||
      audiobook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audiobook.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audiobook.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || audiobook.category.toLowerCase() === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Sort audiobooks based on selected sort option
  const sortedAudiobooks = [...filteredAudiobooks].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "popular":
        return b.listeners - a.listeners
      case "rating":
        return b.rating - a.rating
      case "duration-asc":
        return Number.parseInt(a.duration) - Number.parseInt(b.duration)
      case "duration-desc":
        return Number.parseInt(b.duration) - Number.parseInt(a.duration)
      default:
        return 0
    }
  })

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1)
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  // Handle pagination
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  // Toggle filters on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Audiobooks</h1>
          <p className="text-muted-foreground">Explore our collection of spiritual and educational audiobooks</p>
        </div>

        {/* Mobile Search and Filter Toggle */}
        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="search"
              placeholder="Search audiobooks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
            <Button type="button" size="icon" variant="ghost" onClick={() => setSearchQuery("")}>
              {searchQuery ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <Button variant="outline" className="w-full flex justify-between items-center" onClick={toggleFilters}>
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              {filteredAudiobooks.length} results
            </span>
          </Button>
        </div>

        {/* Mobile Filters (Conditional) */}
        {showFilters && (
          <div className="md:hidden bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filters</h3>
              <Button variant="ghost" size="sm" onClick={toggleFilters}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category === "All Categories" ? "all" : category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Sort by</label>
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="duration-asc">Duration (Shortest)</SelectItem>
                    <SelectItem value="duration-desc">Duration (Longest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={toggleFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        {/* Desktop Search and Filters */}
        <div className="hidden md:flex md:flex-col md:gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search audiobooks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
            <Button type="button" size="icon" variant="ghost" onClick={() => setSearchQuery("")}>
              {searchQuery ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category === "All Categories" ? "all" : category.toLowerCase().replace(/\s+/g, "-")}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="duration-asc">Duration (Shortest)</SelectItem>
                <SelectItem value="duration-desc">Duration (Longest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-end mb-4">
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {sortedAudiobooks.map((audiobook) => (
                <AudiobookCard key={audiobook.id} audiobook={audiobook} variant="grid" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="flex flex-col gap-4">
              {sortedAudiobooks.map((audiobook) => (
                <AudiobookCard key={audiobook.id} audiobook={audiobook} variant="list" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {sortedAudiobooks.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No audiobooks found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSortBy("newest")
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing <strong>{sortedAudiobooks.length}</strong> of <strong>{audiobooks.length}</strong> audiobooks
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={handlePrevPage}>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled={sortedAudiobooks.length < 8} onClick={handleNextPage}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

