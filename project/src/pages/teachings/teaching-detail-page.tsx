import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Bookmark,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  BookOpen,
  Video,
  Clock,
  User,
  Calendar,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

// Mock data for teachings
const TEACHINGS = [
  {
    id: 1,
    title: 'Understanding Karma: Cause and Effect',
    author: 'Swami Vivekananda',
    description: 'This teaching explains the law of karma and how our actions determine our future.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?meditation,hindu',
    contentType: 'video',
    videoUrl: 'https://example.com/video1.mp4',
    duration: '32:15',
    category: 'philosophy',
    publishedAt: '2025-02-15',
    content: '',
    transcript: `
      <p>Namaste, and welcome to this exploration of one of the most profound concepts in Eastern philosophy - Karma.</p>
      
      <p>The word "Karma" comes from Sanskrit and literally means "action" or "deed." But in its deeper philosophical context, it encompasses the entire cycle of cause and effect that governs our existence.</p>
      
      <p>The law of Karma states that every action generates a force of energy that returns to us in kind. If we perform good actions, we will receive positive outcomes. If we perform harmful actions, we will receive negative outcomes. This is not punishment or reward, but simply an impartial universal mechanism.</p>
      
      <p>As described in the Bhagavad Gita: "Karmanye Vadhikaraste Ma Phaleshu Kadachana" - which translates to: "You have the right to perform your actions, but you are not entitled to the fruits of the actions."</p>
      
      <p>The concept of Karma extends beyond just our physical actions. Our thoughts, intentions, and the energy we put out into the world all contribute to our Karmic footprint. Even the subtlest thought creates a blueprint in consciousness.</p>
      
      <p>There are several types of Karma:</p>
      
      <p>1. Sanchita Karma: The accumulated karma from all past lifetimes, which determines our present circumstances.</p>
      
      <p>2. Prarabdha Karma: The portion of Sanchita Karma that is ready to be experienced in this lifetime.</p>
      
      <p>3. Kriyamana Karma: The karma we are creating now through our current actions, which will bear fruit in the future.</p>
      
      <p>Understanding Karma empowers us to take responsibility for our lives. It teaches us that we are not victims of circumstance but creators of our own destiny through our choices and actions.</p>
      
      <p>However, it's important to note that the goal is not to perform good actions simply to receive good outcomes. That would be a form of spiritual materialism. Rather, the highest form of action is one performed without attachment to results - Nishkama Karma, or desireless action, as taught by Lord Krishna in the Bhagavad Gita.</p>
      
      <p>In conclusion, the law of Karma encourages us to act with awareness, compassion, and integrity. When we understand that our actions create ripples that eventually return to us, we naturally incline toward choices that benefit not only ourselves but all beings.</p>
      
      <p>Om Shanti, Shanti, Shanti.</p>
    `,
  },
  {
    id: 2,
    title: 'The Path of Bhakti Yoga',
    author: 'Radhanath Swami',
    description: 'Learn about the path of devotion and how to develop a loving relationship with the divine.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?devotion,worship',
    contentType: 'video',
    videoUrl: 'https://example.com/video2.mp4',
    duration: '45:20',
    category: 'yoga',
    publishedAt: '2025-01-23',
    content: '',
    transcript: `
      <p>Hare Krishna and greetings to all seekers on the spiritual path.</p>
      
      <p>Today we explore Bhakti Yoga - the yoga of devotion and love - perhaps the most accessible and direct path to spiritual realization in this age of Kali.</p>
      
      <p>Bhakti Yoga is described in the Bhagavad Gita as the path of loving devotional service to the Divine. It is a journey of the heart that transforms ordinary consciousness into divine consciousness through love.</p>
      
      <p>The essence of Bhakti is beautifully captured in this verse from the Narada Bhakti Sutras: "Sa tv asmin parama-prema-rupa" - "Bhakti is of the nature of supreme love for God."</p>
      
      <p>Unlike other spiritual paths that may require intense discipline, intellectual understanding, or physical mastery, Bhakti Yoga requires only sincerity and love. It is available to everyone regardless of background, education, or social status.</p>
      
      <p>There are nine principal practices of Bhakti described in the Bhagavata Purana:</p>
      
      <p>1. Shravanam - Hearing about the Divine</p>
      <p>2. Kirtanam - Chanting the Divine's names and glories</p>
      <p>3. Smaranam - Remembering the Divine</p>
      <p>4. Pada-sevanam - Serving the Divine's feet</p>
      <p>5. Archanam - Worship</p>
      <p>6. Vandanam - Offering prayers</p>
      <p>7. Dasyam - Developing an attitude of service</p>
      <p>8. Sakhyam - Developing friendship with the Divine</p>
      <p>9. Atma-nivedanam - Complete surrender</p>
      
      <p>Of these practices, the chanting of the divine names is considered especially powerful in this age. The Hare Krishna maha-mantra is a profound example: Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare, Hare Rama, Hare Rama, Rama Rama, Hare Hare.</p>
      
      <p>Through these practices, the heart gradually becomes purified of selfish desires and negative emotions. The practitioner begins to experience the Divine in all beings and all situations.</p>
      
      <p>The beauty of Bhakti is that it doesn't require us to renounce the world but rather to transform our relationship with it. Everything becomes an opportunity for devotion when offered with love.</p>
      
      <p>As stated in the Bhagavad Gita, "Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform - do that as an offering to Me."</p>
      
      <p>May your hearts be filled with divine love as you walk the path of Bhakti.</p>
      
      <p>Hare Krishna.</p>
    `,
  },
  {
    id: 3,
    title: 'Meditation Techniques from the Upanishads',
    author: 'Dr. Archana Sharma',
    description: 'A practical guide to ancient meditation techniques described in the Upanishads.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?meditation,lotus',
    contentType: 'article',
    articleUrl: '/teachings/3',
    readTime: '12 min read',
    category: 'meditation',
    publishedAt: '2025-03-05',
    content: `
      <h2>Ancient Wisdom for Modern Minds</h2>
      
      <p>The Upanishads, dating back to approximately 800-500 BCE, are among the most profound philosophical texts of ancient India. While they primarily explore the nature of reality, consciousness, and the self (Atman) and its relationship with the ultimate reality (Brahman), they also contain valuable insights into meditation practices.</p>
      
      <p>These ancient texts offer meditation techniques that remain remarkably relevant today, providing methods to quiet the mind, expand consciousness, and realize one's true nature. Here, we explore some of these timeless practices.</p>
      
      <h3>1. So'ham Meditation (I Am That)</h3>
      
      <p>The Hamsa Upanishad describes a natural meditation that occurs with our breath. With each inhalation, the breath makes a subtle "sa" sound, and with each exhalation, a "ham" sound. Together, they form "so'ham" (or "sa-aham"), which translates to "I am That" – indicating the identity of the individual self with the ultimate reality.</p>
      
      <p><strong>Practice:</strong> Sit comfortably with your spine erect. Close your eyes and become aware of your natural breath. As you inhale, mentally note the sound "so", and as you exhale, note the sound "ham". Continue this awareness without forcing or changing the breath. The mantra happens naturally; your awareness simply recognizes it.</p>
      
      <h3>2. Antara Trataka (Inner Gazing)</h3>
      
      <p>The Chandogya Upanishad references techniques of inner visualization. One such practice involves concentrating on the space within the heart, where the true self is said to reside.</p>
      
      <p><strong>Practice:</strong> Sit quietly and visualize a small, radiant light in the center of your chest, in the heart region. Focus your attention on this light, allowing it to grow brighter and expand. If your mind wanders, gently bring it back to the light. This practice cultivates one-pointed concentration and inner awareness.</p>
      
      <h3>3. Prana Vidya (Knowledge of Life Force)</h3>
      
      <p>The Prasna Upanishad extensively discusses prana (life force) and its movements within the body. Understanding and controlling prana is considered a key to higher awareness.</p>
      
      <p><strong>Practice:</strong> Sit in a meditation posture and become aware of your breath as a manifestation of prana. Observe how the breath moves in different parts of your body. Feel the subtle energetic sensations that accompany the breath. Gradually, your awareness of the gross breath will transform into awareness of the subtle prana currents in your body.</p>
      
      <h3>4. Neti-Neti Meditation (Not This, Not This)</h3>
      
      <p>The Brihadaranyaka Upanishad introduces the powerful method of "neti-neti" (not this, not this), a contemplative practice to discover the true self by negating what it is not.</p>
      
      <p><strong>Practice:</strong> Sit in meditation and begin to observe your experience. Whatever arises in your awareness – thoughts, feelings, sensations, perceptions – mentally note "not this" (neti), recognizing that you are the witness of these phenomena, not the phenomena themselves. This practice helps discern between the changeless observer and the changing observed.</p>
      
      <h3>5. OM Meditation</h3>
      
      <p>The Mandukya Upanishad is entirely devoted to the sacred syllable OM, considered the primordial sound that contains all other sounds and represents the entirety of existence.</p>
      
      <p><strong>Practice:</strong> Sit in a comfortable position. Take a few deep breaths to center yourself. Begin chanting "OM" aloud, feeling its vibration throughout your body. Gradually make the chanting softer until you're mentally repeating it. Finally, let go of even the mental repetition and rest in the silence that follows. The Upanishad describes this silence as the fourth state of consciousness (turiya), beyond waking, dreaming, and deep sleep.</p>
      
      <h2>Modern Applications</h2>
      
      <p>These ancient practices can be particularly helpful for modern practitioners because:</p>
      
      <ul>
        <li>They don't require special equipment or conditions</li>
        <li>They can be practiced in short sessions, suitable for busy schedules</li>
        <li>They address the universal human condition, not tied to specific cultural contexts</li>
        <li>They offer a progressive path from concentration to expanded awareness</li>
        <li>They unite the physical, mental, and spiritual dimensions of experience</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>The meditation techniques from the Upanishads offer profound methods for inner exploration that have withstood the test of time. While described thousands of years ago, they address the perennial human quest for meaning, peace, and self-knowledge.</p>
      
      <p>When practicing these techniques, it's helpful to remember that in the Upanishadic view, meditation is not just a practice but a way of being. The ultimate goal is not to have occasional experiences of peace or clarity but to recognize your true nature as consciousness itself.</p>
      
      <p>As the Chandogya Upanishad states: "Tat tvam asi" – "That thou art." The reality you seek through meditation is not separate from your essential nature. The practice simply removes the veils that obscure this recognition.</p>
    `,
    transcript: '',
  },
];

