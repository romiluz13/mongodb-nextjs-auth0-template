import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import type { IUser } from '../mongodb/models/User';

export function useAuth() {
  const { user: auth0User, error, isLoading } = useUser();
  const [dbUser, setDbUser] = useState<IUser | null>(null);
  const [isDbLoading, setIsDbLoading] = useState(true);

  useEffect(() => {
    async function fetchDbUser() {
      if (auth0User) {
        try {
          const response = await fetch('/api/user');
          if (response.ok) {
            const data = await response.json();
            setDbUser(data);
          } else {
            console.error('Failed to fetch MongoDB user data');
          }
        } catch (error) {
          console.error('Error fetching MongoDB user:', error);
        }
      } else {
        setDbUser(null);
      }
      setIsDbLoading(false);
    }

    fetchDbUser();
  }, [auth0User]);

  return {
    user: auth0User,
    dbUser,
    error,
    isLoading: isLoading || isDbLoading,
  };
}