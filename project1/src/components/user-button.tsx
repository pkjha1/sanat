import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function UserButton() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleProfileClick = () => {
    navigate('/dashboard');
  };
  
  return (
    <Button variant="ghost" size="icon" onClick={handleProfileClick}>
      <User className="h-5 w-5" />
    </Button>
  );
}