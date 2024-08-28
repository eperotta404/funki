import type { User } from '../models/user';
import type { UserRepository } from '../repositories/UserRepository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUser(id: string): Promise<User> {
    return this.userRepository.getUserById(id);
  }
}
