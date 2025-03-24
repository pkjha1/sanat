import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Search, FilterX, BookOpen, ExternalLink, Play } from 'lucide-react';

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
  },
  {
    id: 4,
    title: 'Understanding the Symbolism in Hindu Temples',
    author: 'Dr. Deepak Shimkhada',
    description: 'This teaching explores the deeper meaning behind common Hindu temple architecture and symbols.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?temple,hindu',
    contentType: 'video',
    videoUrl: 'https://example.com/video3.mp4',
    duration: '28:40',
    category: 'culture',
  },
  {
    id: 5,
    title: 'The Concept of Dharma in Daily Life',
    author: 'Sadhguru',
    description: 'Learn how to apply the principles of dharma to modern daily life and decision-making.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?spiritual,teaching',
    contentType: 'video',
    videoUrl: 'https://example.com/video4.mp4',
    duration: '52:10',
    category: 'philosophy',
  },
  {
    id: 6,
    title: 'Understanding the Four Ashrams of Life',
    author: 'Swami Sarvapriyananda',
    description: 'An exploration of the four stages of life according to Vedic philosophy.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?life,stages',
    contentType: 'article',
    articleUrl: '/teachings/6',
    readTime: '18 min read',
    category: 'philosophy',
  },
  {
    id: 7,
    title: 'The Science of Ayurveda: Introduction',
    author: 'Dr. Vasant Lad',
    description: 'An introduction to Ayurveda, the ancient Indian system of medicine and wellness.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?ayurveda,herbs',
    contentType: 'video',
    videoUrl: 'https://example.com/video5.mp4',
    duration: '37:25',
    category: 'wellness',
  },
  {
    id: 8,
    title: 'Understanding the Bhagavad Gita: Chapter 2',
    author: 'Dr. Pranav Pandya',
    description: 'A deep dive into Chapter 2 of the Bhagavad Gita, exploring the nature of the self.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?gita,krishna',
    contentType: 'article',
    articleUrl: '/teachings/8',
    readTime: '15 min read',
    category: 'scripture',
  },
  {
    id: 9,
    title: 'The Essence of Advaita Vedanta',
    author: 'Swami Sarvapriyananda',
    description: 'Exploring the non-dualistic philosophy of Advaita Vedanta as taught by Adi Shankaracharya.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?philosophy,vedanta',
    contentType: 'video',
    videoUrl: 'https://example.com/video6.mp4',
    duration: '48:15',
    category: 'philosophy',
  },
];

export function TeachingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const filteredTeachings = TEACHINGS.filter(teaching => {
    const matchesSearch = teaching.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          teaching.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || teaching.category === selectedCategory;
    const matchesType = selectedType === null || teaching.contentType === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });
  
  const categories = ['philosophy', 'yoga', 'meditation', 'culture', 'wellness', 'scripture'];
  const contentTypes = ['video', 'article'];
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedType(null);
  };
  
  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'article':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Spiritual Teachings</h1>
        <p className="text-muted-foreground text-lg">
          Explore wisdom from spiritual masters on various aspects of Sanatan Dharma
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teachings by title or author..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Filter by:</span>
          <div className="flex gap-2 flex-wrap">
            <select 
              className="px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category} className="capitalize">
                  {category}
                </option>
              ))}
            </select>
            
            <select 
              className="px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedType || ""}
              onChange={(e) => setSelectedType(e.target.value || null)}
            >
              <option value="">All Types</option>
              {contentTypes.map(type => (
                <option key={type} value={type} className="capitalize">
                  {type}
                </option>
              ))}
            </select>
            
            {(searchTerm || selectedCategory || selectedType) && (
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
      </div>
      
      {filteredTeachings.length === 0 ? (
        <div className="text-center py-16">
          <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No teachings found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't find any teachings matching your search criteria.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachings.map(teaching => (
            <Card key={teaching.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative aspect-video w-full overflow-hidden">
                <img 
                  src={teaching.thumbnailUrl} 
                  alt={teaching.title}
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
                {teaching.contentType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 rounded-full p-3">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                    teaching.contentType === 'video' 
                      ? 'bg-red-500/90 text-white' 
                      : 'bg-blue-500/90 text-white'
                  }`}>
                    {teaching.contentType}
                  </span>
                </div>
                {teaching.contentType === 'video' && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {teaching.duration}
                  </div>
                )}
                {teaching.contentType === 'article' && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {teaching.readTime}
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="line-clamp-1">{teaching.title}</CardTitle>
                    <CardDescription>{teaching.author}</CardDescription>
                  </div>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                    {teaching.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{teaching.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full gap-2">
                  <Link to={`/teachings/${teaching.id}`}>
                    {getContentTypeIcon(teaching.contentType)}
                    {teaching.contentType === 'video' ? 'Watch Now' : 'Read Article'}
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