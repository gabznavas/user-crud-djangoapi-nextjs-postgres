'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import useRegister from '../hooks/use-register';
import { useState } from 'react';
import useUserValidation from '../hooks/use-user-validation';

type Form = {
  fullname: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [globalError, setGlobalError] = useState<string | null>(null);

  const { validateUser } = useUserValidation();

  const { register: registerUser, isLoading, error, success } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Form>({
    defaultValues: {
      fullname: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: Form) => {
    const validationError = validateUser(data.email, data.fullname, data.password);
    if (validationError) {
      setGlobalError(validationError);
      return;
    }

    const isRegister = await registerUser(data.fullname, data.email, data.password);
    if (isRegister) {
      router.push('/users');
    }
  };

  return (
    <div className="min-h-screen flex pt-12 justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registre-se
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fullname" className="sr-only">
                Nome
              </label>
              <input
                {...register('fullname', {
                  required: 'Nome é obrigatório',
                })}
                id="fullname"
                type="text"
                autoComplete="fullname"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nome"
              />
              {errors.fullname && (
                <p className="mt-1 text-sm text-red-600 p-2">{errors.fullname.message}</p>
              )}
            </div>
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            {globalError && <p className="text-red-500 p-2 bg-red-100 rounded-md mb-2">{globalError}</p>}
            <button
              disabled={isLoading}
              type="submit"
              className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrar
            </button>
          </div>
        </form>

        <div>
          <Link href="/login">
            <p className="text-gray-500 pt-2 pb-2 pe-4 ps-4 bg-gray-100 rounded-md mb-2">
              Já tem uma conta? <span className="text-indigo-700">Entre com sua conta</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
} 