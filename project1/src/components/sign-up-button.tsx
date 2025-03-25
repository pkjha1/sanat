import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export function SignUpButton() {
  const navigate = useNavigate();
  
  const handleSignUp = async () => {
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
      console.error('Error signing up:', error);
    }
  };
  
  return (
    <Button onClick={handleSignUp}>
      Sign up
    </Button>
  );
}