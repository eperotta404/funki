import type { OrganizationRepository } from 'src/core/domain/repositories/OrganizationRepository';

import { Organization } from 'src/core/domain/models/organization';

import mockOrganizations from './mockOrganizations.json';

import type { HttpClient } from '../http/HttpClient';

export class OrganizationApi implements OrganizationRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getOrganizations(): Promise<Organization[]> {
    try {
      // const response = await this.httpClient.get(`/backoffice/sportOrganizations`);
      const organizations = mockOrganizations.sportOrganizations.map((org: any) =>
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
}
