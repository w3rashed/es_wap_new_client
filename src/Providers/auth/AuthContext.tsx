'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';

type User = {
  name: string;
  email: string;
  access: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    const name = Cookies.get('name');
    const email = Cookies.get('email');

    if (token && name && email) {
      setUser({ access: token, name, email });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // Cookies.set('token', userData.access, { expires: 1 });
    Cookies.set('email', userData.email, { expires: 1 });
    Cookies.set('name', userData.name, { expires: 1 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('token');
    Cookies.remove('email');
    Cookies.remove('name');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
