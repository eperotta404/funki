import type { CreateUserDto, UpdateUserDto } from "src/shared/types";

import type { User } from "../models/user";

export interface UserRepository {
  getUsers(sportOrganizationId: string): Promise<User[]>;
  getUser(userId: string): Promise<User>;
  createUser(createUser: CreateUserDto): Promise<User>;
  updateUser(updateUser: UpdateUserDto): Promise<User>;
  deleteUser(userId: string): Promise<User>;
}
