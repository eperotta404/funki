import type { CreateUserDto } from "src/shared/types";

import type { User } from "../../models/user";
import type { UserService } from "../../services/UserService";

export class CreateUser {
  constructor(private userService: UserService) {}

  async execute(createUser: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUser);
  }
}
