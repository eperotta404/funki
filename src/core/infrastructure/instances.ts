
import { AuthApi } from './api/AuthApi';
import { HttpClient } from './http/HttpClient';
import { OrganizationApi } from './api/OrganizationApi';
import { LocalStorage } from './localStorage/localStorage';
import { AuthService } from '../domain/services/AuthService';
import { OrganizationService } from '../domain/services/OrganizationService';

export const session = new LocalStorage();
const httpClient = new HttpClient(session);
const organizationApi = new OrganizationApi(httpClient);
const authApi = new AuthApi(httpClient);

export const organizationService = new OrganizationService(organizationApi);
export const authService = new AuthService(authApi);
