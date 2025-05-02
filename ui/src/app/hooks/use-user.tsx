import { useState } from "react";
import useToken from "./use-token";

export type User = {
  id: number;
  fullname: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export default function useUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { token } = useToken();

  const getUsers = async (): Promise<User[]> => {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/user`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.details) {
          throw new Error(data.details);
        } else {
          throw new Error('Erro ao carregar usuários');
        }
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error instanceof Error
        ? error.message
        : 'Erro ao carregar usuários');
      return [];
    } finally {
      setIsLoading(false);
    }
  }

  const getUser = async (id: string): Promise<User> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      if (data.details) {
        throw new Error(data.details);
      } else {
        throw new Error('Erro ao carregar usuário');
      }
    } else {
      const data = await response.json();
      return data;
    }
  }

  const createUser = async (email: string, fullname: string, password: string): Promise<void> => {
    reset()

    const url = `${process.env.NEXT_PUBLIC_API_URL}/register/`;
    const payload = {
      email,
      fullname,
      password
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json();
      if (data.details) {
        throw new Error(data.details);
      } else {
        throw new Error('Erro ao criar usuário');
      }
    } else {
      reset()
      setSuccess('Usuário criado com sucesso');
    }
  }

  const updateUser = async (id: string, email: string, fullname: string, password: string): Promise<void> => {
    reset()

    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/${id}/`;
    const payload = {
      email,
      fullname,
      password
    }
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json();
      if (data.details) {
        throw new Error(data.details);
      } else {
        throw new Error('Erro ao atualizar usuário');
      }
    } else {
      reset()
      setSuccess('Usuário atualizado com sucesso');
    }
  }

  const deleteUser = async (id: number): Promise<void> => {
    reset()

    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/${id}/`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      if (data.details) {
        throw new Error(data.details);
      } else {
        throw new Error('Erro ao excluir usuário');
      }
    } else {
      reset()
      setSuccess('Usuário excluído com sucesso');
    }
  }

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setSuccess(null);
  }

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    isLoading,
    error,
    success
  };
}