export function TeachingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [teaching, setTeaching] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundTeaching = TEACHINGS.find(teaching => teaching.id === Number(id));
      setTeaching(foundTeaching || null);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!teaching) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Teaching Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find the teaching you're looking for.
        </p>
        <Button asChild>
          <Link to="/teachings">Return to Teachings</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/teachings">
            <ChevronLeft className="h-4 w-4" />
            Back to Teachings
          </Link>
        </Button>
        
        <div className="flex gap-2">
          {user && (
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this teaching"}
              onClick={toggleBookmark}
              className={isBookmarked ? "text-primary" : ""}
            >
              <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </Button>
          )}
          <Button variant="ghost" size="icon" aria-label="Share this teaching">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{teaching.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            {teaching.author}
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(teaching.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            {teaching.contentType === 'video' ? (
              <>
                <Video className="h-4 w-4" />
                {teaching.duration}
              </>
            ) : (
              <>
                <Clock className="h-4 w-4" />
                {teaching.readTime}
              </>
            )}
          </span>
          <span className="inline-flex items-center gap-1 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">
            {teaching.category}
          </span>
        </div>
        
        {teaching.contentType === 'video' ? (
          <div className="mb-8">
            <div className="relative aspect-video mb-4 bg-black rounded-lg overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                src={teaching.videoUrl}
                poster={teaching.thumbnailUrl}
                className="w-full h-full"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center" onClick={togglePlay}>
                  <div className="bg-black/60 rounded-full p-4 cursor-pointer hover:bg-black/70 transition-colors">
                    <Play className="h-10 w-10 text-white fill-white" />
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center">
                <Button variant="ghost" size="icon" className="text-white" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                
                <div className="flex-1 mx-2 h-1 bg-white/30 rounded overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '35%' }}></div>
                </div>
                
                <Button variant="ghost" size="icon" className="text-white" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                
                <Button variant="ghost" size="icon" className="text-white" onClick={handleFullscreen}>
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between mb-8">
              <Button variant="outline" onClick={() => setShowTranscript(!showTranscript)}>
                {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
              </Button>
              
              {user && (
                <Button variant="outline" className={isBookmarked ? "text-primary border-primary" : ""} onClick={toggleBookmark}>
                  {isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
                </Button>
              )}
            </div>
            
            {showTranscript && (
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Transcript</h3>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: teaching.transcript }}></div>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-8">
            <div className="aspect-video mb-6 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={teaching.thumbnailUrl} 
                alt={teaching.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: teaching.content }}></div>
            
            <div className="flex justify-end mt-8">
              {user && (
                <Button variant="outline" className={isBookmarked ? "text-primary border-primary" : ""} onClick={toggleBookmark}>
                  {isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
                </Button>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Related Teachings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TEACHINGS.filter(t => t.id !== teaching.id && t.category === teaching.category).slice(0, 3).map(relatedTeaching => (
              <div 
                key={relatedTeaching.id} 
                className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/teachings/${relatedTeaching.id}`)}
              >
                <div className="aspect-video relative">
                  <img 
                    src={relatedTeaching.thumbnailUrl} 
                    alt={relatedTeaching.title} 
                    className="w-full h-full object-cover"
                  />
                  {relatedTeaching.contentType === 'video' && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {relatedTeaching.duration}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg line-clamp-1">{relatedTeaching.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{relatedTeaching.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}