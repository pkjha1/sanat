import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Menu, Bell, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  // Helper function to get user's display name
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'Admin';
  };
  
  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', name: 'Users', icon: Users },
    { path: '/admin/books', name: 'Books', icon: BookOpen },
    { path: '/admin/teachings', name: 'Teachings', icon: VideoIcon },
    { path: '/admin/audiobooks', name: 'Audiobooks', icon: Headphones },
    { path: '/admin/stories', name: 'Stories', icon: BookText },
    { path: '/admin/religious-places', name: 'Religious Places', icon: MapPin },
    { path: '/admin/donations', name: 'Donations', icon: DollarSign },
    { path: '/admin/settings', name: 'Settings', icon: Settings },
  ];
  
  return (
    <header className="border-b sticky top-0 z-40 bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/admin" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Sanatani Admin</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            View Site
          </Link>
          
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium hidden md:inline-block">
              {getUserDisplayName()}
            </span>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin/settings">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container py-3 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => {
                signOut();
                setIsMenuOpen(false);
              }}
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

// Import missing components
import { LayoutDashboard, Users, VideoIcon, Headphones, BookText, MapPin, Settings, DollarSign, LogOut } from 'lucide-react';