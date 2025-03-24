// Add Clerk type declarations for global window object
// This helps TypeScript recognize the Clerk object on window
interface Window {
  Clerk?: {
    openSignIn: (options: {
      redirectUrl?: string;
      afterSignInUrl?: string;
    }) => void;
  };
}