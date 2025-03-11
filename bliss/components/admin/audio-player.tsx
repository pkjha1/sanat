"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  audioUrl: string
  title: string
}

export function AudioPlayer({ audioUrl, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would control the actual audio playback
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // In a real implementation, this would control the audio volume
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0])
    // In a real implementation, this would seek the audio to the specified position
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(value[0] === 0)
    // In a real implementation, this would adjust the audio volume
  }

  return (
    <div className="flex items-center gap-2 bg-gray-50 rounded-md p-2 min-w-[200px]">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
        onClick={togglePlay}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      <div className="flex-1 min-w-0">
        <Slider value={[progress]} max={100} step={1} onValueChange={handleProgressChange} className="h-1.5" />
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={toggleMute}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>

      <div className="w-16 hidden sm:block">
        <Slider
          value={[isMuted ? 0 : volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="h-1.5"
        />
      </div>
    </div>
  )
}

