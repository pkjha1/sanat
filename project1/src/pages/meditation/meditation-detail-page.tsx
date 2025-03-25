import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Bookmark, Share2, Play, Pause, Volume2, VolumeX, Maximize, Clock, Bot as Lotus, User, Calendar, Moon, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/auth-context';

// Mock data for meditations
const MEDITATIONS = [
  {
    id: 1,
    title: 'Mindful Breathing',
    description: 'A simple meditation focusing on the breath to calm the mind and increase awareness.',
    coverImage: 'https://source.unsplash.com/random/1200x600/?meditation,breath',
    guide: 'Swami Vivekananda',
    duration: '15 min',
    durationSeconds: 900,
    audioUrl: 'https://example.com/meditation1.mp3',
    category: 'beginner',
    tags: ['breathing', 'mindfulness', 'awareness'],
    publishedAt: '2025-03-15',
    instructions: `
      <h3>Preparation</h3>
      <p>Find a comfortable seated position with your spine straight but not rigid. You can sit on a cushion, chair, or meditation bench. The important thing is that you're comfortable and alert.</p>
      
      <h3>Body Awareness</h3>
      <p>Take a moment to scan your body from head to toe, noticing any areas of tension and consciously relaxing them. Let your shoulders drop, relax your jaw, and soften your face.</p>
      
      <h3>Breath Awareness</h3>
      <p>Bring your attention to your natural breath. Don't try to control or change it, simply observe it flowing in and out. Notice the sensation of the breath at the nostrils, or the rising and falling of your chest or abdomen.</p>
      
      <h3>Mindful Breathing Practice</h3>
      <p>As you inhale, be fully aware that you are inhaling. As you exhale, be fully aware that you are exhaling. When your mind wanders—and it will—gently bring your attention back to your breath without judgment.</p>
      
      <h3>Counting Technique (Optional)</h3>
      <p>To help maintain focus, you can count your breaths. Inhale: one, exhale: two, and so on up to ten, then start again at one. If you lose count, simply begin again with one.</p>
      
      <h3>Expanding Awareness</h3>
      <p>After establishing steady awareness of your breath, gradually expand your awareness to include your body sensations, sounds in the environment, and the spaciousness of your mind.</p>
      
      <h3>Closing</h3>
      <p>To conclude your practice, take a few deeper breaths. Slowly bring gentle movement back to your fingers and toes. When you're ready, open your eyes if they were closed.</p>
      
      <h3>Benefits</h3>
      <p>Regular practice of mindful breathing can reduce stress, improve concentration, enhance emotional regulation, and develop greater self-awareness.</p>
    `,
    benefits: [
      'Reduces stress and anxiety',
      'Improves concentration and focus',
      'Promotes emotional balance',
      'Enhances self-awareness',
      'Helps manage negative thoughts'
    ]
  },
  {
    id: 2,
    title: 'Chakra Meditation',
    description: 'Balance and activate your chakras with this guided meditation journey through the energy centers.',
    coverImage: 'https://source.unsplash.com/random/1200x600/?chakra,energy',
    guide: 'Sadhguru',
    duration: '25 min',
    durationSeconds: 1500,
    audioUrl: 'https://example.com/meditation2.mp3',
    category: 'intermediate',
    tags: ['chakra', 'energy', 'healing'],
    publishedAt: '2025-03-05',
    instructions: `
      <h3>Preparation</h3>
      <p>Sit in a comfortable meditation posture with your spine straight. Place your hands on your knees or thighs, palms facing upward in a receptive position.</p>
      
      <h3>Root Chakra (Muladhara)</h3>
      <p>Bring your awareness to the base of your spine. Visualize a bright red spinning wheel of energy. As you breathe, imagine this energy becoming brighter and more balanced, giving you a sense of security and groundedness.</p>
      
      <h3>Sacral Chakra (Svadhisthana)</h3>
      <p>Move your attention to your lower abdomen, just below the navel. Visualize an orange spinning wheel of energy. With each breath, see this energy center becoming more vibrant, enhancing your creativity and emotional fluidity.</p>
      
      <h3>Solar Plexus Chakra (Manipura)</h3>
      <p>Shift your focus to the area above your navel. Envision a bright yellow spinning wheel of energy. As you breathe into this area, feel your personal power and confidence strengthening.</p>
      
      <h3>Heart Chakra (Anahata)</h3>
      <p>Bring your awareness to your heart center. Visualize a beautiful green wheel of energy radiating love and compassion. With each breath, feel this center expanding, opening you to give and receive love more freely.</p>
      
      <h3>Throat Chakra (Vishuddha)</h3>
      <p>Focus on your throat area. See a bright blue wheel of energy spinning. As you breathe, feel this center clearing, allowing you to express your truth with clarity and confidence.</p>
      
      <h3>Third Eye Chakra (Ajna)</h3>
      <p>Move your attention to the space between your eyebrows. Envision an indigo wheel of energy. With each breath, feel this center awakening, enhancing your intuition and inner wisdom.</p>
      
      <h3>Crown Chakra (Sahasrara)</h3>
      <p>Finally, bring your awareness to the top of your head. Visualize a violet or white spinning wheel of energy connecting you to universal consciousness. As you breathe, feel this connection strengthening.</p>
      
      <h3>Integration</h3>
      <p>Now, visualize all seven chakras aligned and spinning harmoniously, creating a rainbow of energy flowing through your spine from base to crown. Feel the balance and integration of all aspects of your being.</p>
      
      <h3>Closing</h3>
      <p>To conclude, take a deep breath and gently return your awareness to your physical body. When ready, slowly open your eyes.</p>
    `,
    benefits: [
      'Balances energy centers in the body',
      'Removes energetic blockages',
      'Improves overall wellbeing',
      'Enhances spiritual awareness',
      'Promotes emotional healing'
    ]
  }
];

