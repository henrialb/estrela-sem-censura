'use client';

import Cookies from 'js-cookie';
import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { authApi, publicApi } from '@/lib/api';
import type { AuthContextType, User } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect runs only once on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = Cookies.get('auth_token');

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.get('/auth/me');
      setUser(response.data);
    } catch (_error) {
      Cookies.remove('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (accessToken: string) => {
    const response = await publicApi.post('/auth/facebook', {
      access_token: accessToken,
    });

    const { token, user } = response.data;
    Cookies.set('auth_token', token, { expires: 15 });
    setUser(user);
  };

  const logout = () => {
    Cookies.remove('auth_token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
