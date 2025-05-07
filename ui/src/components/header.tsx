'use client';

import useUser, { User } from '@/app/hooks/use-user';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOutIcon, UserIcon, UsersIcon, Loader2 } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItem } from './ui/dropdown-menu';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/auth-context';

export default function Header() {
  const router = useRouter();

  const { isAuthenticated, logout } = useAuth();
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
            <h1 className="text-xl font-bold text-gray-900 
            flex items-center gap-2">
              <UsersIcon className='w-7 h-7' color='gray' />
              Gerenciamento de Usuários
            </h1>
          </div>
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {isLoading ? (
                    <Link
                      href="/login"
                      className='outline-none border-none bg-transparent 
                      cursor-pointer flex items-center gap-2
                       hover:bg-gray-100 px-3 py-2 rounded-md'>
                      <Loader2 className='w-4 h-4 animate-spin' />
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className='outline-none border-none bg-transparent 
                      cursor-pointer flex items-center gap-2
                       hover:bg-gray-100 px-3 py-2 rounded-md'>
                      <UserIcon className='w-4 h-4' />
                      {user && `Bem-vindo, ${user?.fullname}`}
                    </Link>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56 bg-white mt-2'>
                  <DropdownMenuItem className="cursor-pointer ">
                    <Link
                      href="/users"
                      className='cursor-pointer w-full justify-start flex 
                      items-center gap-2 hover:bg-gray-100 px-3
                       py-2 rounded-md'>
                      <UsersIcon className='w-4 h-4' />
                      Usuários
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}>
                    <Link
                      href="/login"
                      className='cursor-pointer w-full justify-start
                       flex items-center gap-2
                        hover:bg-gray-100 px-3 py-2 rounded-md'>
                      <LogOutIcon className='w-4 h-4' />
                      Sair
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
