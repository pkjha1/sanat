"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Upload, Play, Pause, Clock, Volume2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"

export default function ChapterEditorPage({
  params,
}: {
  params: { audiobookId: string; chapterId: string }
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [audioFile, setAudioFile] = useState<File | null>(null)

  // This would be fetched from the database in a real application
  const chapter = {
    id: params.chapterId,
    title: "Chapter 1: The Battlefield of Kurukshetra",
    section: "Section I: Arjuna's Dilemma",
    status: "completed",
    duration: "24:18",
    transcript: `
      Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager for battle?
      
      Sanjaya said: Having seen the army of the Pandavas arrayed for battle, King Duryodhana approached his teacher Drona and spoke these words:
      
      "O teacher, behold this mighty army of the sons of Pandu, arranged for battle by your talented pupil, the son of Drupada.
      
      Here are heroes, mighty archers, equal in battle to Bhima and Arjuna: Yuyudhana, Virata, and the great warrior Drupada;
      
      Dhrishtaketu, Chekitana, and the valiant king of Kashi; Purujit, Kuntibhoja, and the great man Shaibya;
      
      The heroic Yudhamanyu, the valiant Uttamaujas, the son of Subhadra, and the sons of Draupadi—all of them great warriors.
    `,
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would control the actual audio playback
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0])
    // In a real implementation, this would seek the audio to the specified position
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    // In a real implementation, this would adjust the audio volume
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0])
    }
  }

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
          <h1 className="text-2xl font-bold tracking-tight">Edit Audio Chapter</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Preview</Button>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Save className="mr-2 h-4 w-4" />
            Save Chapter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chapter Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chapter-title">Title</Label>
                <Input id="chapter-title" defaultValue={chapter.title} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select defaultValue="section-1">
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

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="completed">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input id="duration" defaultValue={chapter.duration} />
                </div>
                <p className="text-xs text-muted-foreground">Format: MM:SS or HH:MM:SS</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audio Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className="flex items-center justify-between">
                <Label htmlFor="normalize-audio">Normalize Audio</Label>
                <input
                  type="checkbox"
                  id="normalize-audio"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="remove-silence">Remove Silence</Label>
                <input
                  type="checkbox"
                  id="remove-silence"
                  className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Audio File</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                {audioFile ? (
                  <div className="text-center">
                    <p className="font-medium">{audioFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(audioFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">Drag and drop your audio file here or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported formats: MP3, WAV, M4A (Max size: 100MB)
                    </p>
                  </>
                )}
                <Input id="audio-upload" type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById("audio-upload")?.click()}
                >
                  {audioFile ? "Replace Audio File" : "Select Audio File"}
                </Button>
              </div>

              <div className="bg-gray-50 rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={togglePlay}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <span className="text-sm font-medium">
                      {formatTime(progress)} / {chapter.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-gray-500" />
                    <div className="w-24">
                      <Slider
                        value={[volume]}
                        max={100}
                        step={1}
                        onValueChange={handleVolumeChange}
                        className="h-1.5"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Slider value={[progress]} max={100} step={1} onValueChange={handleProgressChange} className="h-2" />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">00:00</span>
                  <span className="text-xs text-gray-500">{chapter.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transcript</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[300px] font-mono text-sm"
                placeholder="Enter the transcript of the audio..."
                defaultValue={chapter.transcript}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Import Transcript
              </Button>
              <Button variant="outline" size="sm">
                Generate from Audio (AI)
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

