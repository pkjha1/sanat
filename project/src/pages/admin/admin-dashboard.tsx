import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  VideoIcon, 
  Headphones, 
  DollarSign, 
  TrendingUp, 
  UserPlus, 
  BookPlus, 
  Plus, 
  ArrowRight
} from 'lucide-react';

export function AdminDashboard() {
  // Mock data
  const stats = [
    { title: 'Total Users', value: '2,345', icon: Users, change: '+12%', changeType: 'positive' },
    { title: 'Total Books', value: '78', icon: BookOpen, change: '+3', changeType: 'positive' },
    { title: 'Total Teachings', value: '142', icon: VideoIcon, change: '+5', changeType: 'positive' },
    { title: 'Donations', value: '$12,546', icon: DollarSign, change: '+22%', changeType: 'positive' },
  ];
  
  const recentUsers = [
    { id: 1, name: 'Amit Sharma', email: 'amit.sharma@example.com', joined: '2 days ago' },
    { id: 2, name: 'Priya Patel', email: 'priya.patel@example.com', joined: '3 days ago' },
    { id: 3, name: 'Rahul Singh', email: 'rahul.singh@example.com', joined: '1 week ago' },
    { id: 4, name: 'Neha Gupta', email: 'neha.gupta@example.com', joined: '1 week ago' },
  ];
  
  const recentContent = [
    { id: 1, title: 'Bhagavad Gita', type: 'book', author: 'Admin', added: '1 day ago' },
    { id: 2, title: 'Understanding Dharma', type: 'teaching', author: 'Admin', added: '3 days ago' },
    { id: 3, title: 'Ramayana Audiobook', type: 'audiobook', author: 'Admin', added: '5 days ago' },
    { id: 4, title: 'Mahabharata', type: 'book', author: 'Admin', added: '1 week ago' },
  ];
  
  const quickActions = [
    { title: 'Add New User', icon: UserPlus, path: '/admin/users/new' },
    { title: 'Add New Book', icon: BookPlus, path: '/admin/books/new' },
    { title: 'Add New Teaching', icon: VideoIcon, path: '/admin/teachings/new' },
    { title: 'Add New Audiobook', icon: Headphones, path: '/admin/audiobooks/new' },
  ];
  
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of the Sanatani platform
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs flex items-center ${
                stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader className="pb-3 flex items-center justify-between">
            <div>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Recently registered users</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link to="/admin/users">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Joined {user.joined}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-3 flex items-center justify-between">
            <div>
              <CardTitle>Recent Content</CardTitle>
              <CardDescription>Recently added content</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link to="/admin/books">
                  Books
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link to="/admin/teachings">
                  Teachings
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContent.map((content) => (
                <div key={content.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {content.type === 'book' ? <BookOpen className="h-4 w-4" /> :
                       content.type === 'teaching' ? <VideoIcon className="h-4 w-4" /> :
                       <Headphones className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{content.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{content.type}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Added {content.added}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used admin actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <Button key={i} asChild variant="outline" className="h-auto py-4 flex flex-col gap-2 justify-center items-center">
                <Link to={action.path}>
                  <action.icon className="h-8 w-8 mb-2" />
                  <span>{action.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}