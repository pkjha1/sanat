"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Headphones, Video, Clock, Eye } from "lucide-react"

// Featured teachings data
const featuredTeachings = [
  {
    id: 1,
    title: "The Path to Inner Peace",
    type: "video",
    category: "Spiritual Growth",
    duration: "28:45",
    views: 1245,
    thumbnail: "/placeholder.svg?height=200&width=350",
    description:
      "In this profound discourse, Guruji explains the essential steps to finding inner peace in our chaotic world.",
  },
  {
    id: 7,
    title: "Yoga for Beginners",
    type: "video",
    category: "Yoga",
    duration: "35:20",
    views: 1876,
    thumbnail: "/placeholder.svg?height=200&width=350",
    description: "A gentle introduction to yoga postures and breathing techniques for beginners.",
  },
  {
    id: 3,
    title: "Meditation Techniques",
    type: "audio",
    category: "Meditation",
    duration: "15:20",
    views: 543,
    thumbnail: null,
    description: "Learn practical meditation techniques to quiet the mind and connect with your inner self.",
  },
]

export function FeaturedTeachings() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "audio":
        return <Headphones className="h-5 w-5 text-amber-500" />
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  // Get type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "text":
        return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
      case "audio":
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
      case "video":
        return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-12 px-4"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Featured Teachings</h2>
            <p className="text-muted-foreground">Explore Guruji's most popular wisdom</p>
          </div>
          <Link href="/teachings">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Teachings
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTeachings.map((teaching, index) => (
            <motion.div
              key={teaching.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Link href={`/teachings/${teaching.id}`}>
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300 group">
                  {teaching.type === "video" && teaching.thumbnail && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={teaching.thumbnail || "/placeholder.svg"}
                        alt={teaching.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button className="rounded-full h-12 w-12 bg-amber-600/90 hover:bg-amber-700">
                          <Video className="h-5 w-5 text-white" />
                        </Button>
                      </div>
                      {teaching.duration && (
                        <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-0">
                          <Clock className="h-3 w-3 mr-1" />
                          {teaching.duration}
                        </Badge>
                      )}
                    </div>
                  )}
                  {teaching.type === "audio" && (
                    <div className="h-48 bg-gradient-to-r from-amber-100 to-amber-50 flex items-center justify-center">
                      <div className="bg-amber-500/10 p-6 rounded-full">
                        <Headphones className="h-16 w-16 text-amber-500" />
                      </div>
                    </div>
                  )}
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={getTypeColor(teaching.type)}>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(teaching.type)}
                          <span className="capitalize">{teaching.type}</span>
                        </div>
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="h-3 w-3 mr-1" />
                        {teaching.views.toLocaleString()}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-amber-600 transition-colors">
                      {teaching.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">{teaching.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                      {teaching.category}
                    </Badge>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

