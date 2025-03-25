import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bookmark, 
  BookOpen, 
  Headphones, 
  Video, 
  BookText, 
  MapPin, 
  Trash2,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

// Mock data for bookmarks
const BOOKMARKS = [
  {
    id: 1,
    title: 'Bhagavad Gita: Chapter 2',
    type: 'book',
    image: 'https://source.unsplash.com/random/400x600/?bhagavad,gita',
    date: '2025-03-15',
    description: 'Lord Krishna teaches Arjuna about the immortal nature of the soul and introduces key concepts.',
    path: '/books/1'
  },
  {
    id: 2,
    title: 'Understanding Karma: Cause and Effect',
    type: 'teaching',
    image: 'https://source.unsplash.com/random/400x600/?karma,dharma',
    date: '2025-03-12',
    description: 'This teaching explains the law of karma and how our actions determine our future.',
    path: '/teachings/1'
  },
  {
    id: 3,
    title: 'The Ramayana',
    type: 'audiobook',
    image: 'https://source.unsplash.com/random/400x600/?rama,epic',
    date: '2025-03-08',
    description: 'The epic tale of Lord Rama, narrated with traditional music and immersive storytelling.',
    path: '/audiobooks/2'
  },
  {
    id: 4,
    title: 'The Story of Ganesha',
    type: 'story',
    image: 'https://source.unsplash.com/random/400x600/?ganesha,elephant',
    date: '2025-03-05',
    description: 'The beloved tale of how Lord Ganesha got his elephant head.',
    path: '/stories/1'
  },
  {
    id: 5,
    title: 'Varanasi',
    type: 'place',
    image: 'https://source.unsplash.com/random/400x600/?varanasi,ganges',
    date: '2025-03-01',
    description: 'One of the oldest continuously inhabited cities in the world and a major religious hub in India.',
    path: '/religious-places/1'
  },
  {
    id: 6,
    title: 'Meditation Techniques from the Upanishads',
    type: 'teaching',
    image: 'https://source.unsplash.com/random/400x600/?meditation,lotus',
    date: '2025-02-28',
    description: 'A practical guide to ancient meditation techniques described in the Upanishads.',
    path: '/teachings/3'
  },
  {
    id: 7,
    title: 'The Complete Works of Swami Vivekananda',
    type: 'audiobook',
    image: 'https://source.unsplash.com/random/400x600/?vivekananda,speaker',
    date: '2025-02-25',
    description: 'The collected lectures and writings of one of India\'s greatest spiritual leaders.',
    path: '/audiobooks/7'
  },
];

export function BookmarksPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState(BOOKMARKS);
  
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesTab = activeTab === 'all' || bookmark.type === activeTab;
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bookmark.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });
  
  const removeBookmark = (id: number) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <BookOpen className="h-5 w-5" />;
      case 'teaching':
        return <Video className="h-5 w-5" />;
      case 'audiobook':
        return <Headphones className="h-5 w-5" />;
      case 'story':
        return <BookText className="h-5 w-5" />;
      case 'place':
        return <MapPin className="h-5 w-5" />;
      default:
        return <Bookmark className="h-5 w-5" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Bookmarks</h1>
          <p className="text-muted-foreground">
            All your saved content in one place
          </p>
        </div>
        
        <div className="relative w-full sm:w-auto max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookmarks..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              <Bookmark className="h-4 w-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="book" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Books
            </TabsTrigger>
            <TabsTrigger value="teaching" className="gap-2">
              <Video className="h-4 w-4" />
              Teachings
            </TabsTrigger>
            <TabsTrigger value="audiobook" className="gap-2">
              <Headphones className="h-4 w-4" />
              Audiobooks
            </TabsTrigger>
            <TabsTrigger value="story" className="gap-2">
              <BookText className="h-4 w-4" />
              Stories
            </TabsTrigger>
            <TabsTrigger value="place" className="gap-2">
              <MapPin className="h-4 w-4" />
              Places
            </TabsTrigger>
          </TabsList>
          
          <Button variant="ghost" size="sm" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Sort</span>
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-6">
          {filteredBookmarks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={bookmark.image} 
                      alt={bookmark.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full capitalize 
                        ${bookmark.type === 'book' ? 'bg-blue-100 text-blue-700' : 
                          bookmark.type === 'teaching' ? 'bg-purple-100 text-purple-700' : 
                          bookmark.type === 'audiobook' ? 'bg-green-100 text-green-700' : 
                          bookmark.type === 'story' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'}`}>
                        {getTypeIcon(bookmark.type)}
                        {bookmark.type}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{bookmark.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Saved on {formatDate(bookmark.date)}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-2">{bookmark.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button asChild variant="outline" className="gap-1">
                      <Link to={bookmark.path}>
                        View
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeBookmark(bookmark.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-lg bg-muted/20">
              <Bookmark className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No bookmarks found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? 'Try a different search term' : 'Start exploring content and save your favorites for easy access'}
              </p>
              {searchTerm && (
                <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
              )}
              {!searchTerm && (
                <Button asChild>
                  <Link to="/">Explore Content</Link>
                </Button>
              )}
            </div>
          )}
        </TabsContent>
        
        {['book', 'teaching', 'audiobook', 'story', 'place'].map((type) => (
          <TabsContent key={type} value={type} className="mt-6">
            {filteredBookmarks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookmarks.map((bookmark) => (
                  <Card key={bookmark.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={bookmark.image} 
                        alt={bookmark.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{bookmark.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Saved on {formatDate(bookmark.date)}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground line-clamp-2">{bookmark.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button asChild variant="outline" className="gap-1">
                        <Link to={bookmark.path}>
                          View
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeBookmark(bookmark.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border rounded-lg bg-muted/20">
                {getTypeIcon(type)}
                <h3 className="text-lg font-medium mb-2">No {type} bookmarks found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm ? 'Try a different search term' : `Explore ${type}s and save your favorites for easy access`}
                </p>
                {searchTerm && (
                  <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
                )}
                {!searchTerm && (
                  <Button asChild>
                    <Link to={`/${type}s`}>Explore {type.charAt(0).toUpperCase() + type.slice(1)}s</Link>
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}