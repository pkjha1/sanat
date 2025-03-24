import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SignInButton as ClerkSignInButton } from '@clerk/clerk-react';

export function SignInButton() {
  const navigate = useNavigate();
  
  // Check if Clerk is available
  const isClerkAvailable = typeof window !== 'undefined' && 
    window.Clerk && 
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_your_clerk_publishable_key';
  
  // For demo purposes without Clerk, just navigate to dashboard
  const handleLoginDemo = () => {
    // In a real app, you would implement Supabase login here
    navigate('/dashboard');
  };
  
  if (isClerkAvailable) {
    return (
      <ClerkSignInButton mode="modal" afterSignInUrl="/dashboard" redirectUrl="/auth/clerk-redirect">
        <Button size="sm">Log in</Button>
      </ClerkSignInButton>
    );
  }
  
  return (
    <Button size="sm" onClick={handleLoginDemo}>
      Log in
    </Button>
  );
}