import type { Login } from '../models/login';
import type { AuthService } from '../services/AuthService';


export class SignIn {
  constructor(private authService: AuthService) {}

  async execute(email : string, password: string): Promise<Login> {
    return this.authService.signIn(email , password);
  }
}
