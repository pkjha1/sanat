"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Share, Bookmark, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

const stories = [
  {
    id: "story1",
    title: "The Divine Lotus: Symbol of Purity",
    content: `
      <p>The lotus flower holds profound significance in Hindu mythology and spirituality. Rising from muddy waters yet remaining pristine, it symbolizes spiritual awakening and the journey from darkness to enlightenment.</p>
      
      <h2>Origins in Ancient Texts</h2>
      <p>References to the lotus appear throughout ancient Hindu texts. In the Rigveda, one of the oldest sacred texts, the lotus is mentioned as a symbol of divine beauty and purity. The Bhagavad Gita compares the ideal human to a lotus leaf that remains untouched by water despite living in it.</p>
      
      <p>The lotus is deeply connected to creation myths. According to one tradition, Lord Brahma, the creator, emerged from a lotus that grew from Lord Vishnu's navel as he rested on the cosmic waters. This lotus, born from Vishnu's navel, represents the universe's manifestation from divine consciousness.</p>
      
      <h2>Symbolism Across Deities</h2>
      <p>Many Hindu deities are associated with the lotus:</p>
      <ul>
        <li>Goddess Lakshmi, the deity of wealth and prosperity, stands on a lotus and holds lotuses in her hands, symbolizing spiritual wealth and purity.</li>
        <li>Lord Vishnu is often depicted with lotus eyes, signifying divine beauty and awareness.</li>
        <li>Goddess Saraswati, the deity of knowledge and arts, sits on a white lotus, representing enlightened knowledge arising from spiritual purity.</li>
      </ul>
      
      <h2>Spiritual Significance</h2>
      <p>The lotus's journey from mud to blossom parallels the spiritual journey. Just as the lotus grows in murky waters yet remains unsullied, the human soul can maintain its divine nature despite worldly attachments and challenges.</p>
      
      <p>In meditation practices, the lotus posture (Padmasana) is considered ideal for spiritual awakening. The seven chakras, or energy centers in the body, are often visualized as lotus flowers with varying numbers of petals, representing different aspects of consciousness.</p>
      
      <h2>Modern Relevance</h2>
      <p>Today, the lotus continues to inspire spiritual seekers. Its message of maintaining purity amidst life's challenges resonates across cultures. The lotus teaches us that our environment doesn't define us—we can choose to rise above circumstances while remaining rooted in our true nature.</p>
      
      <p>As Sadguru Riteshwarji Maharaj often says, "Be like the lotus—grow in the mud, but don't let the mud grow in you." This simple yet profound teaching reminds us that spiritual awakening is possible regardless of our circumstances.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200",
    category: "Mythology",
    readTime: "5 min read",
    date: "May 15, 2023",
    author: "Acharya Devendra",
    authorImage: "/placeholder.svg?height=100&width=100",
    relatedStories: ["story2", "story4", "story5"],
  },
  {
    id: "story2",
    title: "The Wisdom of Lord Ganesha",
    content: `<p>Explore the profound lessons from Lord Ganesha's stories and how they apply to modern life challenges.</p>`,
    image: "/placeholder.svg?height=600&width=1200",
    category: "Deities",
    readTime: "7 min read",
    date: "June 3, 2023",
    author: "Pandit Rajesh",
    authorImage: "/placeholder.svg?height=100&width=100",
    relatedStories: ["story1", "story3", "story6"],
  },
  {
    id: "story3",
    title: "Sacred Rivers of India",
    content: `<p>Learn about the seven sacred rivers of India and their spiritual significance in Hindu tradition.</p>`,
    image: "/placeholder.svg?height=600&width=1200",
    category: "Sacred Geography",
    readTime: "6 min read",
    date: "April 22, 2023",
    author: "Dr. Meena Sharma",
    authorImage: "/placeholder.svg?height=100&width=100",
    relatedStories: ["story1", "story5", "story7"],
  },
  {
    id: "story4",
    title: "The Symbolism of Om",
    content: `<p>Understand the profound meaning behind the sacred sound Om and its role in meditation practices.</p>`,
    image: "/placeholder.svg?height=600&width=1200",
    category: "Spirituality",
    readTime: "4 min read",
    date: "July 8, 2023",
    author: "Swami Anand",
    authorImage: "/placeholder.svg?height=100&width=100",
    relatedStories: ["story1", "story6", "story8"],
  },
  {
    id: "story5",
    title: "Lessons from the Ramayana",
    content: `<p>Explore timeless wisdom from the epic Ramayana and its relevance to modern family values and ethics.</p>`,
    image: "/placeholder.svg?height=600&width=1200",
    category: "Epics",
    readTime: "8 min read",
    date: "March 17, 2023",
    author: "Acharya Priya",
    authorImage: "/placeholder.svg?height=100&width=100",
    relatedStories: ["story3", "story7", "story8"],
  },
  {
    id: "story6",
    title: "Understanding Karma: Cause and Effect",
    content: `<p>Delve into the concept of karma and how our actions shape our destiny according to Hindu philosophy.</p>`,
    image: "/placeholder.svg?height=600&width=1200",
    category: "Philosophy",
    readTime: "6 min read",
    date: "August 5, 2023",
    author: "Guru Prakash",
    authorImage: "/placeholder.svg?height=100&width=100",
    relatedStories: ["story2", "story4", "story7"],
  },
  {
    id: "story7",
    title: "The Four Stages of Life (Ashramas)",
    content: `<p>Explore the traditional Hindu concept of the four stages of life and their relevance in modern times.</p>`,
    image: "/placeholder.svg?height=600&width=1200",
    category: "Lifestyle",
    readTime: "7 min read",
    date: "February 12, 2023",
    author: "Pandit Sharma",
    authorImage: "/placeholder.svg?height=100&width=100",
    relatedStories: ["story3", "story5", "story6"],
  },
  {
    id: "story8",
    title: "The Significance of Mantras",
    content: `<p>Learn about the power of sacred sounds and how mantras can transform consciousness.</p>`,
    image: "/placeholder.svg?height=600&width=1200",
    category: "Spirituality",
    readTime: "5 min read",
    date: "September 20, 2023",
    author: "Yogini Radha",
    authorImage: "/placeholder.svg?height=100&width=100",
    relatedStories: ["story4", "story5", "story6"],
  },
]

