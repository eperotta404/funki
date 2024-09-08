import { Organization } from 'src/core/domain/models/organization';

import type { HttpClient } from '../http/HttpClient';
import type { UserRepository } from '../../domain/repositories/UserRepository';

export class UserApi implements UserRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getOrganizations(): Promise<Organization[]> {
    try {
      const response = await this.httpClient.get(`/backoffice/sportOrganizations`);
      const organizations = response.data.map((org: any) =>
        new Organization(org.id, org.country, org.name, org.squads.map((squad: any) => ({
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
