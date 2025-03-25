import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export function SignInButton() {
  const navigate = useNavigate();
  
  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
      if (data) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };
  
  return (
    <Button size="sm" onClick={handleSignIn}>
      Log in
    </Button>
  );
}