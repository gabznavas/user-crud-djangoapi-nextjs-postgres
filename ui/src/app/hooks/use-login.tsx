'use client';

import { useState } from "react";
import useToken from "./use-token";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { setToken } = useToken();

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/login/';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        const { token } = await response.json();
        setToken(token)

        setSuccess('Login realizado com sucesso');
        return true;
      } else {
        setError('Email ou senha inválidos');
        return false;
      }
    } catch {
      setError('Erro ao fazer login');
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error, success };
}
