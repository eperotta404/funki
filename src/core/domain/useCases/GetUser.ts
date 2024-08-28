import type { User } from '../models/user';
import type { UserService } from '../services/UserService';

export class GetUser {
  constructor(private userService: UserService) {}

  async execute(id: string): Promise<User> {
    return this.userService.getUser(id);
  }
}
