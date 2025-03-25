import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Headphones, 
  BarChart, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Award,
  TrendingUp,
  Bookmark,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for reading progress
const READING_PROGRESS = [
  {
    id: 1,
    title: 'Bhagavad Gita',
    type: 'book',
    progress: 45,
    lastRead: '2025-03-18T14:30:00',
    coverImage: 'https://source.unsplash.com/random/400x600/?bhagavad,gita',
    currentChapter: 'Chapter 2: Sankhya Yoga',
    totalChapters: 18,
    path: '/books/1'
  },
  {
    id: 2,
    title: 'Yoga Sutras of Patanjali',
    type: 'book',
    progress: 72,
    lastRead: '2025-03-16T09:15:00',
    coverImage: 'https://source.unsplash.com/random/400x600/?yoga,meditation',
    currentChapter: 'Chapter 3: Vibhuti Pada',
    totalChapters: 4,
    path: '/books/5'
  },
  {
    id: 3,
    title: 'The Ramayana',
    type: 'audiobook',
    progress: 28,
    lastRead: '2025-03-17T20:45:00',
    coverImage: 'https://source.unsplash.com/random/400x600/?rama,epic',
    currentChapter: 'Chapter 4: Kishkindha Kanda',
    totalChapters: 7,
    path: '/audiobooks/2'
  },
  {
    id: 4,
    title: 'Autobiography of a Yogi',
    type: 'audiobook',
    progress: 65,
    lastRead: '2025-03-15T11:20:00',
    coverImage: 'https://source.unsplash.com/random/400x600/?yogi,india',
    currentChapter: 'Chapter 12: Years in My Master\'s Hermitage',
    totalChapters: 49,
    path: '/audiobooks/6'
  },
  {
    id: 5,
    title: 'Upanishads',
    type: 'book',
    progress: 30,
    lastRead: '2025-03-14T16:10:00',
    coverImage: 'https://source.unsplash.com/random/400x600/?hindu,scripture',
    currentChapter: 'Katha Upanishad',
    totalChapters: 13,
    path: '/books/2'
  },
];

// Mock data for achievements
const ACHIEVEMENTS = [
  {
    id: 1,
    title: '7-Day Streak',
    description: 'Read or listened for 7 consecutive days',
    icon: 'streak',
    earned: true,
    date: '2025-03-15'
  },
  {
    id: 2,
    title: 'Book Worm',
    description: 'Completed reading 5 books',
    icon: 'books',
    earned: true,
    date: '2025-03-10'
  },
  {
    id: 3,
    title: 'Spiritual Scholar',
    description: 'Explored content across all categories',
    icon: 'scholar',
    earned: true,
    date: '2025-03-05'
  },
  {
    id: 4,
    title: 'Audio Explorer',
    description: 'Listened to 10 hours of audiobooks',
    icon: 'audio',
    earned: false,
    progress: 70,
    requiredAmount: 10
  },
  {
    id: 5,
    title: 'Vedic Master',
    description: 'Completed all chapters of a sacred text',
    icon: 'vedic',
    earned: false,
    progress: 45,
    requiredAmount: 100
  },
];

// Reading stats
const STATS = {
  totalReadingTime: '42h 15m',
  booksCompleted: 7,
  chaptersRead: 83,
  currentStreak: 7,
  longestStreak: 14,
  dailyReadingAverage: '45m'
};

export function ReadingProgressPage() {
  const [activeTab, setActiveTab] = useState<string>('inProgress');
  
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval === 1 ? '1 year ago' : `${interval} years ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? '1 month ago' : `${interval} months ago`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? 'yesterday' : `${interval} days ago`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
    }
    
    return 'just now';
  };
  
  const inProgressItems = READING_PROGRESS.sort((a, b) => 
    new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime()
  );
  
  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case 'streak':
        return <Calendar className="h-8 w-8 text-amber-500" />;
      case 'books':
        return <BookOpen className="h-8 w-8 text-blue-500" />;
      case 'scholar':
        return <Award className="h-8 w-8 text-green-500" />;
      case 'audio':
        return <Headphones className="h-8 w-8 text-purple-500" />;
      case 'vedic':
        return <Bookmark className="h-8 w-8 text-red-500" />;
      default:
        return <Award className="h-8 w-8 text-primary" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reading Progress</h1>
        <p className="text-muted-foreground">
          Track your reading journey and achievements
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reading Time
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div className="text-2xl font-bold">{STATS.totalReadingTime}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Books Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <div className="text-2xl font-bold">{STATS.booksCompleted}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <div className="text-2xl font-bold">{STATS.currentStreak} days</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Daily Average
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-muted-foreground" />
            <div className="text-2xl font-bold">{STATS.dailyReadingAverage}</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="inProgress" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b">
          <TabsList className="w-full justify-start rounded-none pl-0">
            <TabsTrigger value="inProgress" className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent gap-2">
              <BookOpen className="h-4 w-4" />
              In Progress
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent gap-2">
              <BarChart className="h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="inProgress" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inProgressItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-1/3 md:w-1/4">
                    <div className="aspect-[2/3] h-full overflow-hidden">
                      <img 
                        src={item.coverImage} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col p-4">
                    <CardTitle className="line-clamp-1 text-lg">{item.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      {item.type === 'book' ? (
                        <BookOpen className="h-3 w-3" />
                      ) : (
                        <Headphones className="h-3 w-3" />
                      )}
                      <span className="capitalize">{item.type}</span>
                    </CardDescription>
                    
                    <div className="mt-2 space-y-1">
                      <div className="text-sm">{item.currentChapter}</div>
                      <div className="text-xs text-muted-foreground">
                        Chapter {item.currentChapter.split(':')[0].split(' ')[1]} of {item.totalChapters}
                      </div>
                      <div className="mt-2">
                        <Progress value={item.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{item.progress}% complete</span>
                        <span>Last read {getTimeAgo(item.lastRead)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-3">
                      <Button asChild className="w-full gap-1">
                        <Link to={item.path}>
                          Continue
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((achievement) => (
              <Card key={achievement.id} className={achievement.earned ? 'border-primary/50' : ''}>
                <CardHeader className="pb-2">
                  <div className="mb-2">{getAchievementIcon(achievement.icon)}</div>
                  <CardTitle>{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {achievement.earned ? (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Award className="h-4 w-4" />
                      <span>Earned on {new Date(achievement.date).toLocaleDateString()}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Progress value={achievement.progress} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {achievement.progress}% progress
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="stats" className="pt-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Your Reading Statistics</CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Reading Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="text-sm text-muted-foreground mb-1">Total Reading Time</div>
                      <div className="text-2xl font-bold">{STATS.totalReadingTime}</div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="text-sm text-muted-foreground mb-1">Books Completed</div>
                      <div className="text-2xl font-bold">{STATS.booksCompleted}</div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="text-sm text-muted-foreground mb-1">Chapters Read</div>
                      <div className="text-2xl font-bold">{STATS.chaptersRead}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Reading Streaks</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="text-sm text-muted-foreground mb-1">Current Streak</div>
                      <div className="text-2xl font-bold">{STATS.currentStreak} days</div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="text-sm text-muted-foreground mb-1">Longest Streak</div>
                      <div className="text-2xl font-bold">{STATS.longestStreak} days</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Daily Reading Activity</h3>
                  <div className="h-40 w-full bg-muted/30 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Reading activity chart will be displayed here</p>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground text-center">
                    Your daily average reading time is {STATS.dailyReadingAverage}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}