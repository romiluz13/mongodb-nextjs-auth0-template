# MongoDB Next.js Auth0 Template

A production-ready template for building modern full-stack applications with MongoDB, Next.js 14, and Auth0. This template provides enterprise-grade authentication, robust data management, and optimal performance configurations out of the box.

[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Next JS](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=for-the-badge&logo=auth0&logoColor=white)](https://auth0.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

## Features

### 🔒 Authentication & Security
- Auth0 integration with social providers and enterprise SSO
- Role-based access control
- Secure session management
- HTTP security headers pre-configured
- CSRF protection
- XSS prevention

### 📦 MongoDB Integration
- Type-safe Mongoose models
- Automatic user synchronization
- Connection pooling and caching
- Efficient database operations
- Custom data storage support

### ⚡ Performance Optimizations
- Next.js 14 App Router
- Server Components
- Turbopack bundling
- Image optimization with Sharp
- CSS optimization
- Bundle analysis tools
- SWR for smart data fetching

### 🛠️ Developer Experience
- Full TypeScript support
- Jest testing setup
- ESLint configuration
- Tailwind CSS
- Hot reloading
- Performance monitoring
- Type checking

## 🚀 Quick Start

Get up and running in less than 5 minutes:

```bash
# Clone the repository
git clone https://github.com/romiluz13/mongodb-nextjs-auth0-template.git my-app

# Navigate to project directory
cd my-app

# Install dependencies
npm install
```

### 1. Set Up MongoDB

```bash
# Option 1: MongoDB Atlas (Recommended for production)
- Create a free cluster at https://mongodb.com/atlas
- Get your connection string
- Add your IP to the access list

# Option 2: Local MongoDB (Quick start for development)
- Install MongoDB Community Edition
- Start local MongoDB server
- Use connection string: mongodb://localhost:27017/your-database
```

### 2. Configure Auth0

```bash
# 1. Create Auth0 Account and Application
- Sign up at https://auth0.com
- Create a new application
- Choose "Regular Web Application"

# 2. Configure Auth0 URLs
Allowed Callback URLs: http://localhost:3000/api/auth/callback
Allowed Logout URLs: http://localhost:3000
Allowed Web Origins: http://localhost:3000

# 3. Get Auth0 Credentials
- Domain
- Client ID
- Client Secret
```

### 3. Set Up Environment

```bash
# Copy the example environment file
cp .env.example .env.local

# Update with your credentials
AUTH0_SECRET='use [openssl rand -hex 32] to generate'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN'
AUTH0_CLIENT_ID='your_client_id'
AUTH0_CLIENT_SECRET='your_client_secret'
MONGODB_URI='your_mongodb_uri'
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - You should see the landing page! 🎉

### 5. Test Authentication Flow

1. Click "Start Building" to log in
2. You'll be redirected to Auth0
3. After login, you'll see the dashboard
4. Check MongoDB - a new user document should be created!

## 🔍 What's Included?

```typescript
// Example: Access authenticated user data
import { useAuth } from '@/lib/hooks/useAuth';

export default function Dashboard() {
  const { user, dbUser } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {dbUser?.name}!</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
}
```

### Key Features Ready to Use:

- 🔐 **Authentication**: Complete Auth0 integration
- 📦 **Database**: MongoDB with TypeScript models
- 🚀 **Performance**: Optimized Next.js 14 setup
- 🛡️ **Security**: Pre-configured headers & validation
- 📊 **Analytics**: Vercel integration ready
- 🎨 **UI**: Tailwind CSS with modern design

## Prerequisites

- Node.js >= 18.17.0
- MongoDB Atlas account or local MongoDB instance
- Auth0 account

## Available Scripts

- \`npm run dev\`: Start development server
- \`npm run build\`: Build for production
- \`npm start\`: Start production server
- \`npm run lint\`: Run ESLint
- \`npm run test\`: Run tests
- \`npm run analyze\`: Analyze bundle size
- \`npm run type-check\`: Run TypeScript checks

## Project Structure

```
├── src/
│   ├── app/                 # Next.js 14 App Router pages
│   │   ├── api/            # API routes
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   └── lib/               # Core utilities
│       ├── mongodb/       # MongoDB configuration & models
│       │   ├── models/    # Database models
│       │   └── utils/     # Database utilities
│       ├── hooks/         # Custom React hooks
│       └── contexts/      # React contexts
├── public/                # Static files
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── next.config.mjs      # Next.js configuration
├── package.json         # Project dependencies
├── README.md           # Project documentation
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## MongoDB Integration

### User Model
The template includes a pre-configured User model that syncs with Auth0:

```typescript
interface IUser {
  auth0Id: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  customData?: Record<string, unknown>;
  // ... other fields
}
```

### Database Operations
```typescript
// Example: Get user data
const { dbUser } = useAuth();

// Example: Update custom data
await updateUserCustomData(auth0Id, {
  preferences: { theme: 'dark' }
});
```

## Performance Features

- **Image Optimization**: Automatic WebP/AVIF conversion
- **Bundle Analysis**: Built-in bundle size monitoring
- **Performance Monitoring**: Vercel Analytics integration
- **Smart Caching**: SWR for efficient data fetching
- **CSS Optimization**: Automated CSS minification
- **Type Safety**: Full TypeScript integration

## Security Features

- **Headers**: Pre-configured security headers
- **Authentication**: Auth0's enterprise-grade auth
- **Data Validation**: Zod schema validation
- **CORS**: Configured cross-origin policies
- **CSP**: Content Security Policy setup
- **Input Sanitization**: Built-in XSS protection

## Deployment

1. **Prepare for Production**
   ```bash
   npm run build
   ```

2. **Update Auth0 Configuration**
   - Add production URLs to Auth0 dashboard
   - Update environment variables

3. **Deploy to Vercel**
   ```bash
   vercel deploy
   ```

4. **Alternative Deployment**
   - Update \`next.config.mjs\` as needed
   - Configure environment variables
   - Deploy to your hosting provider

## Best Practices

- Keep MongoDB connection alive with connection pooling
- Use SWR for data fetching
- Implement proper error handling
- Follow the security guidelines
- Run type checks before deployment
- Monitor bundle sizes

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

- [MongoDB Documentation](https://docs.mongodb.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Auth0 Documentation](https://auth0.com/docs)
- [Create Issue](https://github.com/mongodb/nextjs-auth0-template/issues)

## License

MIT © [MongoDB](https://www.mongodb.com)

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://www.linkedin.com/in/rom-iluz/">Rom Iluz</a> at MongoDB</sub>
</div>