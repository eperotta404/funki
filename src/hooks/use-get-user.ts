import type { User } from 'src/core/domain/models/user';

import { useState, useEffect } from 'react';

import { GetUser } from 'src/core/domain/useCases/GetUser';
import { userService } from 'src/core/infrastructure/instances';

export const useGetUser = (id: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const getUserUseCase = new GetUser(userService);
      try {
        const fetchedUser = await getUserUseCase.execute(id);
        setUser(fetchedUser);
      } catch (err) {
        console.log(err);
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
};
