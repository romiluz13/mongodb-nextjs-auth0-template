import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import "./globals.css";

export const metadata = {
  title: 'MongoDB Next.js Auth0 Template',
  description: 'A production-ready template for building full-stack applications with MongoDB, Next.js 14, and Auth0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <AuthProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </AuthProvider>
        </UserProvider>
      </body>
    </html>
  );
}
