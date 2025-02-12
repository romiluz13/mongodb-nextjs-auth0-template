"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { IUser } from "../mongodb/models/User";

interface AuthContextType {
  isLoading: boolean;
  error?: Error;
  user?: {
    email?: string;
    email_verified?: boolean;
    name?: string;
    nickname?: string;
    picture?: string;
    sub?: string;
    updated_at?: string;
  };
  dbUser: IUser | null;
}

export const AuthContext = React.createContext<AuthContextType>({
  isLoading: true,
  dbUser: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useUser();
  const [dbUser, setDbUser] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    async function fetchDbUser() {
      if (auth.user) {
        try {
          const response = await fetch('/api/user');
          if (response.ok) {
            const data = await response.json();
            setDbUser(data);
          }
        } catch (error) {
          console.error('Error fetching MongoDB user:', error);
        }
      } else {
        setDbUser(null);
      }
    }

    fetchDbUser();
  }, [auth.user]);

  return (
    <AuthContext.Provider value={{ ...auth, dbUser }}>
      {children}
    </AuthContext.Provider>
  );
}
