import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Bookmark,
  Share2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  List,
  Clock,
  User,
  Calendar,
  Headphones,
  X,
  Rewind,
  FastForward,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

// Mock data for audiobooks
const AUDIOBOOKS = [
  {
    id: 1,
    title: 'Bhagavad Gita: The Song of God',
    author: 'Vyasa',
    narrator: 'Dr. Anil Sharma',
    description: 'Experience the timeless wisdom of the Bhagavad Gita, narrated with clarity and devotion.',
    coverImage: 'https://source.unsplash.com/random/400x600/?gita,krishna',
    category: 'scripture',
    duration: '6h 45m',
    publishedAt: '2025-01-10',
    chapters: [
      {
        id: 1,
        title: 'Introduction to the Bhagavad Gita',
        audioUrl: 'https://example.com/audio1.mp3',
        duration: '12:30',
        summary: 'An overview of the historical and philosophical context of the Bhagavad Gita.'
      },
      {
        id: 2,
        title: 'Chapter 1: Arjuna Visada Yoga (The Yoga of Arjuna\'s Grief)',
        audioUrl: 'https://example.com/audio2.mp3',
        duration: '24:15',
        summary: 'Arjuna becomes filled with grief and despair when he sees his relatives on the opposing army of the Kauravas.'
      },
      {
        id: 3,
        title: 'Chapter 2: Sankhya Yoga (The Yoga of Knowledge)',
        audioUrl: 'https://example.com/audio3.mp3',
        duration: '28:40',
        summary: 'Krishna begins his teachings by explaining the immortal nature of the soul and introduces key philosophical concepts.'
      },
      {
        id: 4,
        title: 'Chapter 3: Karma Yoga (The Yoga of Action)',
        audioUrl: 'https://example.com/audio4.mp3',
        duration: '22:10',
        summary: 'Krishna explains how to act with detachment from the results of one\'s actions.'
      },
      {
        id: 5,
        title: 'Chapter 4: Jnana-Karma-Sanyasa Yoga (The Yoga of Knowledge, Action and Renunciation)',
        audioUrl: 'https://example.com/audio5.mp3',
        duration: '25:35',
        summary: 'Krishna reveals the science of understanding the self and the importance of spiritual knowledge.'
      }
    ]
  },
  {
    id: 2,
    title: 'The Ramayana',
    author: 'Valmiki',
    narrator: 'Shobha Narayan',
    description: 'The epic tale of Lord Rama, narrated with traditional music and immersive storytelling.',
    coverImage: 'https://source.unsplash.com/random/400x600/?ram,temple',
    category: 'epic',
    duration: '12h 20m',
    publishedAt: '2024-11-05',
    chapters: [
      {
        id: 1,
        title: 'Bala Kanda: The Boyhood',
        audioUrl: 'https://example.com/ramayana1.mp3',
        duration: '35:20',
        summary: 'The birth and childhood of Rama and his brothers.'
      },
      {
        id: 2,
        title: 'Ayodhya Kanda: The Ayodhya Episode',
        audioUrl: 'https://example.com/ramayana2.mp3',
        duration: '42:15',
        summary: 'Rama\'s preparation for coronation and his exile to the forest.'
      }
    ]
  }
];

