'use client';

import { useState } from "react";
import useToken from "./use-token";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { setToken } = useToken();


  const register = async (fullname: string, email: string, password: string): Promise<boolean> => {
    reset();

    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/register/';
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ fullname, email, password }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      const data = await response.json();
      if (response.ok) {
        reset();
        setToken(data.token);
        setSuccess('Usuário registrado com sucesso');
        return true;
      } else {
        if (data.details) {
          setError(data.details);
        } else {
          setError('Erro ao registrar usuário');
        }
        return false;
      }
    } catch (error) {
      setError('Erro ao registrar usuário');
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setSuccess(null);
  }

  return { register, isLoading, error, success };
}

