"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { BookOpen, Video, MapPin, BookText, Headphones, DollarSign } from "lucide-react"

interface MobileNavigationProps {
  isLoggedIn: boolean
  userInitials?: string
  userImage?: string | null
}

export function MobileNavigation() {
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-40">
      <div className="flex items-center justify-around py-2">
        <a href="/" className="flex flex-col items-center p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="text-xs mt-1 text-gray-600">Home</span>
        </a>
        <a href="/books" className="flex flex-col items-center p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span className="text-xs mt-1 text-gray-600">Books</span>
        </a>
        <a href="/places" className="flex flex-col items-center p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="text-xs mt-1 text-gray-600">Places</span>
        </a>
        <a href="/teachings" className="flex flex-col items-center p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span className="text-xs mt-1 text-gray-600">Teachings</span>
        </a>
      </div>
    </div>
  )
}

