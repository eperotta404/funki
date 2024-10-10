
import type { UserRepository } from 'src/core/domain/repositories/UserRepository';

import { User } from 'src/core/domain/models/user';

import type { HttpClient } from '../http/HttpClient';


export class UserApi implements UserRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getUsers(sportOrganizationId: string): Promise<User[]> {
    try {
      const params = new URLSearchParams({ sportOrganizationId }).toString();
      const response = await this.httpClient.get(`/users?${params}`);
      const { content } = response.data || {};
      const users = content.map((user: any) =>
        new User(user.id, user.email, user.roles, user.sportOrganizationsIds)
      );
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
