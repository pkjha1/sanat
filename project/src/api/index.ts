import { handleRequest as handleClerkWebhook } from './clerk-webhook';

// API route handler
export async function handleRequest(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Route requests to appropriate handlers
  switch (path) {
    case '/api/clerk-webhook':
      return handleClerkWebhook(request);
    default:
      return new Response('Not found', { status: 404 });
  }
}