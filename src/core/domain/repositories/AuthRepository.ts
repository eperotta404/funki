import type { Login } from '../models/login';

export interface AuthRepository {
  signIn(email: string, password: string): Promise<Login>;
}
