import type  { Event } from "../models/event";
import type { Organization } from "../models/organization";
import type { OrganizationRepository } from "../repositories/OrganizationRepository";

export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async getOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.getOrganizations();
  }

  async getEventsByOrganization(organizationId: string, squadId: string): Promise<Event[]> {
    return this.organizationRepository.getEventsByOrganization(organizationId, squadId);
  }
}
