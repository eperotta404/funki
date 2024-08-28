import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await useCase.execute(...args);
        setData(fetchedData);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [args, useCase]);

  return { data, loading, error };
};
