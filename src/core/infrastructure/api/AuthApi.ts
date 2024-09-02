import type { User } from 'src/core/domain/models/user';
import type { Login } from 'src/core/domain/models/login';
import type { AuthRepository } from 'src/core/domain/repositories/AuthRepository';

import type { HttpClient } from '../http/HttpClient';

export class AuthApi implements AuthRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async signIn(email: string, password: string): Promise<Login> {
    try {
      const params = { email, password };
      const response = await this.httpClient.post('/api/auth/sign-in',params);
      const { accessToken, user } = response.data;

      const userResponse: User = {
        id: user.id,
        name: user.displayName,
        avatar: user.photoURL,
      };

      return { accessToken, user: userResponse };
    } catch (error) {
      console.error('Error signing user:', error);
      throw error;
    }
  }

  async getMe(): Promise<User> {
    try {
      const response = await this.httpClient.get('/api/auth/me');
      const { user } = response.data;

      const userResponse: User = {
        id: user.id,
        name: user.displayName,
        avatar: user.photoURL,
      };

      return userResponse;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
