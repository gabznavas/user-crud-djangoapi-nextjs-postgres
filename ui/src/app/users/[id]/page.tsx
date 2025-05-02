'use client';

import { use, useState } from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import useUser from '@/app/hooks/use-user';
import useUserValidation from '@/app/hooks/use-user-validation';

type UserForm = {
  fullname: string;
  email: string;
  password: string;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function UserFormPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === 'new';

  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    getUser, createUser, updateUser, isLoading, error, success
  } = useUser();

  const { validateUser } = useUserValidation();

  const {
    register, handleSubmit, formState: { errors }, setValue, setFocus
  } = useForm<UserForm>();

  useEffect(() => {
    if (!isNew) {
      getUser(id).then((user) => {
        setValue('fullname', user.fullname);
        setValue('email', user.email);
        setValue('password', '');
        setFocus('fullname')
      })
    }
  }, [getUser, setValue, isNew, id]);

  const resetForm = () => {
    setGlobalError(null)
    setValue('fullname', '')
    setValue('email', '')
    setValue('password', '')
    setFocus('fullname')
  }

  const onSubmit = (data: UserForm) => {
    const validationError = validateUser(data.email, data.fullname, data.password);
    if (validationError) {
      setGlobalError(validationError);
      return;
    }

    if (isNew) {
      createUser(data.email, data.fullname, data.password)
        .then(() => {
          resetForm()
        })
        .catch((error) => {
          if (error instanceof Error) {
            setGlobalError(error.message);
          } else {
            setGlobalError('Erro ao criar usuário');
          }
        })
    } else {
      updateUser(id, data.email, data.fullname, data.password)
        .then(() => {
          resetForm()
          router.push('/users')
        })
        .catch((error) => {
          if (error instanceof Error) {
            setGlobalError(error.message);
          } else {
            setGlobalError('Erro ao atualizar usuário');
          }
        })
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isNew ? 'Novo Usuário' : 'Editar Usuário'}
      </h1>

      {isLoading && <div className="bg-gray-100 p-4 rounded-md mb-4">Carregando...</div>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {globalError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {globalError}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            {...register('fullname', { required: 'Nome é obrigatório' })}
            type="text"
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.fullname && (
            <p className="mt-1 text-sm text-red-600">{errors.fullname.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            type="email"
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isNew ? 'Senha' : 'Nova Senha'}
          </label>
          <input
            {...register('password', {
              required: isNew ? 'Senha é obrigatória' : false,
              minLength: {
                value: 6,
                message: 'A senha deve ter no mínimo 6 caracteres',
              },
            })}
            type="password"
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {!isLoading && isNew ? 'Salvar' : 'Atualizar'}
            {isLoading && 'Salvando...'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/users')}
            className="cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
} 