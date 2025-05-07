'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useUser, { User } from '../hooks/use-user';
import { PaginatedList } from '../hooks/types';
import { Button } from '@/components/ui/button';
import { PencilIcon, PlusIcon, Trash2Icon, UsersIcon } from 'lucide-react';
import ProtectedRoute from '@/components/protected-route';
import { useAuth } from '../contexts/auth-context';

const DEFAULT_PAGE_SIZE = 10;
const initialPaginatedUsers = (): PaginatedList<User> => ({
  data: [],
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: 0,
  totalPages: 0,
  hasNext: false,
  hasPrevious: false,
  next: null,
  previous: null
})

export default function UsersPage() {
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [paginetedUsers, setPaginetedUsers] =
    useState<PaginatedList<User>>(initialPaginatedUsers());
  const router = useRouter();

  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    getUsers, deleteUser, isLoading, error, success
  } = useUser();

  useEffect(() => {
    (async () => {
      const paginetedUsers: PaginatedList<User> = await getUsers(1, pageSize);
      setPaginetedUsers(paginetedUsers);
    })()
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    deleteUser(id).then(async () => {
      const paginatedUsers = initialPaginatedUsers();
      const newPaginatedUsers: PaginatedList<User> = await getUsers(paginatedUsers.page, paginatedUsers.pageSize);
      setPaginetedUsers(newPaginatedUsers);
    }).catch((error) => {
      if (error instanceof Error) {
        setGlobalError(error.message);
      } else {
        setGlobalError('Erro ao excluir usuário');
      }
    })
  }

  const handlePreviousPage = async (): Promise<void> => {
    const newPaginatedUsers: PaginatedList<User> = await getUsers(paginetedUsers.previous ?? 1, pageSize);
    setPaginetedUsers(newPaginatedUsers);
  }

  const handleNextPage = async (): Promise<void> => {
    const newPaginatedUsers: PaginatedList<User> = await getUsers(paginetedUsers.next ?? 1, pageSize);
    setPaginetedUsers(newPaginatedUsers);
  }

  const handlePage = async (page: number): Promise<void> => {
    const paginetedUsers: PaginatedList<User> = await getUsers(page, pageSize);
    setPaginetedUsers(paginetedUsers);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-4">
        <div className='flex flex-col gap-4'>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <UsersIcon className='w-6 h-6' />
              Usuários
            </h1>
            <Button
              onClick={() => router.push('/users/new')}
              className="cursor-pointer"
            >
              <PlusIcon className='w-4 h-4' />
              Novo Usuário
            </Button>
          </div>

          {isLoading && <div className='bg-gray-100 p-4 rounded-md mb-4'>Carregando...</div>}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          {globalError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {globalError}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-md shadow-md border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginetedUsers.data.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.fullname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className='flex gap-2'>
                        <Button
                          onClick={() => router.push(`/users/${user.id}`)}
                          className="cursor-pointer"
                          variant="outline"
                        >
                          <PencilIcon className='w-4 h-4' />
                          Editar
                        </Button>
                        <Button
                          onClick={() => handleDelete(user.id)}
                          className="cursor-pointer"
                          variant="outline"
                        >
                          <Trash2Icon className='w-4 h-4' />
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {paginetedUsers.totalPages > 1 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 px-4">
          <div className='flex justify-center items-center gap-1.5'>
            <Button
              disabled={!paginetedUsers.previous}
              className='cursor-pointer'
              onClick={() => handlePreviousPage()}>
              Anterior
            </Button>
            <ul className='flex items-center gap-0.5'>
              {Array.from({ length: paginetedUsers.totalPages }, (_, index) => (
                <li className='cursor-pointer' key={index}>
                  <Button
                    variant='outline'
                    className='cursor-pointer'
                    disabled={index + 1 === paginetedUsers.page}
                    onClick={() => handlePage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              disabled={!paginetedUsers.next}
              className='cursor-pointer'
              onClick={() => handleNextPage()}>
              Próximo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}