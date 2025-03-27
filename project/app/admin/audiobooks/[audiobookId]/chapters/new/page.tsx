import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Upload, Mic2 } from "lucide-react"

export default function NewChapterPage({ params }: { params: { audiobookId: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/audiobooks/${params.audiobookId}/chapters`}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Add New Audio Chapter</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chapter Information</CardTitle>
          <CardDescription>Enter the details for your new audio chapter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="chapter-title">Chapter Title</Label>
              <Input id="chapter-title" placeholder="Enter chapter title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Select>
                <SelectTrigger id="section">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="introduction">Introduction</SelectItem>
                  <SelectItem value="section-1">Section I: Arjuna's Dilemma</SelectItem>
                  <SelectItem value="section-2">Section II: The Path of Action</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Audio Source</Label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="border rounded-md p-4 cursor-pointer hover:border-amber-500 hover:bg-amber-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Audio File
                  </h3>
                  <input
                    type="radio"
                    name="audio-source"
                    value="upload"
                    defaultChecked
                    className="h-4 w-4 text-amber-600"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload a pre-recorded audio file in MP3, WAV, or M4A format.
                </p>
              </div>

              <div className="border rounded-md p-4 cursor-pointer hover:border-amber-500 hover:bg-amber-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Mic2 className="h-4 w-4" />
                    Record Audio
                  </h3>
                  <input type="radio" name="audio-source" value="record" className="h-4 w-4 text-amber-600" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Record audio directly in the browser using your microphone.
                </p>
              </div>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm font-medium">Drag and drop your audio file here or click to browse</p>
            <p className="text-xs text-muted-foreground mt-1">Supported formats: MP3, WAV, M4A (Max size: 100MB)</p>
            <Button variant="outline" className="mt-4">
              Select Audio File
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

            <div className="space-y-2">
              <Label htmlFor="chapter-summary">Chapter Summary (Optional)</Label>
              <Input id="chapter-summary" placeholder="Brief description of this chapter" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Audio Processing Options</Label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="normalize-audio"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <Label htmlFor="normalize-audio" className="text-sm font-normal">
                  Normalize Audio
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remove-silence"
                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <Label htmlFor="remove-silence" className="text-sm font-normal">
                  Remove Silence
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enhance-voice"
                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <Label htmlFor="enhance-voice" className="text-sm font-normal">
                  Enhance Voice
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={`/admin/audiobooks/${params.audiobookId}/chapters`}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Link href={`/admin/audiobooks/${params.audiobookId}/chapters/new-chapter-id`}>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Save className="mr-2 h-4 w-4" />
              Create Chapter & Continue to Editor
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

