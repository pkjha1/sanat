import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollText, Bookmark, Settings, UserCircle, LayoutDashboard, LogOut, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function DashboardSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const sidebarLinks = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Reading Progress',
      path: '/dashboard/progress',
      icon: <ScrollText className="h-5 w-5" />,
    },
    {
      name: 'Bookmarks',
      path: '/dashboard/bookmarks',
      icon: <Bookmark className="h-5 w-5" />,
    },
    {
      name: 'Subscription',
      path: '/dashboard/subscription',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: 'Account Settings',
      path: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  
  return (
    <div className="w-64 hidden md:block">
      <div className="h-full flex flex-col border-r">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <UserCircle className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">User Dashboard</span>
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
                  {link.name}
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