import { useState, useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

import { signOut } from 'src/auth/context';

type UseFetchData<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useFetchData = <T>(
  useCase: { execute: (...args: any[]) => Promise<T> },
  ...args: any[]
): UseFetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await useCase.execute(...args);
        setData(fetchedData);
      } catch (err) {
        console.log('EZEEEEEE', err.message)
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
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
function checkUserSession() {
  throw new Error('Function not implemented.');
}

