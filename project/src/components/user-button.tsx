import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserButton as ClerkUserButton } from '@clerk/clerk-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function UserButton() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  // Check if Clerk is available
  const isClerkAvailable = typeof window !== 'undefined' && 
    window.Clerk && 
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_your_clerk_publishable_key';
  
  // For demo purposes without Clerk, use a dropdown menu
  const handleProfileClick = () => {
    navigate('/dashboard');
  };
  
  if (isClerkAvailable) {
    return (
      <ClerkUserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonAvatarBox: "h-8 w-8",
          }
        }}
        afterSwitchSessionUrl="/"
      />
    );
  }
  
  return (
    <Button variant="ghost" size="icon" onClick={handleProfileClick}>
      <User className="h-5 w-5" />
    </Button>
  );
}