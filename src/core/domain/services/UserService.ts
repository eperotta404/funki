import type { User } from "../models/user";
import type { UserRepository } from "../repositories/UserRepository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(sportOrganizationId: string): Promise<User[]> {
    return this.userRepository.getUsers(sportOrganizationId);
  }

}
