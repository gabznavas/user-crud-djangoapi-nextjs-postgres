'use client'

import { useEffect, useState } from "react";

const tokenKey = 'token';

export default function useToken() {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      setTokenState(token);
    }
  }, []);

  const getToken = () => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      setTokenState(token);
    }
    return token;
  }

  const setToken = (token: string) => {
    localStorage.setItem(tokenKey, token);
    setTokenState(token);
  }

  const logout = () => {
    localStorage.clear();
  }

  return {
    token: !token ? getToken() : token,
    isAuthenticated: !!token,
    setToken,
    logout
  };
}