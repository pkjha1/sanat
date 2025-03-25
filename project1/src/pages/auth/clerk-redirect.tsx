import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';

export function ClerkRedirectPage() {
  const navigate = useNavigate();
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Redirect to dashboard or home after Clerk authentication
      navigate('/dashboard');
    }
  }, [isLoading, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}