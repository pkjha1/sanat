import { createEnvGuard } from './env-guard';

// Define environment variables schema
const envGuard = createEnvGuard({
  // Supabase
  VITE_SUPABASE_URL: {},
  VITE_SUPABASE_ANON_KEY: {},

  // Clerk
  VITE_CLERK_PUBLISHABLE_KEY: {},
  CLERK_SECRET_KEY: {},
  VITE_CLERK_SIGN_IN_URL: { default: '/sign-in' },
  VITE_CLERK_SIGN_UP_URL: { default: '/sign-up' },
  VITE_CLERK_AFTER_SIGN_IN_URL: { default: '/' },
  VITE_CLERK_AFTER_SIGN_UP_URL: { default: '/' },
  VITE_CLERK_WEBHOOK_SECRET: {},

  // Google Maps
  VITE_GOOGLE_MAPS_API_KEY: {},

  // ElevenLabs Convai
  VITE_CONVAI_AGENT_ID: {},
});

// Export environment variables with type safety
export const config = {
  supabase: {
    url: envGuard.VITE_SUPABASE_URL,
    anonKey: envGuard.VITE_SUPABASE_ANON_KEY,
  },
  clerk: {
    publishableKey: envGuard.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: envGuard.CLERK_SECRET_KEY,
    webhookSecret: envGuard.VITE_CLERK_WEBHOOK_SECRET,
    signInUrl: envGuard.VITE_CLERK_SIGN_IN_URL,
    signUpUrl: envGuard.VITE_CLERK_SIGN_UP_URL,
    afterSignInUrl: envGuard.VITE_CLERK_AFTER_SIGN_IN_URL,
    afterSignUpUrl: envGuard.VITE_CLERK_AFTER_SIGN_UP_URL,
  },
  googleMaps: {
    apiKey: envGuard.VITE_GOOGLE_MAPS_API_KEY,
  },
  convai: {
    agentId: envGuard.VITE_CONVAI_AGENT_ID,
  },
} as const;