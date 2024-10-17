
import type { Login } from 'src/core/domain/models/login';
import type { SessionStorage } from 'src/core/domain/models/sessionStorage';
import type { AuthRepository } from 'src/core/domain/repositories/AuthRepository';

import { User } from 'src/core/domain/models/user';
import { UserLogin } from 'src/core/domain/models/userLogin';

import type { HttpClient } from '../http/HttpClient';
import type { LocalStorage } from '../localStorage/localStorage';

export class AuthApi implements AuthRepository {
  private httpClient: HttpClient;

  private sessionStorage: LocalStorage;

  constructor(httpClient: HttpClient, sessionStorage: LocalStorage) {
    this.httpClient = httpClient;
    this.sessionStorage = sessionStorage;
  }

  async signIn(email : string, password: string): Promise<Login> {
    try {
      const params = new URLSearchParams({ username: email, password }).toString();
      const response = await this.httpClient.post(`/auth/login?${params}`, {});
      const { token, user } = response.data;
      // eslint-disable-next-line no-debugger
      debugger;
      const userInfo = new User(user.id, user.email, user.roles, user.sportOrganizationsIds);
      this.sessionStorage.store('user', JSON.stringify(userInfo))
      return { accessToken: token, user: userInfo };
    } catch (error) {
      error.message = "auth.invalidCredentials"
      throw error;
    }
  }
}
