import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SignUpButton as ClerkSignUpButton } from '@clerk/clerk-react';

export function SignUpButton() {
  const navigate = useNavigate();
  
  // Check if Clerk is available
  const isClerkAvailable = typeof window !== 'undefined' && 
    window.Clerk && 
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_your_clerk_publishable_key';
  
  // For demo purposes without Clerk, just navigate to dashboard
  const handleSignupDemo = () => {
    // In a real app, you would implement Supabase signup here
    navigate('/dashboard');
  };
  
  if (isClerkAvailable) {
    return (
      <ClerkSignUpButton mode="modal" afterSignUpUrl="/dashboard" redirectUrl="/auth/clerk-redirect">
        <Button>Sign up</Button>
      </ClerkSignUpButton>
    );
  }
  
  return (
    <Button onClick={handleSignupDemo}>
      Sign up
    </Button>
  );
}