export function AudiobookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [audiobook, setAudiobook] = useState<any>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundAudiobook = AUDIOBOOKS.find(audiobook => audiobook.id === Number(id));
      setAudiobook(foundAudiobook || null);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentChapterIndex]);
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = position * audioRef.current.duration;
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
    
    if (value === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const skipToNext = () => {
    if (audiobook && currentChapterIndex < audiobook.chapters.length - 1) {
      setCurrentChapterIndex(prevIndex => prevIndex + 1);
      setProgress(0);
      setCurrentTime(0);
    }
  };
  
  const skipToPrevious = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prevIndex => prevIndex - 1);
      setProgress(0);
      setCurrentTime(0);
    } else if (audioRef.current) {
      // If at first chapter, restart current chapter
      audioRef.current.currentTime = 0;
    }
  };
  
  const seekForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };
  
  const seekBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!audiobook) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Audiobook Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find the audiobook you're looking for.
        </p>
        <Button asChild>
          <Link to="/audiobooks">Return to Audiobooks</Link>
        </Button>
      </div>
    );
  }
  
  const currentChapter = audiobook.chapters[currentChapterIndex];
  const hasNextChapter = currentChapterIndex < audiobook.chapters.length - 1;
  const hasPreviousChapter = currentChapterIndex > 0;
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/audiobooks">
            <ChevronLeft className="h-4 w-4" />
            Back to Audiobooks
          </Link>
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle chapter list"
          >
            <List className="h-5 w-5" />
          </Button>
          
          {user && (
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this audiobook"}
              onClick={toggleBookmark}
              className={isBookmarked ? "text-primary" : ""}
            >
              <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </Button>
          )}
          <Button variant="ghost" size="icon" aria-label="Share this audiobook">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Chapter Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="font-semibold">Chapters</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-60px)] p-4">
              {audiobook.chapters.map((chapter: any, index: number) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setCurrentChapterIndex(index);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left block w-full p-4 border-b last:border-0 ${
                    index === currentChapterIndex ? 'bg-primary/10 text-primary' : ''
                  }`}
                >
                  <div className="font-medium">{chapter.title}</div>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>Chapter {index + 1}</span>
                    <span>{chapter.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Audiobook Cover and Info */}
            <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
              <img 
                src={audiobook.coverImage} 
                alt={audiobook.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-xl font-bold leading-tight">{audiobook.title}</h1>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <User className="h-3 w-3" />
                <span>By {audiobook.author}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Headphones className="h-3 w-3" />
                <span>Narrated by {audiobook.narrator}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Clock className="h-3 w-3" />
                <span>{audiobook.duration} total</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3" />
                <span>Released {new Date(audiobook.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
            
            {/* Chapters List - Hidden on Mobile */}
            <div className="hidden md:block">
              <h3 className="font-medium mb-3 text-sm text-muted-foreground uppercase">Chapters</h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {audiobook.chapters.map((chapter: any, index: number) => (
                  <button
                    key={chapter.id}
                    onClick={() => setCurrentChapterIndex(index)}
                    className={`text-left block w-full p-3 rounded-md text-sm ${
                      index === currentChapterIndex
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="font-medium line-clamp-1">{chapter.title}</div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Chapter {index + 1}</span>
                      <span>{chapter.duration}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-card rounded-lg p-6 md:p-8 shadow-sm border h-full">
            <h2 className="text-2xl font-bold mb-2">{currentChapter.title}</h2>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
              <Headphones className="h-4 w-4" />
              <span>Chapter {currentChapterIndex + 1} of {audiobook.chapters.length}</span>
              <span>•</span>
              <span>{currentChapter.duration}</span>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Chapter Summary</h3>
              <p className="text-muted-foreground">{currentChapter.summary}</p>
            </div>
            
            {/* Audio Player */}
            <div className="mt-8">
              <div className="relative h-1 bg-muted rounded-full mb-2 cursor-pointer" 
                ref={progressRef}
                onClick={handleProgressClick}
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-primary rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground mb-4">
                <span>{formatTime(currentTime)}</span>
                <span>-{formatTime(duration - currentTime)}</span>
              </div>
              
              <div className="flex items-center justify-center gap-3 md:gap-6 mb-6">
                <Button variant="ghost" size="icon" onClick={skipToPrevious} disabled={!hasPreviousChapter}>
                  <SkipBack className="h-5 w-5" />
                </Button>
                
                <Button variant="ghost" size="icon" onClick={seekBackward}>
                  <Rewind className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-14 w-14 rounded-full"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </Button>
                
                <Button variant="ghost" size="icon" onClick={seekForward}>
                  <FastForward className="h-5 w-5" />
                </Button>
                
                <Button variant="ghost" size="icon" onClick={skipToNext} disabled={!hasNextChapter}>
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleMute}>
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-primary"
                />
              </div>
            </div>
            
            <audio
              ref={audioRef}
              src={currentChapter.audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={skipToNext}
              className="hidden"
            />
            
            <div className="mt-10 pt-6 border-t">
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  disabled={!hasPreviousChapter}
                  onClick={skipToPrevious}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Chapter
                </Button>
                <Button 
                  disabled={!hasNextChapter}
                  onClick={skipToNext}
                  className="gap-2"
                >
                  Next Chapter
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}