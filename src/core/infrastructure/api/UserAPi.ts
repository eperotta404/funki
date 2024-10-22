
import type { CreateUserDto, UpdateUserDto } from 'src/shared/types';
import type { UserRepository } from 'src/core/domain/repositories/UserRepository';

import { User } from 'src/core/domain/models/user';

import type { HttpClient } from '../http/HttpClient';

export class UserApi implements UserRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getUsers(sportOrganizationId: string): Promise<User[]> {
    try {
      const size = '100';
      const params = new URLSearchParams({ sportOrganizationId, size}).toString();
      const response = await this.httpClient.get(`/users?${params}`);
      const { content } = response.data || {};
      const users = content.map((user: any) =>
        new User(user.id, user.email, user.roles, user.sportOrganizationsIds)
      );
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUser(userId: string): Promise<User> {
    try {
      const response = await this.httpClient.get(`/users/${userId}`);
      const user = new User(response.data.id, response.data.email, response.data.roles, response.data.sportOrganizationsIds)
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async createUser(createUser: CreateUserDto): Promise<User> {
    try {
      const response = await this.httpClient.post('/users/create', createUser);
      const user = new User(response.data.id, response.data.email, response.data.roles, response.data.sportOrganizationsIds)
      return user;
    } catch (error) {
      console.error('Error create user:', error);
      throw error;
    }
  }

  async updateUser(updateUser: UpdateUserDto): Promise<User> {
    try {
      const { id, ...updateUserBody } = updateUser;
      const response = await this.httpClient.put(`/users/update/${id}`, updateUserBody);
      const user = new User(response.data.id, response.data.email, response.data.roles, response.data.sportOrganizationsIds)
      return user;
    } catch (error) {
      console.error('Error update user:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<User> {
    try {
      const response = await this.httpClient.delete(`/users/delete/${userId}`);
      const user = new User(response.data.id, response.data.email, response.data.roles, response.data.sportOrganizationsIds)
      return user;
    } catch (error) {
      console.error('Error delete user:', error);
      throw error;
    }
  }
}
