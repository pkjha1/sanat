import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { useSubscription } from '@/hooks/use-subscription';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requireSubscription?: string;
}

export function RouteGuard({ 
  children, 
  requireAuth = false,
  requireAdmin = false,
  requireSubscription
}: RouteGuardProps) {
  const { user, isLoading, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const { hasAccess, isLoading: isSubscriptionLoading } = useSubscription(
    user?.id,
    requireSubscription
  );

  // Check if Clerk is available
  const isClerkAvailable = typeof window !== 'undefined' && 
    window.Clerk && 
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_your_clerk_publishable_key';

  // Show loading state while checking authentication or subscription
  if (isLoading || (requireSubscription && isSubscriptionLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check authentication
  if (requireAuth && !user) {
    // If Clerk is available, redirect to sign-in page
    if (isClerkAvailable && window.Clerk) {
      window.Clerk.openSignIn({
        redirectUrl: location.pathname,
        afterSignInUrl: location.pathname,
      });
      
      // Return a minimal redirect to home page (will be interrupted by modal)
      return <Navigate to="/" replace />;
    } else {
      // Fallback to regular redirect when Clerk is not available
      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
  }

  // Check admin permissions
  if (requireAdmin && !isAdmin) {
    // If admin access is required but user is not an admin, redirect to home
    return <Navigate to="/" replace />;
  }

  // Check subscription access
  if (requireSubscription && !hasAccess) {
    // Redirect to subscription page if user doesn't have access to this module
    return <Navigate to="/dashboard/subscription" state={{ module: requireSubscription }} replace />;
  }

  // If user meets all requirements, render the children
  return <>{children}</>;
}