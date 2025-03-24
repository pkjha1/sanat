import { createClient } from '@supabase/supabase-js';
import { config } from '@/lib/config';

// Initialize the Supabase client
export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'x-application-name': 'sanatani'
      }
    }
  }
);

// Helper to check if Supabase connection is working
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('count').single();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
}