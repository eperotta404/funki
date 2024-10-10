import type { Login } from '../models/login';
import type { UserLogin } from '../models/userLogin';
import type { AuthRepository } from '../repositories/AuthRepository';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async signIn(email: string, password: string): Promise<Login> {
    return this.authRepository.signIn(email, password);
  }

  async getMe(): Promise<UserLogin> {
    return this.authRepository.getMe();
  }
}
