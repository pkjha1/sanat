import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones, Search, FilterX, Clock } from 'lucide-react';

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
    chapters: 18
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
    chapters: 24
  },
  {
    id: 3,
    title: 'Meditation for Beginners',
    author: 'Swami Vivekananda',
    narrator: 'Dr. Priya Patel',
    description: 'A practical guide to meditation techniques from the Vedic tradition.',
    coverImage: 'https://source.unsplash.com/random/400x600/?meditation,lotus',
    category: 'practice',
    duration: '3h 15m',
    chapters: 10
  },
  {
    id: 4,
    title: 'The Upanishads: Breath of the Eternal',
    author: 'Various Sages',
    narrator: 'Raj Malhotra',
    description: 'The philosophical cornerstone of Hindu spirituality, exploring the nature of reality.',
    coverImage: 'https://source.unsplash.com/random/400x600/?upanishad,vedas',
    category: 'scripture',
    duration: '8h 50m',
    chapters: 12
  },
  {
    id: 5,
    title: 'Tales from Hindu Mythology',
    author: 'Devdutt Pattanaik',
    narrator: 'Meera Desai',
    description: 'Captivating stories from Hindu mythology, revealing their deeper symbolism and wisdom.',
    coverImage: 'https://source.unsplash.com/random/400x600/?hindu,mythology',
    category: 'mythology',
    duration: '5h 30m',
    chapters: 15
  },
  {
    id: 6,
    title: 'Autobiography of a Yogi',
    author: 'Paramahansa Yogananda',
    narrator: 'Vivek Kapoor',
    description: 'The life story of Paramahansa Yogananda that has inspired millions worldwide.',
    coverImage: 'https://source.unsplash.com/random/400x600/?yoga,india',
    category: 'biography',
    duration: '9h 10m',
    chapters: 14
  },
  {
    id: 7,
    title: 'The Complete Works of Swami Vivekananda',
    author: 'Swami Vivekananda',
    narrator: 'Sanjay Mishra',
    description: 'The collected lectures and writings of one of India\'s greatest spiritual leaders.',
    coverImage: 'https://source.unsplash.com/random/400x600/?vivekananda,spiritual',
    category: 'philosophy',
    duration: '18h 40m',
    chapters: 30
  },
  {
    id: 8,
    title: 'The Bhakti Sutras of Narada',
    author: 'Narada Muni',
    narrator: 'Lakshmi Iyer',
    description: 'A guide to the path of devotion, exploring the nature of divine love.',
    coverImage: 'https://source.unsplash.com/random/400x600/?devotion,prayer',
    category: 'scripture',
    duration: '4h 25m',
    chapters: 8
  },
  {
    id: 9,
    title: 'Hindu Temples: What Happened to Them',
    author: 'Sita Ram Goel',
    narrator: 'Arjun Kapoor',
    description: 'A historical account of Hindu temples and their significance in Indian culture.',
    coverImage: 'https://source.unsplash.com/random/400x600/?temple,hindu',
    category: 'history',
    duration: '7h 15m',
    chapters: 12
  },
];

export function AudiobooksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredAudiobooks = AUDIOBOOKS.filter(audiobook => {
    const matchesSearch = audiobook.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          audiobook.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          audiobook.narrator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || audiobook.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const categories = ['scripture', 'epic', 'practice', 'mythology', 'biography', 'philosophy', 'history'];
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Sacred Audiobooks</h1>
        <p className="text-muted-foreground text-lg">
          Listen to the wisdom of Sanatan Dharma, narrated by expert voices
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search audiobooks by title, author or narrator..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
          
          {(searchTerm || selectedCategory) && (
            <Button 
              variant="ghost" 
              onClick={clearFilters}
              className="gap-2"
            >
              <FilterX className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {filteredAudiobooks.length === 0 ? (
        <div className="text-center py-16">
          <Headphones className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No audiobooks found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't find any audiobooks matching your search criteria.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAudiobooks.map(audiobook => (
            <Card key={audiobook.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative pt-[80%] md:pt-[140%]">
                <img 
                  src={audiobook.coverImage} 
                  alt={audiobook.title}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-all hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center text-white gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{audiobook.duration}</span>
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="line-clamp-1">{audiobook.title}</CardTitle>
                    <CardDescription>
                      <span>By {audiobook.author}</span>
                      <span className="block text-xs mt-1">Narrated by {audiobook.narrator}</span>
                    </CardDescription>
                  </div>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                    {audiobook.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{audiobook.description}</p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <span>{audiobook.chapters} chapters</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full gap-2">
                  <Link to={`/audiobooks/${audiobook.id}`}>
                    <Headphones className="h-4 w-4" />
                    Listen Now
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}