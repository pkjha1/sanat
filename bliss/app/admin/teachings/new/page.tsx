"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, FileText, Headphones, Video, Upload, X, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { put } from "@vercel/blob"

export default function NewTeachingPage() {
  const [contentType, setContentType] = useState<"text" | "audio" | "video">("text")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)

  const handleContentTypeChange = (value: string) => {
    setContentType(value as "text" | "audio" | "video")
  }

  const handleMediaFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setMediaFile(file)

      // Upload to Vercel Blob
      try {
        setIsUploading(true)
        setUploadProgress(0)

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 95) {
              clearInterval(progressInterval)
              return prev
            }
            return prev + 5
          })
        }, 300)

        // Upload to Vercel Blob
        const response = await put(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload-media",
        })

        clearInterval(progressInterval)
        setUploadProgress(100)
        setMediaUrl(response.url)
        setIsUploading(false)
      } catch (error) {
        console.error("Error uploading file:", error)
        setIsUploading(false)
        setUploadProgress(0)
      }
    }
  }

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setThumbnailFile(file)

      try {
        // Upload to Vercel Blob
        const response = await put(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload-thumbnail",
        })

        setThumbnailUrl(response.url)
      } catch (error) {
        console.error("Error uploading thumbnail:", error)
      }
    }
  }

  const removeMediaFile = () => {
    setMediaFile(null)
    setMediaUrl(null)
    setUploadProgress(0)
  }

  const removeThumbnail = () => {
    setThumbnailFile(null)
    setThumbnailUrl(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/teachings" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Add New Teaching</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teaching Information</CardTitle>
          <CardDescription>Enter the details for Guruji's new teaching</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter teaching title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
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
            <Textarea id="description" placeholder="Enter a description of the teaching" className="min-h-[120px]" />
          </div>

          <div className="space-y-2">
            <Label>Content Type</Label>
            <Tabs defaultValue="text" onValueChange={handleContentTypeChange} className="w-full">
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
                      placeholder="Enter the teaching content..."
                      className="min-h-[300px] font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featured-image">Featured Image (Optional)</Label>
                    <div className="flex items-center gap-4">
                      {thumbnailUrl ? (
                        <div className="relative h-40 w-60 rounded-md border overflow-hidden">
                          <img
                            src={thumbnailUrl || "/placeholder.svg"}
                            alt="Featured image preview"
                            className="h-full w-full object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                            onClick={removeThumbnail}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="h-40 w-60 rounded-md border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                          <span className="text-sm text-gray-500">Image Preview</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <Input
                          id="featured-image"
                          type="file"
                          accept="image/*"
                          className="mb-2"
                          onChange={handleThumbnailChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Upload a featured image. Recommended size: 1200x630 pixels.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="audio" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="audio-file">Audio File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
                      {mediaFile && contentType === "audio" ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Headphones className="h-5 w-5 text-amber-500" />
                              <div>
                                <p className="font-medium">{mediaFile.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(mediaFile.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={removeMediaFile}
                              disabled={isUploading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {isUploading ? (
                            <div className="space-y-2">
                              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-amber-500 rounded-full"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Uploading...</span>
                                <span>{uploadProgress}%</span>
                              </div>
                            </div>
                          ) : mediaUrl ? (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <span>Upload complete!</span>
                              <audio controls className="w-full">
                                <source src={mediaUrl} type={mediaFile.type} />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm font-medium">Drag and drop your audio file here or click to browse</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Supported formats: MP3, WAV, M4A (Max size: 100MB)
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => document.getElementById("audio-upload")?.click()}
                          >
                            Select Audio File
                          </Button>
                          <Input
                            id="audio-upload"
                            type="file"
                            accept="audio/*"
                            className="hidden"
                            onChange={handleMediaFileChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="audio-duration">Duration</Label>
                      <Input id="audio-duration" placeholder="HH:MM:SS" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="audio-quality">Audio Quality</Label>
                      <Select defaultValue="high">
                        <SelectTrigger id="audio-quality">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (128 kbps)</SelectItem>
                          <SelectItem value="high">High (256 kbps)</SelectItem>
                          <SelectItem value="premium">Premium (320 kbps)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audio-transcript">Transcript (Optional)</Label>
                    <Textarea
                      id="audio-transcript"
                      placeholder="Enter the transcript of the audio..."
                      className="min-h-[200px]"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="video" className="pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-file">Video File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
                      {mediaFile && contentType === "video" ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Video className="h-5 w-5 text-red-500" />
                              <div>
                                <p className="font-medium">{mediaFile.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(mediaFile.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={removeMediaFile}
                              disabled={isUploading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {isUploading ? (
                            <div className="space-y-2">
                              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-red-500 rounded-full"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Uploading...</span>
                                <span>{uploadProgress}%</span>
                              </div>
                            </div>
                          ) : mediaUrl ? (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-green-600">
                                <span>Upload complete!</span>
                              </div>
                              <video controls className="w-full rounded-md">
                                <source src={mediaUrl} type={mediaFile.type} />
                                Your browser does not support the video element.
                              </video>
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm font-medium">Drag and drop your video file here or click to browse</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Supported formats: MP4, WebM, MOV (Max size: 500MB)
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => document.getElementById("video-upload")?.click()}
                          >
                            Select Video File
                          </Button>
                          <Input
                            id="video-upload"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleMediaFileChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-thumbnail">Thumbnail</Label>
                    <div className="flex items-center gap-4">
                      {thumbnailUrl ? (
                        <div className="relative h-40 w-60 rounded-md border overflow-hidden">
                          <img
                            src={thumbnailUrl || "/placeholder.svg"}
                            alt="Thumbnail preview"
                            className="h-full w-full object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                            onClick={removeThumbnail}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="h-40 w-60 rounded-md border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                          <span className="text-sm text-gray-500">Thumbnail Preview</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <Input
                          id="video-thumbnail"
                          type="file"
                          accept="image/*"
                          className="mb-2"
                          onChange={handleThumbnailChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Upload a thumbnail for your video. Recommended size: 1280x720 pixels.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="video-duration">Duration</Label>
                      <Input id="video-duration" placeholder="HH:MM:SS" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="video-quality">Video Quality</Label>
                      <Select defaultValue="hd">
                        <SelectTrigger id="video-quality">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sd">SD (480p)</SelectItem>
                          <SelectItem value="hd">HD (720p)</SelectItem>
                          <SelectItem value="fullhd">Full HD (1080p)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-transcript">Transcript (Optional)</Label>
                    <Textarea
                      id="video-transcript"
                      placeholder="Enter the transcript of the video..."
                      className="min-h-[200px]"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="Enter tags separated by commas" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="draft">
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
              <Input id="publish-date" type="date" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/teachings">
            <Button variant="outline">Cancel</Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button className="bg-amber-600 hover:bg-amber-700" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Publish Teaching"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

