import { Webhook } from 'svix';
import { supabase } from '@/lib/supabase';
import { config } from '@/lib/config';

// Helper function to convert Clerk user data into our application format
export const mapClerkUserToAppUser = (clerkUser: any) => {
  return {
    id: clerkUser.id,
    email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
    firstName: clerkUser.firstName || '',
    lastName: clerkUser.lastName || '',
    fullName: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
    imageUrl: clerkUser.imageUrl || '',
    role: clerkUser.publicMetadata?.role || 'user',
    createdAt: clerkUser.createdAt || new Date().toISOString(),
  };
};

// Sync user data from Clerk to Supabase
export const syncUserToSupabase = async (user: any, supabase: any) => {
  try {
    // First check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    // If user doesn't exist, create them
    if (!existingUser) {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          full_name: user.fullName,
          avatar_url: user.imageUrl,
          role: user.role,
          created_at: user.createdAt,
          updated_at: new Date().toISOString(),
        })
        .select();

      if (error) throw error;
      return data;
    }

    // If user exists, update their data
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: user.fullName,
        avatar_url: user.imageUrl,
        role: user.role,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error syncing user to Supabase:', error);
    throw error;
  }
};

// Webhook handler for Clerk events
export async function handleClerkWebhook(request: Request) {
  const WEBHOOK_SECRET = config.clerk.webhookSecret;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
  }

  // Get the headers
  const svix_id = request.headers.get('svix-id');
  const svix_timestamp = request.headers.get('svix-timestamp');
  const svix_signature = request.headers.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  try {
    switch (eventType) {
      case 'user.created':
      case 'user.updated':
        // Map and sync user data to Supabase
        const user = mapClerkUserToAppUser(evt.data);
        await syncUserToSupabase(user, supabase);
        break;

      case 'user.deleted':
        // User will be automatically deleted from profiles table due to CASCADE
        break;

      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}
