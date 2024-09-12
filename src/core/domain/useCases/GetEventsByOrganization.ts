import type  { Event } from "../models/event";
import type { OrganizationService } from '../services/OrganizationService';

export class GetEventsByOrganization {
  constructor(private organizationService: OrganizationService) {}

  async execute(team: string, date: string): Promise<Event[]> {
    return this.organizationService.getEventsByOrganization(team, date);
  }
}
