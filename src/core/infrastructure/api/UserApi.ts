import type { User } from 'src/core/domain/models/user';

import httpClient from '../httpClient';

import type { UserRepository } from '../../domain/repositories/UserRepository';

export class UserApi implements UserRepository {
  async getUserById(id: string): Promise<User> {
    const response = await httpClient.get(`/jokes/random`);

    const { icon_url, id: responseId, value } = response.data;

    const user: User = {
      id: responseId,
      name: value,
      avatar: icon_url,
    };

    return user;
  }
}
