import type { CreateUserDto, UpdateUserDto } from "src/shared/types";

import type { User } from "../models/user";
import type { UserRepository } from "../repositories/UserRepository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(sportOrganizationId: string): Promise<User[]> {
    return this.userRepository.getUsers(sportOrganizationId);
  }

  async getUser(userId: string): Promise<User> {
    return this.userRepository.getUser(userId);
  }

  async createUser(createUser: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUser);
  }

  async updateUser(updateUser: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(updateUser);
  }

  async deleteUser(userId: string): Promise<User> {
    return this.userRepository.deleteUser(userId);
  }
}
