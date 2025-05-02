'use client'

import { useEffect, useState } from "react";

export default function useToken() {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setTokenState(token);
    }
  }, []);

  const setToken = (token: string) => {
    localStorage.setItem('token', token);
    setTokenState(token);
  }

  const logout = () => {
    localStorage.clear();
  }

  return { token, isAuthenticated: !!token, setToken, logout };
}