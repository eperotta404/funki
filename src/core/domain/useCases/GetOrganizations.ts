import type { Organization } from '../models/organization';
import type { UserService } from '../services/UserService';

export class GetOrganizations {
  constructor(private userService: UserService) {}

  async execute(): Promise<Organization> {
    return this.userService.getOrganizations();
  }
}
