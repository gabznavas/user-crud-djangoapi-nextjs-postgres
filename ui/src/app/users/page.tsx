'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUser, { User } from '../hooks/use-user';


export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    getUsers, deleteUser, isLoading, error, success
  } = useUser();

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      setUsers(users);
    })()
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    deleteUser(id).then(() => {
      setUsers(prev => prev.filter(user => user.id !== id));
    })
      .catch((error) => {
        if (error instanceof Error) {
          setGlobalError(error.message);
        } else {
          setGlobalError('Erro ao excluir usuário');
        }
      })
  }
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <button
          onClick={() => router.push('/users/new')}
          className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Novo Usuário
        </button>
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
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.fullname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => router.push(`/users/${user.id}`)}
                    className="cursor-pointer bg-amber-500 font-bold text-white px-4 py-2 rounded-md hover:bg-amber-600 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="cursor-pointer bg-red-500 font-bold text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}