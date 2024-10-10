
import type { UserLogin } from '../models/userLogin';
import type { AuthService } from '../services/AuthService';

export class GetMe {
  constructor(private authService: AuthService) {}

  async execute(): Promise<UserLogin> {
    return this.authService.getMe();
  }
}