export default function StoryPage() {
  const params = useParams()
  const { toast } = useToast()
  const storyId = params.storyId as string
  const [story, setStory] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [relatedStories, setRelatedStories] = useState<any[]>([])

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true)
    setTimeout(() => {
      const foundStory = stories.find((s) => s.id === storyId)
      setStory(foundStory)

      if (foundStory?.relatedStories) {
        const related = stories.filter((s) => foundStory.relatedStories.includes(s.id))
        setRelatedStories(related)
      }

      setIsLoading(false)
    }, 500)
  }, [storyId])

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      toast({
        title: "Story liked",
        description: "This story has been added to your liked stories.",
        duration: 2000,
      })
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    if (!isBookmarked) {
      toast({
        title: "Story bookmarked",
        description: "This story has been saved to your bookmarks.",
        duration: 2000,
      })
    } else {
      toast({
        title: "Bookmark removed",
        description: "This story has been removed from your bookmarks.",
        duration: 2000,
      })
    }
  }

  const handleShare = () => {
    toast({
      title: "Share this story",
      description: `"${story?.title}" has been copied to your clipboard.`,
      duration: 2000,
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
        <p className="text-gray-600 mb-8">The story you're looking for doesn't exist or has been removed.</p>
        <Link href="/story">
          <Button>Back to Stories</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/story" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Stories
        </Link>

        {/* Story header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-amber-50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-amber-600 text-white text-sm px-3 py-1 rounded-full">{story.category}</span>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {story.date}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {story.readTime}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{story.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={story.authorImage || "/placeholder.svg"}
                  alt={story.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium">By {story.author}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                    isLiked ? "text-amber-600" : "text-gray-500"
                  }`}
                  aria-label="Like story"
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-amber-600" : ""}`} />
                </button>
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                    isBookmarked ? "text-amber-600" : "text-gray-500"
                  }`}
                  aria-label="Bookmark story"
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-amber-600" : ""}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                  aria-label="Share story"
                >
                  <Share className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Story image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img src={story.image || "/placeholder.svg"} alt={story.title} className="w-full h-auto" />
        </div>

        {/* Story content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-amber max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />

        {/* Related stories */}
        {relatedStories.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedStories.map((relatedStory) => (
                <Link key={relatedStory.id} href={`/story/${relatedStory.id}`}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedStory.image || "/placeholder.svg"}
                        alt={relatedStory.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                        {relatedStory.category}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{relatedStory.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{relatedStory.readTime}</span>
                        <span className="text-amber-600 text-sm font-medium hover:underline">Read More</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

