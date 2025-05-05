'use client'

import { useState, useEffect } from "react";

const tokenKey = 'token';

export default function useToken() {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(tokenKey);
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  const getToken = () => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem(tokenKey);
      if (storedToken) {
        setTokenState(storedToken);
      }
      return storedToken;
    }
    return null;
  }

  const setToken = (newToken: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(tokenKey, newToken);
      setTokenState(newToken);
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      setTokenState(null);
    }
  }

  return {
    token: token || getToken(),
    isAuthenticated: !!token,
    setToken,
    logout
  };
}