import type  { Event } from "../models/event";
import type { Organization } from "../models/organization";

export interface OrganizationRepository {
  getOrganizations(): Promise<Organization[]>;
  getEventsByOrganization(team: string, date: string, isBundles: boolean): Promise<Event[]>;
}
