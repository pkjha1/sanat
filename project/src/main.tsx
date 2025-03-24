import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/auth-context';
import { config } from './lib/config';

// Create a ClerkProviderWrapper to handle both cases
function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  // If we have a valid key, use the real ClerkProvider
  if (config.clerk.publishableKey && config.clerk.publishableKey !== 'your_clerk_publishable_key') {
    return (
      <ClerkProvider 
        publishableKey={config.clerk.publishableKey}
        signInUrl={config.clerk.signInUrl}
        signUpUrl={config.clerk.signUpUrl}
        afterSignInUrl={config.clerk.afterSignInUrl}
        afterSignUpUrl={config.clerk.afterSignUpUrl}
      >
        {children}
      </ClerkProvider>
    );
  }
  
  // Otherwise, render without Clerk integration
  console.warn('No valid Clerk publishable key found. Using Supabase auth only.');
  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProviderWrapper>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ClerkProviderWrapper>
  </StrictMode>
);