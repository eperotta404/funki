import type { Organization } from '../models/organization';
import type { OrganizationService } from '../services/OrganizationService';

export class GetOrganizations {
  constructor(private organizationService: OrganizationService) {}

  async execute(): Promise<Organization[]> {
    return this.organizationService.getOrganizations();
  }
}
