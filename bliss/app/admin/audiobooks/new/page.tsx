import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

export default function NewAudiobookPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/audiobooks" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Audiobook</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audiobook Information</CardTitle>
          <CardDescription>Enter the details for your new audiobook</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Audiobook Title</Label>
              <Input id="title" placeholder="Enter audiobook title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="narrator">Narrator</Label>
              <Input id="narrator" placeholder="Enter narrator name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sacred-texts">Sacred Texts</SelectItem>
                  <SelectItem value="meditation">Meditation</SelectItem>
                  <SelectItem value="philosophy">Philosophy</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                </SelectContent>
              </Select>
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
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="english">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="sanskrit">Sanskrit</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audio-quality">Audio Quality</Label>
              <Select defaultValue="high">
                <SelectTrigger id="audio-quality">
                  <SelectValue placeholder="Select audio quality" />
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
            <Label htmlFor="description">Audiobook Description</Label>
            <Textarea id="description" placeholder="Enter a description of the audiobook" className="min-h-[120px]" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cover">Cover Image</Label>
              <div className="flex items-center gap-4">
                <div className="h-40 w-28 rounded-md border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  <span className="text-sm text-gray-500">Cover Preview</span>
                </div>
                <div className="flex-1">
                  <Input id="cover" type="file" className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Upload a cover image for your audiobook. Recommended size: 600x900 pixels.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sample-audio">Sample Audio</Label>
              <div className="flex flex-col gap-2">
                <Input id="sample-audio" type="file" accept="audio/*" />
                <p className="text-xs text-muted-foreground">
                  Upload a short sample audio clip (max 2 minutes). Supported formats: MP3, WAV, M4A.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="release-date">Release Date</Label>
              <Input id="release-date" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total-duration">Total Duration (estimated)</Label>
              <div className="flex items-center gap-2">
                <Input id="hours" type="number" min="0" placeholder="Hours" />
                <Input id="minutes" type="number" min="0" max="59" placeholder="Minutes" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="explicit-content">Content Rating</Label>
              <Select defaultValue="general">
                <SelectTrigger id="explicit-content">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Audience</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                  <SelectItem value="teen">Teen</SelectItem>
                  <SelectItem value="mature">Mature</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/audiobooks">
            <Button variant="outline">Cancel</Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Link href="/admin/audiobooks/new/chapters">
              <Button className="bg-amber-600 hover:bg-amber-700">Continue to Chapters</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

