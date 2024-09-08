import type { Organization } from "../models/organization";
import type { UserRepository } from "../repositories/UserRepository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getOrganizations(): Promise<Organization[]> {
    return this.userRepository.getOrganizations();
  }
}
