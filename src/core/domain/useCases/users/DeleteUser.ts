import type { User } from "../../models/user";
import type { UserService } from "../../services/UserService";

export class DeleteUser {
  constructor(private userService: UserService) {}

  async execute(userId: string): Promise<User> {
    return this.userService.deleteUser(userId);
  }
}
