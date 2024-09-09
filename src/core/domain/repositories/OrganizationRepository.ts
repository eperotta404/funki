import type  { Event } from "../models/event";
import type { Organization } from "../models/organization";

export interface OrganizationRepository {
  getOrganizations(): Promise<Organization[]>;
  getEventsByOrganization(organizationId: string, squadId: string): Promise<Event[]>;
}
