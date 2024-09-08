import type { User } from 'src/core/domain/models/user';
import type { Login } from 'src/core/domain/models/login';
import type { AuthRepository } from 'src/core/domain/repositories/AuthRepository';

import type { HttpClient } from '../http/HttpClient';

export class AuthApi implements AuthRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async signIn(email : string, password: string): Promise<Login> {
    try {
      const params = new URLSearchParams({ username: email, password }).toString();
      const response = await this.httpClient.post(`/auth/login?${params}`, {});
      const { token } = response.data;

      const userResponse: User = {
        id: 1,
        name: 'admin@fanki.co',
        avatar: '',
      };

      return { accessToken: token, user: userResponse };
    } catch (error) {
      error.message = "login.invalidCredentials"
      throw error;
    }
  }

  async getMe(): Promise<User> {
    try {

     // const response = await this.httpClient.get('/api/auth/me');
     // const { user } = response.data;

      const userResponse: User = {
        id: 1,
        name: 'admin@fanki.co',
        avatar: '',
      };

      return userResponse;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
