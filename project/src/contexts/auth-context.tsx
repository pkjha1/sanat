import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { supabase } from '@/lib/supabase';
import { syncUserToSupabase, mapClerkUserToAppUser } from '@/lib/clerk';
import { config } from '@/lib/config';

type User = {
  id: string;
  email: string;
  fullName: string;
  imageUrl: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize all state first
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check if Clerk is available
  const isClerkAvailable = Boolean(
    config.clerk.publishableKey && 
    config.clerk.publishableKey !== 'your_clerk_publishable_key'
  );
  
  // Initialize Clerk hooks conditionally
  const clerkUser = isClerkAvailable ? useUser().user : null;
  const clerkIsLoaded = isClerkAvailable ? useUser().isLoaded : true;
  const clerk = isClerkAvailable ? useClerk() : null;

  useEffect(() => {
    async function initAuth() {
      try {
        if (!isClerkAvailable) {
          // Supabase auth
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            // Get user profile from Supabase
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            // Create user object
            const supabaseUser: User = {
              id: session.user.id,
              email: session.user.email || '',
              fullName: profile?.full_name || '',
              imageUrl: profile?.avatar_url || '',
              role: profile?.role || 'user',
            };
            
            setUser(supabaseUser);
            setIsAdmin(supabaseUser.role === 'admin');
          } else {
            setUser(null);
            setIsAdmin(false);
          }
        } else if (clerkIsLoaded) {
          // Clerk auth
          if (clerkUser) {
            // Map Clerk user to our application user format
            const appUser = mapClerkUserToAppUser(clerkUser);
            setUser(appUser);
            
            // Check if user is admin based on their role
            const isUserAdmin = appUser.role === 'admin';
            setIsAdmin(isUserAdmin);
            
            // Sync user data to Supabase
            await syncUserToSupabase(appUser, supabase);
          } else {
            setUser(null);
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, [isClerkAvailable, clerkUser, clerkIsLoaded]);

  const signOut = async () => {
    try {
      if (isClerkAvailable && clerk) {
        await clerk.signOut();
      } else {
        await supabase.auth.signOut();
      }
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    isLoading,
    isAdmin,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};