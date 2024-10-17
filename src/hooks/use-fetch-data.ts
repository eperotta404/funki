import { useState, useEffect, useCallback } from 'react';

import { useRouter } from 'src/routes/hooks';

import { signOut } from 'src/auth/context';
import { useAuthContext } from 'src/auth/hooks';

type UseFetchData<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void; // Agregar refetch en el retorno del hook
};

export const useFetchData = <T>(
  useCase: { execute: (...args: any[]) => Promise<T> },
  ...args: any[]
): UseFetchData<T> => {
  const { checkUserSession } = useAuthContext();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedData = await useCase.execute(...args);
      setData(fetchedData);
    } catch (err) {
      if (err.message === 'Forbidden Error') {
        await signOut();
        await checkUserSession?.();
        router.refresh();
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [useCase, checkUserSession, router, ...args]);

  useEffect(() => {
    if (args.every((arg) => arg !== null && arg !== undefined)) {
      fetchData();
    }
  }, [fetchData, ...args]);

  return { data, loading, error, refetch: fetchData };
};
