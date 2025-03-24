import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home,
  BookOpen, 
  Video, 
  Headphones, 
  BookText, 
  Bot as Lotus,
  MapPin,
  LayoutDashboard,
  ScrollText,
  Bookmark,
  Settings,
  Menu,
  X
} from 'lucide-react';

export function MobileBottomMenu() {
  const location = useLocation();
  const path = location.pathname;
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  
  // Additional menu items for the "More" menu
  const moreMenuItems = [
    {
      icon: BookText,
      label: 'Stories',
      href: '/stories'
    },
    {
      icon: Lotus,
      label: 'Bliss Talk',
      href: '/bliss-talk'
    },
    {
      icon: MapPin,
      label: 'Places',
      href: '/religious-places'
    }
  ];

  // Define menu items based on the current route
  const getMenuItems = () => {
    // Dashboard routes
    if (path.startsWith('/dashboard')) {
      return [
        {
          icon: LayoutDashboard,
          label: 'Dashboard',
          href: '/dashboard',
          active: path === '/dashboard'
        },
        {
          icon: ScrollText,
          label: 'Progress',
          href: '/dashboard/progress',
          active: path === '/dashboard/progress'
        },
        {
          icon: Bookmark,
          label: 'Bookmarks',
          href: '/dashboard/bookmarks',
          active: path === '/dashboard/bookmarks'
        },
        {
          icon: Settings,
          label: 'Settings',
          href: '/dashboard/settings',
          active: path === '/dashboard/settings'
        }
      ];
    }
    
    // Admin routes
    if (path.startsWith('/admin')) {
      return [
        {
          icon: LayoutDashboard,
          label: 'Dashboard',
          href: '/admin',
          active: path === '/admin'
        },
        {
          icon: BookOpen,
          label: 'Content',
          href: '/admin/content',
          active: path === '/admin/content'
        },
        {
          icon: Settings,
          label: 'Settings',
          href: '/admin/settings',
          active: path === '/admin/settings'
        }
      ];
    }
    
    // Default public routes
    return [
      {
        icon: Home,
        label: 'Home',
        href: '/',
        active: path === '/'
      },
      {
        icon: BookOpen,
        label: 'Books',
        href: '/books',
        active: path.startsWith('/books')
      },
      {
        icon: Video,
        label: 'Teachings',
        href: '/teachings',
        active: path.startsWith('/teachings')
      },
      {
        icon: Headphones,
        label: 'Audio',
        href: '/audiobooks',
        active: path.startsWith('/audiobooks')
      },
      {
        icon: isMoreMenuOpen ? X : Menu,
        label: 'More',
        onClick: () => setIsMoreMenuOpen(!isMoreMenuOpen),
        active: isMoreMenuOpen
      }
    ];
  };

  const menuItems = getMenuItems();

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t safe-bottom">
        <nav className="container px-0">
          <ul className="flex items-center justify-around">
            {menuItems.map((item, index) => (
              <li key={index} className="flex-1">
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className={cn(
                      "w-full flex flex-col items-center gap-1.5 py-3 text-xs transition-colors",
                      item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "flex flex-col items-center gap-1.5 py-3 text-xs transition-colors",
                      item.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* More Menu */}
      {isMoreMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="fixed bottom-[4.5rem] inset-x-0 bg-background border-t animate-slide-up">
            <nav className="container py-4">
              <ul className="grid grid-cols-3 gap-4">
                {moreMenuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted text-center"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}