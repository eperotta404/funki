import type { Organization } from "../models/organization";
import type { OrganizationRepository } from "../repositories/OrganizationRepository";

export class OrganizationService {
  constructor(private userRepository: OrganizationRepository) {}

  async getOrganizations(): Promise<Organization[]> {
    return this.userRepository.getOrganizations();
  }
}
