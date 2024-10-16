import { useState } from 'react';

type UseMutationData<T, U = any> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (arg: U) => Promise<void>; 
};

export const useMutationData = <T, U = any>(
  useCase: { execute: (...args: U[]) => Promise<T> },
): UseMutationData<T, U> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (...args: U[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await useCase.execute(...args);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
};

