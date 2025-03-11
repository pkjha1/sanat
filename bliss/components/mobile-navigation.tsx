"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, MessageCircle, BookOpen, Video, MapPin, BookText, Headphones, DollarSign, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface MobileNavigationProps {
  isLoggedIn: boolean
}

export function MobileNavigation({ isLoggedIn }: MobileNavigationProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Mock search data - in a real app, this would come from an API
  const mockSearchData = [
    { id: 1, title: "Introduction to Meditation", type: "teaching", url: "/teachings/meditation" },
    { id: 2, title: "Bhagavad Gita Explained", type: "book", url: "/books/bhagavad-gita" },
    { id: 3, title: "Varanasi: The Holy City", type: "place", url: "/religious-places/varanasi" },
    { id: 4, title: "Karma Yoga", type: "teaching", url: "/teachings/karma-yoga" },
    { id: 5, title: "Temples of South India", type: "place", url: "/religious-places/south-india" },
    { id: 6, title: "Meditation Techniques for Beginners", type: "teaching", url: "/teachings/meditation-beginners" },
  ]

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const results = mockSearchData.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length > 2) {
      handleSearch()
    } else {
      setSearchResults([])
    }
  }

  // Navigation items for the popup modal
  const navItems = [
    { name: "Books", href: "/books", icon: BookOpen, color: "bg-blue-100", iconColor: "text-blue-600" },
    { name: "Teachings", href: "/teachings", icon: Video, color: "bg-amber-100", iconColor: "text-amber-600" },
    { name: "Audiobooks", href: "/audiobooks", icon: Headphones, color: "bg-purple-100", iconColor: "text-purple-600" },
    { name: "Stories", href: "/story", icon: BookText, color: "bg-green-100", iconColor: "text-green-600" },
    { name: "Places", href: "/religious-places", icon: MapPin, color: "bg-red-100", iconColor: "text-red-600" },
    { name: "Donate", href: "/donate", icon: DollarSign, color: "bg-pink-100", iconColor: "text-pink-600" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 md:hidden">
      <div className="flex items-center justify-around h-16">
        {/* Search Button */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-amber-500">
              <Search className="h-5 w-5" />
              <span className="text-xs mt-1">Search</span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md p-4">
            <div className="space-y-4">
              <h2 className="font-medium">Search</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for books, teachings, places..."
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  autoFocus
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>

              {/* Search Results */}
              <div className="mt-4">
                {isSearching ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-amber-600"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Search Results</h3>
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        href={result.url}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 mr-3">
                            {result.type === "book" && (
                              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-blue-600"
                                >
                                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                              </div>
                            )}
                            {result.type === "teaching" && (
                              <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-amber-600"
                                >
                                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                              </div>
                            )}
                            {result.type === "place" && (
                              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-green-600"
                                >
                                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                  <line x1="3" y1="9" x2="21" y2="9"></line>
                                  <line x1="9" y1="21" x2="9" y2="9"></line>
                                </svg>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">{result.title}</h4>
                            <p className="text-xs text-gray-500 capitalize">{result.type}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : searchQuery.length > 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No results found for "{searchQuery}"</p>
                    <p className="text-sm text-gray-400 mt-2">Try different keywords or browse our categories</p>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    <p>Try searching for "meditation", "temples", or "bhagavad gita"</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setSearchQuery("meditation")
                          handleSearch()
                        }}
                        className="px-3 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                      >
                        meditation
                      </button>
                      <button
                        onClick={() => {
                          setSearchQuery("temples")
                          handleSearch()
                        }}
                        className="px-3 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                      >
                        temples
                      </button>
                      <button
                        onClick={() => {
                          setSearchQuery("bhagavad gita")
                          handleSearch()
                        }}
                        className="px-3 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                      >
                        bhagavad gita
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Menu Modal */}
        <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DialogTrigger asChild>
            <button
              className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-amber-500"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="text-xs mt-1">Menu</span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md p-0 gap-0 bg-transparent border-none shadow-none">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Quick Navigation</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-xl transition-all",
                        isActive ? "ring-2 ring-amber-500 ring-opacity-50" : "",
                      )}
                    >
                      <div className={cn("h-12 w-12 rounded-full flex items-center justify-center mb-2", item.color)}>
                        <Icon className={cn("h-6 w-6", item.iconColor)} />
                      </div>
                      <span className="text-xs font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Chat Button */}
        <Link href="/chat" className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center text-gray-500 hover:text-amber-500">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs mt-1">Chat</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

