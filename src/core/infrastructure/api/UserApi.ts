import type { User } from 'src/core/domain/models/user';

import type { HttpClient } from '../http/HttpClient';
import type { UserRepository } from '../../domain/repositories/UserRepository';

export class UserApi implements UserRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getUserById(id: string): Promise<User> {
    try {
      const response = await this.httpClient.get(`/jokes/random`);
      const { icon_url, id: responseId, value } = response.data;

      const user: User = {
        id: responseId,
        name: value,
        avatar: icon_url,
      };

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
