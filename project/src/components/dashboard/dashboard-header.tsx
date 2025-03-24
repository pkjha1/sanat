import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  // Helper function to get user's display name
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  };
  
  return (
    <header className="border-b sticky top-0 z-40 bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <svg 
              className="h-8 w-auto dark:invert" 
              viewBox="0 0 3136.66 741.2"
              aria-label="Sanatani"
            >
              {/* SVG path data */}
            </svg>
            <span className="font-semibold text-lg hidden md:inline-block">Sanatani</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Notifications" className="h-10 w-10">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium hidden md:inline-block">
              {getUserDisplayName()}
            </span>
            <Button variant="ghost" size="icon" asChild className="h-10 w-10">
              <Link to="/dashboard/settings">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden animate-slide-down">
          <div className="container py-4 px-4 space-y-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/dashboard/progress"
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <ScrollText className="h-5 w-5" />
              Reading Progress
            </Link>
            <Link
              to="/dashboard/bookmarks"
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <Bookmark className="h-5 w-5" />
              Bookmarks
            </Link>
            <Link
              to="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="h-5 w-5" />
              Account Settings
            </Link>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-11"
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
import { LayoutDashboard, ScrollText, Bookmark, Settings, LogOut } from 'lucide-react';