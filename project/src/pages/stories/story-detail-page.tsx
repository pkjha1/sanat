import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Bookmark,
  Share2,
  BookText,
  Clock,
  User,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

// Mock data for stories
const STORIES = [
  {
    id: 1,
    title: 'The Story of Ganesha',
    author: 'Traditional',
    summary: 'The beloved tale of how Lord Ganesha got his elephant head.',
    image: 'https://source.unsplash.com/random/1200x600/?ganesha,elephant',
    category: 'mythology',
    readTime: '8 min read',
    content: `
      <p>Long ago, in the celestial abode of Mount Kailash, lived Lord Shiva and his consort, Goddess Parvati. One day, while Lord Shiva was away on meditation, Goddess Parvati decided to take a bath. She did not want to be disturbed, so she created a boy from the sandalwood paste on her body and instructed him to guard the entrance.</p>

      <p>"Let no one enter," she told the boy, who dutifully took his position at the door.</p>

      <p>After some time, Lord Shiva returned from his meditation and proceeded towards his home. The boy, following his mother's instructions, stopped Lord Shiva from entering.</p>

      <p>"I'm sorry, but you cannot enter. My mother is bathing and has instructed me to allow no one in," said the boy with determination.</p>

      <p>Lord Shiva, unaware that this was a creation of Goddess Parvati, was furious that someone was preventing him from entering his own abode. Despite the boy's valiant effort to fulfill his duty, Lord Shiva, in his anger, severed the boy's head with his trident.</p>

      <p>When Goddess Parvati emerged and saw what had happened, she was devastated and enraged. She explained to Lord Shiva that the boy was their son, created by her to guard the door. Filled with remorse, Lord Shiva promised to restore the boy to life.</p>

      <p>Lord Shiva sent his celestial attendants with instructions to bring back the head of the first living being they encountered facing north. The attendants encountered a majestic elephant facing north and returned with its head.</p>

      <p>Lord Shiva attached the elephant's head to the boy's body and breathed life into him. Thus, Ganesha, the elephant-headed god, was born. Lord Shiva and Goddess Parvati blessed him, declaring that he would be worshipped first before beginning any auspicious endeavor.</p>

      <p>"You shall be known as Ganesha, the remover of obstacles," pronounced Lord Shiva, "and people will invoke your name before starting any new venture."</p>

      <p>To compensate for his actions, Lord Shiva also bestowed upon Ganesha the status of leader of his celestial army, the Ganas, further cementing his name as Ganapati or Ganesha, meaning "Lord of the Ganas."</p>

      <p>This is why, to this day, Lord Ganesha is worshipped first in Hindu rituals and is revered as the remover of obstacles and the god of new beginnings. His elephant head symbolizes wisdom, understanding, and a discriminating intellect. The large ears represent the importance of listening well, and his small mouth signifies the need to talk less and listen more.</p>

      <p>The story of Ganesha teaches us about duty, forgiveness, and transformation. Even when faced with adversity, one must perform their duty with dedication, just as the young Ganesha did in protecting his mother's privacy. It also reminds us that sometimes, what appears to be a loss or misfortune can lead to a divine transformation and a new beginning.</p>
    `
  },
  {
    id: 2,
    title: 'The Churning of the Ocean',
    author: 'Puranic Tale',
    summary: 'How the devas and asuras churned the cosmic ocean to obtain amrita, the nectar of immortality.',
    image: 'https://source.unsplash.com/random/1200x600/?ocean,churning',
    category: 'mythology',
    readTime: '12 min read',
    content: `
      <p>In the beginning of time, when the universe was young, both the devas (gods) and asuras (demons) sought immortality. They had heard of amrita, the nectar of immortality, which was said to be hidden in the depths of the cosmic ocean of milk, Kshirasagara.</p>

      <p>The devas, led by Indra, approached Lord Vishnu for help. Vishnu suggested that they work together with the asuras to churn the ocean, promising that the nectar would emerge along with other treasures. However, he knew that the asuras could not be trusted with the nectar of immortality.</p>

      <p>The devas and asuras agreed to a temporary truce. They uprooted Mount Mandara to use as a churning rod and convinced Vasuki, the king of serpents, to serve as the churning rope. The devas took hold of the tail of the serpent, while the asuras, at Vishnu's clever suggestion, held the head, which emitted poisonous fumes.</p>

      <p>As they began churning, Mount Mandara began to sink into the ocean. Lord Vishnu, in his incarnation as a tortoise (Kurma), supported the mountain on his back, stabilizing it.</p>

      <p>The churning continued for a thousand years. As they churned, many treasures emerged from the ocean. First came Halahala, a deadly poison that threatened to destroy the world. Lord Shiva came to the rescue, consuming the poison and holding it in his throat, which turned blue, earning him the name Neelakantha, "the blue-throated one."</p>

      <p>Then, one by one, emerged various divine beings and objects: Kamadhenu, the wish-fulfilling cow; Uchaishravas, the divine seven-headed horse; Airavata, the white elephant that became Indra's mount; Kaustubha, the most valuable jewel in the world; Kalpavriksha, the wish-granting tree; Apsaras, celestial maidens; Lakshmi, the goddess of fortune who became Vishnu's consort; and finally, Dhanvantari, the divine physician, who emerged holding the pot of amrita.</p>

      <p>Seeing the nectar, the asuras snatched the pot and started to flee. A battle ensued between the devas and asuras for the possession of amrita. During this chaos, Lord Vishnu assumed the form of Mohini, an enchanting beauty, and offered to distribute the nectar fairly.</p>

      <p>Captivated by Mohini's beauty, the asuras agreed. Mohini began serving the nectar to the devas first. One asura named Rahu disguised himself as a deva and received the nectar, but before he could swallow it, the Sun and Moon recognized him and informed Mohini. Vishnu, as Mohini, used his Sudarshana Chakra (divine discus) to behead Rahu. However, since the nectar had already touched his lips, his head became immortal, while his body died.</p>

      <p>The severed head of Rahu, consumed with vengeance, periodically swallows the Sun and Moon, causing eclipses, but they soon reappear as Rahu has no body to digest them.</p>

      <p>After all the devas had drunk the nectar and gained immortality, Vishnu resumed his original form. The asuras, realizing they had been deceived, attacked, but were now facing immortal adversaries. The devas defeated them, driving them back to the nether regions.</p>

      <p>Thus, the churning of the ocean is a metaphor for cooperation even among enemies, the balance of good and evil, and the transformative power of perseverance. It teaches that sometimes, the pursuit of a goal can yield unexpected treasures, and that even poison can be transformed into something beneficial when handled with divine intervention.</p>
    `
  },
  {
    id: 3,
    title: 'The Story of Nachiketa',
    author: 'Katha Upanishad',
    summary: 'A young boy\'s encounter with Death and his quest for the ultimate truth.',
    image: 'https://source.unsplash.com/random/1200x600/?death,spiritual',
    category: 'philosophical',
    readTime: '10 min read',
    content: `
      <p>In ancient times, there lived a sage named Vajasravasa who performed a sacrifice in which he was supposed to give away all his possessions. However, he only gave away his old, weak, and useless cows, keeping the valuable ones for himself.</p>

      <p>His young son, Nachiketa, observed this and was troubled by his father's lack of sincerity. With the innocence and honesty of a child, he approached his father and asked, "Father, to whom will you give me?"</p>

      <p>Annoyed by this question and feeling guilty about his insincere sacrifice, Vajasravasa snapped in anger, "I give you to Death!"</p>

      <p>Taking his father's words seriously, Nachiketa decided to visit the abode of Yama, the god of death. When he arrived, Yama was away on his duties. For three days and nights, Nachiketa waited at Yama's doorstep without food or water.</p>

      <p>When Yama returned and found out that a Brahmin's son had been waiting at his doorstep for three days without hospitality, he felt remorseful. In Hindu tradition, a guest, especially a Brahmin, should never be kept waiting. To make amends, Yama offered Nachiketa three boons.</p>

      <p>For his first boon, Nachiketa asked, "Let my father's anger be pacified, and may he recognize me when I return."</p>

      <p>Yama granted this wish immediately.</p>

      <p>For his second boon, Nachiketa requested knowledge of the fire sacrifice that leads to heaven. Yama, impressed by the boy's spiritual inclination, not only taught him the ritual but also named it after him as "Nachiketa Fire."</p>

      <p>For his third and final boon, Nachiketa asked the most profound question: "Some say that when a person dies, they continue to exist; others say they cease to exist. I want to know the truth. What happens after death?"</p>

      <p>Yama was taken aback by this question. He tried to dissuade Nachiketa by offering him wealth, long life, pleasures, and kingdoms instead. But Nachiketa persisted, saying, "These things are fleeting. They wear out the vigor of all the senses. Even the longest life is short. Keep your wealth, dance, and song for yourself."</p>

      <p>Impressed by Nachiketa's wisdom and determination, Yama finally relented. He revealed to Nachiketa the knowledge of the soul (Atman) and its relationship with the ultimate reality (Brahman). He taught him that the soul is neither born nor does it die; it is eternal, unchanging, and beyond the physical realm.</p>

      <p>Yama explained the path of self-realization, emphasizing that it is not the easy path of pleasure but the challenging path of understanding and wisdom. He taught Nachiketa the sacred syllable "Om" and the process of meditation.</p>

      <p>With this knowledge, Nachiketa returned to the world of the living, free from fear of death and equipped with the wisdom to attain liberation.</p>

      <p>The story of Nachiketa is a testament to the courage to question, the pursuit of truth beyond material enticements, and the wisdom that comes from confronting the reality of death. It reminds us that the most valuable knowledge is not about extending physical life but understanding its essence and transcending the cycle of birth and death.</p>
    `
  }
];

