
import type { User } from '../models/user';
import type { Login } from '../models/login';
import type { AuthRepository } from '../repositories/AuthRepository';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async signIn(email: string, password: string): Promise<Login> {
    return this.authRepository.signIn(email, password);
  }

  async getMe(): Promise<User> {
    return this.authRepository.getMe();
  }
}
