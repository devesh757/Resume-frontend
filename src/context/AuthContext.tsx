import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isUser = (v: unknown): v is User =>
  typeof v === 'object' && v !== null && !Array.isArray(v) &&
  typeof (v as User).name === 'string' && typeof (v as User).email === 'string';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setUser(isUser(data) ? data : null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(isUser((data as { user?: unknown })?.user) ? (data as { user: User }).user : null);
  };

  const signup = async (name: string, email: string, password: string) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    setUser(isUser((data as { user?: unknown })?.user) ? (data as { user: User }).user : null);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore server errors; always clear local session
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
