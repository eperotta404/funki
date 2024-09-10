import type { OrganizationRepository } from 'src/core/domain/repositories/OrganizationRepository';

import { Event } from 'src/core/domain/models/event';
import { Organization } from 'src/core/domain/models/organization';

import type { HttpClient } from '../http/HttpClient';

export class OrganizationApi implements OrganizationRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getOrganizations(): Promise<Organization[]> {
    try {
      const response = await this.httpClient.get(`/backoffice/sportOrganizations`);
      const organizations = response.data.sportOrganizations.map((org: any) =>
        new Organization(org.id, org.country, org.name, org.squads.map((squad: any) => ({
          id: squad.id,
          name: squad.name,
          logo: squad.logo,
        })))
      );

      return organizations;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async getEventsByOrganization(organizationId: string, squadId: string): Promise<Event[]> {
    try {
      const params = new URLSearchParams({ squad: squadId }).toString();
      const response = await this.httpClient.get(`/events/so/${organizationId}/get?${params}`);
      const events = response.data.map((eve: any) =>
        new Event(eve.id, eve.name)
      );

      return events;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
