import type  { Event } from "../models/event";
import type { Organization } from "../models/organization";
import type { OrganizationRepository } from "../repositories/OrganizationRepository";

export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async getOrganizations(): Promise<Organization[]> {
    return this.organizationRepository.getOrganizations();
  }

  async getEventsByOrganization(team: string, date: string): Promise<Event[]> {
    return this.organizationRepository.getEventsByOrganization(team, date);
  }
}
