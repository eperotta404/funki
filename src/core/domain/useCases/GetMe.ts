import type { User } from '../models/user';
import type { AuthService } from '../services/AuthService';

export class GetMe {
  constructor(private authService: AuthService) {}

  async execute(): Promise<User> {
    return this.authService.getMe();
  }
}
