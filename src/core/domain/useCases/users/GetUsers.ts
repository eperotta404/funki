import type { User } from "../../models/user";
import type { UserService } from "../../services/UserService";

export class GetUsers {
  constructor(private userService: UserService) {}

  async execute(sportOrganizationId: string): Promise<User[]> {
    return this.userService.getUsers(sportOrganizationId);
  }
}
