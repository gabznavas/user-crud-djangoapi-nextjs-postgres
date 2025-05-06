'use client';

import useToken from '@/app/hooks/use-token';
import useUser, { User } from '@/app/hooks/use-user';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UsersIcon } from 'lucide-react';
export default function Header() {
  const router = useRouter();
  const { isAuthenticated, logout } = useToken();

  const { isLoading, getUserLogged } = useUser();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (isAuthenticated) {
        const user = await getUserLogged();
        setUser(user);
      }
    }

    if (isAuthenticated) {
      fetchUser().catch(() => {
        logout();
        router.push('/login');
      });
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <UsersIcon className='w-7 h-7' color='gray' />
              Gerenciamento de Usuários
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-600 italic ">
                  {user && `Bem-vindo, ${user?.fullname}`}
                  {isLoading && 'Carregando...'}
                </span>
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
              <AuthButtons />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

const AuthButtons = () => {
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);

  if (pathname === '/login') {
    return (
      <button
        onClick={() => router.push('/register')}
        className="cursor-pointer text-indigo-600 hover:text-indigo-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Registrar
      </button>
    )
  }


  return (
    <button
      onClick={() => router.push('/login')}
      className="cursor-pointer text-indigo-600 hover:text-indigo-900 px-3 py-2 rounded-md text-sm font-medium"
    >
      Entre com sua conta
    </button>
  )
}