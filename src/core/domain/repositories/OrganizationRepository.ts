import type { Organization } from "../models/organization";

export interface OrganizationRepository {
  getOrganizations(): Promise<Organization[]>;
}
