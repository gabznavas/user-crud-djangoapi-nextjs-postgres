'use client'

import { createContext, useContext, ReactNode, useEffect, useState } from 'react'

type AuthContextType = {
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setToken: (token: string) => void
  logout: () => void
}

const tokenKey = 'token';

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(tokenKey);
    if (storedToken) {
      setTokenState(storedToken);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const setToken = (newToken: string) => {
    localStorage.setItem(tokenKey, newToken);
    setTokenState(newToken);
    setIsAuthenticated(true);
  }

  const logout = () => {
    localStorage.clear();
    setTokenState(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ token, isLoading, isAuthenticated, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
