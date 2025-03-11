"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Filter, Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export default function BooksPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [searchQuery, setSearchQuery] = useState("")

  // This would be fetched from the database in a real application
  const books = [
    {
      id: 1,
      title: "The Bhagavad Gita: A New Translation",
      author: "Sadguru Riteshwarji Maharaj",
      category: "Sacred Texts",
      description: "A modern translation of the ancient Hindu scripture with commentary.",
      chapters: 18,
      cover: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 2,
      title: "Meditation Techniques for Modern Life",
      author: "Sadguru Riteshwarji Maharaj",
      category: "Meditation",
      description: "Practical meditation techniques for busy modern lifestyles.",
      chapters: 12,
      cover: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 3,
      title: "Understanding Vedic Philosophy",
      author: "Dr. Amit Sharma",
      category: "Philosophy",
      description: "An exploration of the core principles of Vedic philosophy.",
      chapters: 8,
      cover: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 4,
      title: "The Art of Mindful Living",
      author: "Sadguru Riteshwarji Maharaj",
      category: "Lifestyle",
      description: "Incorporating mindfulness into everyday activities for a more peaceful life.",
      chapters: 15,
      cover: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 5,
      title: "Sacred Temples of India",
      author: "Dr. Priya Patel",
      category: "Travel",
      description: "A spiritual journey through India's most sacred temples and holy sites.",
      chapters: 24,
      cover: "/placeholder.svg?height=300&width=200",
    },
    {
      id: 6,
      title: "Ayurvedic Wisdom for Health",
      author: "Dr. Rajesh Kumar",
      category: "Health",
      description: "Ancient Ayurvedic principles for modern health and wellness.",
      chapters: 16,
      cover: "/placeholder.svg?height=300&width=200",
    },
  ]

  const categories = ["All Categories", "Sacred Texts", "Meditation", "Philosophy", "Lifestyle", "Travel", "Health"]

  // Filter books based on selected category and search query
  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === "All Categories" || book.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Spiritual Library</h1>
          <p className="text-muted-foreground">Explore our collection of spiritual books and teachings</p>
        </div>

        {/* Floating Filter Section */}
        <div className="sticky top-16 z-10 bg-white rounded-lg shadow-md mb-6 transition-all duration-300">
          <div className="p-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-amber-600" />
              <h2 className="font-semibold">Filters</h2>
              {selectedCategory !== "All Categories" && (
                <Badge variant="outline" className="ml-2 bg-amber-50">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All Categories")} className="ml-1 hover:text-amber-800">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              aria-expanded={isFilterOpen}
              className="flex items-center gap-1"
            >
              {isFilterOpen ? (
                <>
                  <span>Hide</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Show</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category, index) => (
                        <Badge
                          key={index}
                          variant={selectedCategory === category ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedCategory === category ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-amber-50"
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Search</h3>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search books..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img src={book.cover || "/placeholder.svg"} alt={book.title} className="w-full h-64 object-cover" />
                    <div className="absolute top-2 right-2">
                      <span className="inline-block bg-white/90 text-xs font-medium rounded-full px-2 py-1">
                        {book.chapters} chapters
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                      <Badge className="bg-amber-600 hover:bg-amber-700">{book.category}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">{book.description}</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link href={`/books/${book.id}`} className="w-full">
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">Read Book</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-amber-100 p-3 mb-4">
                <Search className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">No books found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("All Categories")
                  setSearchQuery("")
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