export function StoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [story, setStory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingMode, setReadingMode] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundStory = STORIES.find(story => story.id === Number(id));
      setStory(foundStory || null);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const toggleReadingMode = () => {
    setReadingMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };
  
  const getReadingModeClasses = () => {
    return readingMode === 'light' 
      ? 'bg-white text-gray-900' 
      : 'bg-gray-900 text-gray-100';
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!story) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find the story you're looking for.
        </p>
        <Button asChild>
          <Link to="/stories">Return to Stories</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/stories">
              <ChevronLeft className="h-4 w-4" />
              Back to Stories
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleReadingMode}
              className="gap-2"
            >
              {readingMode === 'light' ? (
                <>
                  <Moon className="h-4 w-4" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              )}
            </Button>
            
            {user && (
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this story"}
                onClick={toggleBookmark}
                className={isBookmarked ? "text-primary" : ""}
              >
                <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
              </Button>
            )}
            
            <Button variant="ghost" size="icon" aria-label="Share this story">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="w-full h-64 md:h-96 overflow-hidden">
        <img 
          src={story.image} 
          alt={story.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Story Content */}
      <div className={`flex-1 transition-colors ${getReadingModeClasses()}`}>
        <div className="container py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{story.title}</h1>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {story.author}
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {story.readTime}
              </span>
              <span className="inline-flex items-center gap-1 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">
                {story.category}
              </span>
            </div>
            
            <div className="prose max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />
            
            <div className="border-t pt-6 mt-8 flex justify-between">
              {user && (
                <Button 
                  variant="outline" 
                  className={`gap-2 ${isBookmarked ? "text-primary border-primary" : ""}`} 
                  onClick={toggleBookmark}
                >
                  <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
                  {isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
                </Button>
              )}
              
              <Button asChild variant="outline" className="gap-2">
                <Link to="/stories">
                  <BookText className="h-4 w-4" />
                  More Stories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}