import type { UpdateUserDto } from "src/shared/types";

import type { User } from "../../models/user";
import type { UserService } from "../../services/UserService";

export class UpdateUser {
  constructor(private userService: UserService) {}

  async execute(updateUser: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(updateUser);
  }
}
