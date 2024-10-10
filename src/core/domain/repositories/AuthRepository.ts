import type { Login } from '../models/login';
import type { UserLogin } from '../models/userLogin';

export interface AuthRepository {
  signIn(email: string, password: string): Promise<Login>;
  getMe(): Promise<UserLogin>;
}
