'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { LogInIcon, Loader2 } from 'lucide-react';
import useLogin from '../hooks/use-login';
import { Button } from '@/components/ui/button';

type Form = {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const { login, isLoading, error, success } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Form>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: Form) => {
    const isLogin = await login(data.email, data.password);
    if (isLogin) {
      router.push('/users');
    }
  };

  return (
    <div className="min-h-screen flex pt-12 justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
            <LogInIcon className='w-7 h-7' />
            Entre na sua conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
                id="email-address"
                type="email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 p-2">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                {...register('password', {
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'A senha deve ter no mínimo 6 caracteres'
                  }
                })}
                id="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 p-2">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            {isLoading && <p className="text-gray-500 p-2 bg-gray-100 rounded-md mb-2">Carregando...</p>}
            {error && <p className="text-red-500 p-2 bg-red-100 rounded-md mb-2">{error}</p>}
            {success && <p className="text-green-500 p-2 bg-green-100 rounded-md mb-2">{success}</p>}
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full cursor-pointer">
              {isLoading ? (
                <Loader2 className='w-4 h-4 animate-spin' />
              ) : (
                <LogInIcon className='w-4 h-4' />
              )}
              Entrar
            </Button>
          </div>
        </form>

        <div>
          <Link href="/register">
            <p className="text-gray-500 pt-2 pb-2 pe-4 ps-4 bg-gray-100 rounded-md mb-2">
              Não tem uma conta? <span className="text-indigo-700">Registre-se</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
} 