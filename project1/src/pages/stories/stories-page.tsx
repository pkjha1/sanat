import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, Search, FilterX, Clock } from 'lucide-react';

// Mock data for stories
const STORIES = [
  {
    id: 1,
    title: 'The Story of Ganesha',
    author: 'Traditional',
    content: 'The beloved tale of how Lord Ganesha got his elephant head.',
    image: 'https://source.unsplash.com/random/800x600/?ganesha,elephant',
    category: 'mythology',
    readTime: '8 min read'
  },
  {
    id: 2,
    title: 'The Churning of the Ocean',
    author: 'Puranic Tale',
    content: 'How the devas and asuras churned the cosmic ocean to obtain amrita, the nectar of immortality.',
    image: 'https://source.unsplash.com/random/800x600/?ocean,churning',
    category: 'mythology',
    readTime: '12 min read'
  },
  {
    id: 3,
    title: 'The Story of Nachiketa',
    author: 'Katha Upanishad',
    content: 'A young boy\'s encounter with Death and his quest for the ultimate truth.',
    image: 'https://source.unsplash.com/random/800x600/?death,spiritual',
    category: 'philosophical',
    readTime: '10 min read'
  },
  {
    id: 4,
    title: 'The Blue Lotus',
    author: 'Buddhist Tale',
    content: 'A story about overcoming adversity and finding beauty in the most unlikely places.',
    image: 'https://source.unsplash.com/random/800x600/?lotus,blue',
    category: 'moral',
    readTime: '5 min read'
  },
  {
    id: 5,
    title: 'Krishna and Sudama',
    author: 'Traditional',
    content: 'The touching story of friendship between Lord Krishna and his childhood friend Sudama.',
    image: 'https://source.unsplash.com/random/800x600/?friendship,krishna',
    category: 'devotional',
    readTime: '9 min read'
  },
  {
    id: 6,
    title: 'The Birth of Hanuman',
    author: 'Valmiki',
    content: 'The extraordinary circumstances surrounding the birth of the mighty monkey god.',
    image: 'https://source.unsplash.com/random/800x600/?monkey,strength',
    category: 'mythology',
    readTime: '7 min read'
  },
  {
    id: 7,
    title: 'The Sage and the Mouse',
    author: 'Panchatantra',
    content: 'A tale of transformation and the impermanence of physical form.',
    image: 'https://source.unsplash.com/random/800x600/?mouse,sage',
    category: 'moral',
    readTime: '6 min read'
  },
  {
    id: 8,
    title: 'Savitri and Satyavan',
    author: 'Mahabharata',
    content: 'The story of a woman who outwitted Death to save her husband\'s life.',
    image: 'https://source.unsplash.com/random/800x600/?couple,forest',
    category: 'devotional',
    readTime: '15 min read'
  },
  {
    id: 9,
    title: 'The Lion and the Rabbit',
    author: 'Panchatantra',
    content: 'A clever rabbit uses his wits to defeat a powerful lion.',
    image: 'https://source.unsplash.com/random/800x600/?lion,rabbit',
    category: 'moral',
    readTime: '4 min read'
  },
];

export function StoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredStories = STORIES.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const categories = ['mythology', 'philosophical', 'moral', 'devotional'];
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Spiritual Stories</h1>
        <p className="text-muted-foreground text-lg">
          Ancient tales that convey timeless wisdom and moral lessons
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stories by title, author or content..."
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
      
      {filteredStories.length === 0 ? (
        <div className="text-center py-16">
          <BookText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No stories found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't find any stories matching your search criteria.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map(story => (
            <Card key={story.id} className="overflow-hidden h-full flex flex-col">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="line-clamp-1">{story.title}</CardTitle>
                    <CardDescription>{story.author}</CardDescription>
                  </div>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                    {story.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{story.content}</p>
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{story.readTime}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full gap-2">
                  <Link to={`/stories/${story.id}`}>
                    <BookText className="h-4 w-4" />
                    Read Story
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