export function MeditationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [meditation, setMeditation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState<'instructions' | 'benefits'>('instructions');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundMeditation = MEDITATIONS.find(meditation => meditation.id === Number(id));
      setMeditation(foundMeditation || null);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || meditation.durationSeconds;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * (audioRef.current.duration || meditation.durationSeconds);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percent * 100);
    }
  };
  
  const handleFullscreen = () => {
    if (audioRef.current) {
      if (audioRef.current.requestFullscreen) {
        audioRef.current.requestFullscreen();
      }
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!meditation) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Meditation Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find the meditation practice you're looking for.
        </p>
        <Button asChild>
          <Link to="/meditation">Return to Meditations</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/meditation">
            <ChevronLeft className="h-4 w-4" />
            Back to Meditations
          </Link>
        </Button>
        
        <div className="flex gap-2">
          {user && (
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this meditation"}
              onClick={toggleBookmark}
              className={isBookmarked ? "text-primary" : ""}
            >
              <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </Button>
          )}
          <Button variant="ghost" size="icon" aria-label="Share this meditation">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
              <img 
                src={meditation.coverImage} 
                alt={meditation.title} 
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 hover:bg-black/40 transition-colors"
                onClick={togglePlay}
              >
                <div className="bg-primary/90 rounded-full p-4">
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white ml-1" />
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <div 
                  className="w-full h-2 bg-white/30 rounded-full overflow-hidden cursor-pointer mb-2"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-white text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>-{formatTime(meditation.durationSeconds - currentTime)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{meditation.title}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Guided by {meditation.guide}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{meditation.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Added {format(new Date(meditation.publishedAt), 'MMM d, yyyy')}</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">{meditation.description}</p>
              
              <div className="flex gap-2 mb-6">
                {meditation.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="border-b flex mb-4">
                <Button 
                  variant="ghost" 
                  className={`rounded-none border-b-2 ${activeTab === 'instructions' ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setActiveTab('instructions')}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Instructions
                </Button>
                <Button 
                  variant="ghost" 
                  className={`rounded-none border-b-2 ${activeTab === 'benefits' ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setActiveTab('benefits')}
                >
                  <Lotus className="h-4 w-4 mr-2" />
                  Benefits
                </Button>
              </div>
              
              {activeTab === 'instructions' ? (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: meditation.instructions }} />
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Benefits of This Practice</h3>
                  <ul className="space-y-2">
                    {meditation.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-1">
                          <Lotus className="h-4 w-4 text-primary" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-primary" />
                  Session Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    className="w-full gap-2 h-12 text-lg"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-5 w-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        Begin Meditation
                      </>
                    )}
                  </Button>
                  
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" onClick={toggleMute}>
                      {isMuted ? (
                        <VolumeX className="h-4 w-4 mr-2" />
                      ) : (
                        <Volume2 className="h-4 w-4 mr-2" />
                      )}
                      {isMuted ? 'Unmute' : 'Mute'}
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = 0;
                        setCurrentTime(0);
                        setProgress(0);
                      }
                    }}>
                      Restart
                    </Button>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Tips for Your Practice:</h4>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>Find a quiet space where you won't be disturbed</li>
                      <li>Sit comfortably with your spine straight</li>
                      <li>Begin with a few deep breaths to center yourself</li>
                      <li>Be patient and non-judgmental with yourself</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Related Meditations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {MEDITATIONS.filter(m => m.id !== meditation.id)
                  .slice(0, 2)
                  .map(relatedMeditation => (
                    <Link 
                      to={`/meditation/${relatedMeditation.id}`} 
                      key={relatedMeditation.id}
                      className="flex gap-3 group"
                    >
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={relatedMeditation.coverImage} 
                          alt={relatedMeditation.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {relatedMeditation.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {relatedMeditation.duration}
                        </p>
                      </div>
                    </Link>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={meditation.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
}