import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, FilterX, Bot as Lotus, Moon, Clock, Play } from 'lucide-react';

// Mock data for meditation
const MEDITATIONS = [
  {
    id: 1,
    title: 'Mindful Breathing',
    description: 'A simple meditation focusing on the breath to calm the mind and increase awareness.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?meditation,breath',
    guide: 'Swami Vivekananda',
    duration: '15 min',
    category: 'beginner',
    tags: ['breathing', 'mindfulness', 'awareness']
  },
  {
    id: 2,
    title: 'Chakra Meditation',
    description: 'Balance and activate your chakras with this guided meditation journey through the energy centers.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?chakra,energy',
    guide: 'Sadhguru',
    duration: '25 min',
    category: 'intermediate',
    tags: ['chakra', 'energy', 'healing']
  },
  {
    id: 3,
    title: 'Mantra Meditation: Om Chanting',
    description: 'Harness the power of the primordial sound Om to center yourself and connect with universal consciousness.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?om,mantra',
    guide: 'Sri Sri Ravi Shankar',
    duration: '20 min',
    category: 'beginner',
    tags: ['mantra', 'om', 'chanting']
  },
  {
    id: 4,
    title: 'Third Eye Meditation',
    description: 'Activate your ajna chakra to enhance intuition and spiritual awareness.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?third,eye',
    guide: 'Paramahansa Yogananda',
    duration: '30 min',
    category: 'advanced',
    tags: ['third eye', 'intuition', 'awareness']
  },
  {
    id: 5,
    title: 'Loving-Kindness Meditation (Metta)',
    description: 'Cultivate compassion for yourself and others through this heart-opening practice.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?love,kindness',
    guide: 'Thich Nhat Hanh',
    duration: '18 min',
    category: 'beginner',
    tags: ['compassion', 'love', 'kindness']
  },
  {
    id: 6,
    title: 'Yoga Nidra: Yogic Sleep',
    description: 'Experience deep relaxation and restoration through this guided conscious sleep meditation.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?sleep,relaxation',
    guide: 'Dr. Archana Sharma',
    duration: '45 min',
    category: 'all levels',
    tags: ['relaxation', 'sleep', 'restoration']
  },
  {
    id: 7,
    title: 'Kundalini Awakening Meditation',
    description: 'A powerful practice to awaken the dormant energy at the base of your spine.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?kundalini,energy',
    guide: 'Yogi Bhajan',
    duration: '35 min',
    category: 'advanced',
    tags: ['kundalini', 'energy', 'spiritual']
  },
  {
    id: 8,
    title: 'Trataka: Candle Gazing Meditation',
    description: 'Improve concentration and mental focus through this ancient technique of steady gazing.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?candle,flame',
    guide: 'Swami Rama',
    duration: '15 min',
    category: 'intermediate',
    tags: ['concentration', 'focus', 'visualization']
  },
  {
    id: 9,
    title: 'Nature Sound Meditation',
    description: 'Use the healing sounds of nature to quiet your mind and connect with the natural world.',
    thumbnailUrl: 'https://source.unsplash.com/random/800x450/?nature,forest',
    guide: 'Radhanath Swami',
    duration: '22 min',
    category: 'beginner',
    tags: ['nature', 'sound', 'relaxation']
  },
];

export function MeditationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredMeditations = MEDITATIONS.filter(meditation => {
    const matchesSearch = 
      meditation.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      meditation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meditation.guide.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meditation.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === null || meditation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const categories = ['beginner', 'intermediate', 'advanced', 'all levels'];
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Guided Meditations</h1>
        <p className="text-muted-foreground text-lg">
          Experience inner peace and transformation with these ancient meditation practices
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search meditations by title, guide, or keyword..."
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
      
      {filteredMeditations.length === 0 ? (
        <div className="text-center py-16">
          <Lotus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No meditations found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't find any meditations matching your search criteria.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeditations.map(meditation => (
            <Card key={meditation.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative aspect-video w-full overflow-hidden">
                <img 
                  src={meditation.thumbnailUrl} 
                  alt={meditation.title}
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 rounded-full p-3">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                    meditation.category === 'beginner' 
                      ? 'bg-green-500/90 text-white' 
                      : meditation.category === 'intermediate'
                        ? 'bg-blue-500/90 text-white'
                        : meditation.category === 'advanced'
                          ? 'bg-purple-500/90 text-white'
                          : 'bg-amber-500/90 text-white'
                  }`}>
                    {meditation.category}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {meditation.duration}
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="line-clamp-1">{meditation.title}</CardTitle>
                    <CardDescription>Guided by {meditation.guide}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{meditation.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {meditation.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full gap-2">
                  <Link to={`/meditation/${meditation.id}`}>
                    <Lotus className="h-4 w-4" />
                    Begin Practice
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