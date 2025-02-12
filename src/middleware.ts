import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  matcher: [
    '/api/user/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    // Add more protected routes here
  ],
}; 