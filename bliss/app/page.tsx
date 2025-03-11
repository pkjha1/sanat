"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowDown, BookOpen, Building, Calendar, Play, ChevronRight, Heart, Share, Bookmark } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { FeaturedStories } from "@/components/featured-stories"

export default function HomePage() {
  const { toast } = useToast()
  // State for section visibility
  const [activeSection, setActiveSection] = useState("hero")

  // Intersection observer hooks for each section
  const [heroRef, heroInView] = useInView({ threshold: 0.5 })
  const [welcomeRef, welcomeInView] = useInView({ threshold: 0.5 })
  const [offeringsRef, offeringsInView] = useInView({ threshold: 0.5 })
  const [teachingsRef, teachingsInView] = useInView({ threshold: 0.5 })

  // Update active section based on which section is in view
  useEffect(() => {
    if (heroInView) setActiveSection("hero")
    else if (welcomeInView) setActiveSection("welcome")
    else if (offeringsInView) setActiveSection("offerings")
    else if (teachingsInView) setActiveSection("teachings")
  }, [heroInView, welcomeInView, offeringsInView, teachingsInView])

  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Video player state
  const [playingVideo, setPlayingVideo] = useState(null)

  // Liked videos state
  const [likedVideos, setLikedVideos] = useState({})
  const [bookmarkedVideos, setBookmarkedVideos] = useState({})

  // Handle like action
  const handleLike = (videoId) => {
    setLikedVideos((prev) => {
      const newState = { ...prev, [videoId]: !prev[videoId] }

      // Show toast
      if (newState[videoId]) {
        toast({
          title: "Video liked",
          description: "This video has been added to your liked videos.",
          duration: 2000,
        })
      }

      return newState
    })
  }

  // Handle bookmark action
  const handleBookmark = (videoId) => {
    setBookmarkedVideos((prev) => {
      const newState = { ...prev, [videoId]: !prev[videoId] }

      // Show toast
      if (newState[videoId]) {
        toast({
          title: "Video bookmarked",
          description: "This video has been saved to your bookmarks.",
          duration: 2000,
        })
      } else {
        toast({
          title: "Bookmark removed",
          description: "This video has been removed from your bookmarks.",
          duration: 2000,
        })
      }

      return newState
    })
  }

  // Handle share action
  const handleShare = (videoTitle) => {
    // In a real app, this would use the Web Share API if available
    toast({
      title: "Share this video",
      description: `"${videoTitle}" has been copied to your clipboard.`,
      duration: 2000,
    })
  }

  // Videos data
  const videos = [
    {
      id: "video1",
      title: "The Path to Inner Peace",
      duration: "28 minutes",
      thumbnail: "/placeholder.svg?height=480&width=800",
      featured: true,
    },
    {
      id: "video2",
      title: "Meditation Techniques",
      duration: "15 minutes",
      thumbnail: "/placeholder.svg?height=240&width=400",
    },
    {
      id: "video3",
      title: "Understanding Bhagavad Gita",
      duration: "22 minutes",
      thumbnail: "/placeholder.svg?height=240&width=400",
    },
    {
      id: "video4",
      title: "The Law of Karma",
      duration: "18 minutes",
      thumbnail: "/placeholder.svg?height=240&width=400",
    },
  ]

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
    <div className="relative">
      {/* Floating Navigation - Desktop Only */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
          {["hero", "welcome", "offerings", "teachings"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section ? "bg-amber-600 scale-125" : "bg-gray-300 hover:bg-amber-400"
              }`}
              aria-label={`Scroll to ${section} section`}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPlayingVideo(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors z-10"
              onClick={() => setPlayingVideo(null)}
            >
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
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video controls */}
            <div className="bg-white p-4">
              <h3 className="text-lg font-bold mb-2">{videos.find((v) => v.id === playingVideo)?.title || "Video"}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(playingVideo)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${likedVideos[playingVideo] ? "fill-amber-600 text-amber-600" : ""}`} />
                    Like
                  </button>
                  <button
                    onClick={() => handleBookmark(playingVideo)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <Bookmark
                      className={`h-5 w-5 ${bookmarkedVideos[playingVideo] ? "fill-amber-600 text-amber-600" : ""}`}
                    />
                    Save
                  </button>
                  <button
                    onClick={() => handleShare(videos.find((v) => v.id === playingVideo)?.title || "Video")}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <Share className="h-5 w-5" />
                    Share
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {videos.find((v) => v.id === playingVideo)?.duration || ""}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Section 1: Discover Inner Bliss */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-amber-100 relative pt-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">Discover Inner Bliss</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Embark on a transformative journey with Sadguru Riteshwarji Maharaj and awaken true peace within. Through
            ancient Sanatan wisdom, guided meditations, and soulful discourses, experience harmony, clarity, and
            spiritual fulfillment.
          </p>
          <Button
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            onClick={() => scrollToSection("welcome")}
          >
            Begin Your Journey
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => scrollToSection("welcome")}
        >
          <ArrowDown className="h-8 w-8 text-amber-600 animate-bounce" />
        </motion.div>
      </section>

      {/* Section 2: Welcome to Bliss */}
      <section
        id="welcome"
        ref={welcomeRef}
        className="min-h-screen flex items-center justify-center bg-white relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: welcomeInView ? 1 : 0, y: welcomeInView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">Welcome to Bliss</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Step into a world of peace, wisdom, and spiritual awakening with Sadguru Riteshwarji Maharaj. Blissful Life
            is your gateway to Sanatan Dharma's timeless teachings, guiding you toward inner harmony, purpose, and true
            happiness. Begin your journey to a blissful life today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/about" passHref>
              <Button
                variant="outline"
                className="px-8 py-6 text-lg rounded-full border-amber-600 text-amber-600 hover:bg-amber-50 transition-all duration-300 hover:shadow-md active:scale-95"
              >
                Learn More
              </Button>
            </Link>
            <Link href="/auth/signup" passHref>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
                Join Us
              </Button>
            </Link>
          </div>
        </motion.div>
        <div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => scrollToSection("offerings")}
        >
          <ArrowDown className="h-8 w-8 text-amber-600 animate-bounce" />
        </div>
      </section>

      {/* Section 3: Explore Our Offerings */}
      <section
        id="offerings"
        ref={offeringsRef}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-amber-100 relative"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={offeringsInView ? "visible" : "hidden"}
          className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6"
          >
            Explore Our Offerings
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl"
          >
            Immerse yourself in the wisdom of Sanatan Dharma with Sadguru Riteshwarji Maharaj. Blissful Life brings you:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mb-10">
            {[
              {
                icon: BookOpen,
                title: "Books & Audiobooks",
                description: "Dive into sacred scriptures and spiritual teachings.",
              },
              {
                icon: Building,
                title: "Temples & Holy Places",
                description: "Discover the significance of revered spiritual sites.",
              },
              {
                icon: Calendar,
                title: "Hindu Calendar & Important Dates",
                description: "Stay connected with auspicious festivals and events.",
              },
            ].map((offering, index) => (
              <motion.div
                key={offering.title}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center cursor-pointer"
              >
                <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 transition-all duration-300">
                  <offering.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{offering.title}</h3>
                <p className="text-gray-600">{offering.description}</p>
                <Link
                  href={`/${offering.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                  className="mt-4 text-amber-600 hover:underline flex items-center"
                >
                  Explore <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p variants={itemVariants} className="text-lg text-gray-700 italic max-w-3xl">
            Experience divine knowledge, cultural heritage, and spiritual bliss—all in one place!
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href="/offerings" passHref className="mt-8 inline-block">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
                Explore All Offerings
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        <div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => scrollToSection("teachings")}
        >
          <ArrowDown className="h-8 w-8 text-amber-600 animate-bounce" />
        </div>
      </section>

      {/* Section 4: Guruji's Teachings */}
      <section
        id="teachings"
        ref={teachingsRef}
        className="min-h-screen flex items-center justify-center bg-white relative pt-8 pb-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={teachingsInView ? "visible" : "hidden"}
          className="container mx-auto px-4 md:px-6 flex flex-col items-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-center"
          >
            Guruji's Teachings
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl text-center"
          >
            Dive into the profound wisdom of Sadguru Riteshwarji Maharaj through his enlightening discourses. Explore 7
            transformative videos, each offering deep insights into Sanatan Dharma, spirituality, and mindful living.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-8"
          >
            {/* Featured Video - Larger */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="md:col-span-2 lg:col-span-2 relative rounded-xl overflow-hidden shadow-lg group"
            >
              <div
                className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all z-10 cursor-pointer"
                onClick={() => setPlayingVideo("video1")}
              >
                <div className="h-16 w-16 bg-amber-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-700 transition-colors transform group-hover:scale-110 duration-300">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>
              <img
                src="/placeholder.svg?height=480&width=800"
                alt="Featured discourse by Sadguru Riteshwarji Maharaj"
                className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white z-10 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                <h3 className="font-bold text-lg">The Path to Inner Peace</h3>
                <p className="text-sm text-gray-200">Featured Discourse • 28 minutes</p>
              </div>

              {/* Mobile-friendly action buttons */}
              <div className="absolute top-2 right-2 flex gap-2 z-20 md:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLike("video1")
                  }}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${likedVideos["video1"] ? "fill-amber-600 text-amber-600" : "text-gray-700"}`}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBookmark("video1")
                  }}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <Bookmark
                    className={`h-5 w-5 ${bookmarkedVideos["video1"] ? "fill-amber-600 text-amber-600" : "text-gray-700"}`}
                  />
                </button>
              </div>
            </motion.div>

            {/* Video 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative rounded-xl overflow-hidden shadow-md group"
            >
              <div
                className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all z-10 cursor-pointer"
                onClick={() => setPlayingVideo("video2")}
              >
                <div className="h-12 w-12 bg-amber-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-700 transition-colors transform group-hover:scale-110 duration-300">
                  <Play className="h-6 w-6 text-white ml-0.5" />
                </div>
              </div>
              <img
                src="/placeholder.svg?height=240&width=400"
                alt="Discourse on meditation"
                className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white z-10 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                <h3 className="font-bold">Meditation Techniques</h3>
                <p className="text-xs text-gray-200">15 minutes</p>
              </div>

              {/* Mobile-friendly action buttons */}
              <div className="absolute top-2 right-2 flex gap-2 z-20 md:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLike("video2")
                  }}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${likedVideos["video2"] ? "fill-amber-600 text-amber-600" : "text-gray-700"}`}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBookmark("video2")
                  }}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <Bookmark
                    className={`h-4 w-4 ${bookmarkedVideos["video2"] ? "fill-amber-600 text-amber-600" : "text-gray-700"}`}
                  />
                </button>
              </div>
            </motion.div>

            {/* Video 3 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative rounded-xl overflow-hidden shadow-md group"
            >
              <div
                className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all z-10 cursor-pointer"
                onClick={() => setPlayingVideo("video3")}
              >
                <div className="h-12 w-12 bg-amber-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-700 transition-colors transform group-hover:scale-110 duration-300">
                  <Play className="h-6 w-6 text-white ml-0.5" />
                </div>
              </div>
              <img
                src="/placeholder.svg?height=240&width=400"
                alt="Discourse on Bhagavad Gita"
                className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white z-10 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                <h3 className="font-bold">Understanding Bhagavad Gita</h3>
                <p className="text-xs text-gray-200">22 minutes</p>
              </div>

              {/* Mobile-friendly action buttons */}
              <div className="absolute top-2 right-2 flex gap-2 z-20 md:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLike("video3")
                  }}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${likedVideos["video3"] ? "fill-amber-600 text-amber-600" : "text-gray-700"}`}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBookmark("video3")
                  }}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <Bookmark
                    className={`h-4 w-4 ${bookmarkedVideos["video3"] ? "fill-amber-600 text-amber-600" : "text-gray-700"}`}
                  />
                </button>
              </div>
            </motion.div>

            {/* Video 4 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative rounded-xl overflow-hidden shadow-md group"
            >
              <div
                className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all z-10 cursor-pointer"
                onClick={() => setPlayingVideo("video4")}
              >
                <div className="h-12 w-12 bg-amber-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-700 transition-colors transform group-hover:scale-110 duration-300">
                  <Play className="h-6 w-6 text-white ml-0.5" />
                </div>
              </div>
              <img
                src="/placeholder.svg?height=240&width=400"
                alt="Discourse on karma"
                className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white z-10 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                <h3 className="font-bold">The Law of Karma</h3>
                <p className="text-xs text-gray-200">18 minutes</p>
              </div>

              {/* Mobile-friendly action buttons */}
              <div className="absolute top-2 right-2 flex gap-2 z-20 md:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLike("video4")
                  }}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${likedVideos["video4"] ? "fill-amber-600 text-amber-600" : "text-gray-700"}`}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBookmark("video4")
                  }}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <Bookmark
                    className={`h-4 w-4 ${bookmarkedVideos["video4"] ? "fill-amber-600 text-amber-600" : "text-gray-700"}`}
                  />
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center">
            <p className="text-lg text-gray-700 italic max-w-2xl text-center">
              Let Guruji's teachings illuminate your path to inner peace and self-realization.
            </p>
            <Link href="/teachings" passHref>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95">
                View All 7 Videos
              </Button>
            </Link>
          </motion.div>

          {/* Featured Stories Section */}
          <div className="w-full mt-16 mb-16">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 text-center"
            >
              Inspiring Stories
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-700 mb-10 leading-relaxed max-w-3xl text-center mx-auto"
            >
              Explore sacred tales and spiritual insights that illuminate the path of Sanatan Dharma
            </motion.p>
            <FeaturedStories />
          </div>

          {/* Footer - Completely rewritten with simpler structure */}
          <footer className="absolute bottom-0 w-full border-t py-4 bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-center text-sm text-muted-foreground">© 2023 Blissful Life. All rights reserved.</p>
                <nav className="flex items-center gap-4">
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-amber-600 transition-colors">
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-amber-600 transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-amber-600 transition-colors"
                  >
                    Privacy
                  </Link>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-amber-600 transition-colors">
                    Terms
                  </Link>
                </nav>
              </div>
            </div>
          </footer>
        </motion.div>
      </section>
    </div>
  )
}

