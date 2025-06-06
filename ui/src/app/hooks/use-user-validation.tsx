'use client';

export default function useUserValidation() {
  const validateUser = (email: string, fullname: string, password: string): string | null => {
    if (email.length > 50) {
      return 'O email deve ter no máximo 50 caracteres';
    }

    if (password.length < 8) {
      return 'A senha deve ter no mínimo 8 caracteres';
    }
    if (password.length > 72) {
      return 'A senha deve ter no máximo 72 caracteres';
    }

    const names = fullname.split(' ');
    if (names.length < 2) {
      return 'O nome deve ter no mínimo 2 nomes';
    }
    for (const name of names) {
      if (name.length < 2) {
        return 'Cada nome deve ter no mínimo 2 caracteres';
      }
      if (name.length > 50) {
        return 'Cada nome deve ter no máximo 50 caracteres';
      }
    }
    return null;
  }

  return { validateUser };
}
