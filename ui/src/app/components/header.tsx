'use client';

import { useRouter } from 'next/navigation';
import useToken from '../hooks/use-token';

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, logout } = useToken();

  const handleLogout = () => {
    logout();
    router.push('/login');
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">CRUD</h1>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => router.push('/users')}
                  className="cursor-pointer text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Usuários
                </button>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 hover:text-red-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="text-indigo-600 hover:text-indigo-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}