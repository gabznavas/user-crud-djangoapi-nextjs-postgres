'use client';

import { useState } from "react";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);

        setSuccess('Login realizado com sucesso');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (error) {
      setError('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error, success };
}
