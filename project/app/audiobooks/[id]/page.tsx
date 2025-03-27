"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function AudiobookPage({ params }: { params: { audiobookId: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(1468) // 24:28 in seconds
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false) // Added bookmark state
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false) // Added transcript visibility state
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // This would be fetched from the database in a real application
  const audiobook = {
    id: params.audiobookId,
    title: "The Bhagavad Gita: A New Translation",
    narrator: "Rajesh Kumar",
    cover: "/placeholder.svg?height=300&width=200",
    audioSrc: "", // In a real app, this would be the audio file URL
    sections: [
      {
        id: 1,
        title: "Introduction",
        chapters: [
          { id: 1, title: "Preface", duration: "5:23" },
          { id: 2, title: "About This Translation", duration: "8:15" },
          { id: 3, title: "Historical Context", duration: "12:40" },
        ],
      },
      {
        id: 2,
        title: "Section I: Arjuna's Dilemma",
        chapters: [
          { id: 4, title: "Chapter 1: The Battlefield of Kurukshetra", duration: "24:18", current: true },
          { id: 5, title: "Chapter 2: The Yoga of Knowledge", duration: "28:45" },
        ],
      },
      {
        id: 3,
        title: "Section II: The Path of Action",
        chapters: [
          { id: 6, title: "Chapter 3: Karma Yoga", duration: "22:10" },
          { id: 7, title: "Chapter 4: The Path of Knowledge and Action", duration: "26:35" },
          { id: 8, title: "Chapter 5: The Path of Renunciation", duration: "0:00" },
        ],
      },
    ],
  }

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(audiobook.audioSrc)
    audioRef.current.playbackRate = playbackRate
    audioRef.current.volume = volume / 100

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [audiobook.audioSrc, playbackRate, volume])

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    } else {
      audioRef.current.play()
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime)
        }
      }, 1000)
    }

    setIsPlaying(!isPlaying)
  }

  // Handle mute/unmute
  const toggleMute = () => {
    if (!audioRef.current) return

    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Handle progress change
  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return

    const newTime = value[0]
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return

    const newVolume = value[0]
    audioRef.current.volume = newVolume / 100
    audioRef.current.muted = newVolume === 0
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  // Handle playback rate change
  const changePlaybackRate = (rate: number) => {
    if (!audioRef.current) return

    audioRef.current.playbackRate = rate
    setPlaybackRate(rate)
  }

  // Handle bookmark toggle
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)

    if (!isBookmarked) {
      // In a real app, this would save the bookmark to user's profile/localStorage
      console.log(`Bookmarked: Chapter 1 at ${formatTime(currentTime)}`)
    } else {
      // In a real app, this would remove the bookmark
      console.log("Bookmark removed")
    }
  }

  // Format time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Navigate to previous chapter
  const goToPreviousChapter = () => {
    // In a real app, this would navigate to the previous chapter
    console.log("Navigate to previous chapter")
  }

  // Navigate to next chapter
  const goToNextChapter = () => {
    // In a real app, this would navigate to the next chapter
    console.log("Navigate to next chapter")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Table of Contents (Desktop) - Now Sticky */}
      <aside className="hidden md:block w-64 border-r bg-white sticky top-0 h-screen overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="font-bold text-lg">{audiobook.title}</h2>
            <p className="text-sm text-muted-foreground">Narrated by {audiobook.narrator}</p>
          </div>

          <div className="space-y-4">
            {audiobook.sections.map((section) => (
              <div key={section.id}>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">{section.title}</h3>
                <ul className="space-y-1">
                  {section.chapters.map((chapter) => (
                    <li key={chapter.id}>
                      <Link
                        href={`/audiobooks/${audiobook.id}/chapters/${chapter.id}`}
                        className={`flex items-center justify-between text-sm py-1 px-2 rounded-md ${
                          chapter.current ? "bg-amber-50 text-amber-700" : "hover:bg-gray-100"
                        }`}
                      >
                        <span className="truncate">{chapter.title}</span>
                        <span className="text-xs text-muted-foreground">{chapter.duration}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="sticky top-0 z-10 bg-white border-b h-16 flex items-center px-4 md:px-6">
          <div className="flex items-center gap-4 w-full">
            {/* Mobile Menu */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="font-bold text-lg">Contents</h2>
                    <SheetClose asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </SheetClose>
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    <div className="mb-6">
                      <h2 className="font-bold text-lg">{audiobook.title}</h2>
                      <p className="text-sm text-muted-foreground">Narrated by {audiobook.narrator}</p>
                    </div>
                    <div className="space-y-4">
                      {audiobook.sections.map((section) => (
                        <div key={section.id}>
                          <h3 className="font-medium text-sm text-muted-foreground mb-2">{section.title}</h3>
                          <ul className="space-y-1">
                            {section.chapters.map((chapter) => (
                              <li key={chapter.id}>
                                <Link
                                  href={`/audiobooks/${audiobook.id}/chapters/${chapter.id}`}
                                  className={`flex items-center justify-between text-sm py-2 px-2 rounded-md ${
                                    chapter.current ? "bg-amber-50 text-amber-700" : "hover:bg-gray-100"
                                  }`}
                                  onClick={() => setIsSheetOpen(false)}
                                >
                                  <span className="truncate">{chapter.title}</span>
                                  <span className="text-xs text-muted-foreground">{chapter.duration}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex-1 truncate">
              <h1 className="text-lg font-medium truncate">Chapter 1: The Battlefield of Kurukshetra</h1>
            </div>

            <Button variant="outline" size="sm" className="gap-1 hidden md:flex" onClick={toggleBookmark}>
              {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-amber-600" /> : <Bookmark className="h-4 w-4" />}
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>
        </header>

        {/* Audiobook Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-3xl mx-auto w-full">
          <div className="flex flex-col items-center mb-8">
            <img
              src={audiobook.cover || "/placeholder.svg"}
              alt={audiobook.title}
              className="w-36 h-52 md:w-48 md:h-72 object-cover rounded-md shadow-md mb-4"
            />
            <h2 className="text-xl font-bold text-center">{audiobook.title}</h2>
            <p className="text-muted-foreground text-center">Narrated by {audiobook.narrator}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full" onClick={goToPreviousChapter}>
                <SkipBack className="h-5 w-5" />
                <span className="sr-only">Previous Chapter</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 w-14 md:h-16 md:w-16 p-0 rounded-full bg-amber-50 border-amber-200 hover:bg-amber-100"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-7 w-7 md:h-8 md:w-8 text-amber-600" />
                ) : (
                  <Play className="h-7 w-7 md:h-8 md:w-8 text-amber-600 ml-1" />
                )}
                <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full" onClick={goToNextChapter}>
                <SkipForward className="h-5 w-5" />
                <span className="sr-only">Next Chapter</span>
              </Button>
            </div>

            <div className="space-y-2">
              <div className="w-full">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={handleProgressChange}
                  className="h-2"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
                </Button>
                <div className="w-24">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="h-1.5"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <span className="text-sm whitespace-nowrap">Speed:</span>
                <div className="flex gap-1">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <Button
                      key={rate}
                      variant={playbackRate === rate ? "default" : "outline"}
                      size="sm"
                      className={`h-7 px-2 text-xs ${playbackRate === rate ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                      onClick={() => changePlaybackRate(rate)}
                    >
                      {rate}x
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="my-0">Transcript</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTranscriptVisible(!isTranscriptVisible)}
                className="gap-1"
              >
                {isTranscriptVisible ? "Hide Transcript" : "Show Transcript"}
              </Button>
            </div>

            {isTranscriptVisible && (
              <div className="mt-4">
                <p>
                  Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the
                  holy field of Kurukshetra, eager for battle?
                </p>

                <p>
                  Sanjaya said: Having seen the army of the Pandavas arrayed for battle, King Duryodhana approached his
                  teacher Drona and spoke these words:
                </p>

                <p>
                  "O teacher, behold this mighty army of the sons of Pandu, arranged for battle by your talented pupil,
                  the son of Drupada.
                </p>

                <p>
                  Here are heroes, mighty archers, equal in battle to Bhima and Arjuna: Yuyudhana, Virata, and the great
                  warrior Drupada;
                </p>

                <p>
                  Dhrishtaketu, Chekitana, and the valiant king of Kashi; Purujit, Kuntibhoja, and the great man
                  Shaibya;
                </p>

                <p>
                  The heroic Yudhamanyu, the valiant Uttamaujas, the son of Subhadra, and the sons of Draupadi—all of
                  them great warriors.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Bottom Navigation */}
        <footer className="sticky bottom-0 z-10 bg-white border-t h-16 flex items-center px-4 md:px-6">
          <div className="flex items-center justify-between w-full">
            <Button variant="outline" size="sm" className="gap-1" onClick={goToPreviousChapter}>
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="text-sm text-center">
              <span className="text-muted-foreground">Chapter 1 of 18</span>
            </div>

            <Button variant="outline" size="sm" className="gap-1" onClick={goToNextChapter}>
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}

