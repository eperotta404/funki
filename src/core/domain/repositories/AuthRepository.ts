import type { User } from '../models/user';
import type { Login } from '../models/login';

export interface AuthRepository {
  signIn(email: string, password: string): Promise<Login>;
  getMe(): Promise<User>;
}
