
import type { Login } from 'src/core/domain/models/login';
import type { AuthRepository } from 'src/core/domain/repositories/AuthRepository';

import { UserLogin } from 'src/core/domain/models/userLogin';

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
      const user = new UserLogin();

      return { accessToken: token, user };
    } catch (error) {
      error.message = "auth.invalidCredentials"
      throw error;
    }
  }

  async getMe(): Promise<UserLogin> {
    try {
      // const response = await this.httpClient.get('/api/auth/me');
      // const { user } = response.data;
      const user = new UserLogin();

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
