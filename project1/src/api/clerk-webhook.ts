import { handleClerkWebhook } from '@/lib/clerk';

// Handle Clerk webhook requests
export async function handleRequest(request: Request) {
  try {
    return await handleClerkWebhook(request);
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response('Webhook error', { status: 500 });
  }
}