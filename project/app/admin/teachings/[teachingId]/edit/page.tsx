"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, FileText, Headphones, Video, Save, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EditTeachingPage({ params }: { params: { teachingId: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [teaching, setTeaching] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would fetch the teaching data from your API
    // For this example, we'll use mock data
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
        thumbnail: "/placeholder.svg?height=300&width=500",
        mediaUrl: "#", // In a real app, this would be the actual URL
        tags: "meditation, peace, mindfulness",
        transcript:
          "Namaste, beloved seekers. Today we will explore the path to inner peace, a journey that begins within and transforms our entire existence...",
      })
      setIsLoading(false)
    }, 1000)
  }, [params.teachingId])

  const handleSave = () => {
    setIsSaving(true)
    // In a real app, this would save the teaching data to your API
    setTimeout(() => {
      setIsSaving(false)
      // Show success message or redirect
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/teachings" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Edit Teaching</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/teachings/${params.teachingId}/preview`}>
            <Button variant="outline">Preview</Button>
          </Link>
          <Button className="bg-amber-600 hover:bg-amber-700" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teaching Information</CardTitle>
          <CardDescription>Edit the details for this teaching</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" defaultValue={teaching.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="spiritual-growth">
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spiritual-growth">Spiritual Growth</SelectItem>
                  <SelectItem value="meditation">Meditation</SelectItem>
                  <SelectItem value="philosophy">Philosophy</SelectItem>
                  <SelectItem value="sacred-texts">Sacred Texts</SelectItem>
                  <SelectItem value="chants">Chants</SelectItem>
                  <SelectItem value="ceremonies">Ceremonies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" defaultValue={teaching.description} className="min-h-[120px]" />
          </div>

          <div className="space-y-2">
            <Label>Content Type</Label>
            <Tabs defaultValue={teaching.type} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="audio" className="flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  Audio
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Video
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-content">Text Content</Label>
                    <Textarea
                      id="text-content"
                      defaultValue={teaching.transcript}
                      className="min-h-[300px] font-mono text-sm"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="audio" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="audio-file">Audio File</Label>
                    <div className="border rounded-md p-4">
                      <div className="flex items-center gap-2">
                        <Headphones className="h-5 w-5 text-amber-500" />
                        <div className="flex-1">
                          <p className="font-medium">Current Audio File</p>
                          <audio controls className="w-full mt-2">
                            <source src={teaching.mediaUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          Replace Audio File
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="audio-duration">Duration</Label>
                      <Input id="audio-duration" defaultValue={teaching.duration} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audio-transcript">Transcript</Label>
                    <Textarea id="audio-transcript" defaultValue={teaching.transcript} className="min-h-[200px]" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="video" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-file">Video File</Label>
                    <div className="border rounded-md p-4">
                      <div className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-red-500" />
                        <p className="font-medium">Current Video File</p>
                      </div>
                      <div className="mt-2">
                        <video controls className="w-full rounded-md">
                          <source src={teaching.mediaUrl} type="video/mp4" />
                          Your browser does not support the video element.
                        </video>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          Replace Video File
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-thumbnail">Thumbnail</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-40 w-60 rounded-md border overflow-hidden">
                        <img
                          src={teaching.thumbnail || "/placeholder.svg"}
                          alt="Video thumbnail"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Button variant="outline" size="sm" className="mb-2">
                          Change Thumbnail
                        </Button>
                        <p className="text-xs text-muted-foreground">Recommended size: 1280x720 pixels.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="video-duration">Duration</Label>
                      <Input id="video-duration" defaultValue={teaching.duration} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-transcript">Transcript</Label>
                    <Textarea id="video-transcript" defaultValue={teaching.transcript} className="min-h-[200px]" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" defaultValue={teaching.tags} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="published">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="publish-date">Publish Date</Label>
              <Input id="publish-date" type="date" defaultValue={teaching.publishDate} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/teachings">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button className="bg-amber-600 hover:bg-amber-700" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

