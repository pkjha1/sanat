import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, VideoIcon, Headphones, BookText, Bot as Lotus } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useSubscription } from '@/hooks/use-subscription';

export function NavbarLinks() {
  const location = useLocation();
  const { user } = useAuth();
  const { hasAccess } = useSubscription(user?.id);
  
  // Check active link
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  // Content links that require subscription
  const contentLinks = [
    {
      name: 'Books',
      path: '/books',
      icon: BookOpen,
      module: 'books'
    },
    {
      name: 'Teachings',
      path: '/teachings',
      icon: VideoIcon,
      module: 'teachings'
    },
    {
      name: 'Audiobooks',
      path: '/audiobooks',
      icon: Headphones,
      module: 'audiobooks'
    },
    {
      name: 'Stories',
      path: '/stories',
      icon: BookText,
      module: 'stories'
    },
    {
      name: 'Meditation',
      path: '/meditation',
      icon: Lotus,
      module: 'meditation'
    }
  ];
  
  return (
    <nav className="flex items-center space-x-4">
      {contentLinks.map((link) => (
        <Link 
          key={link.path}
          to={link.path}
          className={`flex items-center gap-1.5 px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors ${
            isActive(link.path) ? 'bg-muted font-medium' : ''
          }`}
        >
          <link.icon className="h-4 w-4" />
          <span>{link.name}</span>
        </Link>
      ))}
    </nav>
  );
}