'use client';

import useToken from '@/app/hooks/use-token';
import useUser, { User } from '@/app/hooks/use-user';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOutIcon, UserIcon, UsersIcon, LogInIcon, UserPlusIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

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
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" className='border-none bg-transparent cursor-pointer'>
                    <UserIcon className='w-4 h-4' />
                    {user && `Bem-vindo, ${user?.fullname}`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56 bg-white mt-2'>
                  <DropdownMenuItem className="cursor-pointer ">
                    <Button
                      onClick={() => router.push('/users')}
                      variant="ghost"
                      className='cursor-pointer w-full justify-start'>
                      <UsersIcon className='w-4 h-4' />
                      Usuários
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className='cursor-pointer w-full justify-start text-red-600'>
                      <LogOutIcon className='w-4 h-4' color='red' />
                      Sair
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              pathname === '/login'
                ? (
                  <Button
                    onClick={() => router.push('/register')}
                    className="cursor-pointer"
                    variant="ghost"
                  >
                    <UserPlusIcon className='w-4 h-4' />
                    <span className='text-indigo-600 hover:text-indigo-900'>Registrar</span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push('/login')}
                    className="cursor-pointer"
                    variant="ghost"
                  >
                    <LogInIcon className='w-4 h-4' />
                    <span className='text-indigo-600 hover:text-indigo-900'>Entre com sua conta</span>
                  </Button>
                )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
