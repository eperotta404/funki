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
          shortName: squad.shortName
        })))
      );

      return organizations;
    } catch (error) {
      console.error('Error fetching organization:', error);
      throw error;
    }
  }

  async getEventsByOrganization(team: string, date: string): Promise<Event[]> {
    try {
      const { fromDate, toDate } = this.generateDateRange(date);
      const params = new URLSearchParams({
        squad: team,
        fromDate,
        toDate,
        page: '0',
        size: '1000'
      }).toString();

      const response = await this.httpClient.get(`/events/so/${team}/get?${params}`);
      const events = response.data.content.map((eve: any) =>
        new Event(eve.id, eve.name)
      );

      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  private generateDateRange = (year: string) => {
    const fromDate = `${year}-01-01`;
    const toDate = `${year}-12-31`;

    return { fromDate, toDate };
  };
}
