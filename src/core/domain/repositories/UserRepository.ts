import type { User } from "../models/user";

export interface UserRepository {
  getUsers(sportOrganizationId: string): Promise<User[]>;
}
