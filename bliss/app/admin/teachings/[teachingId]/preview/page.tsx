"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Calendar, Eye, Clock, FileText, Headphones, Video } from "lucide-react"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TeachingPreviewPage({ params }: { params: { teachingId: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [teaching, setTeaching] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would fetch the teaching data from your API
    setTimeout(() => {
      setTeaching({
        id: params.teachingId,
        title: "The Path to Inner Peace",
        type: "video",
        category: "Spiritual Growth",
        status: "Published",
        description:
          "In this profound discourse, Guruji explains the essential steps to finding inner peace in our chaotic world. Learn practical techniques to quiet the mind and connect with your true self.",
        duration: "28:45",
        views: 1245,
        publishDate: "2023-01-15",
        thumbnail: "/placeholder.svg?height=600&width=1000",
        mediaUrl: "#", // In a real app, this would be the actual URL
        tags: ["meditation", "peace", "mindfulness"],
        transcript: `
          Namaste, beloved seekers.
          
          Today we will explore the path to inner peace, a journey that begins within and transforms our entire existence.
          
          In our modern world, we are constantly bombarded with distractions, worries, and anxieties. The mind is pulled in countless directions, leaving us feeling scattered and disconnected from our true nature.
          
          But peace is not something to be found outside of ourselves. It is our natural state, waiting to be rediscovered beneath the layers of mental noise and emotional turbulence.
          
          Let us begin with the breath, the sacred bridge between body and mind. Take a deep breath in... and slowly release. Feel how this simple act can immediately center your awareness in the present moment.
          
          The first step on the path to inner peace is acceptance. We must accept what is, without resistance. Resistance creates tension, and tension is the enemy of peace. When we accept the present moment completely, we align ourselves with the flow of life.
          
          The second step is mindfulness. By cultivating awareness of our thoughts, emotions, and sensations without judgment, we create space between ourselves and our experiences. In this space, we find freedom.
          
          The third step is compassion. We must extend kindness not only to others but also to ourselves. Self-criticism and harsh judgment create inner conflict. Through self-compassion, we heal the divisions within.
          
          The fourth step is surrender. We must let go of our need to control everything. Trust in the divine order of the universe. When we surrender our limited perspective, we open ourselves to infinite wisdom.
          
          Practice these steps daily, and you will discover that peace is not a distant goal but your very essence. It is who you are beneath the stories, identities, and conditioning.
          
          Remember, dear ones, that inner peace is not the absence of challenges but the presence of equanimity amidst life's ever-changing circumstances.
          
          May you walk the path of peace with courage and devotion.
          
          Om Shanti, Shanti, Shanti.
        `,
      })
      setIsLoading(false)
    }, 1000)
  }, [params.teachingId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    )
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/teachings" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Teaching Preview</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/teachings/${params.teachingId}/edit`}>
            <Button variant="outline" className="gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button className="bg-amber-600 hover:bg-amber-700">Publish</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">{teaching.title}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  {getTypeIcon(teaching.type)}
                  <span className="capitalize">{teaching.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{teaching.publishDate}</span>
                </div>
                {teaching.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{teaching.duration}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{teaching.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
              {teaching.category}
            </Badge>
          </div>

          <div className="mb-8">
            <p className="text-lg">{teaching.description}</p>
          </div>

          {teaching.type === "video" && (
            <div className="mb-8">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={teaching.thumbnail || "/placeholder.svg"}
                  alt={teaching.title}
                  className="w-full h-full object-cover"
                />
                <div className="relative -mt-[300px] flex items-center justify-center">
                  <Button className="rounded-full h-16 w-16 bg-amber-600 hover:bg-amber-700">
                    <Video className="h-6 w-6 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {teaching.type === "audio" && (
            <div className="mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <audio controls className="w-full">
                  <source src={teaching.mediaUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Transcript</h2>
            <div className="prose max-w-none">
              {teaching.transcript.split("\n\n").map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {teaching.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="bg-gray-100">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

