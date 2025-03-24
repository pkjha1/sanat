import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, VideoIcon, Headphones, BookText, ScrollText, Bookmark, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function DashboardPage() {
  const { user } = useAuth();
  
  // Helper function to get user's display name
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  };
  
  // Mock data
  const recentlyViewed = [
    {
      id: 1,
      title: 'Bhagavad Gita - Chapter 2',
      type: 'book',
      progress: 45,
      lastViewed: '2 days ago',
      coverImage: 'https://source.unsplash.com/random/400x600/?bhagavad,gita',
    },
    {
      id: 2,
      title: 'Understanding Karma',
      type: 'teaching',
      progress: 72,
      lastViewed: '5 days ago',
      coverImage: 'https://source.unsplash.com/random/400x600/?meditation,hindu',
    },
    {
      id: 3,
      title: 'The Story of Ganesha',
      type: 'story',
      progress: 100,
      lastViewed: '1 week ago',
      coverImage: 'https://source.unsplash.com/random/400x600/?ganesha,elephant',
    },
  ];
  
  const recommendations = [
    {
      id: 1,
      title: 'Upanishads',
      type: 'book',
      coverImage: 'https://source.unsplash.com/random/400x600/?upanishad,scripture',
    },
    {
      id: 2,
      title: 'Meditation Techniques',
      type: 'teaching',
      coverImage: 'https://source.unsplash.com/random/400x600/?meditation,yoga',
    },
    {
      id: 3,
      title: 'The Story of Krishna',
      type: 'audiobook',
      coverImage: 'https://source.unsplash.com/random/400x600/?krishna,flute',
    },
  ];
  
  // Helper function to render icon based on content type
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <BookOpen className="h-4 w-4" />;
      case 'teaching':
        return <VideoIcon className="h-4 w-4" />;
      case 'audiobook':
        return <Headphones className="h-4 w-4" />;
      case 'story':
        return <BookText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };
  
  const getContentPath = (type: string, id: number) => {
    switch (type) {
      case 'book':
        return `/books/${id}`;
      case 'teaching':
        return `/teachings/${id}`;
      case 'audiobook':
        return `/audiobooks/${id}`;
      case 'story':
        return `/stories/${id}`;
      default:
        return '/';
    }
  };
  
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {getUserDisplayName()}
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Books Read
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Videos Watched
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Hours Listened
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bookmarks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Continue Learning</h2>
              <Button asChild variant="ghost" className="gap-1 text-sm">
                <Link to="/dashboard/progress">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentlyViewed.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="h-16 w-12 overflow-hidden rounded">
                    <img src={item.coverImage} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {getContentIcon(item.type)}
                      <span className="capitalize">{item.type}</span>
                      <span>•</span>
                      <span>{item.lastViewed}</span>
                    </div>
                    <div className="mt-1 h-1 w-full bg-muted overflow-hidden rounded-full">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button asChild size="sm">
                    <Link to={getContentPath(item.type, item.id)}>Continue</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recommended For You</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendations.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-[2/3] w-full overflow-hidden">
                    <img 
                      src={item.coverImage} 
                      alt={item.title} 
                      className="h-full w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      {getContentIcon(item.type)}
                      <span className="capitalize">{item.type}</span>
                    </div>
                    <h3 className="font-medium line-clamp-1">{item.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Reading Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-primary mb-2">7</div>
                <p className="text-muted-foreground">days in a row</p>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mt-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="text-center">
                    <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center ${i < 7 ? 'bg-primary/80 text-primary-foreground' : 'bg-muted'}`}>
                      {i + 1}
                    </div>
                    <div className="text-xs mt-1 text-muted-foreground">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-center mt-4 text-muted-foreground">
                Keep reading daily to maintain your streak!
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link to="/dashboard/bookmarks">
                    <Bookmark className="h-4 w-4" />
                    Bookmarks
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link to="/dashboard/progress">
                    <ScrollText className="h-4 w-4" />
                    Reading Progress
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link to="/books">
                    <BookOpen className="h-4 w-4" />
                    Browse Books
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link to="/teachings">
                    <VideoIcon className="h-4 w-4" />
                    Watch Teachings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}