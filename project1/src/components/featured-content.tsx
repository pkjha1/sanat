import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, BookText, Video, Headphones, BookMarked } from 'lucide-react';

interface FeaturedContentProps {
  type: 'books' | 'teachings' | 'audiobooks' | 'stories';
  title: string;
  description: string;
}

export function FeaturedContent({ type, title, description }: FeaturedContentProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'books':
        return <BookOpen className="h-5 w-5" />;
      case 'teachings':
        return <Video className="h-5 w-5" />;
      case 'audiobooks':
        return <Headphones className="h-5 w-5" />;
      case 'stories':
        return <BookText className="h-5 w-5" />;
      default:
        return <BookMarked className="h-5 w-5" />;
    }
  };

  const items = [
    {
      id: 1,
      title: `Featured ${type === 'stories' ? 'Story' : type.slice(0, -1)} 1`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: `https://source.unsplash.com/random/800x600/?${type === 'teachings' ? 'temple' : type.slice(0, -1)}`,
    },
    {
      id: 2,
      title: `Featured ${type === 'stories' ? 'Story' : type.slice(0, -1)} 2`,
      description: 'Praesent euismod libero eget urna tincidunt, vitae hendrerit dui imperdiet.',
      image: `https://source.unsplash.com/random/800x600/?hindu,${type === 'teachings' ? 'meditation' : type.slice(0, -1)}`,
    },
    {
      id: 3,
      title: `Featured ${type === 'stories' ? 'Story' : type.slice(0, -1)} 3`,
      description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
      image: `https://source.unsplash.com/random/800x600/?india,${type === 'teachings' ? 'yoga' : type.slice(0, -1)}`,
    },
  ];

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Button asChild variant="ghost" className="gap-1 hidden sm:flex">
            <Link to={`/${type}`}>
              View all {type}
              <span className="sr-only">{type}</span>
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getTypeIcon()}
                  <span>{item.title}</span>
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={`/${type}/${item.id}`}>
                    {type === 'books' ? 'Read Now' : 
                     type === 'teachings' ? 'Watch Now' : 
                     type === 'audiobooks' ? 'Listen Now' : 'Read Story'}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link to={`/${type}`}>View all {type}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}