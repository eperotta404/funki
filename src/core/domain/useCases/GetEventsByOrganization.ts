import type  { Event } from "../models/event";
import type { OrganizationService } from '../services/OrganizationService';

export class GetEventsByOrganization {
  constructor(private organizationService: OrganizationService) {}

  async execute(organizationId: string, squadId: string): Promise<Event[]> {
    return this.organizationService.getEventsByOrganization(organizationId, squadId);
  }
}
