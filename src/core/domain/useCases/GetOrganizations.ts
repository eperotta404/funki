import type { Organization } from '../models/organization';
import type { OrganizationService } from '../services/OrganizationService';

export class GetOrganizations {
  constructor(private userService: OrganizationService) {}

  async execute(): Promise<Organization[]> {
    return this.userService.getOrganizations();
  }
}
