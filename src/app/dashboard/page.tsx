'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export default function Dashboard() {
  const { user, dbUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-green-500"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link
            href="/api/auth/logout"
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            Logout
          </Link>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold">User Profile</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <p className="font-medium">{user?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium">{user?.email || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Last Login</label>
                <p className="font-medium">
                  {dbUser?.lastLogin
                    ? new Date(dbUser.lastLogin).toLocaleString()
                    : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email Verified</label>
                <p className="font-medium">
                  {user?.email_verified ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">MongoDB Data</h2>
            <pre className="overflow-auto rounded bg-gray-100 p-4">
              {JSON.stringify(dbUser, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 