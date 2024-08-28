import type { User } from '../models/user';

export interface UserRepository {
  getUserById(id: string): Promise<User>;
}
