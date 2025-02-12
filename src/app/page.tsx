import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl text-center px-4">
        {/* Hero Section */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Image
            src="https://raw.githubusercontent.com/mongodb/mongo/master/docs/leaf.svg"
            alt="MongoDB Logo"
            width={50}
            height={50}
            className="animate-pulse"
          />
          <span className="text-4xl font-bold">+</span>
          <div className="text-black font-bold text-4xl">Auth0</div>
          <span className="text-4xl font-bold">+</span>
          <div className="text-black">
            <span className="font-bold text-4xl text-[#0070f3]">Next.js</span>
          </div>
        </div>

        <h1 className="mb-4 text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
          Build Your Next Big Thing
        </h1>
        
        <p className="mb-8 text-xl text-gray-600 max-w-2xl mx-auto">
          Start with the perfect foundation: MongoDB's powerful database, Auth0's enterprise authentication, 
          and Next.js 14's cutting-edge framework.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="text-green-500 text-lg font-semibold mb-2">🍃 MongoDB</div>
            <p className="text-gray-600">Type-safe schemas, real-time capable, with built-in user synchronization</p>
          </div>
          <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="text-orange-500 text-lg font-semibold mb-2">🔐 Auth0</div>
            <p className="text-gray-600">Enterprise SSO, social logins, and role-based access control</p>
          </div>
          <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="text-blue-500 text-lg font-semibold mb-2">⚡ Next.js 14</div>
            <p className="text-gray-600">App router, server components, and API routes with full TypeScript support</p>
          </div>
        </div>

        {/* Code Preview */}
        <div className="mb-12 text-left">
          <div className="bg-gray-900 rounded-lg p-4 overflow-hidden shadow-lg">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`// Your application code starts here
import { useAuth } from '@/lib/hooks/useAuth';

export default function Dashboard() {
  const { user, dbUser } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {dbUser?.name}! 👋</h1>
      <p>Build something amazing!</p>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/api/auth/login"
            className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Building →
          </Link>
          <a
            href="https://github.com/mongodb/nextjs-auth0-template"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 text-lg font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Tech Badge */}
        <div className="mt-12 text-sm text-gray-500">
          Built with TypeScript, Tailwind CSS, and MongoDB best practices
        </div>

        {/* Credits - Subtle but meaningful */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="text-sm text-gray-400 flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center space-x-2">
              <span>Crafted with 💚 by</span>
              <a
                href="https://www.linkedin.com/in/rom-iluz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Rom Iluz
              </a>
            </div>
            <div className="flex items-center space-x-1">
              <span>at</span>
              <Image
                src="https://raw.githubusercontent.com/mongodb/mongo/master/docs/leaf.svg"
                alt="MongoDB"
                width={16}
                height={16}
                className="inline-block"
              />
              <span className="font-medium">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
