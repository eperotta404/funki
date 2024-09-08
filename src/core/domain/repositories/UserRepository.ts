import type { Organization } from "../models/organization";

export interface UserRepository {
  getOrganizations(): Promise<Organization[]>;
}
