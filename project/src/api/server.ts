import { handleRequest } from './index';

// Create server
const server = Bun.serve({
  port: process.env.PORT || 3000,
  async fetch(request) {
    try {
      return await handleRequest(request);
    } catch (error) {
      console.error('Server error:', error);
      return new Response('Internal server error', { status: 500 });
    }
  },
});

console.log(`Server running at http://localhost:${server.port}`);