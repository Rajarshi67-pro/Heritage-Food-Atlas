'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'CONTRIBUTOR' | 'ADMIN';
  avatarUrl?: string | null;
  bio?: string | null;
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (token: string, userData: UserSession) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAdmin: boolean;
  isContributor: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: async () => {},
  refreshUser: async () => {},
  isAdmin: false,
  isContributor: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = (token: string, userData: UserSession) => {
    setUser(userData);
    localStorage.setItem('hfa_token', token);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('hfa_token');
    setUser(null);
    window.location.href = '/';
  };

  const isAdmin = user?.role === 'ADMIN';
  const isContributor = user?.role === 'CONTRIBUTOR' || user?.role === 'ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
        isAdmin,
        isContributor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
