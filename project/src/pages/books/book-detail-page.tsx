import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  ChevronLeft,
  Bookmark,
  Share2,
  Menu,
  ChevronRight,
  List,
  Sun,
  Moon,
  Minus,
  Plus,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

// Mock data for books
const BOOKS = [
  {
    id: 1,
    title: 'Bhagavad Gita',
    author: 'Vyasa',
    description: 'The sacred dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra.',
    coverImage: 'https://source.unsplash.com/random/400x600/?bhagavad,gita',
    category: 'scripture',
    chapters: [
      { id: 1, title: 'Chapter 1: Arjuna Visada Yoga (The Yoga of Arjuna\'s Grief)', content: 'In the first chapter of the Bhagavad Gita, the scene is set on the battlefield of Kurukshetra. Two armies, the Pandavas and the Kauravas, are ready to battle. Arjuna, the great archer and warrior, asks his charioteer Krishna to drive his chariot between the two armies so he can see who he will be fighting against. As Arjuna surveys the opposing army, he recognizes friends, relatives, former teachers, and other loved ones. Overwhelmed by the prospect of killing his own family members and friends, Arjuna becomes dejected and despondent. He tells Krishna that he would rather not fight than slay his own kin, arguing that victory, kingdom, and pleasures mean nothing if those with whom he wants to share these joys are killed in battle. In a state of moral crisis, Arjuna drops his bow and arrow and decides not to fight, setting the stage for the spiritual discourse of the Bhagavad Gita.' },
      { id: 2, title: 'Chapter 2: Sankhya Yoga (The Yoga of Knowledge)', content: 'In Chapter 2 of the Bhagavad Gita, Krishna responds to Arjuna\'s despondency by explaining the nature of the soul (Atman) and the importance of performing one\'s duty (dharma). He explains that the soul is eternal and indestructible, while the body is temporary. "Just as a person casts off worn-out garments and puts on others that are new, similarly, the embodied soul casts off worn-out bodies and enters into others that are new." Krishna advises Arjuna to focus on his duty as a warrior without concern for the results or consequences. He introduces the concept of "Karma Yoga" – performing actions without attachment to the fruits of those actions. The chapter concludes with a description of the person of "steady wisdom" (sthitaprajna) who has transcended all desires and is content within the self.' },
      { id: 3, title: 'Chapter 3: Karma Yoga (The Yoga of Action)', content: 'Chapter 3 elaborates on the concept of Karma Yoga – the path of selfless action. Arjuna asks why he should engage in action if knowledge is superior to action. Krishna explains that no one can remain without action even for a moment, as nature\'s qualities (gunas) compel everyone to act. He emphasizes that it is better to perform one\'s duties imperfectly than to master another\'s duties. Krishna introduces the idea of yajna (sacrifice), asserting that actions performed as sacrifice are free from karma. He emphasizes that enlightened leaders should set an example by performing their duties selflessly. Krishna also explains that desires and anger, born of the quality of passion (rajas), are the greatest enemies, and one should control the senses through knowledge and wisdom.' },
      { id: 4, title: 'Chapter 4: Jnana-Karma-Sanyasa Yoga (The Yoga of Knowledge, Action and Renunciation)', content: 'In this chapter, Krishna reveals that he has taught this eternal yoga to Vivasvan (the sun god), who taught it to Manu, and through this succession, it was known to the royal sages. However, over time, this knowledge was lost. Krishna explains that although he is unborn and immutable, he incarnates age after age to protect the righteous, destroy the wicked, and reestablish dharma (righteousness). He elaborates that even though he acts, he is not bound by his actions, and those who understand this truth are also not bound. Krishna explains various types of sacrifices and states that the sacrifice of knowledge is superior to material sacrifices. He concludes by encouraging Arjuna to cut the doubts in his heart with the sword of knowledge and engage in yoga.' },
      { id: 5, title: 'Chapter 5: Karma-Sanyasa Yoga (The Yoga of Renunciation of Action)', content: 'Arjuna asks Krishna to clarify which is better: renunciation of action (Sannyasa) or performance of action (Karma Yoga). Krishna explains that both lead to the same goal, but Karma Yoga is better because it is easier to practice. He explains that a true Sannyasi (renunciant) and a true Karma Yogi both understand that the Self neither acts nor causes others to act. The enlightened person acts with the body, mind, and intellect, but without attachment, only for self-purification. Krishna explains that one who is unattached to the fruits of his actions attains peace, while the ignorant, who are attached to the fruits, remain bound. The chapter concludes with a description of the state of Brahman-realization, where one finds happiness within and attains liberation.' }
    ]
  },
  {
    id: 2,
    title: 'Upanishads',
    author: 'Various Sages',
    description: 'A collection of philosophical texts that form the theoretical basis for the Hindu religion.',
    coverImage: 'https://source.unsplash.com/random/400x600/?upanishad,scripture',
    category: 'scripture',
    chapters: [
      { id: 1, title: 'Isha Upanishad', content: 'The Isha Upanishad, one of the shortest Upanishads with just 18 verses, emphasizes the unity of the soul (Atman) with the ultimate reality (Brahman). It begins with the declaration that everything in the universe is pervaded by the Divine. It teaches that one should live life fully while maintaining detachment, working without desiring the fruits of labor. The Upanishad addresses the relationship between knowledge of the manifest (vidya) and the unmanifest (avidya), stating that both are necessary for complete understanding. It concludes with a famous prayer asking the Divine to remove the golden disk that obscures the truth and reveal the true nature of reality.' },
      { id: 2, title: 'Kena Upanishad', content: 'The Kena Upanishad explores the nature of Brahman (the ultimate reality) through a series of questions and answers. It begins by asking, "By whom directed does the mind go towards its objects? Commanded by whom does the life force, the first, move? At whose will do men utter speech? Who is the god that directs the eyes and ears?" The answer is that Brahman is the "ear of the ear, mind of the mind, speech of speech, breath of breath, and eye of the eye." The Upanishad emphasizes that Brahman cannot be known through ordinary means of knowledge but is that by which all knowing is possible. It includes a story of how the gods, after a victory over demons, became proud, not realizing that their success came from Brahman. Brahman appeared to them as a mysterious being that they could not understand, teaching them humility and the true source of their power.' },
      { id: 3, title: 'Katha Upanishad', content: 'The Katha Upanishad narrates a dialogue between a young boy named Nachiketa and Yama, the god of death. When Nachiketa\'s father performs a sacrifice giving away his old and useless possessions, Nachiketa, perceiving his father\'s lack of true generosity, asks to whom he will be given. In irritation, his father says, "I give you to Death." Taking his father at his word, Nachiketa goes to the abode of Yama and, finding him absent, waits for three days without food or water. Upon his return, Yama, to compensate for this discourtesy to a Brahmin guest, offers Nachiketa three boons. For his first boon, Nachiketa asks to be returned to his father in peace. For the second, he asks for knowledge of the fire sacrifice that leads to heaven. For the third boon, Nachiketa asks for the knowledge of what happens after death. Yama tries to dissuade him from this question, offering wealth and long life instead, but Nachiketa persists. Impressed by his determination, Yama teaches him about the nature of the Atman (soul), its relationship with Brahman, and the path to liberation.' }
    ]
  }
];

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [book, setBook] = useState<any>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingMode, setReadingMode] = useState<'light' | 'sepia' | 'dark'>('light');
  const [fontSize, setFontSize] = useState(16);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundBook = BOOKS.find(book => book.id === Number(id));
      setBook(foundBook || null);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  // Scroll back to top when changing chapters
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [currentChapterIndex]);
  
  const toggleBookmark = () => {
    // In a real app, this would call an API to save the bookmark
    setIsBookmarked(!isBookmarked);
  };
  
  const getReadingModeClasses = () => {
    switch (readingMode) {
      case 'light':
        return 'bg-gray-50 text-gray-900';
      case 'sepia':
        return 'bg-amber-50 text-amber-900';
      case 'dark':
        return 'bg-gray-900 text-gray-100';
      default:
        return 'bg-gray-50 text-gray-900';
    }
  };
  
  const nextChapter = () => {
    if (book && currentChapterIndex < book.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };
  
  const previousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };
  
  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 1);
    }
  };
  
  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 1);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find the book you're looking for.
        </p>
        <Button asChild>
          <Link to="/books">Return to Books</Link>
        </Button>
      </div>
    );
  }
  
  const currentChapter = book.chapters[currentChapterIndex];
  const hasPreviousChapter = currentChapterIndex > 0;
  const hasNextChapter = currentChapterIndex < book.chapters.length - 1;
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 border-b bg-background shadow-sm">
        <div className="container flex h-14 items-center justify-between">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/books">
              <ChevronLeft className="h-4 w-4" />
              Back to Books
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="hidden sm:flex items-center gap-1"
            >
              {readingMode === 'light' ? <Sun className="h-4 w-4" /> : 
               readingMode === 'dark' ? <Moon className="h-4 w-4" /> : 
               <Sun className="h-4 w-4" />}
              <span>Reading Mode</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle table of contents"
            >
              <List className="h-5 w-5" />
            </Button>
            
            {user && (
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this chapter"}
                onClick={toggleBookmark}
                className={isBookmarked ? "text-primary" : ""}
              >
                <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
              </Button>
            )}
            
            <Button variant="ghost" size="icon" aria-label="Share this book">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Reading Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsSettingsOpen(false)}></div>
          <div className="relative bg-background rounded-lg shadow-lg w-full max-w-sm mx-4 p-6 border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Reading Settings</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Reading Mode</h4>
                <div className="flex gap-2">
                  <Button 
                    variant={readingMode === 'light' ? 'default' : 'outline'} 
                    className="flex-1"
                    onClick={() => setReadingMode('light')}
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </Button>
                  <Button 
                    variant={readingMode === 'sepia' ? 'default' : 'outline'} 
                    className="flex-1"
                    onClick={() => setReadingMode('sepia')}
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    Sepia
                  </Button>
                  <Button 
                    variant={readingMode === 'dark' ? 'default' : 'outline'} 
                    className="flex-1"
                    onClick={() => setReadingMode('dark')}
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Font Size</h4>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" onClick={decreaseFontSize} disabled={fontSize <= 12}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center font-medium">{fontSize}px</div>
                  <Button variant="outline" size="icon" onClick={increaseFontSize} disabled={fontSize >= 24}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for chapters - hidden on mobile */}
        <div 
          className={`fixed md:relative inset-0 md:inset-auto z-20 md:z-0 md:block w-full md:w-72 transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="h-full flex flex-col bg-background border-r overflow-hidden">
            {/* Overlay backdrop for mobile */}
            <div 
              className="fixed inset-0 bg-black/50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
              style={{ display: isMenuOpen ? 'block' : 'none' }}
            ></div>
            
            {/* Table of Contents */}
            <div className="relative w-3/4 md:w-full max-w-xs h-full bg-background z-10 flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b flex items-center justify-between">
                <h2 className="font-semibold">Table of Contents</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-4 flex-shrink-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-16 w-12 overflow-hidden rounded shadow-md">
                    <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg line-clamp-1">{book.title}</h2>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="space-y-1">
                  {book.chapters.map((chapter: any, index: number) => (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        setCurrentChapterIndex(index);
                        setIsMenuOpen(false);
                      }}
                      className={`text-left block w-full p-2 rounded-md text-sm ${
                        index === currentChapterIndex
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {chapter.title}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Reading Chapter {currentChapterIndex + 1} of {book.chapters.length}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div 
          ref={mainContentRef}
          className={`flex-1 overflow-y-auto ${getReadingModeClasses()}`}
          style={{ transition: 'background-color 0.3s, color 0.3s' }}
        >
          <div className="container py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{currentChapter.title}</h1>
              
              <div className="prose max-w-none mb-12" style={{ fontSize: `${fontSize}px` }}>
                {currentChapter.content.split('\n').map((paragraph: string, i: number) => (
                  <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>
                ))}
              </div>
              
              <div className="flex justify-between border-t pt-6 mt-8">
                <Button 
                  variant="outline" 
                  onClick={previousChapter}
                  disabled={!hasPreviousChapter}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Chapter
                </Button>
                <Button 
                  onClick={nextChapter}
                  disabled={!hasNextChapter}
                  className="gap-2"
                >
                  Next Chapter
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}