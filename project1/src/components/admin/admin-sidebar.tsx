import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  VideoIcon,
  Headphones,
  BookText,
  MapPin,
  Settings,
  DollarSign,
  LogOut,
  ChevronRight,
  CreditCard
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function AdminSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return path !== '/admin' && location.pathname.startsWith(path);
  };
  
  const sidebarLinks = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: 'Subscriptions',
      path: '/admin/subscriptions',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: 'Books',
      path: '/admin/books',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: 'Teachings',
      path: '/admin/teachings',
      icon: <VideoIcon className="h-5 w-5" />,
    },
    {
      name: 'Audiobooks',
      path: '/admin/audiobooks',
      icon: <Headphones className="h-5 w-5" />,
    },
    {
      name: 'Stories',
      path: '/admin/stories',
      icon: <BookText className="h-5 w-5" />,
    },
    {
      name: 'Religious Places',
      path: '/admin/religious-places',
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      name: 'Donations',
      path: '/admin/donations',
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  
  return (
    <div className="w-64 hidden md:block">
      <div className="h-full flex flex-col border-r">
        <div className="p-6">
          <Link to="/admin" className="flex items-center gap-2 mb-6">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Admin Dashboard</span>
          </Link>
          
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Button
                key={link.path}
                variant={isActive(link.path) ? "secondary" : "ghost"}
                asChild
                className={`w-full justify-start gap-3 ${isActive(link.path) ? "bg-secondary" : ""}`}
              >
                <Link to={link.path}>
                  {link.icon}
                  <span className="flex-1 text-left">{link.name}</span>
                  {isActive(link.path) && <ChevronRight className="h-4 w-4 ml-2" />}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}