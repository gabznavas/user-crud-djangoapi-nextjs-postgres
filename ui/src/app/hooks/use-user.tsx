'use client';

import { useState } from "react";
import useToken from "./use-token";
import { PaginatedList } from "./types";
import { set } from "react-hook-form";

export type User = {
  id: number;
  fullname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}


export default function useUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { token } = useToken();

  const getUsers = async (page: number = 1, pageSize: number = 10, query: string = ''): Promise<PaginatedList<User>> => {
    setIsLoading(true);
    try {
      const url =
        `${process.env.NEXT_PUBLIC_API_URL}/user?page=${page}&page_size=${pageSize}&query=${query}`;
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
      return {
        data: data.data as User[],
        page: data.page,
        pageSize: data.page_size,
        total: data.total,
        totalPages: data.total_pages,
        hasNext: data.has_next,
        hasPrevious: data.has_previous,
        next: data.next,
        previous: data.previous
      };
    } catch (error) {
      setError(error instanceof Error
        ? error.message
        : 'Erro ao carregar usuários');
      return {
        data: [],
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false,
        next: null,
        previous: null
      };
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
        setError(data.details);
        throw new Error('Erro ao carregar usuário');
      } else {
        setError('Erro ao carregar usuário');
        throw new Error('Erro ao carregar usuário');
      }
    } else {
      const data = await response.json();
      return {
        id: data.id,
        fullname: data.fullname,
        email: data.email,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    }
  }

  const getUserLogged = async (): Promise<User> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/logged/`;
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
    getUserLogged,
    isLoading,
    error,
    success
  };
}